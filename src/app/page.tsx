'use client';

import * as React from 'react';

import { formatMilliSecondsToTimerFormat } from '@/utils/dates';

import countdowns from '@/resources/countdowns.json';

export default function Home() {
  const [
    remainingTimesMappedByCountdownIDs,
    setRemainingTimesMappedByCountdownIDs,
  ] = React.useState<Record<string, number> | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const remainingTimes = countdowns.reduce(
        (acc, current) => {
          const date = new Date(current.date);
          return { ...acc, [current.id]: date.getTime() - now.getTime() };
        },
        {} as NonNullable<typeof remainingTimesMappedByCountdownIDs>,
      );
      setRemainingTimesMappedByCountdownIDs(remainingTimes);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {remainingTimesMappedByCountdownIDs != null
        ? countdowns.map(({ id }) => {
            return (
              <div key={id}>
                <p>
                  {formatMilliSecondsToTimerFormat(
                    remainingTimesMappedByCountdownIDs[id],
                  )}
                </p>
              </div>
            );
          })
        : null}
    </main>
  );
}
