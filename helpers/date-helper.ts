export type BookingWindow = {
  checkinIso: string;
  checkoutIso: string;
  checkinUi: string;
  checkoutUi: string;
};

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function toUiDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

export function buildBookingWindow(checkinIso: string, nights: number): BookingWindow {
  const checkout = addDays(new Date(`${checkinIso}T00:00:00.000Z`), nights);
  const checkoutIso = toIsoDate(checkout);

  return {
    checkinIso,
    checkoutIso,
    checkinUi: toUiDate(checkinIso),
    checkoutUi: toUiDate(checkoutIso)
  };
}
