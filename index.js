const countdowns = [
  {
    id: 'c373fbf8-a2b1-4a17-bbdc-0ae862987b27',
    title: 'Flight to Peru',
    date: '2023-09-19T07:55:00.000Z',
  },
];

const COUNTDOWN_ID_ATTRIBUTE_KEY = 'countdown-id';
const COUNTDOWN_CLASS_KEY = 'countdown'

function main() {
  const app = document.getElementById('app');
  const remainingTimes = mapRemainingTimesOfCountdowns();
  for (const countdown of countdowns) {
    const countdownNode = document.createElement('div');
    countdownNode.setAttribute(COUNTDOWN_ID_ATTRIBUTE_KEY, countdown.id);
    const countdownTitleElement = document.createElement('h3');
    countdownTitleElement.innerText = countdown.title;
    const countdownTimeElement = document.createElement('p');
    countdownTimeElement.className = COUNTDOWN_CLASS_KEY
    countdownTimeElement.innerText = formatMilliSecondsToTimerFormat(
      remainingTimes[countdown.id] ?? [],
    );
    countdownNode.appendChild(countdownTitleElement);
    countdownNode.appendChild(countdownTimeElement);
    app.appendChild(countdownNode);
  }

  if (Object.keys(remainingTimes).length === 0) {
    return;
  }

  const interval = setInterval(() => {
    const remainingTimes = mapRemainingTimesOfCountdowns();
    if (Object.keys(remainingTimes).length === 0) {
      clearInterval(interval);
      return;
    }

    for (const countdownNode of app.children) {
      const id = countdownNode.getAttribute(COUNTDOWN_ID_ATTRIBUTE_KEY);
      if (id == null) {
        continue;
      }

      const remainingTime = remainingTimes[id];
      if (remainingTime == null) {
        continue;
      }

      for (const countdownNodeChild of countdownNode.children) {
        if (countdownNodeChild.className === COUNTDOWN_CLASS_KEY) {
            countdownNodeChild.innerHTML = formatMilliSecondsToTimerFormat(remainingTime);
        }
      }
    }
  }, 1000);
}

function mapRemainingTimesOfCountdowns() {
  const now = new Date();
  return countdowns.reduce((acc, current) => {
    const date = new Date(current.date);
    const countdown = date.getTime() - now.getTime();
    if (countdown <= 0) {
      return acc;
    }
    return { ...acc, [current.id]: countdown };
  }, {});
}

function formatMilliSecondsToTimerFormat(milliSeconds) {
  const days = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((milliSeconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliSeconds % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

main();
