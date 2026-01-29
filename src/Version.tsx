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
  const versionChangeTimeRef = useRef<Dayjs | null>(null);
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
          versionChangeTimeRef.current = null;
          return;
        }

        if (!versionChangeTimeRef.current) {
          versionChangeTimeRef.current = dayjs();
        }

        if (
          versionChangeTimeRef.current &&
          dayjs().diff(versionChangeTimeRef.current, "minutes") > 60
        ) {
          window.location.reload();
          return;
        }

        console.warn({
          newVersion: versionResponse,
          currentVersion: getVersion(),
          detected: versionChangeTimeRef.current.toISOString(),
        });
      })();
    }, 600_000);
    return () => {
      clearInterval(handle);
    };
  }, []);

  return <></>;
};
