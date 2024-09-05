import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const currentLocalTime = () => {
  return dayjs(new Date()).format("ddd M/DD h:mm A");
};

export const localTime = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("h:mm a");
};

export const localTime24 = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("HH:mm");
};

export const localTimeHour = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("h a");
};

export const localDateTime = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("DD ddd h a");
};

export const localFullDateTime = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("MM/DD ddd h:mm a");
};

export const localDay = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("MM/DD");
};

export const localDate = (time: number, timeZone: string) => {
  return dayjs.tz(time * 1000, timeZone).format("ddd");
};
