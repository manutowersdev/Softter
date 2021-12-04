import { useEffect, useState } from "react";

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timeStamp) {
  const [timeAgo, setTimeAgo] = useState(getDateDiffs(timeStamp));

  useEffect(() => {
    console.log(timeAgo);
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timeStamp);
      setTimeAgo(newTimeAgo);
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [timeStamp]);

  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    style: "short",
  });

  const { value, unit } = timeAgo;

  return rtf.format(value, unit);
}
