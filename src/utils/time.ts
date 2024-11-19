import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const currentTZ = () => {
  return dayjs.tz.guess();
};

export const dayDateTimeLocal = (time: number) => {
  return dayjs.unix(time).format("ddd M/D h:mm A");
};

export const fullDateOfYesterdayWithTZ = (time: number, timeZone: string) => {
  return dayjs
    .tz(time * 1000, timeZone)
    .subtract(1, "day")
    .format("YYYY-MM-DD");
};

export const getUTCTimeDifference = (timeZone: string) => {
  const now = dayjs().tz(timeZone);
  const offsetMinutes = now.utcOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const hours = String(Math.abs(Math.floor(offsetMinutes / 60))).padStart(
    2,
    "0"
  );
  const minutes = String(Math.abs(offsetMinutes % 60)).padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
};

export const timeWithTZ = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("h:mm a");
};

export const timeInHourWithTZ = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("h a");
};

export const dayTimeWithTZ = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("ddd h a");
};

export const dayDateTimeWithTZ = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("ddd M/D h:mm A");
};

export const dateWithTZ = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("M/D");
};

export const dayWithTZ = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("ddd");
};

export const dayOfYesterdayWithTZ = (time: number, timeZone: string) => {
  return dayjs
    .tz(time * 1000, timeZone)
    .subtract(1, "day")
    .format("ddd");
};
