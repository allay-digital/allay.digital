// variables
let telegram = document.querySelector('#tg');
let whatsapp = document.querySelector('#wa');
let backTg = document.querySelector('#backTg');
let backWa = document.querySelector('#backWa');
let formBtnBackTg = document.querySelector('#formBtnBackTg');
let formBtnBackWa = document.querySelector('#formBtnBackWa');
let iconTg = document.querySelector('#iconTg');
let iconWa = document.querySelector('#iconWa');


// Telegram and whatsapp fields behavior (open/close)
formBtnBackTg.classList.add('hidden');
formBtnBackWa.classList.add('hidden');

// Open telegram field
telegram.addEventListener('click', ()=>{
    formBtnBackTg.classList.remove('hidden');
    customerTg.classList.remove('hidden');
    formMessengerTg.classList.remove('hidden');
    customerTg.focus();
});

telegram.addEventListener("click", (e) => {
    formMessengerTg.classList.remove('hidden');
    telegram.classList.add('hidden');
    whatsapp.classList.add('hidden');
});

// Open whatsapp field
whatsapp.addEventListener('click', ()=>{
    formBtnBackWa.classList.remove('hidden');
    customerWa.classList.remove('hidden');
    formMessengerWa.classList.remove('hidden');
    customerWa.focus();
});

whatsapp.addEventListener("click", (e) => {
    formMessengerWa.classList.remove('hidden');
    telegram.classList.add('hidden');
    whatsapp.classList.add('hidden');
});

// Close telegram field
formBtnBackTg.addEventListener('click', ()=>{
    if (tgPass == false) {
        formTg.value = '';
    };
    checkFields();
    formBtnBackTg.classList.add('hidden');
    formBtnBackWa.classList.add('hidden');
    telegram.classList.remove('hidden');
    whatsapp.classList.remove('hidden');
    customerTg.classList.add('hidden');
    formMessengerTg.classList.add('hidden');
    customerWa.classList.add('hidden');
    formMessengerWa.classList.add('hidden');
});

// Close whatsapp field
formBtnBackWa.addEventListener('click', ()=>{
    if (waPass == false) {
        formWa.value = '';
    }
    checkFields();
    console.log('tgLOG');
    formBtnBackTg.classList.add('hidden');
    formBtnBackWa.classList.add('hidden');
    telegram.classList.remove('hidden');
    whatsapp.classList.remove('hidden');
    customerTg.classList.add('hidden');
    formMessengerTg.classList.add('hidden');
    customerWa.classList.add('hidden');
    formMessengerWa.classList.add('hidden');
});


// Fiels validation when typing (restricted symbols)
function validateName(nameEl){
    nameEl.value = nameEl.value.replace(/[^a-zA-Zа-яА-ЯёЁ -]/g, '');
  };

function validateTg(tgEl){
    tgEl.value = tgEl.value.replace(/[^a-zA-Z0-9_]/g, '');
};

function validatePhone(phoneEl){
    phoneEl.value = validatePhoneNest(phoneEl.value);
};

function validatePhoneNest(phoneElVal){
    if (!phoneElVal) return phoneElVal;
    const phoneNumber = phoneElVal.replace(/[^\d+]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumber.slice(0, 1)=='+') {
        if (phoneNumberLength < 3) return phoneNumber;
        if (phoneNumberLength < 6) {
            return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)}`;
        }
        if (phoneNumberLength < 9) {
            return `${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2, 5)}) ${phoneNumber.slice(5, 8)}`;
        }
        if (phoneNumberLength < 11) {
            return `${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2, 5)}) ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}`;
        }
        return `${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2, 5)}) ${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 10)}-${phoneNumber.slice(10, 12)}`;
    }
    else {
        if (phoneNumberLength < 2) return phoneNumber;
        if (phoneNumberLength < 5) {
            return `${phoneNumber.slice(0, 1)} ${phoneNumber.slice(1, 4)}`;
        }
        if (phoneNumberLength < 8) {
            return `${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}`;
        }
        if (phoneNumberLength < 10) {
            return `${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}`;
        }
        return `${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
    }
}

