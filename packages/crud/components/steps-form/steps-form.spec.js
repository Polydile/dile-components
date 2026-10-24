import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import './steps-form.js';
import './step-form.js';

class TestStepForm extends HTMLElement {
  constructor() {
    super();
    this.value = '';
    this.receivedData = [];
    this.errors = null;
  }
  getData() {
    return { name: this.value };
  }
  setData(data) {
    this.receivedData.push(data);
  }
  showErrors(errors) {
    this.errors = errors;
  }
}
if (!customElements.get('test-step-form')) {
  customElements.define('test-step-form', TestStepForm);
}

const loadedResource = { id: 1, name: 'Loaded' };

function okResponse(data, message = 'Saved') {
  return Promise.resolve({ status: 200, data: { message, data } });
}

function validationError(errors) {
  return Promise.reject({
    response: { status: 422, data: { message: 'Invalid data', errors } },
  });
}

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

describe('dile-steps-form', () => {
  let get;
  let patch;

  beforeEach(() => {
    get = vi.fn(() => okResponse(loadedResource));
    patch = vi.fn((url, data) => okResponse({ ...loadedResource, ...data, url }));
    window.axiosInstance = { get, patch };
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  async function renderStepsForm(attributes = '', thirdStepAttributes = '') {
    document.body.innerHTML = `
      <dile-steps-form endpoint="/api/resource" ${attributes}>
        <dile-step-form label="First" endpoint="/api/resource/first">
          <test-step-form slot="form"></test-step-form>
        </dile-step-form>
        <dile-step-form label="Second" endpoint="/api/resource/second" alternativeExit alternativeExitLabel="Save as draft">
          <test-step-form slot="form"></test-step-form>
        </dile-step-form>
        <dile-step-form label="Third" endpoint="/api/resource/third" ${thirdStepAttributes}>
          <test-step-form slot="form"></test-step-form>
        </dile-step-form>
      </dile-steps-form>
    `;
    const el = document.body.querySelector('dile-steps-form');
    await el.updateComplete;
    await flush();
    await el.updateComplete;
    return el;
  }

  function stepForms(el) {
    return [...el.querySelectorAll('dile-step-form')];
  }

  function forms(el) {
    return [...el.querySelectorAll('test-step-form')];
  }

  it('takes the step labels from the label attribute of each step', async () => {
    const el = await renderStepsForm();

    expect(el.shadowRoot.querySelector('dile-steps').steps).toEqual(['First', 'Second', 'Third']);
    expect(el.shadowRoot.querySelector('.step-label').textContent).toBe('First');
  });

  it('only shows the current step', async () => {
    const el = await renderStepsForm();

    expect(stepForms(el).map(step => step.active)).toEqual([true, false, false]);
    expect(stepForms(el).map(step => getComputedStyle(step).display)).toEqual(['block', 'none', 'none']);
  });

  it('loads the endpoint and sets the data in every form', async () => {
    const el = await renderStepsForm();
    let loadedDetail;
    el.addEventListener('dile-steps-form-loaded', e => { loadedDetail = e.detail; });

    el.reload();
    await flush();

    expect(get).toHaveBeenCalledWith('/api/resource', expect.anything());
    expect(loadedDetail).toEqual({ data: loadedResource });
    forms(el).forEach(form => expect(form.receivedData.at(-1)).toEqual(loadedResource));
  });

  it('saves the step with PATCH and moves to the next step', async () => {
    const el = await renderStepsForm();
    forms(el)[0].value = 'Acme';
    let successDetail;
    el.addEventListener('dile-step-form-success', e => { successDetail = e.detail; });

    stepForms(el)[0].next();
    await flush();
    await el.updateComplete;

    expect(patch).toHaveBeenCalledWith('/api/resource/first', { name: 'Acme' }, undefined);
    expect(successDetail.message).toBe('Saved');
    expect(el.current).toBe(1);
    expect(stepForms(el).map(step => step.active)).toEqual([false, true, false]);
  });

  it('dispatches dile-steps-form-complete after saving the last step', async () => {
    const el = await renderStepsForm();
    let completeDetail;
    el.addEventListener('dile-steps-form-complete', e => { completeDetail = e.detail; });

    el.navigateTo(2);
    stepForms(el)[2].next();
    await flush();

    expect(completeDetail.alternativeExit).toBe(false);
    expect(completeDetail.data.url).toBe('/api/resource/third');
  });

  it('completes with the alternative exit and sends the alternativeExit field', async () => {
    const el = await renderStepsForm();
    let completeDetail;
    el.addEventListener('dile-steps-form-complete', e => { completeDetail = e.detail; });

    el.navigateTo(1);
    stepForms(el)[1].alternativeNext();
    await flush();

    expect(patch).toHaveBeenCalledWith('/api/resource/second', { name: '', alternativeExit: true }, undefined);
    expect(completeDetail.alternativeExit).toBe(true);
  });

  it('does not keep the alternative exit after a failed save', async () => {
    const el = await renderStepsForm();
    let completed = false;
    el.addEventListener('dile-steps-form-complete', () => { completed = true; });
    el.navigateTo(1);

    patch.mockImplementationOnce(() => validationError({ name: ['Required'] }));
    stepForms(el)[1].alternativeNext();
    await flush();
    expect(forms(el)[1].errors).toEqual({ name: ['Required'] });

    stepForms(el)[1].next();
    await flush();

    expect(completed).toBe(false);
    expect(el.current).toBe(2);
  });

  it('dispatches dile-step-form-error with the validation errors and status', async () => {
    const el = await renderStepsForm();
    let errorDetail;
    el.addEventListener('dile-step-form-error', e => { errorDetail = e.detail; });
    patch.mockImplementationOnce(() => validationError({ name: ['Required'] }));

    stepForms(el)[0].next();
    await flush();

    expect(errorDetail).toEqual({ message: 'Invalid data', errors: { name: ['Required'] }, status: 422 });
    expect(el.current).toBe(0);
  });

  it('sends the saved data to the steps with refreshOnSave', async () => {
    const el = await renderStepsForm('', 'refreshOnSave');
    forms(el).forEach(form => { form.receivedData = []; });

    stepForms(el)[0].next();
    await flush();

    expect(forms(el)[2].receivedData).toHaveLength(1);
    expect(forms(el)[2].receivedData[0].url).toBe('/api/resource/first');
    expect(forms(el)[1].receivedData).toHaveLength(0);
  });

  it('dispatches dile-steps-form-error with the status when the load fails', async () => {
    get.mockImplementation(() => Promise.reject({
      response: { status: 404, data: { message: 'Not found' } },
    }));
    let errorDetail;
    document.body.addEventListener('dile-steps-form-error', e => { errorDetail = e.detail; });

    await renderStepsForm();
    await flush();

    expect(errorDetail.status).toBe(404);
    expect(errorDetail.message).toBe('Not found');
  });

  it('translates the navigation labels with the language property', async () => {
    const el = await renderStepsForm('language="es"');
    const nextPrev = stepForms(el)[0].shadowRoot.querySelector('dile-step-next-prev');

    await vi.waitFor(() => {
      expect(nextPrev.shadowRoot.querySelector('.next dile-button').textContent.trim()).toBe('Siguiente');
    });
  });

  it('uses the labels defined in the step before the translations', async () => {
    const el = await renderStepsForm('', 'endLabel="Create invoice"');
    el.navigateTo(2);
    await el.updateComplete;
    await stepForms(el)[2].updateComplete;
    const nextPrev = stepForms(el)[2].shadowRoot.querySelector('dile-step-next-prev');
    await nextPrev.updateComplete;

    expect(nextPrev.shadowRoot.querySelector('.next dile-button').textContent.trim()).toBe('Create invoice');
    expect(nextPrev.shadowRoot.querySelector('.prev dile-button').textContent.trim()).toBe('Previous');
  });
});
