export type BookingDates = {
  checkin: string;
  checkout: string;
};

export type BookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
};

export type CreatedBookingResponse = {
  bookingid: number;
  booking: BookingPayload;
};

export type AuthTokenResponse = {
  token: string;
};
