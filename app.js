function generateCountdownLink() {
    const personName = document.getElementById('personName').value.trim();
    const birthMonth = parseInt(document.getElementById('birthMonth').value, 10);
    const birthDay = parseInt(document.getElementById('birthDay').value, 10);

    // Check if name, month, and day are valid
    if (!personName || isNaN(birthMonth) || isNaN(birthDay) || birthMonth < 1 || birthMonth > 12 || birthDay < 1 || birthDay > 31) {
        alert('Please enter a valid name, month (1-12), and day (1-31).');
        return;
    }

    // Hide the form and buttons
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('generateButton').style.display = 'none';

    // Encode the name to make it URL-safe
    const encodedName = encodeURIComponent(personName);

    // Create the URL with query parameters
    const url = `${window.location.origin}${window.location.pathname}?name=${encodedName}&month=${birthMonth}&day=${birthDay}`;

    // Display the URL to the user
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Share this link for the countdown: <a href="${url}" target="_blank">${url}</a>`;

    // Show the Copy and Share buttons
    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('shareButton').style.display = 'inline-block';

    // Store the URL for copying and sharing
    window.generatedUrl = url;

    // Calculate and display the countdown
    calculateCountdown(personName, birthMonth, birthDay);
}

function copyToClipboard() {
    // Copy the generated URL to the clipboard
    const textarea = document.createElement('textarea');
    textarea.value = window.generatedUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('URL copied to clipboard!');
}

function shareLink() {
    // Check if the Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: 'Birthday Countdown',
            text: 'Check out this birthday countdown!',
            url: window.generatedUrl
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        alert('Sharing is not supported on this browser. You can copy the URL instead.');
    }
}

function calculateCountdown(personName, birthMonth, birthDay) {
    const today = new Date();
    const birthdate = new Date(today.getFullYear(), birthMonth - 1, birthDay);

    if (birthdate.getDate() === today.getDate() && birthdate.getMonth() === today.getMonth()) {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML += `<p>Happy Birthday ${personName}! 🎉🎂</p>`;
        return;
    }

    if (birthdate < today) {
        birthdate.setFullYear(today.getFullYear() + 1);
    }

    setInterval(function () {
        const now = new Date();
        const timeDifference = birthdate.getTime() - now.getTime();

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const resultElement = document.getElementById('result');

        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        resultElement.style.color = `rgb(${red}, ${green}, ${blue})`;

        resultElement.innerHTML = `${personName}'s next birthday is in ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
    }, 1000);
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const personName = urlParams.get('name');
    const birthMonth = parseInt(urlParams.get('month'), 10);
    const birthDay = parseInt(urlParams.get('day'), 10);

    if (personName && !isNaN(birthMonth) && !isNaN(birthDay)) {
        // Hide the form and buttons if parameters are present
        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('generateButton').style.display = 'none';
        document.getElementById('copyButton').style.display = 'none';
        document.getElementById('shareButton').style.display = 'none';

        // Display the countdown
        calculateCountdown(personName, birthMonth, birthDay);
    }
};
