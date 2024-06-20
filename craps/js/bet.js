import { BetOptions } from "./bet-options.js";
import { random_item } from "./die.js";

const DiceCombinations = [
    [],
    [],
    [[1, 1]],
    [[1, 2], [2, 1]],
    [[1, 3], [3, 1], [2, 2]],
    [[1, 4], [4, 1]],
    [[1, 5], [5, 1], [2, 4], [4, 2], [3, 3]],
    [[1, 6], [6, 1], [2, 5], [5, 2], [3, 4], [4, 3]],
    [[2, 6], [6, 2], [3, 5], [5, 3], [4, 4]],
    [[3, 6], [6, 3], [4, 5], [5, 4]],
    [[4, 6], [6, 4], [5, 5]],
    [[5, 6], [6, 5]],
    [[6, 6]]
];

class Bet {
    constructor({ name, bets, keys, numbers, flatOdds }) {
        this.name = name;
        this.bets = bets;
        this.keys = keys;
        this.numbers = numbers;
        this.flatOdds = flatOdds;
        this.units = new Map();
        this.unitCount = numbers.length;
        for (let i = 0; i < numbers.length; i++) {
            const n = numbers[i];
            this.units.set(n, this.units.has(n) ? this.units.get(n) + 1 : 1);
        }

        this._dice;
        this._amount = 0;
        this.amountCalledCount = 0;
        this.setRandomAmount();
        this.setRandomRoll();
    }

    setRandomAmount() {
        this.amount = +randomAmount(this.bets);
    }

    setRandomRoll() {
        this.number = random_item(this.numbers);
        this.dice = random_item(DiceCombinations[this.number]);
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this.amountCalledCount++;
        if (this.amountCalledCount > 1) debugger;
        this._amount = value;
    }

    get dice() {
        return this._dice;
    }

    set dice(value) {
        this._dice = value;
    }

    get die1() {
        return this._dice[0];
    }

    get die2() {
        return this._dice[1];
    }

    get isHardway() {
        return this.die1 == this.die2;
    }

    get loses() {
        if (this.flatOdds > 0)
            return 0;

        const num = this.die1 + this.die2;
        if (!this.units.has(num)) return this.amount * -1;
        const loserCount = this.unitCount - this.units.get(num);
        const unitPrice = this.amount / this.unitCount;
        return unitPrice * loserCount;
    }

    get winnings() {
        const num = this.die1 + this.die2;
        if (!this.units.has(num)) return 0;
        if (this.flatOdds > 0)
            return this.amount * this.flatOdds;

        const unitPrice = this.amount / this.unitCount;

        return (unitPrice * this.units.get(num)) * (this.isHardway ? 30 : 15);
    }

    get payout() {
        return this.winnings - this.loses;
    }
}

function BetTypes() {
    return Object.keys(BetOptions).sort();
}

function betList() {
    const nodes = betTypeList.querySelectorAll(`input[type=checkbox]:checked`);
    const list = [];
    [].filter.call(nodes, function (check) {
        const name = check.dataset.betName;
        list.push(name);
    });
    return list;
}

function randomBet() {
    return random_item(betList());
}

function randomAmount(bets) {
    return random_item(bets);
}

function Wager(name) {
    if (!name) name = randomBet();
    const options = BetOptions[name];
    return new Bet(options);
}

export {
    DiceCombinations,
    Bet,
    BetTypes,
    betList,
    randomBet,
    randomAmount,
    Wager
};