import { test } from '@playwright/test';
import { connect, disconnect } from './dbHelpers';
import { clearDB } from '../../backend/src/db';

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test.skip('can view things', async ({ page }) => {
  // TODO
});
