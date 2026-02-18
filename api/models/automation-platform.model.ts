export type Room = {
  roomid: number;
  roomName: string;
  type: string;
  accessible: boolean;
  image: string;
  description: string;
  features: string[];
  roomPrice: number;
};

export type RoomListResponse = {
  rooms: Room[];
};

export type RoomUnavailableRange = {
  start: string;
  end: string;
  title: string;
};

export type PlatformBookingPayload = {
  roomid: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
};

export type PlatformBookingResponse = {
  bookingid: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
};

export type PlatformAuthResponse = {
  token: string;
};
