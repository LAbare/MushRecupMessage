// ==UserScript==
// @name     MushRecupMessage
// @version  0.1
// @match    http://mush.vg/*
// @match    http://mush.vg/#
// @match    http://mush.twinoid.com/*
// @match    http://mush.twinoid.com/#
// @match    http://mush.twinoid.es/*
// @match    http://mush.twinoid.es/#
// @grant    unsafeWindow
// ==/UserScript==

try{

var console = unsafeWindow.console;
var localStorage = unsafeWindow.localStorage;

function saveMessage(el) {
	localStorage['RM-penultimateMessage'] = localStorage['RM-lastMessage'];
	localStorage['RM-lastMessage'] = el.value;
}

console.log('1');

setInterval(function() {
	try{
	if (!document.getElementById('RM_test')) { //If the page has been updated
		var chatBlock = document.getElementById('chatBlock');
		var test = document.createElement('div');
		test.id = 'RM_test';
		chatBlock.appendChild(test);
		chatBlock.addEventListener('scroll', function() {
			if (unsafeWindow.Main.lmwProcessing) {
				var chatloading = window.setInterval(function() {
					if (!unsafeWindow.Main.lmwProcessing) { //Detect end of loading
						clearInterval(chatloading);
						var textareas = document.querySelectorAll('#chat_col textarea');
						for (var i = 0; i < textareas.length; i++) {
							textareas[i].addEventListener('input', saveMessage);
						}
					}
				}, 100);
				return true;
			}
		});
	}
	}catch(e){console.log(e);}
}, 500);

console.log('2');

var button = document.createElement('div');
button.innerHTML = '<div class="butright"><div class="butbg">Message perdu !</div></div>';
button.className = 'but';
button.style.marginTop = '20px';
button.addEventListener('click', function() {
	try{
	var popup = document.createElement('div');
	popup.id = 'RM-popup';
	popup.style.backgroundColor = 'blue';
	popup.style.position = 'absolute';
	popup.style.width = '400px';
	popup.style.left = Math.floor((window.innerWidth - 400) / 2) + 'px';
	popup.style.top = (window.scrollY + 50) + 'px';
	document.body.appendChild(popup);
	var close = document.createElement('div');
	close.className = 'but';
	close.innerHTML = '<div class="butright"><div class="butbg">X</div></div>';
	close.style.position = 'absolute';
	close.style.right = '5px';
	close.style.top = '5px';
	close.addEventListener('click', function() {
		document.body.removeChild(document.getElementById('RM-popup'));
	});
	popup.appendChild(close);
	var message = document.createElement('textarea');
	message.value = localStorage['RM-penultimateMessage'];
	popup.appendChild(message);
	}catch(e){console.log(e);}
});
document.getElementById('chat_col').appendChild(button);

console.log('3');

}catch(e){console.log(e);}
