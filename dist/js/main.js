//FORMS
function forms(){
	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});
}
forms();

function digi(str){
	var r=str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
		var er=0;
		var form=$(this).parents('form');
		var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
		var er=0;
		var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
				er++;
			addError(input);
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
		return er;
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
}
function addErrorByName(form,input__name,error_text){
		var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form){
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n){
	if(n.val()==""){
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}

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


//Adaptive functions

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = "max"; //Для MobileFirst поменять на min

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

var link = document.querySelectorAll('._goto-block');

if (link) {
	var blocks = [];

	var _loop7 = function _loop7(_index28) {
		var el = link[_index28];
		var block_name = el.getAttribute('href').replace('#', '');

		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}

		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu-body._active')) {
				menu_close();
				body_lock_remove(500);
			}

			var target_block_class = el.getAttribute('href').replace('#', '');
			var target_block = document.querySelector('.' + target_block_class);

			_goto(target_block, 300);

			e.preventDefault();
		});
	};

	for (var _index28 = 0; _index28 < link.length; _index28++) {
		_loop7(_index28);
	}

	window.addEventListener('scroll', function (el) {
		var old_current_link = document.querySelectorAll('._goto-block._active');

		if (old_current_link) {
			for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
				var _el13 = old_current_link[_index29];

				_el13.classList.remove('_active');
			}
		}

		for (var _index30 = 0; _index30 < blocks.length; _index30++) {
			var block = blocks[_index30];
			var block_item = document.querySelector('.' + block);

			if (block_item) {
				var block_offset = offset(block_item).top;
				var block_height = block_item.offsetHeight;

				if (pageYOffset > block_offset - window.innerHeight / 3 && pageYOffset < block_offset + block_height - window.innerHeight / 3) {
					var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');

					for (var _index31 = 0; _index31 < current_links.length; _index31++) {
						var current_link = current_links[_index31];
						current_link.classList.add('_active');
					}
				}
			}
		}
	});
} //ScrollOnClick (Simple)


var goto_links = document.querySelectorAll('._goto');

if (goto_links) {
	var _loop8 = function _loop8(_index32) {
		var goto_link = goto_links[_index32];
		goto_link.addEventListener('click', function (e) {
			var target_block_class = goto_link.getAttribute('href').replace('#', '');
			var target_block = document.querySelector('.' + target_block_class);

			_goto(target_block, 300);

			e.preventDefault();
		});
	};

	for (var _index32 = 0; _index32 < goto_links.length; _index32++) {
		_loop8(_index32);
	}
}

function _goto(target_block, speed) {
	var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var header = ''; //OffsetHeader

	header = 'header';
	var options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset
	};
	var scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
} //SameFunctions


function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, {
		passive: false
	}); // Disable scrolling in Chrome

	window.onwheel = preventDefault; // modern standard

	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE

	window.ontouchmove = preventDefault; // mobile

	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, {
		passive: false
	}); // Enable scrolling in Chrome

	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		  preventDefault(e);
		  return false;
	}*/
}
$('.main-slider__body').slick({
	lazyLoad: 'ondemand',
	dots: false,
	arrows: true,
	infinite: true,
	speed: 600,
	prevArrow: '.control-main-slider__arrow_prev',
	nextArrow: '.control-main-slider__arrow_next',
	slidesToShow: 1,
    slidesToScroll: 1
  });

  $('.slider-lots__body').slick({
	lazyLoad: 'ondemand',
	dots: false,
	arrows: true,
	infinite: true,
	speed: 600,
	prevArrow: '.control-slider-lots__arrow_prev',
	nextArrow: '.control-slider-lots__arrow_next',
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
		  breakpoint: 768,
		  settings: {
			slidesToShow: 2,
		  }
		},
		{
		  breakpoint: 485,
		  settings: {
			slidesToShow: 1,
		  }
		}
	  ]
  });

  $('.slider-quotes__body').slick({
	lazyLoad: 'ondemand',
	dots: false,
	arrows: true,
	infinite: true,
	speed: 600,
	nextArrow: '.control-slider-quotes__circle',
	prevArrow: '',
	slidesToShow: 1,
	slidesToScroll: 1,
	fade: true,
	adaptiveHeight: true
  });


  