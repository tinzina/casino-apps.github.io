const standardBets = [1, 5, 10, 15, 20, 25, 50, 75, 100];

export const StandardPropKeys = {
    "Two": `<ul class="ddList"><li>3 x Bet Add a Zero</li></ul>`,
    "Ace Deuce": `<ul class="ddList"><li>Blackjack x Bet Add a Zero</li></ul>`,
    "Eleven": `<ul class="ddList"><li>Blackjack x Bet Add a Zero</li></ul>`,
    "Twelve": `<ul class="ddList"><li>3 x Bet Add a Zero</li></ul>`,
    "Horn": `<ul class="ddList"><li>Low Side: 3 x Bet</li><li>High Side: 7 x Bet - 1/4 Bet</li></ul>`,
    "Horn High Keys": `
            <p style="font-family:Arial; color:#333; font-size:14px;">
            <strong>Low Side:</strong> A rolled number pays 15 to 1. (3 or 11)
            </p>
            
            <p style="font-family:Arial; color:#333; font-size:14px;">
            <strong>High Side:</strong> A rolled number pays 30 to 1. (2 or 12)
            </p>
            
            <p style="font-family:Arial; color:#333; font-size:14px;">
            <strong>Direct Hit:</strong> The number with a high bet is rolled.
            </p>
            
            <p style="font-family:Arial; color:#333; font-size:14px;">
            <strong>Indirect Hit:</strong> The number with a low bet is rolled.
            </p>
    
            <ul class="ddList">
                <li>Low Side - Indirect Hit: 2 x Bet + 1 Unit</li>
                <li>High Side - Indirect Hit: 5 x Bet + 2 Unit</li>
                <li>Low Side - Direct Hit: 5 x Bet + 1 Unit</li>
                <li>High Side - Direct Hit: 11 x Bet + 2 Unit</li>
            </ul> `,
    "Horn High Aces": `
            <ul class="ddList">
                <li><span style="color:blue">⚀⚀</span> (High Side - Direct Hit): 11 x Bet + 2 Unit</li>
                <li><span style="color:red">⚀⚁</span> or <span style="color:red">⚅⚄</span> (Low Side - Indirect Hit): 5 x Bet + 2 Unit</li>
                <li><span style="color:red">⚅⚅</span> (Hide Side - Indirect Hit):  5 x Bet + 1 Unit</li>
            </ul>
                    `,
    "Horn High Ace Deuce": `
            <ul class="ddList">
                <li><span style="color:red">⚀⚀</span> or <span style="color:red">⚅⚅</span> (High Side - Indirect Hit): 5 x Bet + 2 Unit</li>
                <li><span style="color:blue">⚀⚁</span> (Low Side - Direct Hit): 11 x Bet + 2 Unit</li>
                <li><span style="color:red">⚅⚄</span> (Low Side - Indirect Hit): 2 x Bet + 1 Unit</li>
            </ul>`,
    "Horn High Yo": `
            <ul class="ddList">
                <li><span style="color:red">⚀⚀</span> or <span style="color:red">⚅⚅</span> (High Side - Indirect Hit): 5 x Bet + 2 Unit</li>
                <li><span style="color:red">⚀⚁</span> (Low Side - Indirect Hit): 2 x Bet + 1 Unit</li>
                <li><span style="color:blue">⚅⚄</span> (Low Side - Direct Hit): 11 x Bet + 2 Unit</li>
            </ul>`,
    "Horn High Twelve": `
            <ul class="ddList">
                <li><span style="color:red">⚀⚀</span> (Hide Side - Indirect Hit):  5 x Bet + 1 Unit</li>
                <li><span style="color:red">⚀⚁</span> or <span style="color:red">⚅⚄</span> (Low Side - Indirect Hit): 5 x Bet + 2 Unit</li>
                <li><span style="color:blue">⚅⚅</span> (High Side - Direct Hit): 11 x Bet + 2 Unit</li>
            </ul>`,
    "Three Way Craps": `<ul class="ddList"><li>Low Side: 5 x Bet - 2 Units (Losers).</li><li>Low Side: 4 x Bet + 1 Unit.</li><li>High Side: 10 x Bet - 2 Units (Losers).</li></ul>`,
    "High Low Yo": `<ul class="ddList"><li>Low Side: 5 x Bet - 2 Units (Losers).</li><li>Low Side: 4 x Bet + 1 Unit.</li><li>High Side: 10 x Bet - 2 Units (Losers).</li></ul>`,
    "High Low": `<ul class="ddList"><li>Blackjack x Bet Add a Zero - Losers</li></ul>`,
    "Eleven Twelve": `<ul class="ddList"><li>Low Side: 7 x Bet</li><li>High Side: Blackjack x Bet Add a Zero - Losers</li></ul>`,
    "Any Crap": `<ul class="ddList"><li>7 x Bet</li></ul>`,
    "Any Seven": `<ul class="ddList"><li>4 x Bet</li></ul>`
};
export const BetOptions = {
    "Two": {
        name: "Two",
        flatOdds: 0,
        numbers: [2],
        bets: [...standardBets],
        keys: StandardPropKeys["Two"]
    },
    "Deuce": {
        name: "Ace Deuce",
        flatOdds: 0,
        numbers: [3],
        bets: [...standardBets],
        keys: StandardPropKeys["Deuce"]
    },
    "Eleven": {
        name: "Eleven",
        flatOdds: 0,
        numbers: [11],
        bets: [...standardBets],
        keys: StandardPropKeys["Eleven"]
    },
    "Twelve": {
        name: "Twelve",
        flatOdds: 0,
        numbers: [12],
        bets: [...standardBets],
        keys: StandardPropKeys["Twelve"]
    },
    "Horn": {
        name: "Horn",
        flatOdds: 0,
        numbers: [2, 3, 11, 12],
        bets: [...standardBets, 4, 8, 12, 16],
        keys: StandardPropKeys["Horn"]
    },
    "Horn High Aces": {
        name: "Horn High Aces",
        flatOdds: 0,
        numbers: [2, 2, 3, 11, 12],
        bets: [...standardBets],
        keys: StandardPropKeys["Horn High Aces"]
    },
    "Horn High Ace Deuce": {
        name: "Horn High Ace Deuce",
        flatOdds: 0,
        numbers: [2, 3, 3, 11, 12],
        bets: [...standardBets],
        keys: StandardPropKeys["Horn High Ace Deuce"]
    },
    "Horn High Yo": {
        name: "Horn High Yo",
        flatOdds: 0,
        numbers: [2, 3, 11, 11, 12],
        bets: [...standardBets],
        keys: StandardPropKeys["Horn High Yo"]
    },
    "Horn High Twelve": {
        name: "Horn High Twelve",
        flatOdds: 0,
        numbers: [2, 3, 11, 12, 12],
        bets: [...standardBets],
        keys: StandardPropKeys["Horn High Twelve"]
    },
    "Three Way Craps": {
        name: "Three Way Craps",
        flatOdds: 0,
        numbers: [2, 3, 12],
        bets: [3, 6, 9, 15, 30, 45, 60, 75, 90, 150],
        keys: StandardPropKeys["Three Way Craps"]
    },
    "High Low Yo": {
        name: "High Low Yo",
        flatOdds: 0,
        numbers: [2, 11, 12],
        bets: [3, 6, 9, 15, 30, 45, 60, 75, 90, 150],
        keys: StandardPropKeys["High Low Yo"]
    },
    "High Low": {
        name: "High Low",
        flatOdds: 0,
        numbers: [2, 12],
        bets: [...standardBets],
        keys: StandardPropKeys["High Low"]
    },
    "Eleven Twelve": {
        name: "Eleven Twelve",
        flatOdds: 0,
        numbers: [11, 12],
        bets: [...standardBets],
        keys: StandardPropKeys["Eleven Twelve"]
    },
    "Any Crap": {
        name: "Any Crap",
        flatOdds: 7,
        numbers: [2, 3, 12],
        bets: [...standardBets],
        keys: StandardPropKeys["Any Crap"]
    },
    "Any Seven": {
        name: "Any Seven",
        flatOdds: 4,
        numbers: [7],
        bets: [...standardBets],
        keys: StandardPropKeys["Any Seven"]
    }
};

window.BetOptions = BetOptions;