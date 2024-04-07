function calculateCountdown() {
    const personName = document.getElementById('personName').value;
    const birthMonth = parseInt(document.getElementById('birthMonth').value, 10);
    const birthDay = parseInt(document.getElementById('birthDay').value, 10);
    const today = new Date();

    // Check if month and day are valid
    if (isNaN(birthMonth) || isNaN(birthDay) || birthMonth < 1 || birthMonth > 12 || birthDay < 1 || birthDay > 31) {
        alert('Please enter valid month (1-12) and day (1-31).');
        return;
    }

    // Create a date object for the input birthdate
    const birthdate = new Date(today.getFullYear(), birthMonth - 1, birthDay);

    // Check if birthday is today
    if (birthdate.getDate() === today.getDate() && birthdate.getMonth() === today.getMonth()) {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `Happy Birthday ${personName}! 🎉🎂`;
        return;
    }

    // If birthday has passed this year, set next birthday to next year
    if (birthdate < today) {
        birthdate.setFullYear(today.getFullYear() + 1);
    }

    // Calculate and update countdown every second
    setInterval(function () {
        const now = new Date();
        const timeDifference = birthdate.getTime() - now.getTime();

        // Calculate days, hours, minutes, seconds
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const resultElement = document.getElementById('result');

        // Generate random RGB color values
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        // Set the text color to the random RGB value
        resultElement.style.color = `rgb(${red}, ${green}, ${blue})`;

        resultElement.innerHTML = `${personName}'s next birthday is in ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;






    }, 1000);
}
