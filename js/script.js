require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModalWindow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	//вспливання модального вікна через деякий час
    const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId), 300000);	

		tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
		timer('.timer', '2023-05-10');
		modal('[data-modal]', '.modal', modalTimerId);
		cards();
		forms('form', modalTimerId);
		slider({
			container: '.offer__slider',
			prevArrow: '.offer__slider-prev',
			nextArrow: '.offer__slider-next',
			slide: '.offer__slide',
			totalCounter: '#total',
			currentCounter: '#current',
			wrapper: '.offer__slider-wrapper',
			field: '.offer__slider-inner'
		});
		calc();	

	
	






	// Додаткові уроки
	class User {
	constructor (name, age) {
		this.name = name;
		this._age = age;
	}
	
	#surname = 'Petrovich';

		say () {
			console.log(`Ім\'я користувача: ${this.name} ${this.#surname}, вік: ${this._age}`);
		}

		get age() {
			return this._age;
		}

		set age(age) {
			if (typeof age === 'number' && age > 0 && age < 110) {
				this._age = age;
			} else {
				console.log('Некоректне значення');
			}
		}

		get surname () {
			return this.#surname;
		}

		set surname(surname) {
			this.#surname = surname;
		}


	}

	const ivan = new User('Ivan', 27);
	console.log(ivan._age);
	ivan._age = 99;
	console.log(ivan._age);
	console.log(ivan.surname);
	ivan.surname = 'Oleksandrovich';
	ivan.say();



});

