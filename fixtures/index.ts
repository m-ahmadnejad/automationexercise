import { test as base, expect } from '@playwright/test'

import { pageTestFixtures, type PageFixtures } from './page.fixture'
import { type ApiFixtures, apiTestFixture } from './api.fixtures'
import { flowTestFixtures,type FlowFixtures } from './flow.fixtures'

type TestFixtures = PageFixtures & ApiFixtures & FlowFixtures

export const test = base.extend<TestFixtures>({
  ...pageTestFixtures,
  ...apiTestFixture,
  ...flowTestFixtures,
})

export { expect }