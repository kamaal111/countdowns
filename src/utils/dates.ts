export function formatMilliSecondsToTimerFormat(milliSeconds: number) {
  const days = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (milliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((milliSeconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliSeconds % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
