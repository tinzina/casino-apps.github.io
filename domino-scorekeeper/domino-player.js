import { ScoreTile } from './score-tile.js';

export class DominoPlayer extends HTMLElement {
    static MAX_TILE_SCORE = 50;
    deletedEntries = [];
    history = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    reset() {
        this.history = [];
        this.deletedEntries = [];
        // Clear local storage
        const id = this.getAttribute('id');
        localStorage.removeItem(`player-${id}-history`);
        localStorage.removeItem(`player-${id}-deleted-entries`);
        this.renderTiles();
    }

    static get observedAttributes() {
        return ['id', 'rotate', 'name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'rotate') {
            this.renderTiles();
        } else if (name === 'name') {
            this.shadowRoot.querySelector('.player-name').value = newValue;
            // Save the name to local storage
            const id = this.getAttribute('id');
            localStorage.setItem(`player-${id}-name`, newValue);

        } else if (name === 'id') {
            this.loadHistory(newValue);
        }
    }

    loadHistory(id) {
        const savedHistory = localStorage.getItem(`player-${id}-history`);
        if (savedHistory !== null) {
            this.history = JSON.parse(savedHistory);
        }
        const savedDeletedEntries = localStorage.getItem(`player-${id}-deleted-entries`);
        if (savedDeletedEntries !== null) {
            this.deletedEntries = JSON.parse(savedDeletedEntries);
        }
        // Set the player name
        const name = localStorage.getItem(`player-${id}-name`);
        if (name !== null) {
            this.setAttribute('name', name);
        }
        this.renderTiles();
    }

    save() {
        const id = this.getAttribute('id');
        localStorage.setItem(`player-${id}-history`, JSON.stringify(this.history));
        localStorage.setItem(`player-${id}-deleted-entries`, JSON.stringify(this.deletedEntries));
    }

    addScore(value) {
        // ignore values under 5
        if (value < 5) {
            return;
        }
        this.history.push(value);
        this.renderTiles();
    }

    deleteHistoryEntry(index) {
        if (this.deletedEntries.includes(index)) {
            // Remove from deletedEntries
            const i = this.deletedEntries.indexOf(index);
            this.deletedEntries.splice(i, 1);
        } else {
            this.deletedEntries.push(index);
        }
        this.renderTiles();
    }

    get Score() {
        // Return sum of history but ignore indices in deletedEntries
        return this.history.reduce((acc, curr, index) => {
            if (this.deletedEntries.includes(index)) {
                return acc;
            }
            return acc + curr;
        }, 0);
    }

    get rotate() {
        return this.hasAttribute('rotate');
    }

    set rotate(val) {
        if (val) {
            this.setAttribute('rotate', '');
        } else {
            this.removeAttribute('rotate');
        }
        this.renderTiles();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    padding: 10px;
                    box-sizing: border-box;
                    font-family: sans-serif;
                    min-height: 140px;
                }

                fieldset {
                    border: none;
                    padding: 0;
                    margin: 0;
                }

                legend {
                    font-size: 1.2em;
                    font-weight: bold;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    padding: 5px;
                }

                button {
                    background-color: #007BFF;
                    color: #fff;
                    padding: 5px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin-right: 10px;
                }

                button:hover {
                    background-color: #0056b3;
                }

                .tiles {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: left;
                }

                score-tile {
                    width: 100px;
                    height: 100px;        
                }

                score-tile:nth-child(1) {
                    margin-left: 15px;
                }

                score-tile.rotated {
                    transform: rotate(45deg);
                    margin: 15px;
                    margin-left: 10px;
                    margin-top: 0;
                }

                score-tile.rotated:nth-child(1) {
                    margin-left: 15px;
                }

                input.player-name {
                    font-size: 1.2em;
                    border: none;
                    min-width: 150px;
                    outline: none;
                }

                input.player-score {
                    font-size: 1.2em;
                    border: none;
                    width: 50px;
                    text-align: center;
                    outline: none;
                }
            </style>

            <datalist id="names">
                <option value="Bryd">
                <option value="Donald">
                <option value="Hestel">
                <option value="Jeff">
                <option value="Karen">
                <option value="Kirk">
                <option value="Lamar">
                <option value="Michael">
                <option value="Mike">
                <option value="Rene">
                <option value="Rhashad">
                <option value="Shelita">
                <option value="Stacy">
                <option value="Thomas">
            </datalist>

            <fieldset>
                <legend>
                    <input type="number" class="player-score" placeholder="0" min="0" max="" step="5" readonly/>
                    <button>+/-</button>
                    <input type="text" class="player-name" placeholder="${this.getAttribute('data-placeholder')}" list="names"/> 
                </legend>
                <div class="tiles"></div>
            </fieldset>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            const dialog = document.querySelector('score-dialog');
            if (dialog) {
                dialog.show(this);
            }
        });

        this.renderTiles();

        this.shadowRoot.querySelector('.player-name').addEventListener('input', (e) => {
            this.setAttribute('name', e.target.value);
        });

        // Clear the name if the user deletes all text
        this.shadowRoot.querySelector('.player-name').addEventListener('change', (e) => {
            if (e.target.value === '') {
                this.setAttribute('name', '');
            }
        });

        // Delete the name if double clicked
        this.shadowRoot.querySelector('.player-name').addEventListener('dblclick', (e) => {
            this.setAttribute('name', '');
        });
    }

    renderTiles() {
        const playerScoreInput = this.shadowRoot.querySelector('.player-score');
        playerScoreInput.value = this.Score;
        const tilesDiv = this.shadowRoot.querySelector('.tiles');
        tilesDiv.innerHTML = ''; // clear current tiles
        const requiredTiles = Math.ceil(this.Score / DominoPlayer.MAX_TILE_SCORE);
        for (let i = 0; i < requiredTiles; i++) {
            const tileScore = i === requiredTiles - 1 && this.Score % DominoPlayer.MAX_TILE_SCORE !== 0
                ? this.Score % DominoPlayer.MAX_TILE_SCORE
                : DominoPlayer.MAX_TILE_SCORE;

            const tile = document.createElement('score-tile');
            tile.score = tileScore;

            if (this.rotate) {
                tile.classList.add('rotated');
            }

            if (this.deletedEntries.includes(i)) {
                tile.classList.add('deletedEntry');
            }

            tilesDiv.appendChild(tile);
        }

        this.save();
    }
}
