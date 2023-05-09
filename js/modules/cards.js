import { getResource } from "../services/services";

function cards () {
    
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

	

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); 

	
	//Використання бібліотеки axios

	/* axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); */


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


	
	
}

export default cards;