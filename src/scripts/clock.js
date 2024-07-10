function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    const secondDegree = seconds * 6;
    const minuteDegree = (minutes + seconds / 60) * 6;
    const hourDegree = (hours + minutes / 60) * 30;

    document.getElementById('second').style.transform = `rotate(${secondDegree}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minuteDegree}deg)`;
    document.getElementById('hour').style.transform = `rotate(${hourDegree}deg)`;
}

setInterval(updateClock, 1000);
updateClock();