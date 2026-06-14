window.onload = function () {
    const personName = document.getElementById('personName').innerText.trim();
    const birthMonth = parseInt(document.getElementById('birthMonth').innerText, 10);
    const birthDay = parseInt(document.getElementById('birthDay').innerText, 10);

    const resultElement = document.getElementById('result');
    const countdownGrid = document.getElementById('countdownGrid');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const shareLinkButton = document.getElementById('shareLinkButton');

    if (isNaN(birthMonth) || isNaN(birthDay) || birthMonth < 1 || birthMonth > 12 || birthDay < 1 || birthDay > 31) {
        resultElement.textContent = 'Invalid birthday data.';
        return;
    }

    function nextBirthdayDate() {
        const now = new Date();
        const nextDate = new Date(now.getFullYear(), birthMonth - 1, birthDay);
        if (nextDate < now) {
            nextDate.setFullYear(now.getFullYear() + 1);
        }
        return nextDate;
    }

    function renderCountdown(days, hours, minutes, seconds) {
        countdownGrid.innerHTML = `
            <div class="time-box"><span class="time-value">${days}</span><span class="time-label">Days</span></div>
            <div class="time-box"><span class="time-value">${hours}</span><span class="time-label">Hours</span></div>
            <div class="time-box"><span class="time-value">${minutes}</span><span class="time-label">Minutes</span></div>
            <div class="time-box"><span class="time-value">${seconds}</span><span class="time-label">Seconds</span></div>
        `;
    }

    function pulseResult() {
        resultElement.style.transform = 'scale(1.03)';
        setTimeout(function () {
            resultElement.style.transform = 'scale(1)';
        }, 180);
    }

    function celebrateBirthday() {
        countdownGrid.innerHTML = '';
        resultElement.innerHTML = `Happy Birthday ${personName}! 🎉🎂`;
    }

    function updateTimer() {
        const targetDate = nextBirthdayDate();
        const now = new Date();

        if (targetDate.getDate() === now.getDate() && targetDate.getMonth() === now.getMonth() && targetDate.getFullYear() === now.getFullYear()) {
            celebrateBirthday();
            return;
        }

        const timeDifference = targetDate.getTime() - now.getTime();
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        renderCountdown(days, hours, minutes, seconds);
        resultElement.textContent = `${personName}'s next birthday is in ${days}d ${hours}h ${minutes}m ${seconds}s`;
        pulseResult();
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    copyLinkButton.addEventListener('click', function () {
        const textToCopy = window.location.href;
        navigator.clipboard.writeText(textToCopy).then(function () {
            resultElement.textContent = 'Link copied to clipboard.';
        }).catch(function () {
            resultElement.textContent = 'Unable to copy link on this browser.';
        });
    });

    shareLinkButton.addEventListener('click', function () {
        if (!navigator.share) {
            resultElement.textContent = 'Share API unavailable. Copy link and share manually.';
            return;
        }

        navigator.share({
            title: `${personName} Birthday Countdown`,
            text: `Countdown to ${personName}'s birthday is live!`,
            url: window.location.href
        }).then(function () {
            resultElement.textContent = 'Shared successfully.';
        }).catch(function () {
            resultElement.textContent = 'Share cancelled.';
        });
    });
};