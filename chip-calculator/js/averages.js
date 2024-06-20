
function tokeDayData() {
    const result = {
        hourly: new Stats(), hours: new Stats(), total: new Stats(), estimate: value => {
            return {
                min: (value / result.hours.max).toFixed(2),
                max: (value / result.hours.min).toFixed(2),
                average: (value / result.hours.average).toFixed(2)
            }
        }
    };
    return result;
}

class Stats {
    constructor() {
        this.count = 0;
        this.min = 0;
        this.max = 0;
        this.total = 0;
    }

    add(value) {
        this.count++;
        this.total += value;
        if (this.max < value)
            this.max = value;

        if (value < this.min || this.min == 0)
            this.min = value;
    }

    get average() {
        return (this.total / this.count).toFixed(2);
    }
}

const tokeStats = (() => {
    const data = {
        'Monday': tokeDayData(),
        'Tuesday': tokeDayData(),
        'Wednesday': tokeDayData(),
        'Thursday': tokeDayData(),
        'Friday': tokeDayData(),
        'Saturday': tokeDayData(),
        'Sunday': tokeDayData(),
        byDay: day => {
            return data[day]
        }
    }

    tokeData.forEach((item, i) => {
        if (i > 0) {
            const key = item[0];
            data[key].total.add(item[2]);
            data[key].hours.add(item[3]);
            data[key].hourly.add(item[4]);
        }
    });

    return data;
})();