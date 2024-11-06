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
