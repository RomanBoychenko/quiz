var answers = {
	2: null,
	3: null,
	4: null,
	5: null,
};

var btnNext = document.querySelectorAll('[data-nav="next"]');

btnNext.forEach(function(button){

	button.addEventListener('click', goNext);

	function goNext() {
		var thisCard = this.closest('[data-card]')
		var thisCardNumber = parseInt(thisCard.dataset.card);

		if (thisCard.dataset.validate == "novalidate") {
			navigate('next', thisCard);
			progress('next', thisCardNumber);

		} else {

			saveAnswers(thisCardNumber, getAnswer(thisCardNumber));

			if (checkAnswerFilled(thisCardNumber) && requiredFields(thisCardNumber)) {
				navigate('next', thisCard);
				progress('next', thisCardNumber);
			} else {
				alert("Заполните данные")
			};
		};
	};
});

var btnPrev = document.querySelectorAll('[data-nav="prev"]')

btnPrev.forEach(function(button){

	button.addEventListener('click', goNext);

	function goNext() {
		var thisCard = this.closest('[data-card]')
		var thisCardNumber = parseInt(thisCard.dataset.card);


		navigate('prev', thisCard);
		progress("prev", thisCardNumber);

	};
});


function navigate(direction, thisCard) {
	var nextCardNumber;
	
		var thisCardNumber = parseInt(thisCard.dataset.card);

		if(direction == "next") {
			nextCardNumber = thisCardNumber + 1;
		} else {
			nextCardNumber = thisCardNumber - 1;
		}

		thisCard.classList.add('hidden');
		var nextCard = document.querySelector(`[data-card="${nextCardNumber}"]`).classList.remove('hidden');
};

function getAnswer(number) {
	var question;
	var result = [];

	var currentCard = document.querySelector(`[data-card="${number}"]`);
	
	question = currentCard.querySelector('[data-question]').innerText;
	
	// var radioInputValue = currentCard.querySelectorAll('[type="radio"]');
	// var checkboxValue = currentCard.querySelectorAll('[type="checkbox"]');
		var controls = currentCard.querySelectorAll('[type="radio"], [type="checkbox"]');

	var inputValues = currentCard.querySelectorAll('[type="text"], [type="email"], [type="number"]');

	

	if (controls) {

		controls.forEach(function(item) {

			if(item.checked) {
				result.push({
					name: item.name,
					value: item.value
				});
			};
		});
	};

	// if (controls) {

	// 	controls.forEach(function(item){

	// 		if (item.checked) {
	// 			result.push({
	// 				name: item.name,
	// 				value: item.value
	// 			});
	// 		};
	// 	});
	// };


	inputValues.forEach( function (item) {
		itemValue = item.value;
		if (itemValue.trim() != ""){
			result.push({
				name: item.placeholder,
				value: item.value
			});
		};
	});
	



	var cardInfo = {
		question: question,
		answer: result
	};

	return cardInfo;


};

function saveAnswers(number, cardInfo) {
	answers[number] = cardInfo;
};


function checkAnswerFilled(number) {
	
	// if (answers[number].answer.length > 0) {
	// 	return true;
	// } else {
	// 	return false;
	// };

	//  Функция isFilled. Можно сразу возвращать результат выражения, так как это всегда будет true/false.

	return answers[number].answer.length > 0;

};

// Ф-я для проверки email
function validateEmail(email) {
	var pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	return pattern.test(email);
}



function requiredFields(number) {

	var currentCard = document.querySelector(`[data-card="${number}"]`);

	var requireFirld = currentCard.querySelectorAll('[required]');

	var isValid = true;

	var fieldArray = [];


	requireFirld.forEach(function(item) {
		if ((item.type == "checkbox" && item.checked == false) || (item.type == "email" && !validateEmail(item.value))) {
			isValid = false;
		};
	});

	return isValid;

	// 	if (item.type == "checkbox" && item.checked == false) {
	// 			fieldArray.push(false)
	// 	} else if (item.type == "email" ) {
	// 		if (validateEmail(item.value)) {
	// 			fieldArray.push(true);
	// 		} else {
	// 			fieldArray.push(false);
	// 		}
	// 	};
	// });



	// if (fieldArray.indexOf(false) == -1) {
	// 	return true;
	// } else {
	// 	return false
	// };
};


var radioBlock = document.querySelectorAll('.radio-block');

radioBlock.forEach(function(btn){

	btn.classList.remove('radio-block--active')

	btn.addEventListener('click', function(e) {
		var activeBlock = e.target.closest('label');


		if (activeBlock) {
			activeBlock.closest(".radio-group").querySelectorAll("label").forEach(function(item){
				item.classList.remove("radio-block--active");
		});
	};
		activeBlock.classList.add('radio-block--active');
	});
});


var checkboxBlock = document.querySelectorAll('.checkbox-block');

	checkboxBlock.forEach(function(checkbox){
		checkbox.classList.remove('checkbox-block--active');

		checkbox.addEventListener('change', function(e) {

			var activeBlock = e.target.closest('label');
			var activeCheckbox = activeBlock.querySelector('[type="checkbox"]')

			if (activeCheckbox.checked) {
				activeBlock.classList.add('checkbox-block--active')
			} else {
				activeBlock.classList.remove('checkbox-block--active')
			};
		});
});


function progress(direction, cardNumber) {
	var allCardsNumber = document.querySelectorAll('[data-card]').length;

	if (direction == "next") {
		cardNumber = cardNumber + 1;
	} else if (direction == "prev") {
		cardNumber = cardNumber - 1;
	};

	var progress = ((cardNumber * 100) / allCardsNumber).toFixed();

		var progressBar = document.querySelector(`[data-card="${cardNumber}"]`).querySelector(".progress");

		if (progressBar) {
			progressBar.querySelector(".progress__label strong").innerText = `${progress}%`;
			progressBar.querySelector('.progress__line-bar').style = `width: ${progress}%`
		}
};