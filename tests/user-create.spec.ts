import { test, expect } from '../src/lib/fixtures';
import { generateUserPayload } from './helpers/userPayload';

test('create user and verify it exists', async ({ gorest }) => {
  const payload = generateUserPayload();

  // Create user
  const createRes = await gorest.post('users.json', { data: payload });
  const createBody = await createRes.json();
  expect(createRes.status()).toBe(201);
  expect(createBody).toHaveProperty('id');
  const userId = createBody.id;

  // Verify user exists
  const getRes = await gorest.get(`users/${userId}.json`);
  expect(getRes.status()).toBe(200);
  const getBody = await getRes.json();
  expect(getBody.id).toBe(userId);
  expect(getBody.email).toBe(payload.email);
  expect(getBody.name).toBe(payload.name);
});

test('create user with invalid email should fail', async ({ gorest }) => {
  const payload = generateUserPayload({ email: 'not-an-email' });
  const res = await gorest.post('users.json', { data: payload });
  expect(res.status()).toBe(422);
});

test('creating two users with same email: second should fail', async ({ gorest }) => {
  const payload = generateUserPayload();
  const res1 = await gorest.post('users.json', { data: payload });
  expect(res1.status()).toBe(201);

  const res2 = await gorest.post('users.json', { data: payload });
  expect(res2.status()).toBe(422);
});

test('create user with invalid gender should fail', async ({ gorest }) => {
  const payload = generateUserPayload({ gender: 'other' });
  const res = await gorest.post('users.json', { data: payload });
  expect(res.status()).toBe(422);
});

test('create user with invalid status should fail', async ({ gorest }) => {
  const payload = generateUserPayload({ status: 'pending' });
  const res = await gorest.post('users.json', { data: payload });
  expect(res.status()).toBe(422);
});

test('create user with missing required field should fail', async ({ gorest }) => {
  const payload = generateUserPayload();
  // @ts-expect-error - intentionally deleting required field for negative test
  delete payload.email;
  const res = await gorest.post('users.json', { data: payload });
  expect(res.status()).toBe(422);
});

test('create user with an additional unexpected field should succeed', async ({ gorest }) => {
  const payload = generateUserPayload();
  // @ts-ignore extra arbitrary field
  payload.extra = 'some-value';
  const res = await gorest.post('users.json', { data: payload });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body).toHaveProperty('id');
});

