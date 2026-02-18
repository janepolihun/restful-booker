import type { TestInfo } from '@playwright/test';

export type GuestDetails = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

export function createGuestDetails(suffix: string): GuestDetails {
  return {
    firstname: 'Jane',
    lastname: 'Doe',
    email: `jane.doe.${suffix.toLowerCase()}@example.com`,
    phone: '12345678901'
  };
}

export function deterministicSuffix(testInfo: TestInfo): string {
  const titleSlug = testInfo.title.replace(/[^a-zA-Z0-9]+/g, '-').slice(0, 24);
  return `${testInfo.parallelIndex}-${titleSlug}-${Date.now().toString().slice(-6)}`;
}