// Level 2 filed validation (enebled disabled send button)
let formName = document.querySelector('#customerName');
let formMail = document.querySelector('#customerMail');
let formText = document.querySelector('#customerText');
let formTg = document.querySelector('#customerTg');
let formWa = document.querySelector('#customerWa');
let formButton = document.querySelector('.form-task__button');


let formPass = false;
let tgPass = false;
let waPass = false;

let sendTg = 'Not selected';
let sendWa = 'Not selected';

function checkFields() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const tgRegex = /^[a-zA-Z0-9_]{5,32}$/;
    const waRegex = /^[0-9]{11}/;
    if (
        formName.value.trim() !== '' &&
        formMail.value.trim() !== '' &&
        emailRegex.test(formMail.value.trim()) &&
        (formTg.value.trim() == '' || tgRegex.test(formTg.value.trim())) &&
        (formWa.value.trim() == '' || waRegex.test(formWa.value.replace(/[^\d]/g, '')))
    ) {
        formButton.classList.add('form-task__button--active');
        formPass = true;
    } 
    else {
        formButton.classList.remove('form-task__button--active');
    };

    if (
        tgRegex.test(formTg.value.trim())
    ) {
        sendTg = formTg.value.trim();
        backTg.src = "/images/footer/checkmark.svg";
        iconTg.src = "/images/footer/checkmarkCircle.svg";
        tgPass = true;
    } 
    else {
        backTg.src = "/images/footer/multiply.svg";
        iconTg.src = "/images/footer/tg.svg";
        tgPass = false;
    };

    if (
        waRegex.test(formWa.value.replace(/[^\d]/g, ''))
    ) {
        sendWa = formWa.value.trim();
        backWa.src = "/images/footer/checkmark.svg";
        iconWa.src = "/images/footer/checkmarkCircle.svg";
        waPass = true;
    } 
    else {
        backWa.src = "/images/footer/multiply.svg";
        iconWa.src = "/images/footer/wa.svg";
        waPass = false;
    };
}

formName.addEventListener("input", (e) => {
    checkFields()
});
formMail.addEventListener("input", (e) => {
    checkFields()
});
formTg.addEventListener("input", (e) => {
    checkFields()
});
formWa.addEventListener("input", (e) => {
    checkFields()
});
// formText.addEventListener("input", (e) => {
//     checkFields()
// });


// Sending function, message topic choice
// ПЕРЕМЕННАЯ --- formPass
// TRUE - ЗАПОЛНЕНО. FALSE - НЕТ
function send_mail() {
    if (formPass === true) {
        let subject = "Тема не выбрана";
        if (document.querySelector("#dev").checked) {
            subject = "Разработка";
        } 
        else if (document.querySelector("#designOnly").checked) {
            subject = "Дизайн";
        } 
        else if (document.querySelector("#designAndDev").checked) {
            subject = "Дизайн и разработка";
        } 
        else if (document.querySelector("#other").checked) {
            subject = "Другое";
        } 
        else if (document.querySelector("#ask").checked) {
            subject = "Просто спросить";
        }
        
        let customerName = document.querySelector('#customerName').value;
        let customerMail = document.querySelector('#customerMail').value;
        let customerText = document.querySelector('#customerText').value;
    
        Email.send({
            SecureToken: '0a718287-6360-4886-b731-5d1ff03a342b',
            To: "allaydigital@gmail.com",
            From: "allaydigital@gmail.com", // TODO: change this for company custom domain
            Subject: subject,
            Body: `От: ${customerName}<br>Почта: ${customerMail}<br>Текст: ${customerText}<br>Telegram: ${sendTg}<br>Whatsapp: ${sendWa}`
        }).then(
            formThx.classList.toggle('hidden'),formSel.classList.toggle('hidden')
        );

        console.log('SUBJECT: ', subject, ' name: ', customerName, ' mail: ', customerMail, ' text: ', customerText, ' Telegram: ', sendTg, 'Whatsapp: ', sendWa);
    };
};