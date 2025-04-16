import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export type ConfigType = { display: string[] };

const castConfigData = (input: unknown): ConfigType => {
  if (
    !input ||
    typeof input !== "object" ||
    !("display" in input) ||
    !Array.isArray(input.display) ||
    input.display.some((v) => typeof v !== "string")
  ) {
    throw new Error();
  }

  return { display: input.display.filter((v) => !!v).map(String) };
};

const defaultConfig: ConfigType = {
  display: ["America/Los_Angeles", "America/New_York", "UTC"],
};

export const useConfig = () => {
  const [data, setData] = useLocalStorage("CONFIG", defaultConfig);
  const validatedData: ConfigType = useMemo(() => {
    try {
      const vdata = castConfigData(data);
      const display = vdata.display
        .map((zone) => {
          try {
            const offset = dayjs().tz(zone).utcOffset();
            return { zone, offset };
          } catch (e) {
            console.warn(`failed to use timezone ${JSON.stringify(zone)}`, e);
          }
          return null;
        })
        .filter((o) => !!o)
        .toSorted((a, b) => a.offset - b.offset)
        .map(({ zone }) => zone);

      return {
        ...vdata,
        display,
      };
    } catch (e) {
      console.info(e);
      return defaultConfig;
    }
  }, [data]);
  return useMemo(() => {
    return {
      ...validatedData,
      setDisplay: (display: ConfigType["display"]) => {
        setData((data) => ({ ...data, display }));
      },
    };
  }, [setData, validatedData]);
};

export const ConfigOverride: React.FC = () => {
  const { setDisplay } = useConfig();
  const location = useLocation();
  const navTo = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const overrideZone = params.get("override-zones");
    if (overrideZone) {
      const zones: unknown = JSON.parse(overrideZone);
      if (zones && typeof zones === "object" && Array.isArray(zones)) {
        setTimeout(() => {
          console.log({ overrideZone, zones });
          setDisplay(zones.map(String));
          void navTo(location.pathname, { replace: true });
        }, 0);
      }
    }
  }, [location, navTo, setDisplay]);

  return null;
};
