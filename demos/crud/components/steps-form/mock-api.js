// In-memory API for the dile-steps-form demo, so it works without a backend.
// It is registered as window.axiosInstance, which dile-ajax uses before window.axios.

const order = {
  id: 1,
  customer_name: 'Ada Lovelace',
  customer_email: '',
  address: '',
  shipping_method: '',
};

const requiredFields = {
  '/api/orders/1/customer': ['customer_name', 'customer_email'],
  '/api/orders/1/shipping': ['address', 'shipping_method'],
  '/api/orders/1/summary': [],
};

const delay = (value, fail = false) => new Promise((resolve, reject) => {
  setTimeout(() => (fail ? reject(value) : resolve(value)), 400);
});

window.axiosInstance = {
  get(url) {
    if (url !== '/api/orders/1') {
      return delay({ response: { status: 404, data: { message: 'Order not found' } } }, true);
    }
    return delay({ status: 200, data: { message: 'Order loaded', data: { ...order } } });
  },
  patch(url, data) {
    const missing = (requiredFields[url] ?? []).filter(field => !data[field]);
    if (missing.length && !data.alternativeExit) {
      const errors = Object.fromEntries(missing.map(field => [field, ['This field is required']]));
      return delay({ response: { status: 422, data: { message: 'Please review the form', errors } } }, true);
    }
    delete data.alternativeExit;
    Object.assign(order, data);
    return delay({ status: 200, data: { message: 'Step saved', data: { ...order } } });
  },
};
