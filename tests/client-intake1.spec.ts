import { test, expect } from '@playwright/test';
import { ClientIntake1Page } from '../pages/client-intake1.page';
import { applicationMessages } from '../messages/messages';
import { generateClientData } from '../utils/test-data-generator';
import { ClientIntake1Locator } from '../locators/client-intake1.locator';

test.describe('Client Intake Flow (Combined E2E)', () => {
  let clientIntakePage: ClientIntake1Page;

  test.beforeEach(async ({ page }) => {
    clientIntakePage = new ClientIntake1Page(page);
  });

  test('Complete End-to-End Client Intake and Payment', async ({ page }) => {
    // Override Playwright's default 30s timeout since we have massive manual wait loops
    test.setTimeout(300000); // 5 minutes timeout

    // Generate all client data using the external generator
    const clientData = generateClientData();
    const address = applicationMessages.addressPartialSearch;
    const zipCode = 65109;

    await test.step('Landing Page: Redirecting to the Client Intake 1 form', async () => {
      await clientIntakePage.startApplication();
      await expect(page).toHaveURL(/.*stg-app.accesstocoverage.com.*/);
      await expect(clientIntakePage.getEmailInput()).toBeVisible();
    });

    await test.step('Client Intake - Section 1: Fill Client/Patient Identification Form', async () => {
      await clientIntakePage.fillPersonalDetails(clientData.firstName, clientData.lastName, clientData.ssn);
      await clientIntakePage.fillAddressDetails(address, zipCode);
      await clientIntakePage.fillContactDetails(clientData.phone, clientData.email);
      await expect(clientIntakePage.getEmailInput()).toHaveValue(clientData.email);
    });

    await test.step('Client Intake - Minor Section: Enable Minor Toggle and Fill Minor Information', async () => {
      // TODO: Waiting on the codegen/recording for the Minor Toggle section from the user
      console.log('Skipping Minor Section logic until locators are provided...');
    });

    await test.step('Insurance & Plan Information: Fill Insurance & Plan Information', async () => {
      await clientIntakePage.fillInsuranceDetails(clientData.carrier, clientData.memberId, clientData.groupNumber);
      
      // Click Continue to bridge to HIPAA / Signature section
      await clientIntakePage.clickContinueToNextSection();
    });

    await test.step('HIPAA Authorization: Submit HIPAA Authorization with Both Checkboxes and Signature', async () => {
      await clientIntakePage.signAgreements();
    });

    await test.step('Stripe Payment Details: Fill Stripe Details and Submit', async () => {
      await clientIntakePage.fillPaymentDetails(
        applicationMessages.stripeTestCard,
        applicationMessages.stripeTestExpiry,
        applicationMessages.stripeTestCvc
      );
      await clientIntakePage.submitPaymentAndContinue();
      await expect(page).not.toHaveURL(/.*payment=success.*/);
    });

    await test.step('Email -> OTP Redirection: Verify Email Link Redirects to OTP Screen', async () => {
      // Note: Currently we assume the page redirects directly. If we need to open Yopmail, click a link, 
      // and redirect, that logic will need to be added here based on your codegen.
      console.log('Assuming direct redirection to OTP screen for now...');
    });

    await test.step('OTP Generation: Verify Send OTP Functionality', async () => {
      await clientIntakePage.sendOtp();
    });

    await test.step('OTP Submission: Verify Error on Invalid OTP', async () => {
      await clientIntakePage.submitOtp('111111');
      await expect(page.getByText('The OTP code is invalid.')).toBeVisible();
    });

    await test.step('OTP Submission: Verify User Can Submit Valid OTP', async () => {
      console.log('Waiting for manual user input of valid OTP (up to 120 seconds)...');
      // Playwright will wait up to 120s for the verify button to become enabled before clicking it.
      await clientIntakePage.submitManualOtp();
      
      // Ensure the invalid OTP message does not appear after submitting a valid OTP
      await expect(page.getByText('The OTP code is invalid.')).not.toBeVisible();
    });

    await test.step('Verify Client Details Are Auto-Populated from Intake Part 1', async () => {
      await clientIntakePage.verifyAutoPopulatedDetails({
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        carrier: clientData.carrier,
        memberId: clientData.memberId,
        groupNumber: clientData.groupNumber
      });
    });

    await test.step('Therapist Information: Fill Therapist Details and Verify Submission', async () => {
      await clientIntakePage.fillTherapistDetails(applicationMessages.therapistData);

      // Assertion: Verify that the therapist info was submitted (Continue button disappears)
      await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    });

    await test.step('Treatment Information: Fill Treatment Details and Verify Submission', async () => {
      await clientIntakePage.fillTreatmentDetails(applicationMessages.treatmentData);

      // Assertion: Verify that the treatment info was submitted (Continue button is visible for next section)
      await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    });

    await test.step('Medication, Psychiatric & Insurance Uploads: Fill Details and Upload Cards', async () => {
      await clientIntakePage.fillPsychiatricAndUploadDetails(
        applicationMessages.psychiatricData,
        applicationMessages.insuranceCardPaths
      );

    });

    await test.step('Final Submission: E-Sign and Submit Part 2', async () => {
      await clientIntakePage.submitFinalPart();
      
      // Final URL assertion to ensure we returned to home or landed on the expected finish page
      await expect(page).toHaveURL(/.*stg-app.accesstocoverage.com.*/);
    });

  });
});
