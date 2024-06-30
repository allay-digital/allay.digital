const blogIcon = document.getElementById('blogIcon');
const blogModal = document.getElementById('blogModal');
const overlay = document.getElementById('overlay');

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];  
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    function handleFocus(event) {
        if (event.shiftKey) { 
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else { 
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }

    element.addEventListener('keydown', handleFocus);
}

function blogToggle() {
    const currentSrc = blogIcon.getAttribute('src'); // Получаем текущий путь иконки

    if (currentSrc === '/images/header/triangle.svg') {
        blogIcon.setAttribute('src', '/images/header/triangle-fill.svg');
    } else {
        blogIcon.setAttribute('src', '/images/header/triangle.svg');
    }

    if (blogModal.classList.contains('hidden')) {
        // Удаляем класс hidden и добавляем класс для анимации
        blogModal.classList.remove('hidden');
        overlay.style.display = 'block';
        disableScroll();
        setTimeout(() => {
            blogModal.classList.add('show');
            blogModal.focus(); // Перевести фокус на модальное окно
            trapFocus(blogModal); // Ограничить фокус элементами модального окна
        }, 10); // Небольшая задержка для срабатывания transition
    } else {
        // Удаляем класс для анимации и добавляем класс hidden после завершения анимации
        blogModal.classList.remove('show');
        overlay.style.display = 'none';
        enableScroll();
        blogModal.addEventListener('transitionend', function handleTransitionEnd() {
            if (!blogModal.classList.contains('show')) {
                blogModal.classList.add('hidden');
            }
            blogModal.removeEventListener('transitionend', handleTransitionEnd);
        });
    }
}

// Закрытие модального окна при нажатии на затемненный фон
overlay.addEventListener('click', function() {
    if (blogModal.classList.contains('show')) {
        blogToggle();
        blogModal.classList.add('hidden')
    }
});
