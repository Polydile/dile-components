import { html, css, LitElement } from 'lit';

export class DileGraph extends LitElement {
    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }
            :host {
                display: block;
            }
            .card {
                box-shadow: var(--dile-graph-shadow, 0 4px 8px 0 rgba(0, 0, 0, 0.2));
                padding: var(--dile-graph-padding, 10px);
                border-radius: var(--dile-graph-border-radius, 0);
                background-color: var(--dile-graph-background-color, white);
                transition: 0.3s;
                width: var(--dile-graph-width, 100%);
            }
            .card:hover {
                box-shadow: var(--dile-graph-hover-shadow, 0 8px 16px 0 rgba(0, 0, 0, 0.2));
            }
        `;
    }
    static get properties() {
        return {
            chartType: { type: String },
            labels: { type: Array },
            datasets: { type: Array },
        };
    }

    constructor() {
        super();
        this.chartType = 'line'
    }

    render() {
        return html`
            <div class="card">
                <canvas id="myChart"></canvas>
            </div>
        `;
    }

    get config() {
        return {
            type: this.chartType,
            data: this.data,
            options: {}
        };
    }

    get data() {
        return {
            labels: this.labels,
            datasets: this.datasets,
        }
    }

    firstUpdated() {
        const ctx = this.renderRoot.querySelector('#myChart').getContext('2d');
        this.myChart = new Chart(ctx, this.config);
    }
}
