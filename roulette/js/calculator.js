
const bets = document.querySelectorAll(`input[name="bet"]`);
const chipPayOut = document.getElementById(`chip-payout`);
const cashPayOut = document.getElementById(`cash-payout`);

document.querySelector(".reset-button").onclick = _ => {
    bets.forEach(item => {
        item.value = 0;
    });
    calculatePayOuts();
};

document.querySelectorAll("button.bet-button").forEach(item => {
    item.onclick = _ => {
        document.querySelector("button.bet-button.active").classList.remove("active");
        item.classList.add("active");
        calculatePayOuts();
    }
});

bets.forEach(item => {
    item.ondblclick = _ => {
        item.value = 0;
        calculatePayOuts();
    }
    item.onchange = _ => {
        calculatePayOuts();
    }
    item.onkeyup = _ => {
        calculatePayOuts();
    }
    item.onfocus = _ => {
        item.select();
    }
});

function calculatePayOuts() {
    let chips = 0;
    bets.forEach(item => {
        const value = +item.getAttribute("odds") * item.value;
        item.closest("td").nextElementSibling.innerHTML = value;
        chips += value;
    });
    chipPayOut.innerText = chips;
    cashPayOut.innerText = formatter.format(chips * +document.querySelector("button.bet-button.active").textContent);

}

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});