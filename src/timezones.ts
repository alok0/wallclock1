import dayjs from "dayjs";

export const timezones = [
  ...new Set([...Intl.supportedValuesOf("timeZone"), "UTC"]),
]
  .map((zone) => {
    try {
      const offset = dayjs().tz(zone).utcOffset();
      return { zone, offset };
    } catch (e) {
      console.warn(
        `failed to get offset from timezone ${JSON.stringify(zone)}`,
        e,
      );
    }
    return null;
  })
  .filter((o) => !!o)
  .toSorted((a, b) => a.offset - b.offset)
  .map(({ zone }) => zone);
