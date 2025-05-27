import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useContext, useEffect, useMemo, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const TimeContext = React.createContext({ time: dayjs() });

export const TimeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [time, setTime] = useState(() => dayjs());

  useEffect(() => {
    let timeoutHandle: number | null = null;
    const handle = window.setInterval(() => {
      timeoutHandle = window.setTimeout(
        () => setTime(dayjs()),
        1001 - new Date().getMilliseconds(),
      );
    }, 1000);

    return () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
      clearInterval(handle);
    };
  }, []);

  document.title = time.format("YYYY-MM-DD HH:mm:ss z");

  const value = useMemo(() => ({ time }), [time]);
  return <TimeContext value={value}>{children}</TimeContext>;
};

export const useTime = () => useContext(TimeContext).time;
