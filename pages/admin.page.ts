import type { Page } from '@playwright/test';

export class AdminPage {
  constructor(private readonly page: Page) {}

  async gotoRooms(): Promise<void> {
    await this.page.goto('/admin/rooms');
  }

  async gotoLogin(): Promise<void> {
    await this.page.goto('/admin');
  }
}
