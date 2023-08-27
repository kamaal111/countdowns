import * as React from 'react';

import countdowns from '@/resources/countdowns.json';

function useCountdowns() {
  const [
    remainingTimesMappedByCountdownIDs,
    setRemainingTimesMappedByCountdownIDs,
  ] = React.useState<Record<string, number> | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const remainingTimes = mapRemainingTimesOfCountdowns();
      if (Object.keys(remainingTimes).length > 0) {
        setRemainingTimesMappedByCountdownIDs(remainingTimes);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return countdowns.map((countdown) => ({
    ...countdown,
    remaining_milliseconds:
      remainingTimesMappedByCountdownIDs?.[countdown.id] ?? 0,
  }));
}

function mapRemainingTimesOfCountdowns() {
  const now = new Date();
  return countdowns.reduce(
    (acc, current) => {
      const date = new Date(current.date);
      const countdown = date.getTime() - now.getTime();
      if (countdown <= 0) {
        return acc;
      }
      return { ...acc, [current.id]: countdown };
    },
    {} as Record<string, number>,
  );
}

export default useCountdowns;
