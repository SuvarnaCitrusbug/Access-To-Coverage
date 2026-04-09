import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ClientIntake1Page } from '../pages/client-intake1.page';
import { applicationMessages } from '../messages/messages';

test.describe('Client Intake Flow', () => {
  let clientIntake1Page: ClientIntake1Page;

  // This runs before EACH test case to set up the starting point
  test.beforeEach(async ({ page }) => {
    clientIntake1Page = new ClientIntake1Page(page);
    console.log('Setup: Navigating to URL and Starting Application');
    await clientIntake1Page.startApplication();
  });

  test('Verify navigation from Landing Page to Client Intake Page 1', async ({ page }) => {
    console.log('Test 1: Check that clicking Start Application reaches the form');
    
    // Verify that the navigation was successful
    await expect(page).toHaveURL(/.*stg-app.accesstocoverage.com.*/);
    
    // Check that at least one form element is visible, confirming we are on Intake Page 1
    await expect(clientIntake1Page.getEmailInput()).toBeVisible();
  });

  test('Fill out the Client Intake form Section-1', async () => {
    console.log('Test 2: Fill out all the form details');
    
    // Generate dynamic test data using faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const ssn = `${faker.string.numeric(3)}-${faker.string.numeric(2)}-${faker.string.numeric(4)}`;
    const phone = `(${faker.string.numeric(3)}) ${faker.string.numeric(3)}-${faker.string.numeric(4)}`;
    const email = faker.internet.email();

    console.log('Step 1: Filling in personal details');
    await clientIntake1Page.fillPersonalDetails(firstName, lastName, ssn);

    console.log('Step 2: Filling in address details');
    await clientIntake1Page.fillAddressDetails(applicationMessages.addressPartialSearch, applicationMessages.defaultZipCode);

    console.log('Step 3: Filling in contact details');
    await clientIntake1Page.fillContactDetails(phone, email);

    console.log('Step 4: Verifying input details');
    await expect(clientIntake1Page.getEmailInput()).toHaveValue(email);
  });
});
