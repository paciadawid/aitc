import { faker } from '@faker-js/faker';

export function generateUserPayload(overrides?: Partial<{ name: string; email: string; gender: string; status: string }>) {
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  const name = `${first} ${last}`;
  const email = faker.internet.email({ firstName: first, lastName: last }).toLowerCase();
  const payload = { name, email, gender: 'male', status: 'active' };
  return { ...payload, ...(overrides ?? {}) };
}

