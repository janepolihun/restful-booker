import type { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly availabilityCard: Locator;

  constructor(private readonly page: Page) {
    this.availabilityCard = this.page.locator('div.card').filter({
      hasText: 'Check Availability & Book Your Stay'
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async fillStayDates(checkinUi: string, checkoutUi: string): Promise<void> {
    const dateInputs = this.availabilityCard.locator('input[type="text"]');
    await dateInputs.nth(0).fill(checkinUi);
    await dateInputs.nth(1).fill(checkoutUi);
  }

  async checkAvailability(): Promise<void> {
    await this.availabilityCard.getByRole('button', { name: 'Check Availability' }).click();
  }

  async openRoomReservation(roomId: number): Promise<void> {
    await this.page
      .locator(`a[href*="/reservation/${roomId}?"]`)
      .filter({ hasText: 'Book now' })
      .first()
      .click();
  }
}
