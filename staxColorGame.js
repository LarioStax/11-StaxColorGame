var numBoxes = 6;
var colors = [];
var pickedColor;
var blinker = null;
var pointer = null;
var RGBProcent = [];

var boxesDisplay = document.querySelectorAll(".box");
var h1Display = document.querySelector("h1");
var messageDisplay = document.querySelector("#message");
var resetButton = document.getElementById("reset");
var colorDisplay = document.getElementById("colorDisplay");
var difficultyDisplay = document.getElementsByClassName("difficulty");
var allButtons = document.querySelectorAll("button");
var menuBar = document.querySelector("#menuBar");
var rgbProcentDisplay = document.querySelectorAll(".rgbProcent");


initialise();

//sets everything up for the game
function initialise() {
	setupGameLogic();
	difficultyButtons();
	setupButtonHover();
	reset();
}

//resets the game upon click
resetButton.addEventListener("click", reset)

function setupGameLogic() {
	//go through all the boxes
	for(var i = 0; i<boxesDisplay.length; i++) {
		//add event listeners to boxes
		boxesDisplay[i].addEventListener("click", function() {
			//assign clicked boxes color to var clickedColor
			var clickedColor = this.style.backgroundColor;
			//if guessed correctly
			if (clickedColor === pickedColor) {
				//turn all boxes to correct color
				changeToColor(clickedColor);
				//turn h1 background to correct color
				h1Display.style.background = clickedColor;
				//match message text color to h1 background color;
				setupMessageTextColor();
				//match button message color to h1 background color;
				setupButtonColor();
				//Display the correct message
				messageDisplay.textContent = "Correct!"
				//change reset button text to play again
				resetButton.textContent = "Play Again?";
				//make play again blink;
				startBlinking();
				//stops pointer events (to prevent activating startBlinking multiple times!!)
				stopPointer();
			} //if not guessed correctly
			else {
				this.style.backgroundColor = "#0f000e";
				//Display the try again message
				messageDisplay.textContent = "Guess Again!"

			}
		});
	}
}

//sets the difficulty buttons
function difficultyButtons() {
	for(var i = 0; i < difficultyDisplay.length; i++) {
		difficultyDisplay[i].addEventListener("click", function() {
			removeClassSelected();
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numBoxes = 3;
			} else if (this.textContent === "Medium") {
				numBoxes = 6;
			} else if (this.textContent === "Hard") {
				numBoxes = 9;
			}
			reset();
		});
	}
}

//resets the game
function reset(){
	//new colors
	colors = generateRandomColors(numBoxes);
	//new picked color
	pickedColor = pickRandomColor();
	//display new picked color
	colorDisplay.textContent = pickedColor.substr(3,pickedColor.length);
	//display new picked color in procent
	displayRGBProcent();
	//display correct amount of boxes
	amountBoxes();
	//change colors of the boxes
	changeToColors(colors);
	//return h1 background to default
	h1Display.style.background = "#8f8f00";
	//sets reset button back to "new colors"
	resetButton.textContent = "New Colors";
	//remove message from message display
	messageDisplay.textContent = "";
	//setup message text color to match h1 background
	setupMessageTextColor();
	//setup button text color to match h1 background
	setupButtonColor();
	//stop blinking
	stopBlinking();
	//allow pointer events on divs again
	startPointer();
}

//function generates an array with num random colors
function generateRandomColors(num){
	var arr = [];
	for(var i=0; i<num;i++) {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		arr.push("rgb(" + r + ", " + g + ", " + b + ")");
	}
	return arr;
}

//function picks random color from the colors array!
function pickRandomColor(){
		return colors[Math.floor(Math.random() * colors.length)];
}

//function change all boxes to one given color
function changeToColor(color){
	for(var i=0; i<boxesDisplay.length; i++) {
		boxesDisplay[i].style.backgroundColor = color;
	}
}

//function change all boxes to different colors array
function changeToColors(colors){
	for(var i=0; i<boxesDisplay.length; i++) {
		boxesDisplay[i].style.backgroundColor = colors[i];
	}
}

//removes selected class from all the difficulty buttons
function removeClassSelected(){
	for(var i = 0; i < difficultyDisplay.length; i++) {
		difficultyDisplay[i].classList.remove("selected");
	}
};

//displays only as many boxes as there are colors
function amountBoxes() {
	for (var i=0; i<boxesDisplay.length; i++) {
		if (colors[i]) {
			boxesDisplay[i].style.display = "block";
		} else {
			boxesDisplay[i].style.display = "none";
		}
	}
};


//button background color matches h1 background color and text goes to white
function setupButtonHover() {
	for(var i = 0; i<allButtons.length; i++) {
		allButtons[i].addEventListener("mouseover", function(){
			this.style.backgroundColor = h1Display.style.backgroundColor;
			this.style.color = "white";
		});

		allButtons[i].addEventListener("mouseout", function(){
			this.style.background = "none";
			setupButtonColor();
		});
	}
};

//button text color matches h1 background color
function setupButtonColor() {
	for(var i = 0; i<allButtons.length; i++) {
		allButtons[i].style.color = h1Display.style.backgroundColor;
	}
};	

//message text color matches h1 background color
function setupMessageTextColor() {
	menuBar.style.color = h1Display.style.backgroundColor;
};

//function to make "play again" blinking
function blinking() {
	resetButton.style.color = resetButton.style.color == "white" ? h1Display.style.backgroundColor : "white";
}

//start blinking
function startBlinking() {
	blinker = setInterval(blinking, 500);
}

//stop blinking
function stopBlinking() {
	clearInterval(blinker);
}

function stopPointer() {
	for (var i = 0; i<boxesDisplay.length; i++) {
		boxesDisplay[i].style.pointerEvents = "none";
	}
}

//allow pointer events
function startPointer() {
	for (var i = 0; i<boxesDisplay.length; i++) {
		boxesDisplay[i].style.pointerEvents = "auto";
	}
};


function getRGBValues() {
	var rgb = pickedColor.substring(4, pickedColor.length-1).replace(/ /, "").split(",");
	return rgb;
}

function calculateRGBProcent() {
	var rgb = getRGBValues();
	RGBProcent = [];
	for(var i = 0; i<rgb.length;i++) {
		RGBProcent.push(Math.floor((rgb[i]/255)*100));
	}
}

function displayRGBProcent() {
	calculateRGBProcent();
	for(var i = 0; i<rgbProcentDisplay.length;i++) {
		rgbProcentDisplay[i].textContent = RGBProcent[i];
	}
}