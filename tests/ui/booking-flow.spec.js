const { test, expect } = require('../../fixtures/test.fixture');

test.describe('UI Booking Flow', () => {
  test('guest can choose room, choose dates, submit booking, and see confirmation', async ({
    homePage,
    reservationPage,
    availableRoomWindow,
    guest
  }) => {
    await homePage.goto();
    await homePage.fillStayDates(availableRoomWindow.checkinUi, availableRoomWindow.checkoutUi);
    await homePage.checkAvailability();
    await homePage.openRoomReservation(availableRoomWindow.roomId);

    await reservationPage.openBookingForm();
    await reservationPage.fillGuestForm(guest);

    const bookingResponse = await reservationPage.submitBooking();
    expect(bookingResponse.status()).toBe(201);

    await expect(reservationPage.bookingConfirmedBanner()).toBeVisible();
    await expect(
      reservationPage.bookingConfirmedBanner().locator('..').getByText(availableRoomWindow.checkinIso)
    ).toBeVisible();
    await expect(
      reservationPage.bookingConfirmedBanner().locator('..').getByText(availableRoomWindow.checkoutIso)
    ).toBeVisible();
  });
});
