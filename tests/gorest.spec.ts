import { test, expect } from '../src/lib/fixtures';

test('gorest: user 8351724 exists', async ({ gorest }) => {
  const res = await gorest.get('users/8351724.json');
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.id).toBe(8351724);
});

