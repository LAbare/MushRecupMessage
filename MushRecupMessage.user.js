// ==UserScript==
// @name     MushRecupMessage
// @version  0.2
// @match    http://mush.vg/*
// @match    http://mush.vg/#
// @match    http://mush.twinoid.com/*
// @match    http://mush.twinoid.com/#
// @match    http://mush.twinoid.es/*
// @match    http://mush.twinoid.es/#
// @grant    unsafeWindow
// ==/UserScript==

var console = unsafeWindow.console;
var localStorage = unsafeWindow.localStorage;

function saveMessage(el) {
	if (localStorage['RM-lastMessage']) {
		localStorage['RM-penultimateMessage'] = localStorage['RM-lastMessage'];
	}
	else {
		localStorage['RM-penultimateMessage'] = el.value;
	}
	localStorage['RM-lastMessage'] = el.value;
}

function detectInput() {
	var textareas = document.querySelectorAll('#chat_col textarea:not(.RM-scripted)');
	for (var i = 0; i < textareas.length; i++) {
		textareas[i].className = textareas[i].className + ' RM-scripted';
		textareas[i].addEventListener('input', function() { saveMessage(this); });
	}
}

setInterval(function() {
	if (!document.getElementById('RM_test')) { //If the page has been updated
		var chatBlock = document.getElementById('chatBlock');
		var test = document.createElement('div');
		test.id = 'RM_test';
		detectInput();
		chatBlock.appendChild(test);
		chatBlock.addEventListener('scroll', function() {
			if (unsafeWindow.Main.lmwProcessing) {
				var chatloading = window.setInterval(function() {
					if (!unsafeWindow.Main.lmwProcessing) { //Detect end of loading
						clearInterval(chatloading);
						detectInput();
					}
				}, 100);
				return true;
			}
		});
	}
}, 500);

var button = document.createElement('div');
button.innerHTML = '<div class="butright"><div class="butbg">Message perdu !</div></div>';
button.className = 'but';
button.style.marginTop = '20px';
button.addEventListener('click', function() {
	var popup = document.createElement('div');
	popup.id = 'RM-popup';
	popup.style.backgroundColor = 'blue';
	popup.style.position = 'absolute';
	popup.style.width = '400px';
	popup.style.left = Math.floor((window.innerWidth - 400) / 2) + 'px';
	popup.style.top = (window.scrollY + 50) + 'px';
	popup.style.padding = '10px';
	popup.style.boxShadow = '#000 5px 5px 10px';
	popup.style.border = '2px #000440 solid';
	popup.style.borderRadius = '5px';
	popup.style.backgroundColor = '#338';
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
	message.style.width = '100%';
	message.style.color = 'black';
	popup.appendChild(message);
});
document.getElementById('chat_col').appendChild(button);
