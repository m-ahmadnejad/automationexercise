# Automation Exercise Test Suite

[![Playwright Tests](https://github.com/m-ahmadnejad/automationexercise/actions/workflows/main.yml/badge.svg)](https://github.com/m-ahmadnejad/automationexercise/actions/workflows/main.yml)
[![Smoke Tests](https://github.com/m-ahmadnejad/automationexercise/actions/workflows/smoke.yml/badge.svg)](https://github.com/m-ahmadnejad/automationexercise/actions/workflows/smoke.yml)

An end-to-end, API, and integration test automation suite for [automationexercise.com](https://automationexercise.com), a public demo e-commerce site. Built with **Playwright** and **TypeScript**, using the Page Object Model, custom fixtures, and data-driven test design.

Built to practice designing a realistic test automation framework end to end - architecture, data-driven design, CI/CD pipelines, and debugging real failures - rather than just writing individual test cases.

**Author:** Mojgan Ahmadnejad ([@m-ahmadnejad](https://github.com/m-ahmadnejad))

## What this project demonstrates

- **UI, API, and integration testing** with Playwright, including tests that combine both layers (e.g. delete an account via UI, verify it's gone via API)
- **Page Object Model** with typed page classes (`pages/`) kept separate from test logic
- **Custom fixture composition** (`fixtures/`) for page objects, API-created test users, and reusable flows (login, checkout, payment)
- **Data-driven testing** with a builder-function pattern for negative/edge-case test data (`data/`), avoiding duplication across similar test cases
- **Tag-based test organization** (`@smoke`, `@regression`, `@negative`, `@ui`, `@api`, `@integration`, `@e2e`) so CI can run different subsets for different purposes
- **CI/CD with GitHub Actions**: full regression on every push/PR, a fast smoke suite, and an on-demand full regression run
- **TypeScript strict mode** with a working `typecheck` script

## Project structure

```
api/          API client functions, request/response types, and payload mappers
data/         Test data: valid/invalid cases, builder functions for edge cases
fixtures/     Custom Playwright fixtures (page objects, API-created users, flows)
pages/        Page Object Model classes - one per page/component
utils/        Shared test helpers (auth, cart, checkout, payment, signup flows)
test/
  ui/         UI-only tests, organized by feature (auth, cart, checkout, payment, account)
  api/        API-only tests
  integration/  Tests that cross the UI/API boundary
  e2e/        Full multi-step user journeys (signup -> cart -> checkout -> payment)
documents/    Personal notes on testing concepts and Playwright internals
```

## Test coverage

| Area | Coverage |
|---|---|
| Auth | Login/signup, valid + negative cases (native validation, duplicate email, invalid credentials) |
| Cart | Add/remove items, multi-item cart verification, empty-cart state |
| Checkout | Order review matching cart contents |
| Payment | Required-field validation, duplicate-submission prevention, refresh/navigation behavior, documented site limitations (`test.fixme`) |
| Account | Account deletion via UI and API, cross-layer verification |
| API | User creation, login verification, account deletion |
| Integration | UI actions verified via API and vice versa |
| E2E | Full signup-to-order-confirmation purchase flow |

## Getting started

**Requires Node 18+**

```bash
npm install
npx playwright install
```

### Running tests

```bash
npm test              # run the full suite (headless)
npm run test:headed   # run with a visible browser
npm run test:ui       # Playwright's interactive UI mode
npm run test:debug    # step through with the Playwright inspector
npm run report        # open the last HTML report
npm run typecheck     # type-check the project without running tests
```

Run a subset by tag:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

## CI/CD

- **`main.yml`** — runs the full suite on every push to `main` and every pull request (`--workers=1`, to avoid overloading the live demo site under test)
- **`smoke.yml`** — runs `@smoke`-tagged tests on push/PR for fast feedback
- **`regression.yml`** — runs the full `@regression`-tagged suite on demand (`workflow_dispatch`)

All workflows upload the HTML report as a build artifact for debugging failures.

## License

[MIT](LICENSE)
