import { test, expect } from '../../fixtures/test.fixture';
import { env } from '../../config/env';

test.describe('Admin Session Reuse (Bonus)', () => {
  test('reuses API token as browser cookie to access admin rooms without UI login', async ({
    page,
    context,
    automationApi,
    adminPage
  }) => {
    const authResult = await automationApi.createAdminToken(env.adminUsername, env.adminPassword);

    test.skip(authResult.status !== 200 || !authResult.token, 'Admin API credentials are not valid in this environment');
    const token = authResult.token as string;

    await context.addCookies([
      {
        name: 'token',
        value: token,
        domain: 'automationintesting.online',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'Lax'
      }
    ]);

    await adminPage.gotoRooms();

    await expect(page).toHaveURL(/\/admin\/rooms/);
    await expect(page.getByText('Room #')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });
});
