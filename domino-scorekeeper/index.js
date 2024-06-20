import { ScoreTile } from './score-tile.js';
import { NumberSpinner } from './number-spinner.js';
import { DominoPlayer } from './domino-player.js';
import { ScoreDialog } from './score-dialog.js';

// Register the custom elements
customElements.define('score-tile', ScoreTile);
customElements.define('number-spinner', NumberSpinner);
customElements.define('domino-player', DominoPlayer);
customElements.define('score-dialog', ScoreDialog);

// Create the players
const players = document.querySelectorAll('domino-player');
const resetScoresButton = document.getElementById('reset-scores');
resetScoresButton.addEventListener('click', () => {
    players.forEach(player => player.reset());
});

const resetNamesButton = document.getElementById('reset-names');
resetNamesButton.addEventListener('click', () => {
    players.forEach((player, i) => player.setAttribute('name', ``));
});

const rotateCheckBox = document.getElementById('rotate-checkbox');

// On page load, get the checkbox's state from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedState = localStorage.getItem('rotateCheckBoxState');

    // If there's a saved state in local storage, set the checkbox and players accordingly
    if (savedState !== null) {
        rotateCheckBox.checked = savedState === 'true';
        players.forEach(player => {
            player.rotate = rotateCheckBox.checked;
        });
    }
});

// When the checkbox changes, save its state to local storage and update players
rotateCheckBox.addEventListener('change', () => {
    players.forEach(player => {
        player.rotate = rotateCheckBox.checked;
    });
    localStorage.setItem('rotateCheckBoxState', rotateCheckBox.checked);
});
