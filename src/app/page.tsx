'use client';

import * as React from 'react';

import { formatMilliSecondsToTimerFormat } from '@/utils/dates';
import useCountdowns from '@/hooks/useCountdowns';

export default function Home() {
  const { countdowns, isReady } = useCountdowns();

  return (
    <main>
      {isReady ? (
        countdowns.map(
          ({ id, remaining_milliseconds: remainingMilliseconds, title }) => {
            return (
              <div key={id}>
                <h3>{title}</h3>
                <p>{formatMilliSecondsToTimerFormat(remainingMilliseconds)}</p>
              </div>
            );
          },
        )
      ) : (
        <p>Loading....</p>
      )}
    </main>
  );
}
