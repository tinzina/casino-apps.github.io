export class NumberSpinner extends HTMLElement {
    // based on:https://codepen.io/dmondma/pen/OJPpWwY
    constructor() {
        super();

        // Attach a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Add the style to the shadow root
        const style = document.createElement('style');
        style.textContent = `
            .skin-2 .num-in {
                background: #FFFFFF;
                box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
                border-radius: 25px;
                height: 40px;
                width: 110px;
                float: left;
            }

            .skin-2 .num-in span {
                width: 40%;
                display: block;
                height: 40px;
                float: left;
                position: relative;
            }

            .skin-2 .num-in span:before,
            .skin-2 .num-in span:after {
                content: '';
                position: absolute;
                background-color: #667780;
                height: 2px;
                width: 10px;
                top: 50%;
                left: 50%;
                margin-top: -1px;
                margin-left: -5px;
            }

            .skin-2 .num-in span.plus:after {
                transform: rotate(90deg);
            }

            .skin-2 .num-in input {
                float: left;
                width: 20%;
                height: 40px;
                border: none;
                text-align: center;
            }
        `;

        // Create the HTML structure for the component
        const div = document.createElement('div');
        div.className = 'skin-2 num-block';
        div.innerHTML = `
            <div class="num-in">
                <span class="minus"></span>
                <input class="in-num" type="text" value="1">
                <span class="plus"></span>
            </div>
        `;

        // Append the style and HTML structure to the shadow root
        shadow.appendChild(style);
        shadow.appendChild(div);

        // Event listeners for +/-
        shadow.querySelectorAll('.num-in span').forEach(span => {
            span.addEventListener('click', (e) => {
                const input = e.target.closest('.num-block').querySelector('input.in-num');
                let count;

                if (e.target.classList.contains('minus')) {
                    count = parseFloat(input.value) - 1;
                    count = count < 1 ? 1 : count;
                    if (count < 2) {
                        e.target.classList.add('dis');
                    } else {
                        e.target.classList.remove('dis');
                    }
                    input.value = count;
                } else {
                    count = parseFloat(input.value) + 1;
                    input.value = count;
                    if (count > 1) {
                        e.target.closest('.num-block').querySelector('.minus').classList.remove('dis');
                    }
                }

                const changeEvent = new Event('change');
                input.dispatchEvent(changeEvent);
            });
        });
    }
}
