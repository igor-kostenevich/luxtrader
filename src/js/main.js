var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
if (isMobile.any()) {}

function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}

if (isIE()) {
	document.querySelector('body').classList.add('ie');
}

function ibg() {
	if (isIE()) {
		var ibg = document.querySelectorAll(".ibg");

		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}

ibg();


if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({
			scrollTop: $('div.' + hsh).offset().top,
		}, 500, function () {});
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

//================= MENU

// let iconMenu = document.querySelector(".icon-menu");
// let body = document.querySelector("body");
// let menuBody = document.querySelector(".menu-body");
// if (iconMenu) {
// 	iconMenu.addEventListener("click", (e) => {
// 		iconMenu.classList.toggle("active");
// 		body.classList.toggle("lock");
// 		menuBody.classList.toggle("active");
// 	});
// }


var iconMenu = document.querySelector(".icon-menu");

if (iconMenu != null) {
	var delay = 500;
	var body = document.querySelector("body");
	var menuBody = document.querySelector(".menu-body");
	iconMenu.addEventListener("click", function (e) {
		if (!body.classList.contains('_wait')) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
}

;

function menu_close() {
	var iconMenu = document.querySelector(".icon-menu");
	var menuBody = document.querySelector(".menu-body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
} //=================
//BodyLock


function body_lock(delay) {
	var body = document.querySelector("body");

	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	var body = document.querySelector("body");

	if (!body.classList.contains('_wait')) {
		var lock_padding = document.querySelectorAll("._lp");
		setTimeout(function () {
			for (var index = 0; index < lock_padding.length; index++) {
				var el = lock_padding[index];
				el.style.paddingRight = '0px';
			}

			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);
		body.classList.add("_wait");
		setTimeout(function () {
			body.classList.remove("_wait");
		}, delay);
	}
}

function body_lock_add(delay) {
	var body = document.querySelector("body");

	if (!body.classList.contains('_wait')) {
		var lock_padding = document.querySelectorAll("._lp");

		for (var index = 0; index < lock_padding.length; index++) {
			var el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}

		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");
		body.classList.add("_wait");
		setTimeout(function () {
			body.classList.remove("_wait");
		}, delay);
	}
} //=================

//================


//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
});

let user_icon = document.querySelector('.user-header__icon');
user_icon.addEventListener('click', function() {
	let user_menu = document.querySelector('.user-header__menu');
	user_menu.classList.toggle('active');
});


document.documentElement.addEventListener("click", function(e) {
	if (!e.target.closest('.user-header')){
		let userHeader = document.querySelector(".user-header__menu");
		userHeader.classList.remove('active');
	}
});

