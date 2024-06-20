document.addEventListener('DOMContentLoaded', () => {
    const betButtons = document.querySelectorAll('.bet-button');
    const resetButton = document.querySelector('.reset-button');
    const betInputs = document.querySelectorAll('input[name="bet"]');
    const totalChipPayout = document.getElementById('total-chip-payout');
    const totalCashPayout = document.getElementById('total-cash-payout');
    const cashChipPayoutDialogButton = document.querySelector('.cash-chip-payout-dialog-button');
    const cashChipPayoutDialog = document.getElementById('cash-chip-payout-dialog');
    const totalChipsInput = document.getElementById('total-chips');
    const cashOutInput = document.getElementById('cash-out');
    const chipsOutInput = document.getElementById('chips-out');
    const updateDialogButton = document.getElementById('update-dialog');
    const closeDialogButton = document.getElementById('close-dialog');

    let activeBetValue = 5;

    // Update active bet value on button click
    betButtons.forEach(button => {
        button.addEventListener('click', () => {
            betButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeBetValue = parseInt(button.textContent);
            calculatePayout();
        });
    });

    // Calculate payout for each bet type
    const calculatePayout = () => {
        let totalChipPayoutAmount = 0;
        let totalCashPayoutAmount = 0;

        betInputs.forEach(input => {
            const betAmount = parseInt(input.value);
            const odds = parseInt(input.getAttribute('odds'));
            const row = input.parentElement.parentElement;
            const chipPayoutCell = row.querySelector('.chip-payout');
            const cashPayoutCell = row.querySelector('.cash-payout');

            if (!isNaN(betAmount) && betAmount > 0) {
                const payout = betAmount * odds;
                const cashValue = payout * activeBetValue;
                chipPayoutCell.textContent = payout;
                cashPayoutCell.textContent = cashValue;

                totalChipPayoutAmount += payout;
                totalCashPayoutAmount += cashValue;
            } else {
                chipPayoutCell.textContent = 0;
                cashPayoutCell.textContent = 0;
            }
        });

        totalChipPayout.textContent = totalChipPayoutAmount;
        totalCashPayout.textContent = totalCashPayoutAmount;
    };

    // Add event listeners to bet inputs
    betInputs.forEach(input => {
        input.addEventListener('input', calculatePayout);
    });

    // Reset all inputs and payouts
    resetButton.addEventListener('click', () => {
        betInputs.forEach(input => {
            input.value = 0;
        });
        totalChipPayout.textContent = 0;
        totalCashPayout.textContent = 0;
        document.querySelectorAll('.chip-payout').forEach(cell => cell.textContent = 0);
        document.querySelectorAll('.cash-payout').forEach(cell => cell.textContent = 0);
    });

    // Initial calculation
    calculatePayout();

    // Open the cash-chip payout dialog
    cashChipPayoutDialogButton.addEventListener('click', () => {
        cashChipPayoutDialog.showModal();
    });

    // Calculate chips out based on total chips and cash out
    const calculateChipsOut = () => {
        const totalChips = parseInt(totalChipsInput.value) || 0;
        const cashOut = parseInt(cashOutInput.value) || 0;
        const chipsOut = totalChips - Math.floor(cashOut / activeBetValue);

        chipsOutInput.value = chipsOut >= 0 ? chipsOut : 0;
    };

    totalChipsInput.addEventListener('input', calculateChipsOut);
    cashOutInput.addEventListener('input', calculateChipsOut);

    // Update the last two cells in the cash-chip payout row
    updateDialogButton.addEventListener('click', () => {
        const cashChipPayoutRow = document.querySelector('.cash-chip-payout');
        const chipCell = cashChipPayoutRow.querySelector('.chip-payout');
        const cashCell = cashChipPayoutRow.querySelector('.cash-payout');

        chipCell.textContent = chipsOutInput.value;
        cashCell.textContent = cashOutInput.value;

        cashChipPayoutDialog.close();
    });

    // Close the dialog
    closeDialogButton.addEventListener('click', () => {
        cashChipPayoutDialog.close();
    });
});
