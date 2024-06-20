var feedbackDiv = $('#feedback');

var feedbackControl = {
	answer: function (isCorrect) {
		console.log(feedbackDiv);
		if (isCorrect) {
			feedbackDiv.append('<span class="feedback-icon checkmark">&#10004;</span>');
		} else {
			feedbackDiv.append('<span class="feedback-icon x-mark">&#10006;</span>');
		}
	},

	clear: function () {
		feedbackDiv.empty();
	}
};


var bets = [];
var pictureBetsDictionary = {
	"Blackjack": { "bets": { "Lines": 2, "Streets": 1 } },
	"Bowl": { "bets": { "Corners": 2, "Splits": 3 } },
	"Box": { "bets": { "Corners": 1, "Splits": 2, "Straight-Ups": 1 } },
	"Corner Pocket": { "bets": { "Corners": 1, "Straight-Ups": 1 } },
	"Deck of Cards": { "bets": { "Splits": 1, "Straight-Ups": 1 } },
	"Full House": { "bets": { "Corners": 4, "Splits": 4, "Straight-Ups": 1 } },
	"H Pattern": { "bets": { "Corners": 4, "Splits": 2, "Straight-Ups": 1 } },
	"Inside L": { "bets": { "Corners": 1, "Splits": 1, "Straight-Ups": 1 } },
	"Jesus Age": { "bets": { "Corners": 2, "Splits": 1 } },
	"Lovers": { "bets": { "Splits": 2, "Straight-Ups": 1 } },
	"Outside L": { "bets": { "Corners": 1, "Splits": 2 } },
	"Picture Frame": { "bets": { "Corners": 4, "Splits": 4 } },
	"Plus Pattern": { "bets": { "Splits": 4, "Straight-Ups": 1 } },
	"Railroad": { "bets": { "Corners": 2, "Splits": 3, "Straight-Ups": 1 } },
	"Straight In": { "bets": { "Corners": 1, "Splits": 1 } },
	"T Pattern": { "bets": { "Splits": 3, "Straight-Ups": 1 } },
	"V Pattern": { "bets": { "Corners": 2, "Straight-Ups": 1 } },
	"X Pattern": { "bets": { "Corners": 4, "Straight-Ups": 1 } },
};


$(document).ready(function () {
	var game = null;
	$('#PictureBetsCheatSheet').hide();
	$('#results').hide();
	$('#list-picture-names').css('visibility', 'hidden');

	$('#Show-PictureBetsCheatSheet').click(function () {
		$('#PictureBetsCheatSheet').show();
	});

	$('#Hide-PictureBetsCheatSheet').click(function () {
		$('#PictureBetsCheatSheet').hide();
	});

	$('#close-results-button').click(function () {
		$('#settings').show();
		$('#results').hide();
	});

	$('#open-settings').click(function () {
		$('#settings').show();
	});

	$('#results-button').click(function () {
		$('#results').show();
		game.end();
	});

	$('#list-bet-type').change(function () {
		if ($(this).val() === 'regular-bets')
			$('#list-picture-names').css('visibility', 'hidden');
		else
			$('#list-picture-names').css('visibility', 'visible');
	});

	$('#start-button').click(function () {
		game = new Game();
		game.start();
		$('#settings').hide();
		$('#payout').focus();
	});

	$('#next-button').click(function () {
		game.next();
	});

});

