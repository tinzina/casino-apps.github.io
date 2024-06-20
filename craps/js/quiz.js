import { Question } from "./question.js";
import { StopWatch } from "./stopwatch.js";

export class Quiz {
    constructor(numQuestions, onQuestionTimeUpdate, onQuestionChanged) {
        this.numQuestions = numQuestions;
        this.questions = [];
        this.answers = [];
        this.milliseconds = 0;
        this.stopWatch = null;
        this.selectedIndex = 0;
        for (let i = 0; i < numQuestions; i++) {
            this.questions.push(new Question(this, i, onQuestionTimeUpdate));
        }
        this.selection = null;
        this.prevSelection = null;
        this.onQuestionChanged = onQuestionChanged;
        this.playing = false;
    }

    get countOfCompletedQuestions() {
        return this.questions.filter(item => item.answer).length;
    }

    get countOfCorrectAnswers() {
        return this.questions.filter(item => item.isCorrect).length;
    }

    get countOfIncorrectAnswers() {
        return this.countOfCompletedQuestions - this.countOfCorrectAnswers;
    }

    get complete() {
        return this.countOfCorrectAnswers == this.questions.length;
    }

    goto(selectedIndex) {
        if (selectedIndex < 0 || selectedIndex >= this.questions.length) return;
        this.selectedIndex = selectedIndex;
        this.updateSelection();
    }

    stop() {
        this.stopWatch.stop();
        this.playing = false;
        this.questions.forEach(question => {
            question.stop();
        });
    }

    reset() {
        this.milliseconds = 0;
        this.answers.length = 0;
        this.stopWatch = null;
        this.playing = false;
    }

    start() {
        if (!this.stopWatch) {
            this.stopWatch = new StopWatch(this.onTimeUpdate);
        }
        this.playing = true;
        this.stopWatch.start();
        this.updateSelection();
    }

    hasNext() {
        return this.selectedIndex < (this.questions.length - 1);
    }

    next() {
        if (this.hasNext()) {
            this.selectedIndex++;
            if(this.questions[this.selectedIndex].isCorrect) {
                for (let i = this.selectedIndex + 1; i < this.questions.length; i++) {
                    const question = this.questions[i];
                    if (!question.isCorrect) {
                        this.selectedIndex = i;
                        break;
                    }
                }
                for (let i = 0; i < this.selectedIndex; i++) {
                    const question = this.questions[i];
                    if (!question.isCorrect) {
                        this.selectedIndex = i;
                        break;
                    }
                }                
            }
        } else {
            let flag = true;
            for (let i = 0; i < this.questions.length; i++) {
                const question = this.questions[i];
                if (!question.isCorrect) {
                    this.selectedIndex = i;
                    flag = false;
                    break;
                }
            }
        }

        this.updateSelection();
    }

    previous() {
        if (this.selectedIndex > 0)
            this.selectedIndex--;
        this.updateSelection();
    }

    updateSelection() {
        if(this.prevSelection) this.prevSelection.stopWatch.stop();
        this.selection = this.questions[this.selectedIndex];
        this.selection.stopWatch.start();
        if (this.onQuestionChanged) this.onQuestionChanged(this, this.selection, this.selection.bet.stopWatch);
        this.prevSelection = this.selection;
    }
}
