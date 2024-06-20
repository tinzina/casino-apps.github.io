class NumberPad extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create elements
        const wrapper = document.createElement('div');
        wrapper.classList.add('numpad-wrapper');

        const buttons = [
            '1', '2', '3',
            '4', '5', '6',
            '7', '8', '9',
            '.', '0', 'C'
        ];

        buttons.forEach(label => {
            const button = document.createElement('button');
            button.classList.add('numpad-button');
            button.textContent = label;
            button.addEventListener('click', () => this._handleButtonClick(label));
            wrapper.appendChild(button);
        });

        // Style the component
        const style = document.createElement('style');
        style.textContent = `
            .numpad-wrapper {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 5px;
                max-width: 200px;
                margin: auto;
            }
            .numpad-button {
                font-size: 1.5rem;
                padding: 10px;
                border: none;
                border-radius: 5px;
                background-color: #ddd;
                cursor: pointer;
            }
            .numpad-button:hover {
                background-color: #ccc;
            }
            .numpad-button:active {
                background-color: #bbb;
            }
        `;

        // Attach elements to the shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    _handleButtonClick(label) {
        this.dispatchEvent(new CustomEvent('numpad-click', { detail: label }));
    }
}

// Register the custom element
customElements.define('number-pad', NumberPad);
