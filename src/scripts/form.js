function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

function setupInputRestrictions() {
    const phoneInput = document.getElementById('customerPhone');
    const tgInput = document.getElementById('customerTg');

    const validatePhone = (value) => /^\+?[0-9]*$/.test(value);
    const validateTelegram = (value) => /^@?[a-zA-Z0-9_]*$/.test(value);

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (!validatePhone(this.value)) {
                this.value = this.value.slice(0, -1);
                return;
            }
            this.value = this.value.startsWith('+') 
                ? '+' + this.value.slice(1).replace(/[^0-9]/g, '')
                : this.value.replace(/[^0-9]/g, '');
        });
    }

    if (tgInput) {
        tgInput.addEventListener('input', function() {
            if (!validateTelegram(this.value)) {
                this.value = this.value.slice(0, -1);
                return;
            }
            this.value = this.value.startsWith('@') 
                ? '@' + this.value.slice(1).replace(/@/g, '')
                : '@' + this.value.replace(/@/g, '');
        });
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('applicationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    await fetchCsrfToken();
    setupInputRestrictions();
});

async function fetchCsrfToken() {
    try {
        const response = await fetch('https://allay.digital/api/csrf-token', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`CSRF fetch failed: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        document.getElementById('csrfToken').value = data.csrfToken;

    } catch (error) {
        console.error('CSRF token error:', error);
        showError('Ошибка инициализации формы. Перезагрузите страницу.');
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const validateEmail = (email) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => 
        /^\+[1-9]\d{1,14}$/.test(phone);

    const elements = {
        checkbox: document.getElementById('form-checkbox'),
        csrfToken: document.getElementById('csrfToken'),
        name: document.getElementById('customerName'),
        phone: document.getElementById('customerPhone'),
        email: document.getElementById('customerMail'),
        telegram: document.getElementById('customerTg'),
        description: document.getElementById('customerText')
    };

    if (!elements.checkbox?.checked) {
        return showError('Подтвердите согласие с правилами обработки данных');
    }

    if (!elements.csrfToken?.value) {
        await fetchCsrfToken();
        return showError('Ошибка проверки безопасности. Попробуйте снова.');
    }

    const formData = {
        name: elements.name.value.trim(),
        phone: elements.phone.value.trim(),
        email: elements.email.value.trim(),
        telegram: elements.telegram.value.trim(),
        description: elements.description.value.trim(),
        _csrf: elements.csrfToken.value
    };

    if (!formData.name || !formData.email || !formData.telegram) {
        return showError('Заполните обязательные поля');
    }

    if (!validateEmail(formData.email)) {
        return showError('Некорректный формат email');
    }

    if (formData.phone && !validatePhone(formData.phone)) {
        return showError('Некорректный формат телефона');
    }

    try {
        const response = await fetch('https://allay.digital/api/submit-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': formData._csrf
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        const result = await response.json();
        
        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Ошибка сервера');
        }

        document.getElementById('applicationForm').classList.add('hidden');
        document.getElementById('formThx').classList.remove('hidden');

    } catch (error) {
        console.error('Form submit error:', error);
        showError(error.message || 'Ошибка отправки формы');
    }
}

function showError(message) {
    const errorElement = document.getElementById('formError');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        setTimeout(() => errorElement.classList.add('hidden'), 5000);
    }
}
