function generateCountdownLink() {
    const personName = document.getElementById('personName').value.trim();
    const birthMonth = parseInt(document.getElementById('birthMonth').value, 10);
    const birthDay = parseInt(document.getElementById('birthDay').value, 10);
    const resultElement = document.getElementById('result');

    if (!isValidBirthday(personName, birthMonth, birthDay)) {
        resultElement.textContent = 'Please enter a valid name, month, and day.';
        return;
    }

    document.getElementById('formContainer').style.display = 'none';

    const encodedName = encodeURIComponent(personName);
    const url = `${window.location.origin}${window.location.pathname}?name=${encodedName}&month=${birthMonth}&day=${birthDay}`;

    resultElement.innerHTML = `Your countdown link is ready: <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;

    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('shareButton').style.display = 'inline-block';

    window.generatedUrl = url;

    calculateCountdown(personName, birthMonth, birthDay);
}

function copyToClipboard() {
    const textToCopy = window.generatedUrl || window.location.href;
    const resultElement = document.getElementById('result');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function () {
            resultElement.textContent = 'URL copied to clipboard.';
        }).catch(function () {
            fallbackCopy(textToCopy, resultElement);
        });
        return;
    }

    fallbackCopy(textToCopy, resultElement);
}

function shareLink() {
    const resultElement = document.getElementById('result');

    if (navigator.share) {
        navigator.share({
            title: 'Birthday Countdown',
            text: 'Check out this birthday countdown!',
            url: window.generatedUrl || window.location.href
        }).then(() => {
            resultElement.textContent = 'Shared successfully.';
        }).catch((error) => {
            if (error && error.name !== 'AbortError') {
                resultElement.textContent = 'Sharing failed. Try copying the URL.';
            }
        });
    } else {
        resultElement.textContent = 'Sharing is not supported on this browser. Copy the URL instead.';
    }
}

function calculateCountdown(personName, birthMonth, birthDay) {
    const countdownGrid = document.getElementById('countdownGrid');
    const resultElement = document.getElementById('result');

    if (window.countdownTimerId) {
        clearInterval(window.countdownTimerId);
        window.countdownTimerId = null;
    }

    function getNextBirthday() {
        const now = new Date();
        const target = new Date(now.getFullYear(), birthMonth - 1, birthDay);
        if (target < now) {
            target.setFullYear(now.getFullYear() + 1);
        }
        return target;
    }

    function updateCountdown() {
        const target = getNextBirthday();
        const now = new Date();

        if (target.getDate() === now.getDate() && target.getMonth() === now.getMonth() && target.getFullYear() === now.getFullYear()) {
            countdownGrid.innerHTML = '';
            resultElement.innerHTML = `Happy Birthday ${personName}! 🎉🎂`;
            clearInterval(window.countdownTimerId);
            window.countdownTimerId = null;
            return;
        }

        const timeDifference = target.getTime() - now.getTime();
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownGrid.innerHTML = `
            <div class="time-box"><span class="time-value">${days}</span><span class="time-label">Days</span></div>
            <div class="time-box"><span class="time-value">${hours}</span><span class="time-label">Hours</span></div>
            <div class="time-box"><span class="time-value">${minutes}</span><span class="time-label">Minutes</span></div>
            <div class="time-box"><span class="time-value">${seconds}</span><span class="time-label">Seconds</span></div>
        `;
        resultElement.textContent = `${personName}'s next birthday is in ${days}d ${hours}h ${minutes}m ${seconds}s.`;
    }

    updateCountdown();
    window.countdownTimerId = setInterval(updateCountdown, 1000);
}

function isValidBirthday(personName, birthMonth, birthDay) {
    if (!personName || isNaN(birthMonth) || isNaN(birthDay) || birthMonth < 1 || birthMonth > 12 || birthDay < 1) {
        return false;
    }

    const maxDay = new Date(2024, birthMonth, 0).getDate();
    return birthDay <= maxDay;
}

function fallbackCopy(text, resultElement) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        resultElement.textContent = 'URL copied to clipboard.';
    } catch (error) {
        resultElement.textContent = 'Unable to copy URL on this browser.';
    }
    document.body.removeChild(textarea);
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const personName = urlParams.get('name');
    const birthMonth = parseInt(urlParams.get('month'), 10);
    const birthDay = parseInt(urlParams.get('day'), 10);

    if (isValidBirthday(personName, birthMonth, birthDay)) {
        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('copyButton').style.display = 'inline-block';
        document.getElementById('shareButton').style.display = 'inline-block';
        window.generatedUrl = window.location.href;
        calculateCountdown(personName, birthMonth, birthDay);
    }
};
