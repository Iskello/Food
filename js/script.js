window.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});                
        
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
    
	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
        
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});






	//Timer

	const deadline = '2023-04-27';
    
	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / (1000 * 60)) % 60),
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
    
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector), 
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadline);





	// Modal

	const openModal = document.querySelectorAll('[data-modal]'),
		closeModal = document.querySelector('[data-close]'),
		modal = document.querySelector('.modal');

	/* openModal.forEach((element) => {
        element.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    }) */

    
	//загальна функція відкриття вікна
	function openModalWindow() {
		modal.classList.add('show', 'fade');
		modal.classList.remove('hide');
		//modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}


	//загальна функція закриття вікна
	function closeModalWindow() {
		modal.classList.add('hide');
		modal.classList.remove('show', 'fade');
		document.body.style.overflow = '';

		//якщо я захочу переключення через toggle
		//modal.classList.toggle('show');
		//document.body.style.overflow = '';
        
	}

	//відкриття вікна по кнопкам
	openModal.forEach(btn => {
		btn.addEventListener('click', openModalWindow);
	});

	//закриття вікна при кліку на хрестик
	closeModal.addEventListener('click', closeModalWindow);

	//закриття вікна при кліку на підкладку (оверлей)
	modal.addEventListener('click', (event) => {
		//if(event.target && event.target.classList.contains('modal'))
		if (event.target === modal) {
			closeModalWindow();
		}
	});

	//закриття вікна на Esc
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModalWindow();
		}
	});

	//вспливання модального вікна через деякий час
	/* const modalTimerId = setTimeout(openModalWindow, 10000); */

	//вспливання модального вікна коли ми долистуємо сторінку до кінця
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
			openModalWindow();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);


	//вспливання модального вікна через 1500px
	/* function handleScroll() {
        if (window.pageYOffset > 1500) {
            openModalWindow();
            window.removeEventListener('scroll', handleScroll);
        }
    }
    
    window.addEventListener('scroll', handleScroll); */

    
   




	//Використання класів для створення карток Меню

	const menuItem = document.querySelector('.menu__item');

	class MenuCard {
		constructor (src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 38;
			this.changeToUAH();
		}

		changeToUAH() {
			//this.price = (this.price * this.transfer).toFixed(2); - округлення до 2-х знаків після коми
			//this.price = Math.round(this.price * this.transfer); - округлення до цілого числа
			this.price = Math.round((this.price * this.transfer) / 10) * 10;
			// округлення до десяти
		}

		render() {
			const element = document.createElement('div');
			if(this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			
			this.classes.forEach(className => element.classList.add(className));
			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
            `;
			this.parent.append(element);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		6.1,
		'.menu .container',
		//'menu__item'
	).render();

	new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14.3,
		'.menu .container',
		'menu__item'       
	).render();

	new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
		11.5,
		'.menu .container',
		'menu__item'       
	).render();




});

