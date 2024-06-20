const unitInputs = document.querySelectorAll(`input[name="units"]`)
const totalInput = document.querySelector(`#totalInput`)
const weekdayCombo = document.querySelector(`#weekdayCombo`)
const statsTable = document.querySelector(`#toke-stats`)

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

let summaryData = null
fetch('./js/daily-toke-summary.json')
    .then(response => response.json())
    .then(data => {
        summaryData = data
        console.log(data)
        calculate()
    })

let day1 = new Date().getDay() - 1
weekdayCombo.selectedIndex = day1 == -1 ? 0 : day1
weekdayCombo.onchange = _ => {
    calculate()
}

unitInputs.forEach(item => {
    item.onchange = _ => {
        calculate()
    }
    item.onkeyup = _ => {
        calculate()
    }
    item.onfocus = _ => {
        item.select()
    }
})

document.querySelector('.reset-button').onclick = _ => {
    unitInputs.forEach(item => {
        item.value = 0
    })
    totalInput.value = formatter.format(0)
}

class StatsRow {
    constructor(row) {
        this.row = row
    }
    set title(value) {
        this.row.cells[0].textContent = value
    }
    set min(value) {
        this.row.cells[1].textContent = formatter.format(value)
    }
    set average(value) {
        this.row.cells[2].textContent = formatter.format(value)
    }
    set max(value) {
        this.row.cells[3].textContent = formatter.format(value)
    }
}

const statsManager = new class {
    constructor() {
        this.header = new StatsRow(statsTable.rows[0])
        this.hours = new StatsRow(statsTable.rows[1])
        this.total = new StatsRow(statsTable.rows[2])
        this.hourly = new StatsRow(statsTable.rows[3])
        this.estimate = new StatsRow(statsTable.rows[4])
    }

    update(data, total, title) {
        this.header.title = title
        this.hours.min = data.dealerHours.min
        this.hours.average = data.dealerHours.average
        this.hours.max = data.dealerHours.max

        this.total.min = data.tokeDrop.min
        this.total.average = data.tokeDrop.average
        this.total.max = data.tokeDrop.max

        this.hourly.min = formatter.format(data.rate.min)
        this.hourly.average = formatter.format(data.rate.average)
        this.hourly.max = formatter.format(data.rate.max)

        const estimateMin = data.rate.min * total
        const estimateAvg = data.rate.average * total
        const estimateMax = data.rate.max * total
        this.estimate.min = formatter.format(estimateMin)
        this.estimate.average = formatter.format(estimateAvg)
        this.estimate.max = formatter.format(estimateMax)
    }
}

function calculate() {
    let total = 0
    unitInputs.forEach(item => {
        total += +item.value
    })
    totalInput.value = formatter.format(total)

    const day = weekdayCombo.options[weekdayCombo.selectedIndex].text
    if (!summaryData) return
    const data = summaryData[day]
    statsManager.update(data, total, day)
}

window.statsManager = statsManager
window.calculate = calculate

calculate()
