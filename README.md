# Playwright QA/SDET Framework (TypeScript)

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
- API automation (>=2 operations):
  - `create + get`
  - `update + delete`
- Bonus:
  - admin auth via API + browser cookie session reuse for `/admin/rooms`

## Project Structure

```text
.
├── api
│   ├── client
│   │   ├── automation-platform.client.ts
│   │   └── restful-booker.client.ts
│   └── models
│       ├── automation-platform.model.ts
│       └── restful-booker.model.ts
├── config
│   └── env.ts
├── data
│   ├── booking.factory.ts
│   └── guest.factory.ts
├── fixtures
│   └── test.fixture.ts
├── helpers
│   └── date-helper.ts
├── pages
│   ├── admin.page.ts
│   ├── home.page.ts
│   └── reservation.page.ts
├── tests
│   ├── admin
│   │   └── session-reuse.spec.ts
│   ├── api
│   │   ├── booking-create-get.spec.ts
│   │   └── booking-update-delete.spec.ts
│   └── ui
│       ├── booking-flow.spec.ts
│       └── booking-validation.spec.ts
├── playwright.config.ts
└── tsconfig.json
```

## Design Decisions
- Business-readable tests, interaction logic in Page Objects, assertions in specs.
- Typed API clients as a stable contract boundary for request/response handling.
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
# all Playwright tests
npm test

# UI only
npm run test:ui

# API only
npm run test:api

# bonus admin scenario
npm run test:admin

# legacy mocha suite (from original repo)
npm run test:legacy
```

## Environment Variables
- `UI_BASE_URL` (default: `https://automationintesting.online`)
- `API_BASE_URL` (default: `https://restful-booker.herokuapp.com`)
- `ADMIN_USERNAME` (default: `admin`)
- `ADMIN_PASSWORD` (default: `password`)

## CI
Example GitHub Actions workflow: `.github/workflows/playwright.yml`

Pipeline steps:
1. install deps
2. install Playwright browser
3. run API tests
4. run UI tests
5. run bonus admin test
6. upload Playwright HTML report

## Known Constraints
- External demo environments can change data/content without notice.
- UI availability is stateful; framework mitigates this by querying room availability before booking.
- Bonus admin test depends on valid admin creds for the target environment.

## Interview Walkthrough
### 1) Architecture
- `pages/` encapsulate UI interactions only.
- `api/client/` encapsulate all HTTP behavior and auth mechanics.
- `fixtures/` inject ready-to-use abstractions to keep specs small and expressive.
- `data/` factories create deterministic test inputs with safe uniqueness.

### 2) Key Decisions
- Kept architecture intentionally lightweight: only abstractions that reduce duplication in 3-day window.
- Used role/text/href-based selectors with explicit waits and response synchronization.
- Used API-backed availability discovery to remove date-related flakes from booking flow.

### 3) Flaky Reduction
- deterministic booking window selection via API
- assertions on explicit, user-visible states (`Booking Confirmed`, validation error)
- network synchronization for critical mutation (`POST /api/booking`)
- retry/trace/video/screenshot configured in Playwright

### 4) Timebox Tradeoffs
- prioritized reliability and maintainability over broad scenario count
- implemented one high-value full E2E + one validation risk scenario
- bonus admin scenario delivered, but treated as environment-dependent

### 5) How to Scale
- add domain-specific API clients per bounded context
- add tags/projects for smoke/regression/parallel shards
- move shared assertions into assertion helpers when duplication appears
- add contract/schema validation on API responses

### 6) Likely Interview Questions (short strong answers)
1. Why Page Objects and not Screenplay?
   - For this scope, Page Objects provide enough structure with lower overhead and faster onboarding.
2. How did you handle unstable test data?
   - Deterministic availability lookup via API + unique guest identities per test.
3. Why keep assertions in tests?
   - Keeps intent visible to reviewers and avoids “hidden assertions” anti-pattern in page methods.
4. How would you speed up CI at scale?
   - Split API/UI projects, shard by file, run smoke on PR and full regression nightly.
5. What would be your next improvement?
   - Add observability hooks (request/response logs on failure) and richer reporting with trace links.
