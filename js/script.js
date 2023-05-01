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

	

	//закриття вікна при кліку на підкладку (оверлей) та на хрестик
	modal.addEventListener('click', (event) => {
		//if(event.target && event.target.classList.contains('modal'))
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
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
	const modalTimerId = setTimeout(openModalWindow, 50000);

	//вспливання модального вікна коли ми долистуємо сторінку до кінця
	/* function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModalWindow();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll); */


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
			//встановлює класс за замовчуванням 'menu__item', якщо його не вказано
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

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); 


		//динамічна картка товару без шаблонізації
		/* getResource('http://localhost:3000/menu')
			.then(data => createCard(data));

		function createCard(data) {
			data.forEach(({img, altimg, title, descr, price}) => {
				const element = document.createElement('div');

				element.classList.add('menu__item');

				element.innerHTML = `
					<img src=${img} alt=${altimg}>
					<h3 class="menu__item-subtitle">${title}</h3>
					<div class="menu__item-descr">${descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${price * 38}</span> грн/день</div>
					</div>
				`;

				document.querySelector('.menu .container').append(element);
			});
		} */



		
	/* new MenuCard(
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
	).render(); */


	
	




	//Відправка даних з форми
	
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Дякуємо! Невдовзі ми з Вами зв\'яжемося',
		failure: 'Щось пішло не так...'
	};

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			/* form.append(statusMessage); */
			form.insertAdjacentElement('afterend', statusMessage);

			
			
			//enctype="multipart/form-data";

			const formData = new FormData(form);

			/* const object = {};
			formData.forEach(function(value, key) {
				object[key] = value;
			}); */

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			
			/* fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(object)
			}) */
			postData('http://localhost:3000/requests', json)
			/* .then(data => data.text()) */
			.then(data => {
				console.log(data);
				showThanksModal(message.success);				
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() => {				
				form.reset();
			});

			/* request.send(json); */

			/* request.send(formData); */

			/* request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset();				
					statusMessage.remove();
				} else {
					showThanksModal(message.failure);
				}
			}); */
		});
	}

	forms.forEach(item => {
		bindPostData(item);
	});




	//Красиве оповіщення користувача

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModalWindow();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModalWindow();
		}, 4000);
	}



	//Робота з json-server
	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));

});

