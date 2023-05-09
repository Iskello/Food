
//загальна функція відкриття вікна
function openModalWindow(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    //modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}


//загальна функція закриття вікна
function closeModalWindow(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');
    document.body.style.overflow = '';

    //якщо я захочу переключення через toggle
    //modal.classList.toggle('show');
    //document.body.style.overflow = '';
    
}




function modal (triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const openModal = document.querySelectorAll(triggerSelector),		
    modal = document.querySelector(modalSelector);

    /* openModal.forEach((element) => {
        element.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    }) */


    

    //відкриття вікна по кнопкам
    openModal.forEach(btn => {
        btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));
    });



    //закриття вікна при кліку на підкладку (оверлей) та на хрестик
    modal.addEventListener('click', (event) => {
        //if(event.target && event.target.classList.contains('modal'))
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelector);
        }
    });

    //закриття вікна на Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow(modalSelector);
        }
    });

    

    //вспливання модального вікна коли ми долистуємо сторінку до кінця
    /* function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll); */


    //вспливання модального вікна через 1500px
    /* function handleScroll() {
        if (window.pageYOffset > 1500) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll); */


}

export default modal;
export {closeModalWindow};
export {openModalWindow};