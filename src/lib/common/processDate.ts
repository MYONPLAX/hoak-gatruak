/* Date to Unixtime */
export const dateEpoch = (date: Date): number =>
  Math.floor(date.getTime() / 1000);

/* Unixtime (seconds) to Date */
export const epochDate = (unixtime: number): Date => new Date(unixtime * 1000);

/* String (YYYY-MM-DD) to Unixtime (seconds) */
export function YMDepoch(YMD: string): number {
  return dateEpoch(new Date(YMD));
}

/* Unixtime (seconds) to String (YYYY-MM-DD) */
export function epochYMD(epoch: number): string {
  return getYMD(new Date(epoch));
}

/* Date to String (YYYY-MM-DD) */
export function getYMD(date: Date): string {
  const y: number = date.getFullYear();
  const m: number = date.getMonth() + 1;
  const d: number = date.getDate();

  const year: string = String(y);
  const month: string = m < 10 ? `0${m}` : String(m);
  const day: string = d < 10 ? `0${d}` : String(d);

  return `${year}-${month}-${day}`;
}

/* Date to String JP (YYYY年MM月DD日) */
export function getYMDJP(date: Date): string {
  const y: number = date.getFullYear();
  const m: number = date.getMonth() + 1;
  const d: number = date.getDate();

  const year: string = String(y);
  const month: string = String(m);
  const day: string = String(d);

  return `${year}年${month}月${day}日`;
}

/* Check digits of Unixtime */
export function checkEpochDigits(unixtime: number, digits: number) {
  const isValid = String(unixtime).length >= digits;
  if (!isValid) console.warn('unixtime is invalid');
  return isValid;
}

/* Correct date 00:00 (GMT) to 24:00 (TBD) */
export function correctDate(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() / 60; // (hour)
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + (timezoneOffset + 24));
  return newDate;
}
