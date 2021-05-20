import { html, css, LitElement } from 'lit-element';

export class DileGraph extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
            }

            .card {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                width: var(--eit-card-graph-width, 400px);
                background-color: var(--eit-card-graph-backgroundColor, white);
                border-radius: var(--eit-card-graph-borderRadius, 0px);
            }

            .card:hover {
                box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
            }

            .container {
                padding: 20px 16px;
                text-align: center;
            }
            .graf-div {
                width: var(--eit-graph-width, 300px);
                height: var(--eit-graph-heigth, 300px);
                display: block;
                margin: 0 auto;
            }
        `;
    }
    static get properties() {
        return {
            columnColors: { type: Array },
            graphicTitle: { type: String },
            columnsValues: { type: Array },
            ColumnEdgeColors: { type: Array },
            columnsOfTheChart: { type: String },
        };
    }

    constructor() {
        super();
        this.columnsValues = [3, 7];
        this.graphicTitle = 'Default Graph';
        this.columnsOfTheChart = ['Column 1', 'Column 2'];
        this.ColumnEdgeColors = ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)'];
        this.columnColors = ['rgba(200, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'];
    }

    render() {
        return html`
            <div class="card">
                <div class="graf-div">
                    <canvas id="myChart2" width="400" height="400"></canvas>
                </div>
            </div>
        `;
    }

    firstUpdated() {
        const ctx = this.renderRoot.querySelector('#myChart2').getContext('2d');
        this.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.columnsOfTheChart,
                datasets: [
                    {
                        label: this.graphicTitle,
                        data: this.columnsValues,
                        backgroundColor: this.columnColors,
                        borderColor: this.ColumnEdgeColors,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    }
}
