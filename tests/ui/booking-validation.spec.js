const { test, expect } = require('../../fixtures/test.fixture');

test.describe('UI Booking Validation', () => {
  test('shows validation error for too short phone number and blocks successful booking', async ({
    reservationPage,
    availableRoomWindow,
    guest
  }) => {
    await reservationPage.goto(
      availableRoomWindow.roomId,
      availableRoomWindow.checkinIso,
      availableRoomWindow.checkoutIso
    );

    await reservationPage.openBookingForm();
    await reservationPage.fillGuestForm({
      ...guest,
      phone: '1234567890'
    });

    await reservationPage.clickReserveInGuestForm();
    await expect(reservationPage.bookingValidationError()).toBeVisible();
    await expect(reservationPage.bookingConfirmedBanner()).toHaveCount(0);
  });
});
