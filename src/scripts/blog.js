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
    const currentSrc = blogIcon.getAttribute('src');

    if (blogModal.classList.contains('hidden') || blogModal.classList.contains('hide')) {
        blogIcon.setAttribute('src', '/images/header/triangle-fill.svg');
        blogModal.classList.remove('hidden', 'hide');
        blogIcon.classList.add('blog-button__image-open')
        overlay.style.display = 'block';
        disableScroll();
        setTimeout(() => {
            blogModal.classList.add('show');
            blogModal.focus();
            trapFocus(blogModal);
        }, 10);
    } else {
        blogModal.classList.remove('show');
        blogModal.classList.add('hide');
        blogIcon.setAttribute('src', '/images/header/triangle.svg');
        overlay.style.opacity = 0;
        enableScroll();
        blogModal.addEventListener('transitionend', function handleTransitionEnd() {
            if (blogModal.classList.contains('hide')) {
                blogModal.classList.add('hidden');
                overlay.style.display = 'none'; // Скрытие фона после завершения анимации
                overlay.style.opacity = ''; // Сброс стиля opacity
            }
            blogModal.removeEventListener('transitionend', handleTransitionEnd);
        });
    }
}

function blogClose() {
    blogModal.classList.remove('show');
    blogModal.classList.add('hide');
    blogIcon.setAttribute('src', '/images/header/triangle.svg'); // Изменение иконки при закрытии
    blogIcon.classList.remove('blog-button__image-open')
    overlay.style.opacity = 0; // Плавное исчезновение фона
    enableScroll();
    blogModal.addEventListener('transitionend', function handleTransitionEnd() {
        if (blogModal.classList.contains('hide')) {
            blogModal.classList.add('hidden');
            overlay.style.display = 'none'; // Скрытие фона после завершения анимации
            overlay.style.opacity = ''; // Сброс стиля opacity
        }
        blogModal.removeEventListener('transitionend', handleTransitionEnd);
    });
}

overlay.addEventListener('click', function() {
    if (blogModal.classList.contains('show')) {
        blogClose()
    }
});
