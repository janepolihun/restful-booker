# Playwright QA/SDET Framework (JavaScript)

Production-style UI + API test framework for the QA/SDET assignment.

Target systems:
- UI: `https://automationintesting.online/`
- API: `https://restful-booker.herokuapp.com`

## Scope Delivered
- UI E2E booking flow:
  - choose room
  - choose check-in/check-out dates
  - fill guest details
  - submit booking
  - verify confirmation state in UI
- Extra UI risk scenario:
  - phone validation prevents successful booking confirmation
- API automation:
  - `create + get`
  - `update + delete`
- Bonus:
  - admin auth via API + browser cookie session reuse for `/admin/rooms`

## Project Structure

```text
.
├── api
│   └── client
│       ├── automation-platform.client.js
│       └── restful-booker.client.js
├── config
│   └── env.js
├── data
│   ├── booking.factory.js
│   └── guest.factory.js
├── fixtures
│   └── test.fixture.js
├── helpers
│   └── date-helper.js
├── pages
│   ├── admin.page.js
│   ├── home.page.js
│   └── reservation.page.js
├── tests
│   ├── admin
│   │   └── session-reuse.spec.js
│   ├── api
│   │   ├── booking-create-get.spec.js
│   │   └── booking-update-delete.spec.js
│   └── ui
│       ├── booking-flow.spec.js
│       └── booking-validation.spec.js
└── playwright.config.js
```

## Design Decisions
- Business-readable tests, interaction logic in Page Objects, assertions in specs.
- Reusable API clients as a contract boundary for request/response handling.
- Deterministic date strategy:
  - room availability discovered via `/api/report/room/:id`
  - first free 2-night window selected dynamically
  - avoids conflicts/flaky tests from pre-booked dates.
- Custom fixtures centralize setup (pages, API clients, test data) and reduce duplication.

## Setup

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
npm test
npm run test:ui
npm run test:api
npm run test:admin
npm run test:legacy
```

## Environment Variables
- `UI_BASE_URL` (default: `https://automationintesting.online`)
- `API_BASE_URL` (default: `https://restful-booker.herokuapp.com`)
- `ADMIN_USERNAME` (default: `admin`)
- `ADMIN_PASSWORD` (default: `password`)

## CI
Example workflow: `.github/workflows/playwright.yml`

## Known Constraints
- External demo environments can change data/content without notice.
- UI availability is stateful; framework mitigates this by querying room availability before booking.
- Bonus admin test depends on valid admin creds for the target environment.
