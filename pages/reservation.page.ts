import type { Page, Response } from '@playwright/test';

export type GuestFormData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

export class ReservationPage {
  constructor(private readonly page: Page) {}

  async goto(roomId: number, checkinIso: string, checkoutIso: string): Promise<void> {
    await this.page.goto(`/reservation/${roomId}?checkin=${checkinIso}&checkout=${checkoutIso}`);
  }

  async openBookingForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Reserve Now' }).first().click();
  }

  async fillGuestForm(data: GuestFormData): Promise<void> {
    await this.page.getByPlaceholder('Firstname').fill(data.firstname);
    await this.page.getByPlaceholder('Lastname').fill(data.lastname);
    await this.page.getByPlaceholder('Email').fill(data.email);
    await this.page.getByPlaceholder('Phone').fill(data.phone);
  }

  async submitBooking(): Promise<Response> {
    const bookingResponse = this.page.waitForResponse(
      (response) => response.request().method() === 'POST' && response.url().includes('/api/booking')
    );

    await this.page.getByRole('button', { name: 'Reserve Now' }).last().click();
    return bookingResponse;
  }

  async clickReserveInGuestForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Reserve Now' }).last().click();
  }

  bookingConfirmedBanner() {
    return this.page.getByText('Booking Confirmed');
  }

  bookingValidationError() {
    return this.page.getByText(/size must be between 11 and 21/i);
  }
}
