import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ClientIntake1Page } from '../pages/client-intake1.page';
import { applicationMessages } from '../messages/messages';

test.describe('Client Intake Flow (Combined E2E)', () => {
  let clientIntakePage: ClientIntake1Page;

  test.beforeEach(async ({ page }) => {
    clientIntakePage = new ClientIntake1Page(page);
  });

  test('Complete End-to-End Client Intake and Payment', async ({ page }) => {
    // Override Playwright's default 30s timeout since we have massive manual wait loops
    test.setTimeout(300000); // 5 minutes timeout

    // ---------------------------------------------------------
    // PART 1: START AND INITIAL FORM
    // ---------------------------------------------------------
    console.log('Step 1: Navigating to landing page and starting application');
    await clientIntakePage.startApplication();
    
    // Verify successful navigation to the first section
    await expect(page).toHaveURL(/.*stg-app.accesstocoverage.com.*/);
    await expect(clientIntakePage.getEmailInput()).toBeVisible();

    console.log('Step 2: Filling out the core personal details (Section 1)');
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const ssn = `${faker.string.numeric(3)}-${faker.string.numeric(2)}-${faker.string.numeric(4)}`;
    const phone = `(${faker.string.numeric(3)}) ${faker.string.numeric(3)}-${faker.string.numeric(4)}`;
    const email = `${faker.internet.username().toLowerCase()}@yopmail.com`;
    
    // Insurance mock data
    const carrier = faker.company.name();
    const memberId = faker.string.alphanumeric(10).toUpperCase();
    const groupNumber = faker.string.alphanumeric(8).toUpperCase();

    await clientIntakePage.fillPersonalDetails(firstName, lastName, ssn);
    await clientIntakePage.fillAddressDetails(applicationMessages.addressPartialSearch, applicationMessages.defaultZipCode);
    await clientIntakePage.fillContactDetails(phone, email);
    
    console.log('Step 2b: Filling out insurance details');
    await clientIntakePage.fillInsuranceDetails(carrier, memberId, groupNumber);
    
    await expect(clientIntakePage.getEmailInput()).toHaveValue(email);

    // ---------------------------------------------------------
    // TRANSITION
    // ---------------------------------------------------------
    console.log('Step 3: Clicking Continue to transition to Section 2');
    await clientIntakePage.clickContinueToNextSection();

    // ---------------------------------------------------------
    // PART 2: SIGNATURE AND PAYMENT
    // ---------------------------------------------------------
    console.log('Step 4: Process the signature portion');
    await clientIntakePage.signAgreements();

    console.log('Step 5: Process Stripe payment details');
    await clientIntakePage.fillPaymentDetails(
      applicationMessages.stripeTestCard,
      applicationMessages.stripeTestExpiry,
      applicationMessages.stripeTestCvc
    );

    console.log('Step 6: Submit payment and finalize');
    await clientIntakePage.submitPaymentAndContinue();

    // Verify it navigates away from the success query param or lands on expected page
    await expect(page).not.toHaveURL(/.*payment=success.*/);

    // ---------------------------------------------------------
    // PART 3: OTP VERIFICATION
    // ---------------------------------------------------------
    console.log('Step 7: OTP Verification after Payment');
    await clientIntakePage.handleOtpVerification('');
    
  });
});
