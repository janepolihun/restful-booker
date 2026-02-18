class HomePage {
  constructor(page) {
    this.page = page;
    this.availabilityCard = this.page.locator('div.card').filter({
      hasText: 'Check Availability & Book Your Stay'
    });
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillStayDates(checkinUi, checkoutUi) {
    const dateInputs = this.availabilityCard.locator('input[type="text"]');
    await dateInputs.nth(0).fill(checkinUi);
    await dateInputs.nth(1).fill(checkoutUi);
  }

  async checkAvailability() {
    await this.availabilityCard.getByRole('button', { name: 'Check Availability' }).click();
  }

  async openRoomReservation(roomId) {
    await this.page
      .locator(`a[href*="/reservation/${roomId}?"]`)
      .filter({ hasText: 'Book now' })
      .first()
      .click();
  }
}

module.exports = {
  HomePage
};
