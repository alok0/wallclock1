import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import React, { useContext, useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const TimeContext = React.createContext({ time: dayjs() });

export const TimeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [time, setTime] = useState(() => dayjs());

  useEffect(() => {
    const handle = setInterval(() => {
      setTimeout(() => setTime(dayjs()), 1001 - new Date().getMilliseconds());
    }, 1000);

    return () => {
      clearInterval(handle);
    };
  }, []);

  document.title = time.format("YYYY-MM-DD HH:mm:ss z");

  return (
    <TimeContext.Provider value={{ time }}>{children}</TimeContext.Provider>
  );
};

export const useTime = () => useContext(TimeContext).time;