function Game() {
	var bets = null;
	var chips = new Chips();
	var intervalID = 0;
	var _seconds = 0;
	var questionStartTime = 0;
	var questionCount = 0;
	var questionTotalCount = 0;
	var isPictureBet = false;
	var isStarted = false;
	var that = this;

	that.start = function () {
		feedbackControl.clear();
		$('#answers li').remove();
		questionTotalCount = $('#number-of-questions').val();
		questionCount = questionTotalCount;

		if (intervalID > 0)
			window.clearInterval(intervalID);

		intervalID = window.setInterval(function () {
			_seconds++;
			that.updateStatusBar();
		}, 1000);

		if ($('#list-bet-type').val() === 'regular-bets')
			bets = new RegularBets(chips);
		else {
			isPictureBet = true;
			bets = new PictureBets(chips);
		}
		that.next();
	};

	that.next = function () {
		if (!isStarted) {
			isStarted = true;
			bets.next();
			return;
		}

		$('#payout').focus();
		that.addOption();

		questionCount--;
		if (questionCount == 0) {
			this.end();
			return;
		}

		questionStartTime = _seconds;
		bets.next();
	};

	that.end = function () {
		$('#results').show();
		window.clearInterval(intervalID);
	};

	that.formatTime = function (timeValue) {
		var seconds = ((timeValue % 60) < 10) ? '0' + timeValue % 60 : timeValue % 60;
		var minutes = (((timeValue - seconds) / 60) == 0) ? '0' : (timeValue - seconds) / 60;
		return minutes + ':' + seconds;
	};

	that.addOption = function () {
		var answer = $('#payout').val() * 1;
		var payout = chips.getPayOut();
		var description = chips.getDescription();
		var name = bets.name;
		var questionTime = that.formatTime(_seconds - questionStartTime);
		var className = '';
		var answerDescription = 'Payout: ' + payout;
		feedbackControl.answer(answer === payout);
		if (payout != answer) {
			className = 'incorrect-answer';
			answerDescription += ' Answer: ' + answer;
		}

		if (isPictureBet) {

			if ('Picture Bet: ' + $('#list-picture-names').val() != name) {
				className = 'incorrect-answer';
				answerDescription += ' ' + $('#list-picture-names').val();
			}

			$('#list-picture-names').get(0).selectedIndex = 0;
		}

		var li = '<li>';
		li += '<details class="' + className + '">';
		li += '<summary>' + name + ' ' + questionTime + ' ' + answerDescription + '</summary>';
		li += '<p>' + description + '</p>';
		li += '</details>';
		li += '</li>';
		$('#answers').append(li);
	};

	that.updateStatusBar = function () {
		var description = 'Question ' + (parseInt(questionTotalCount) + 1 - parseInt(questionCount)) + '/' + questionTotalCount + ' ' + that.formatTime(_seconds);
		$('#statusbar').val(description);
		$('#resultsH1').html(description);
	};
}

function Chips() {
	var that = this;
	that.description = null;
	that.odds = { "Lines": 5, "Streets": 11, "Corners": 8, "Splits": 17, "Straight-Ups": 35 };

	that.distributeBets = function (betName, value, isPictureBet) {
		var items = [];

		$(".chip[data-chip='" + betName + "']").each(function () {
			items.push(this);
		});

		(function add1() {
			var index = Math.floor(Math.random() * items.length);
			var randomItem = items[index];
			var chip_value = ($(randomItem).text() * 1) + 1;

			$(randomItem).text(chip_value);

			if (isPictureBet)
				items.splice(index, 1);

			value--;
			if (value > 0)
				add1();

		})();

	};

	that.clear = function () {
		$('.chip').each(function () {
			$(this).text('');
		});
	};

	that.display = function () {
		$('.chip').each(function () {
			if ($(this).is(':empty'))
				$(this).parent().hide();
			else
				$(this).parent().show();
		});
	};

	that.getDescription = function () {
		var description = '';
		for (key in that.odds) {
			var value = that.getChipCount(key);
			if (value > 0) {
				if (description !== '')
					description += ' and ';
				description += '(' + value + ')' + key + ' ';
			}
		}
		return 'What does ' + description + 'pay?';
	};

	that.getChipCount = function (betName) {
		var value = 0;
		$(".chip[data-chip='" + betName + "']").each(function () {
			value += ($(this).text() * 1);
		});
		return value;
	};

	that.getPayOut = function () {
		var payout = 0;
		$('.chip').each(function () {
			var betName = $(this).attr('data-chip');
			payout += ($(this).text() * 1) * that.odds[betName];
		});
		return payout;
	};
}

function PictureBets(chips) {
	var that = this;
	that.name = null;
	that.items = [];

	that.add = function (key) {
		that.items.push(key);
	};

	that.getRandom = function () {
		return that.items[Math.floor(Math.random() * that.items.length)];
	};

	that.next = function () {
		chips.clear();
		$('#payout').val('');
		var itemRandom = that.getRandom();
		var picture = pictureBetsDictionary[itemRandom];
		that.name = 'Picture Bet: ' + itemRandom;
		for (key in picture.bets)
			chips.distributeBets(key, picture.bets[key], true);
		chips.display();
	};

	$("input[name='picture-bets']:checked").each(function () {
		that.add($(this).val());
	});
}

function RegularBets(chips) {
	var that = this;
	that.items = [];
	that.name = 'Regular Bets:';
	that.add = function (key) {
		that.items.push(key);
	};

	that.next = function () {
		chips.clear();
		$('#payout').val('');
		that.description = "What does ";
		for (var i = 0; i < that.items.length; i++) {
			var valueRandom = Math.floor(Math.random() * that.items[i].max);
			chips.distributeBets(that.items[i].name, valueRandom, false);
		}
		chips.display();
	};

	$("#RegularBets input").each(function () {
		if ($(this).val() > 0)
			that.add({ "name": $(this).attr('id'), "max": $(this).val() });
	});
}