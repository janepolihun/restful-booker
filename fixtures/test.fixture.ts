import { test as base } from '@playwright/test';
import { AutomationPlatformClient, type AvailableRoomWindow } from '../api/client/automation-platform.client';
import { RestfulBookerClient } from '../api/client/restful-booker.client';
import { env } from '../config/env';
import { createGuestDetails, deterministicSuffix, type GuestDetails } from '../data/guest.factory';
import { AdminPage } from '../pages/admin.page';
import { HomePage } from '../pages/home.page';
import { ReservationPage } from '../pages/reservation.page';

type FrameworkFixtures = {
  homePage: HomePage;
  reservationPage: ReservationPage;
  adminPage: AdminPage;
  automationApi: AutomationPlatformClient;
  restfulBookerApi: RestfulBookerClient;
  availableRoomWindow: AvailableRoomWindow;
  guest: GuestDetails;
};

export const test = base.extend<FrameworkFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  reservationPage: async ({ page }, use) => {
    await use(new ReservationPage(page));
  },

  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },

  automationApi: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: env.uiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json'
      }
    });

    await use(new AutomationPlatformClient(request));
    await request.dispose();
  },

  restfulBookerApi: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: env.apiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    await use(new RestfulBookerClient(request));
    await request.dispose();
  },

  availableRoomWindow: async ({ automationApi }, use) => {
    const roomWindow = await automationApi.findAvailableRoomWindow({
      nights: 2,
      startOffsetDays: 30,
      searchDays: 180
    });

    await use(roomWindow);
  },

  guest: async ({}, use, testInfo) => {
    const suffix = deterministicSuffix(testInfo);
    await use(createGuestDetails(suffix));
  }
});

export { expect } from '@playwright/test';
