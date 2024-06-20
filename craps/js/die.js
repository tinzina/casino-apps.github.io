const SpotList = ["",
    `<div class="dice first-face"><span class="dot"></span></div>`,
    `<div class="dice second-face"> <span class="dot"> </span> <span class="dot"> </span></div>`,
    `<div class="dice third-face"> <span class="dot"></span> <span class="dot"></span> <span class="dot"></span></div>`,
    `<div class="fourth-face dice"> <div class="column"> <span class="dot"></span> <span class="dot"></span> </div><div class="column"> <span class="dot"></span> <span class="dot"></span> </div></div>`,
    `<div class="fifth-face dice"> <div class="column"> <span class="dot"></span> <span class="dot"></span> </div><div class="column"> <span class="dot"></span> </div><div class="column"> <span class="dot"></span> <span class="dot"></span> </div></div>`,
    `<div class="sixth-face dice"> <div class="column"> <span class="dot"></span> <span class="dot"></span> <span class="dot"></span> </div><div class="column"> <span class="dot"></span> <span class="dot"></span> <span class="dot"></span> </div></div>`
];

const diceElements = document.querySelectorAll("div.face");
const Pip = `<span class="pip"></span>`;

export function updateDice(dice) {
    // diceElements[0].innerHTML = SpotList[dice[0]];
    // diceElements[1].innerHTML = SpotList[dice[1]];
    diceElements[0].innerHTML = Pip.repeat(dice[0]);
    diceElements[1].innerHTML = Pip.repeat(dice[1]);

}

export function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}
