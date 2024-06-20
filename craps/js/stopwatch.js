const interval = 100;

export class StopWatch {
    constructor(listener, index) {
        this.index = index;
        this.milliseconds = 0;
        this.listeners = [];
        if (listener) this.listeners.push(listener);
        this.locked = false;
    }

    onTimeUpdate() {
        this.listeners.forEach(listener => {
            listener(this, this.index);
        });
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.timer = setInterval(() => {
            if (this.locked) {
                this.stop();
                return;
            }
            this.milliseconds += interval;
            this.onTimeUpdate();
        }, 100);
    }

    get value() {
        return new Date(this.milliseconds).toISOString().slice(11, -1);
    }
}