# Test Strategy

## 1. Project Goal

This project is a Playwright automation practice project for Automation Exercise.  
The goal is to test core user journeys, API behaviour, UI validation, integration scenarios, and end-to-end order flows.

---

## 2. Test Folder Structure

```txt
tests/
  api/
    auth/
    account/

  ui/
    auth/
    account/
    cart/
    checkout/
    payment/

  integration/
    auth/
    account/

  e2e/
    order/  

Folder Rules
api/ → API-only validation
ui/ → UI/page/feature validation
integration/ → UI + API cross-layer validation
e2e/ → full user journey/business workflow

## 3. Tagging Strategy
-Feature Tags
@auth → login, logout, session, access control
@account → signup, delete account, duplicate email, account lifecycle
@cart → cart details, remove item, empty cart
@checkout → checkout page and order review
@payment → payment form, validation, payment state
@order → full purchase/order workflow
-Layer Tags
@api → API validation
@ui → UI validation
@integration → cross-layer UI + API validation
@e2e → full user journey
-Suite Tags
@smoke → fast critical checks
@regression → stable tests for broad coverage
@negative → invalid/forbidden behaviour is rejected

## 4. Negative Testing Strategy

A test is negative when the system must reject invalid or forbidden behaviour.

Examples:

invalid login
empty required payment fields
duplicate email
deleted user cannot login
logged-out user cannot access payment page
duplicate payment submission is prevented

Empty cart state is not negative because it is a valid supported state.

## 5. Smoke Testing Strategy

Smoke tests are small, fast, and critical.

Examples:

valid login
valid signup
simple successful order flow

Smoke tests should answer:

Is the application basically working?

## 6. Regression Testing Strategy
Regression tests protect existing functionality from breaking.
Most stable UI, API, integration, and E2E tests are tagged as:
@regression
Regression can be run before release or nightly in CI.

## 7. Test Data Strategy
Use unique test users where possible
Avoid shared accounts between tests
Use API helpers for setup and cleanup
Use builders and typed data files for maintainability
Tests should not depend on previous tests

## 8. Stability Strategy
To reduce flaky tests:
use stable locators
avoid hard waits
use Playwright auto-waiting
use Promise.all for navigation-triggering actions
clean cookies/localStorage/sessionStorage when needed
block or remove ads if they interfere
use traces and reports for debugging

## 9. CI/CD Execution Plan
Pull Request
Run smoke tests:
npx playwright test --grep @smoke
Nightly / Manual Regression
Run regression tests:
npx playwright test --grep @regression
Feature Debugging
Run by tag or folder:
npx playwright test --grep @paymentnpx playwright test tests/apinpx playwright test tests/e2e

## 10. Reporting and Debugging
Playwright report and trace viewer are used for debugging failures.
Recommended config:
reporter: [  ['html', { open: 'never' }],  ['list']],use: {  trace: 'retain-on-failure',  screenshot: 'only-on-failure',}
Generated folders should be ignored by Git:
playwright-report/test-results/
