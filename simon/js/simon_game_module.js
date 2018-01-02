var simon = (function() {

	// cache DOM
	var arrayOvals = ["#1", "#2", "#3", "#4"]; // vars of ovals, we can have more ovals than 4
	var $buttonElement = $(".button"); // button starting the game
	var $ovalClass = $(".oval"); // class of ovals
	var $divPop = $(".div_pop") // div pop class
	var $text = $(".result"); // changing text in popup
	var $resultSpan = $(".resultspan");

	// app variables
	var clickCounter = 0;
	var mainArray = []; // this is where we store our data which was chosen by random choice
	var userClicks = []; // this is where we store our data which was clicked

	// events
	$ovalClass.on("click", playStuff); // when user click on an oval
	$buttonElement.on('click', startTheGame); // starting game

	// animate
	function gsapAnimation (selector) {
		var ovalAnimate = $(selector);
		TweenMax.to(ovalAnimate, 0.5,{scale:1.2,backgroundColor: "#23a7ff", repeat: 1, yoyo:true, ease: Power3.easeInOut});
	}

	// function returns position of random element of arrayOvals
	function randomPick () {
		var ovalsVolumeNumb = 1 / (arrayOvals.length);
		var pickRandom = Math.random();
		var counter = 0;
		var valNumb = ovalsVolumeNumb;

		while(valNumb <= pickRandom) {
			valNumb += ovalsVolumeNumb;
			counter++;
		}

		mainArray.push(arrayOvals[counter]);
	}

	// reset the game
	function resetGame() {
		mainArray = [];
		userClicks = [];
		clickCounter = 0;
	}

	function retry() {
		resetGame();
		startPop();
	}

	// how loosing pop look like
	function losePop() {
		$divPop.addClass("enabled_pop");
		$text.text("You lost! Try again. Your result was: " + (mainArray.length-1));
		$buttonElement.text("Try Again");
	}

	// how storting pop look like
	function startPop() {
		$divPop.addClass("enabled_pop");
		$text.text("Click red button to start a game");
		$buttonElement.text("Start");
	}

	//checking if user click is correct
	function checkCorrectness() {
		if(mainArray[clickCounter] !== userClicks[clickCounter]) {
			losePop();
			resetGame();
		} else {
			if(mainArray.length === userClicks.length) {
				userClicks = [];
				clickCounter = 0;
				resultUpdate();
				newTurn();
			} else {
				clickCounter++;
			}
		}
	}

	// update the result
	function resultUpdate() {
		$resultSpan.text(mainArray.length);
	}

	// play whole animation and add one on the end
	function newTurn() {
		randomPick();
		animationArrayPlay();
	}

	// play animation on click and check corectness
	function playStuff() {
		gsapAnimation(this);
		userClicks.push("#"+this.id);
		checkCorrectness();
	}

	// play whole animation
	function animationArrayPlay() {
		var i = 0;
		var playanimation = setInterval(function() {
			if(i <= mainArray.length) {
				gsapAnimation(mainArray[i]);
				i++;
			} else {
				i = 0;
				clearInterval(playanimation);
			}
		}, 1000);
	}

	// starting the game
	function startTheGame() {
		$divPop.removeClass("enabled_pop");
		resultUpdate();
		randomPick();
		animationArrayPlay();
	};

	return {
		start: startTheGame,
		retry: retry
	}
	
})();