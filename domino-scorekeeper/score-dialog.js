export class ScoreDialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 20;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: none;
                    justify-content: center;
                    z-index: 1000;
                }
                .dialog-content {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    height: fit-content;
                    margin-top: 20px;
                }
                .grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 10px;
                }
                button {
                    padding: 10px;
                    font-size: 16px;
                    cursor: pointer;
                    border: none;
                    background-color: #007BFF;
                    color: #fff;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .history {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                }
                .section-header {
                    font-weight: bold;
                    margin-top: 10px;
                }

                .deletedEntry {
                    text-decoration: line-through;
                }

            </style>
            <div class="dialog-content">
                <div class="section-header">Add Score</div>
                <div class="grid add-score-grid"></div>
                
                <div class="section-header">History</div>
                <div class="history grid"></div>
            </div>
        `;

        // Create the grid of buttons for adding scores
        const addScoreGrid = this.shadowRoot.querySelector('.add-score-grid');
        for (let i = 0; i < 25; i++) {
            const button = document.createElement('button');
            button.textContent = i * 5;
            button.addEventListener('click', () => {
                if (this.player) {
                    this.player.addScore(i * 5);
                    this.updateHistory();
                }
            });
            addScoreGrid.appendChild(button);
        }

        this.addEventListener('click', (e) => {
            if (e.target === this) {
                this.close();
            }
        });
    }

    updateHistory() {
        const historyDiv = this.shadowRoot.querySelector('.history');
        historyDiv.innerHTML = '';
        this.player.history.forEach((score, index) => {
            const button = document.createElement('button');
            button.textContent = score;
            button.dataset.index = index;
            if (this.player.deletedEntries.includes(index)) {
                button.classList.add('deletedEntry');
                button.dataset.deleted = true;
            }
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                if (this.player.deletedEntries.includes(index)) {
                    if (confirm('Do you want to restore this score?')) {
                        this.player.deleteHistoryEntry(index);
                    }
                } else {
                    if (confirm('Do you want to subtract this score?')) {
                        this.player.deleteHistoryEntry(index);
                    }
                }
            });
            historyDiv.appendChild(button);
        });
    }

    show(player) {
        this.player = player;
        this.updateHistory();
        this.style.display = 'flex';
    }

    close() {
        this.style.display = 'none';
    }
}

