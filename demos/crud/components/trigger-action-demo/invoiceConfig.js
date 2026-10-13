import { html } from 'lit';

export const invoiceConfig = {
  getConfig() {
    return {
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
      actions: {
        single: [
          {
            name: 'CreateInvoiceAction',
            label: 'Create Invoice',
            destructive: false,
          }
        ],
        directSingleActions: [],
        list: [],
      },
      customization: {
        disableEdit: true,
        disableListActionsOnSingleComponent: true,
      },
      labels: {
        startUpdateAction: 'Edit',
        updateAction: 'Update',
        updateWindowTitle: 'Update Item',
      },
      templates: {
        detail: (item) => html`
          <div style="padding: 1rem;">
            <h4>Order Details</h4>
            <p><strong>Order ID:</strong> ${item?.id || 'N/A'}</p>
            <p><strong>Customer:</strong> ${item?.title || 'Sample Customer'}</p>
            <p><strong>Status:</strong> Pending Invoice</p>
            <p style="color: #666; margin-top: 1rem;">
              Click the buttons below to create an invoice with pre-filled data.
            </p>
          </div>
        `,
        formSingleActions: (selection, element) => html`
          ${selection === 'CreateInvoiceAction'
            ? html`<demo-invoice-form action="CreateInvoiceAction"></demo-invoice-form>`
            : ''
          }
        `,
        relations: () => html``,
        updateForm: () => html``,
      },
      formIds: {
        updateForm: 'update-form',
      },
      translations: {
        element_actions: 'Actions',
      },
      responseAdapter: {
        setResponse: () => {},
        getData: () => ({ id: 'order-001', title: 'Sample Order' }),
        getActionResponseMessage: () => 'Invoice created successfully!',
        getActionResponseActionName: () => 'CreateInvoiceAction',
        getActionResponseActionData: () => ({}),
      },
      destructiveActionNames: [],
    };
  }
};
