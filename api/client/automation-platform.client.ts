import type { APIRequestContext } from '@playwright/test';
import { addDays, buildBookingWindow, toIsoDate, type BookingWindow } from '../../helpers/date-helper';
import type {
  PlatformAuthResponse,
  Room,
  RoomListResponse,
  RoomUnavailableRange
} from '../models/automation-platform.model';

export type AvailableRoomWindow = BookingWindow & {
  roomId: number;
};

export class AutomationPlatformClient {
  constructor(private readonly request: APIRequestContext) {}

  async getRooms(): Promise<Room[]> {
    const response = await this.request.get('/api/room');
    const body = (await response.json()) as RoomListResponse;
    return body.rooms;
  }

  async getRoomUnavailability(roomId: number): Promise<RoomUnavailableRange[]> {
    const response = await this.request.get(`/api/report/room/${roomId}`);
    return (await response.json()) as RoomUnavailableRange[];
  }

  async createAdminToken(username: string, password: string): Promise<{ status: number; token?: string }> {
    const response = await this.request.post('/api/auth/login', {
      data: { username, password }
    });

    if (!response.ok()) {
      return { status: response.status() };
    }

    const body = (await response.json()) as PlatformAuthResponse;
    return { status: response.status(), token: body.token };
  }

  async findAvailableRoomWindow(options?: {
    roomIds?: number[];
    startOffsetDays?: number;
    nights?: number;
    searchDays?: number;
  }): Promise<AvailableRoomWindow> {
    const rooms = await this.getRooms();
    const roomIds = options?.roomIds ?? rooms.map((room) => room.roomid);
    const nights = options?.nights ?? 2;
    const startOffsetDays = options?.startOffsetDays ?? 30;
    const searchDays = options?.searchDays ?? 120;
    const startDate = addDays(new Date(), startOffsetDays);

    for (const roomId of roomIds) {
      const unavailableRanges = await this.getRoomUnavailability(roomId);

      for (let dayOffset = 0; dayOffset < searchDays; dayOffset += 1) {
        const checkinDate = addDays(startDate, dayOffset);
        const checkinIso = toIsoDate(checkinDate);
        const window = buildBookingWindow(checkinIso, nights);

        const intersects = unavailableRanges.some((range) => {
          return !(window.checkoutIso <= range.start || window.checkinIso >= range.end);
        });

        if (!intersects) {
          return { roomId, ...window };
        }
      }
    }

    throw new Error('No available room window found in configured search range');
  }
}
