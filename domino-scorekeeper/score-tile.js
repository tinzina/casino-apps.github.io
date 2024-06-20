export class ScoreTile extends HTMLElement {
    static MaxScore = 50;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                height: 100%;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(0,0,0,0.2);
                padding: 10px;
                box-sizing: border-box;
                font-family: sans-serif;
            }

            td {
                border: none;
                position: relative;
                padding: 0;
            }

            .circle {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 75%;
                height: 75%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                border: 2px solid blue;
            }
            
            .diagonal {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 75%;
                height: 75%;
                transform: translate(-50%, -50%);
                background:
                    linear-gradient(to bottom right, transparent 46%, blue 46%, black 54%, transparent 54%);
            }
            
            .diagonal.rotate {
                transform: translate(-50%, -50%);
                background:
                    linear-gradient(to top right, transparent 46%, blue 46%, black 54%, transparent 54%);
            }

            table {
                border-collapse: collapse;
                height: 100%;
                width: 100%;
            }
        </style>
        <table>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
        </table>
        `;

        this.table = this.shadowRoot.querySelector('table');
        this.topLeft = this.shadowRoot.querySelector('tr:nth-child(1) td:nth-child(1)');
        this.topRight = this.shadowRoot.querySelector('tr:nth-child(1) td:nth-child(2)');
        this.bottomLeft = this.shadowRoot.querySelector('tr:nth-child(2) td:nth-child(1)');
        this.bottomRight = this.shadowRoot.querySelector('tr:nth-child(2) td:nth-child(2)');
    }

    connectedCallback() {
        this.updateTiles();
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') {
            this.updateTiles();
        }
    }

    get score() {
        return +this.getAttribute('value') || 0;
    }

    set score(value) {
        if (value < 0 || value > ScoreTile.MaxScore) {
            throw new Error('Score must be between 0 and ' + ScoreTile.MaxScore);
        }
        this.setAttribute('value', value);
        this.updateTiles();
    }

    updateTiles() {
        this.resetTiles();
        const verticalLine = this.score >= 5 ? '1px solid black' : 'none';
        const horizontalLine = this.score >= 10 ? '1px solid black' : 'none';

        this.topLeft.style.borderRight = verticalLine;
        this.bottomLeft.style.borderRight = verticalLine;

        this.topLeft.style.borderBottom = horizontalLine;
        this.topRight.style.borderBottom = horizontalLine;

        if (this.score >= 15 && this.score < 20) {
            this.drawDiagonal(this.topLeft, true);
        } else if (this.score >= 20) {
            this.drawCircle(this.topLeft);
        }

        if (this.score >= 25 && this.score < 30) {
            this.drawDiagonal(this.topRight);
        } else if (this.score >= 30) {
            this.drawCircle(this.topRight);
        }

        if (this.score >= 35 && this.score < 40) {
            this.drawDiagonal(this.bottomLeft);
        } else if (this.score >= 40) {
            this.drawCircle(this.bottomLeft);
        }

        if (this.score >= 45 && this.score < 50) {
            this.drawDiagonal(this.bottomRight, true);
        } else if (this.score >= 50) {
            this.drawCircle(this.bottomRight);
        }
    }

    drawCircle(cell) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        cell.appendChild(circle);
    }

    drawDiagonal(cell, rotate = false) {
        const diagonal = document.createElement('div');
        diagonal.classList.add('diagonal');
        if (rotate) {
            diagonal.classList.add('rotate');
        }
        cell.appendChild(diagonal);
    }

    resetTiles() {
        [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight].forEach(tile => {
            tile.style.border = 'none';
            while (tile.firstChild) {
                tile.removeChild(tile.firstChild);
            }
        });
    }
}
