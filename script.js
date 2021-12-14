leftposition = 0;
topposition = 0;

function setpuggle () {
  puggle = JSON.parse(this.responseText).message;
  environment = document.getElementById('environment')
  environment.setAttribute("src",puggle);
}

getpuggle = function() {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", setpuggle);
	oReq.open("GET", "https://dog.ceo/api/breed/pug/images/random");
	oReq.send();
}


character = function() { 
	const newDiv = document.createElement("div");
	newDiv.className = 'protaganist';
	newDiv.id = 'bob';
	document.body.appendChild(newDiv);
}

movement = function(direction,character) {
	speed = 124;
	if(direction == 'L') { 
		if(leftposition > 0) { 
			leftposition += 0-speed 
		}
	}
	if(direction == 'R') { 
		leftposition += speed
	}
	if(direction == 'U') { 
		if(topposition > 0) { 
			topposition += 0-speed 
		}
	}
	if(direction == 'D') { 
		topposition += speed
	}
	character.style.left = leftposition + "px";
	character.style.top = topposition + "px";
}

snap = function(type,character) {
	console.log(type);
	if(type == 'Space') {
		getpuggle();
		character.style.boxShadow = "0 0 124px yellow";
		setTimeout(function() {character.style.boxShadow = "0 0 0px blue"},100);
	}
		
}

function logkey(e) {
  c = document.getElementById('bob');
  if(e.code.substr(0,5) == 'Arrow') {
	movement(e.code.substr(5,1),c);
  } 
  else {
	snap(e.code,c);
  }
}

character();
document.addEventListener('keydown', logkey);
getpuggle();
