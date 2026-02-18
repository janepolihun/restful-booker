import type { APIRequestContext, APIResponse } from '@playwright/test';
import type {
  AuthTokenResponse,
  BookingPayload,
  CreatedBookingResponse
} from '../models/restful-booker.model';

export class RestfulBookerClient {
  constructor(private readonly request: APIRequestContext) {}

  async createToken(username: string, password: string): Promise<{ response: APIResponse; body: AuthTokenResponse }> {
    const response = await this.request.post('/auth', {
      data: { username, password }
    });

    const body = (await response.json()) as AuthTokenResponse;
    return { response, body };
  }

  async createBooking(payload: BookingPayload): Promise<{ response: APIResponse; body: CreatedBookingResponse }> {
    const response = await this.request.post('/booking', { data: payload });
    const body = (await response.json()) as CreatedBookingResponse;
    return { response, body };
  }

  async getBooking(bookingId: number): Promise<{ response: APIResponse; body: BookingPayload | string | null }> {
    const response = await this.request.get(`/booking/${bookingId}`);
    const contentType = response.headers()['content-type'] ?? '';
    const body = contentType.includes('application/json')
      ? ((await response.json()) as BookingPayload)
      : await response.text();
    return { response, body };
  }

  async updateBooking(
    bookingId: number,
    payload: BookingPayload,
    token: string
  ): Promise<{ response: APIResponse; body: BookingPayload }> {
    const response = await this.request.put(`/booking/${bookingId}`, {
      data: payload,
      headers: {
        Cookie: `token=${token}`
      }
    });

    const body = (await response.json()) as BookingPayload;
    return { response, body };
  }

  async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });
  }
}
