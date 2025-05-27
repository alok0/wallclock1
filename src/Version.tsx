import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";

export const getVersion = () => {
  const version = __VERSION__;
  if (typeof version === "string") {
    return version;
  }
  return "";
};

export const VersionChecker = () => {
  const versionChangeTime = useRef<Dayjs | null>(null);
  useEffect(() => {
    const handle = setInterval(() => {
      void (async () => {
        const resp = await fetch("version.txt");
        if (!resp.ok) {
          console.info("failed to get version", resp.status, resp.statusText);
          return;
        }
        const versionResponse = await resp.text();
        if (versionResponse === getVersion() || !getVersion()) {
          versionChangeTime.current = null;
          return;
        }

        if (!versionChangeTime.current) {
          versionChangeTime.current = dayjs();
        }

        if (
          versionChangeTime.current &&
          dayjs().diff(versionChangeTime.current, "minutes") > 60
        ) {
          window.location.reload();
          return;
        }

        console.warn({
          newVersion: versionResponse,
          currentVersion: getVersion(),
          detected: versionChangeTime.current.toISOString(),
        });
      })();
    }, 600_000);
    return () => {
      clearInterval(handle);
    };
  }, []);

  return <></>;
};
