function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

	


	//Слайдер

	//власна побудова

	/* const slideContents = document.querySelectorAll('.offer__slide'),
			prevSlide = document.querySelector('.offer__slider-prev'),
			nextSlide = document.querySelector('.offer__slider-next'),
			currentSlide = document.querySelector('#current'),
			totalSlide = document.querySelector('#total');

	let currentIndex = 0;
	
	function hideSlides() {
		slideContents.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});		
	}

	function showSlide(i = 0) {
		if (i < 0) {
			currentIndex = slideContents.length - 1;
		} else if (i >= slideContents.length) {
			currentIndex = 0;
		} else {
			currentIndex = i;
		}
		hideSlides();
		slideContents[currentIndex].classList.add('show', 'fade');
		slideContents[currentIndex].classList.remove('hide');
	}

	function updateSlideCounter () {
		if (currentIndex < 9) {
			currentSlide.textContent = `0${currentIndex + 1}`;
		} else {
			currentSlide.textContent = `${currentIndex + 1}`;
		}
		if (slideContents.length < 10) {
			totalSlide.textContent = `0${slideContents.length}`;
		} else {
			totalSlide.textContent = `${slideContents.length}`;
		}		
	}

	prevSlide.addEventListener('click', () => {
		currentIndex--;
		//if (currentIndex < 0) {
		//	currentIndex = slideContents.length - 1;
		//}
		showSlide(currentIndex);
		updateSlideCounter();
	});

	nextSlide.addEventListener('click', () => {
		currentIndex++;
		//if (currentIndex >= slideContents.length) {
		//	currentIndex = 0;
		//}
		showSlide(currentIndex);
		updateSlideCounter();
	});


	hideSlides();
	showSlide();
	updateSlideCounter(); */






	//варіант 1 з урока

	/* const slides = document.querySelectorAll('.offer__slide'),
			prev = document.querySelector('.offer__slider-prev'),
			next = document.querySelector('.offer__slider-next'),
			current = document.querySelector('#current'),
			total = document.querySelector('#total');

	
	let slideIndex = 1;

	showSlides(slideIndex);

	if (slides.length < 10) {
		total.textContent = slides.length.toString().padStart(2, '0');
	} else {
		total.textContent = slides.length;
	}


	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		} else if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		})

		slides[slideIndex - 1].classList.add('show', 'fade');
		slides[slideIndex - 1].classList.remove('hide');

		current.textContent = slideIndex.toString().padStart(2, '0');
	}

	function plusSlides(n) {
		showSlides(slideIndex += n)
	}

	prev.addEventListener('click', () => {
		plusSlides(-1);
	});
	
	next.addEventListener('click', () => {
		plusSlides(1);
	}); */





	//варіант 2 з урока + //Додаємо до слайдера крапки(навігацію) для переключень (генерується кодом)

	const slides = document.querySelectorAll(slide),
			slider = document.querySelector(container), //
			prev = document.querySelector(prevArrow),
			next = document.querySelector(nextArrow),
			current = document.querySelector(currentCounter),
			total = document.querySelector(totalCounter),
			slidesWrapper = document.querySelector(wrapper),
			slidesField = document.querySelector(field),
			width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = `0${slideIndex}`;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	//
	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
			dots = [];
	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function changeOpacity() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '')
	}

	next.addEventListener('click', () => {
		if (offset === deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

		//
		changeOpacity();
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {			
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

		//
		changeOpacity();
	});

	//
	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex;

			changeOpacity();
		});
	});



    
}

export default slider;