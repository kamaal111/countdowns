const COUNTDOWNS = [
  {
    id: "c373fbf8-a2b1-4a17-bbdc-0ae862987b27",
    title: "Flight to Madrid",
    date: "2024-07-19T07:30:00.000Z",
  },
];

const COUNTDOWN_ID_ATTRIBUTE_KEY = "countdown-id";
const COUNTDOWN_TIME_CLASS_KEY = "countdown-time";

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(navigator.language, {
  dateStyle: "full",
  timeStyle: "long",
});

function main() {
  const countdowns = document.getElementById("countdowns");
  const remainingTimes = mapRemainingTimesOfCountdowns();
  const countdownNodes = createCountdownElements(remainingTimes);
  for (const countdownNode of countdownNodes) {
    countdowns.appendChild(countdownNode);
  }
  if (Object.keys(remainingTimes).length === 0) {
    return;
  }

  updateCountdownElements({ countdownNodes });
}

function updateCountdownElements({ countdownNodes }) {
  const interval = setInterval(() => {
    const remainingTimes = mapRemainingTimesOfCountdowns();
    if (Object.keys(remainingTimes).length === 0) {
      clearInterval(interval);
      return;
    }

    for (const countdownNode of countdownNodes) {
      const id = countdownNode.getAttribute(COUNTDOWN_ID_ATTRIBUTE_KEY);
      if (id == null) {
        continue;
      }

      const remainingTime = remainingTimes[id];
      if (remainingTime == null) {
        continue;
      }

      for (const countdownNodeChild of countdownNode.children) {
        if (countdownNodeChild.className === COUNTDOWN_TIME_CLASS_KEY) {
          countdownNodeChild.innerHTML =
            formatMilliSecondsToTimerFormat(remainingTime);
        }
      }
    }
  }, 1000);
}

function createCountdownElements(remainingTimes) {
  return COUNTDOWNS.map((countdown) => {
    const countdownNode = document.createElement("div");
    countdownNode.className = "countdown";
    countdownNode.setAttribute(COUNTDOWN_ID_ATTRIBUTE_KEY, countdown.id);
    const countdownTitleElement = document.createElement("h3");
    const countdownDate = new Date(countdown.date);
    const formattedDate = DATE_TIME_FORMATTER.format(countdownDate);
    countdownTitleElement.innerText = `${countdown.title} (${formattedDate})`;
    const countdownTimeElement = document.createElement("p");
    countdownTimeElement.className = COUNTDOWN_TIME_CLASS_KEY;
    countdownTimeElement.innerText = formatMilliSecondsToTimerFormat(
      remainingTimes[countdown.id] ?? 0
    );
    countdownNode.appendChild(countdownTitleElement);
    countdownNode.appendChild(countdownTimeElement);

    return countdownNode;
  });
}

function mapRemainingTimesOfCountdowns() {
  const now = new Date();
  return COUNTDOWNS.reduce((acc, current) => {
    const date = new Date(current.date);
    const countdown = date.getTime() - now.getTime();
    if (countdown <= 0) {
      return acc;
    }
    return { ...acc, [current.id]: countdown };
  }, {});
}

function formatMilliSecondsToTimerFormat(milliSeconds) {
  if (milliSeconds <= 0) {
    return "0s";
  }

  const aMinute = 1000 * 60;
  const seconds = `${Math.floor((milliSeconds % aMinute) / 1000)
    .toString()
    .padStart(2, "0")}s`;
  if (milliSeconds < aMinute) {
    return seconds;
  }

  const aHour = aMinute * 60;
  const minutes = `${Math.floor((milliSeconds % aHour) / aMinute)
    .toString()
    .padStart(2, "0")}m`;
  if (milliSeconds < aHour) {
    return `${minutes} ${seconds}`;
  }

  const aDay = aHour * 24;
  const hours = `${Math.floor((milliSeconds % aDay) / aHour)
    .toString()
    .padStart(2, "0")}h`;
  if (milliSeconds < aDay) {
    return `${hours} ${minutes} ${seconds}`;
  }

  const days = `${Math.floor(milliSeconds / aDay)
    .toString()
    .padStart(2, "0")}d`;
  return `${days} ${hours} ${minutes} ${seconds}`;
}

main();
