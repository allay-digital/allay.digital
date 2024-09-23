function send_mail() {
    let customerName = document.querySelector('#customerName').value;
    let customerPhone = document.querySelector('#customerPhone').value;
    let customerMail = document.querySelector('#customerMail').value;
    let customerTG = document.querySelector('#customerTg').value;
    let customerText = document.querySelector('#customerText').value;
    
    // Check if the checkbox is selected
    if (!document.querySelector('#form-checkbox').checked) {
        alert("Вы должны согласиться с правилами обработки персональных данных.");
        return;
    }
    
    // Debugging output
    console.log('Name:', customerName);
    console.log('Phone:', customerPhone);
    console.log('Mail:', customerMail);
    console.log('Text:', customerText);
    console.log('Telegram:', customerTG);
    
    Email.send({
        SecureToken: '0a718287-6360-4886-b731-5d1ff03a342b',
        To: "allaydigital@gmail.com",
        From: "allaydigital@gmail.com",
        Subject: "Заказ allay",
        Body: `От: ${customerName}<br>Почта: ${customerMail}<br>Телефон: ${customerPhone}<br>Telegram: ${customerTG}<br>Текст: ${customerText}`
    }).then(
        function (message) {
            alert("Письмо отправлено!");
            console.log("Email sent successfully:", message);
        },
        function (error) {
            alert("Ошибка отправки почты: " + error);
            console.error("Email sending failed: ", error);
        }
    ).catch(error => {
        console.error("Catch block error:", error);
        alert("Catch block: Ошибка отправки почты.");
    });
}