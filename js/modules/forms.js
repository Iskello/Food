
import {closeModalWindow, openModalWindow} from "./modal";
import { postData } from "../services/services";

function forms (formSelector, modalTimerId) {
    

	//Відправка даних з форми
	
	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Дякуємо! Невдовзі ми з Вами зв\'яжемося',
		failure: 'Щось пішло не так...'
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
		openModalWindow('.modal', modalTimerId);

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
			closeModalWindow('.modal');
		}, 4000);
	}



	//Робота з json-server
	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));




}

export default forms;