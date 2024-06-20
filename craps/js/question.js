import { Wager } from "./bet.js";
import { StopWatch } from "./stopwatch.js";

export class Question {
    constructor(parent, index, onQuestionTimeUpdate) {
        this.parent = parent;
        this.bet = Wager();
        this.index = index;
        this.stopWatch = new StopWatch(onQuestionTimeUpdate, index);
        this._answer;
        this.correctAnswer = this.bet.payout;
    }

    get name() {
        return `$${this.bet.amount} ${this.bet.name}`;
    }

    get dice() {
        return this.bet.dice;
    }

    get amount() {
        return this.bet.amount;
    }

    get answer() {
        return this._answer;
    }

    set answer(value) {
        this._answer = value;

        if (!this.isCorrect) {
            console.log(value, this.bet.payout);
        }

        this.stopWatch.stop();
    }

    get isCorrect() {
        return this.answer == this.bet.payout;
    }

    get loses() {
        return this.bet.loses;
    }

    get winnings() {
        return this.bet.winnings;
    }

    get payout() {
        return this.bet.payout;
    }

    stop() {
        this.stopWatch.stop();
    }

}
