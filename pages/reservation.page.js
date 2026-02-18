class ReservationPage {
  constructor(page) {
    this.page = page;
  }

  async goto(roomId, checkinIso, checkoutIso) {
    await this.page.goto(`/reservation/${roomId}?checkin=${checkinIso}&checkout=${checkoutIso}`);
  }

  async openBookingForm() {
    await this.page.getByRole('button', { name: 'Reserve Now' }).first().click();
  }

  async fillGuestForm(data) {
    await this.page.getByPlaceholder('Firstname').fill(data.firstname);
    await this.page.getByPlaceholder('Lastname').fill(data.lastname);
    await this.page.getByPlaceholder('Email').fill(data.email);
    await this.page.getByPlaceholder('Phone').fill(data.phone);
  }

  async submitBooking() {
    const bookingResponse = this.page.waitForResponse(
      (response) => response.request().method() === 'POST' && response.url().includes('/api/booking')
    );

    await this.page.getByRole('button', { name: 'Reserve Now' }).last().click();
    return bookingResponse;
  }

  async clickReserveInGuestForm() {
    await this.page.getByRole('button', { name: 'Reserve Now' }).last().click();
  }

  bookingConfirmedBanner() {
    return this.page.getByText('Booking Confirmed');
  }

  bookingValidationError() {
    return this.page.getByText(/size must be between 11 and 21/i);
  }
}

module.exports = {
  ReservationPage
};
