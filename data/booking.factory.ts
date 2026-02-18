import type { BookingPayload } from '../api/models/restful-booker.model';
import { addDays, toIsoDate } from '../helpers/date-helper';

export function buildBookingPayload(seed: string): BookingPayload {
  const checkin = addDays(new Date(), 30);
  const checkout = addDays(checkin, 2);

  return {
    firstname: `Api${seed}`,
    lastname: `User${seed}`,
    totalprice: 222,
    depositpaid: true,
    bookingdates: {
      checkin: toIsoDate(checkin),
      checkout: toIsoDate(checkout)
    },
    additionalneeds: 'Breakfast'
  };
}
