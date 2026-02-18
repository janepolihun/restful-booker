class AdminPage {
  constructor(page) {
    this.page = page;
  }

  async gotoRooms() {
    await this.page.goto('/admin/rooms');
  }

  async gotoLogin() {
    await this.page.goto('/admin');
  }
}

module.exports = {
  AdminPage
};
