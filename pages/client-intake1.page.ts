import { Page, Locator, expect } from '@playwright/test';
import { ClientIntake1Locator } from '../locators/client-intake1.locator';
import { applicationMessages } from '../messages/messages';

export class ClientIntake1Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Helper method for conditional locator resolution on the main page.
   */
  private resolveLocator(locatorDef: any): Locator {
    if (typeof locatorDef === 'string') {
      return this.page.locator(locatorDef);
    }
    const { role, ...options } = locatorDef;
    return this.page.getByRole(role, options);
  }

  /**
   * Helper method for conditional locator resolution inside an iframe.
   */
  private resolveIframeLocator(iframeSelector: string, locatorDef: any): Locator {
    const frame = this.page.frameLocator(iframeSelector);
    if (typeof locatorDef === 'string') {
      return frame.locator(locatorDef);
    }
    const { role, ...options } = locatorDef;
    return frame.getByRole(role, options);
  }

  // ==========================================
  // PART 1 METHODS (PERSONAL INFO)
  // ==========================================

  async startApplication() {
    console.log('START: startApplication method');
    await this.page.goto(applicationMessages.appUrl);
    await this.resolveLocator(ClientIntake1Locator.startApplicationButton).click();
    console.log('END: startApplication method');
  }

  async fillPersonalDetails(firstName: string, lastName: string, ssn: string) {
    console.log('START: fillPersonalDetails method');

    await this.resolveLocator(ClientIntake1Locator.firstNameInput).click();
    await this.resolveLocator(ClientIntake1Locator.firstNameInput).fill(firstName);

    await this.resolveLocator(ClientIntake1Locator.lastNameInput).click();
    await this.resolveLocator(ClientIntake1Locator.lastNameInput).fill(lastName);

    await this.resolveLocator(ClientIntake1Locator.dobInput).click();
    await this.resolveLocator(ClientIntake1Locator.openDatePickerButton).click();
    await this.resolveLocator(ClientIntake1Locator.dateGridCell).click();

    await this.resolveLocator(ClientIntake1Locator.ssnInput).click();
    await this.resolveLocator(ClientIntake1Locator.ssnInput).fill(ssn);

    console.log('END: fillPersonalDetails method');
  }

  async fillAddressDetails(addressPartial: string, zipCode: number) {
    console.log('START: fillAddressDetails method');

    await this.resolveLocator(ClientIntake1Locator.homeAddressCombobox).click();
    await this.resolveLocator(ClientIntake1Locator.homeAddressCombobox).fill(addressPartial);
    await this.page.waitForTimeout(5000);
    await this.resolveLocator(ClientIntake1Locator.addressSuggestionText).click();


    console.log('END: fillAddressDetails method');
  }

  async fillContactDetails(phone: string, email: string) {
    console.log('START: fillContactDetails method');

    await this.resolveLocator(ClientIntake1Locator.phoneInput).click();
    await this.resolveLocator(ClientIntake1Locator.phoneInput).fill(phone);

    await this.resolveLocator(ClientIntake1Locator.emailInput).click();
    await this.resolveLocator(ClientIntake1Locator.emailInput).fill(email);
    await this.page.waitForTimeout(20000);

    console.log('END: fillContactDetails method');
  }

  async fillInsuranceDetails(carrier: string, memberId: string, groupNumber: string) {
    console.log('START: fillInsuranceDetails method');

    await this.resolveLocator(ClientIntake1Locator.insuranceCarrierInput).click();
    await this.resolveLocator(ClientIntake1Locator.insuranceCarrierInput).fill(carrier);

    await this.resolveLocator(ClientIntake1Locator.memberIdInput).click();
    await this.resolveLocator(ClientIntake1Locator.memberIdInput).fill(memberId);

    await this.resolveLocator(ClientIntake1Locator.groupNumberInput).click();
    await this.resolveLocator(ClientIntake1Locator.groupNumberInput).fill(groupNumber);

    console.log('END: fillInsuranceDetails method');
  }

  /**
   * Clicks the Continue button to transition from Section 1 to Section 2
   */
  async clickContinueToNextSection() {
    console.log('START: clickContinueToNextSection method');
    await this.resolveLocator(ClientIntake1Locator.continueButton).click();
    console.log('END: clickContinueToNextSection method');
  }

  getEmailInput(): Locator {
    return this.resolveLocator(ClientIntake1Locator.emailInput);
  }

  // ==========================================
  // PART 2 METHODS (PAYMENT AND SIGNS)
  // ==========================================

  async signAgreements() {
    console.log('START: signAgreements method');

    await this.resolveLocator(ClientIntake1Locator.readAndUnderstandCheckbox).click();
    await this.resolveLocator(ClientIntake1Locator.readUnderstoodLabel).click();

    const signaturePad = this.resolveLocator(ClientIntake1Locator.signatureCanvas);

    // Get the bounding box of the canvas to calculate relative mouse movements
    const box = await signaturePad.boundingBox();
    if (box) {
      const startX = box.x + 50;
      const startY = box.y + box.height / 2;

      // Simulate drawing a continuous digital signature (a zigzag line representing "test")
      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down(); // Start drawing
      await this.page.mouse.move(startX + 30, startY - 20, { steps: 5 });
      await this.page.mouse.move(startX + 60, startY + 20, { steps: 5 });
      await this.page.mouse.move(startX + 90, startY - 15, { steps: 5 });
      await this.page.mouse.move(startX + 120, startY + 15, { steps: 5 });
      await this.page.mouse.move(startX + 150, startY - 10, { steps: 5 });
      await this.page.mouse.move(startX + 180, startY + 10, { steps: 5 });
      await this.page.mouse.up(); // Stop drawing
    }

    console.log('END: signAgreements method');
  }

  async fillPaymentDetails(cardNumber: string, expiryDate: string, cvc: string) {
    console.log('START: fillPaymentDetails method');

    const iframeSelector = ClientIntake1Locator.stripeIframe;

    await this.resolveIframeLocator(iframeSelector, ClientIntake1Locator.cardNumberInput).click();
    await this.resolveIframeLocator(iframeSelector, ClientIntake1Locator.cardNumberInput).fill(cardNumber);

    await this.resolveIframeLocator(iframeSelector, ClientIntake1Locator.cardExpiryInput).click();
    await this.resolveIframeLocator(iframeSelector, ClientIntake1Locator.cardExpiryInput).fill(expiryDate);

    await this.resolveIframeLocator(iframeSelector, ClientIntake1Locator.cardCvcInput).click();
    await this.resolveIframeLocator(iframeSelector, ClientIntake1Locator.cardCvcInput).fill(cvc);

    console.log('END: fillPaymentDetails method');
  }

  async submitPaymentAndContinue() {
    console.log('START: submitPaymentAndContinue method');

    await this.resolveLocator(ClientIntake1Locator.payButton).click();
    await this.page.waitForURL(/.*payment=success.*/, { timeout: 15000 });
    await this.resolveLocator(ClientIntake1Locator.continueToPart2Button).click();

    console.log('END: submitPaymentAndContinue method');
  }

  getContinueButton(): Locator {
    return this.resolveLocator(ClientIntake1Locator.continueToPart2Button);
  }

  // ==========================================
  // PART 3 METHODS (OTP VERIFICATION)
  // ==========================================

  async sendOtp() {
    console.log('START: sendOtp method');
    await this.resolveLocator(ClientIntake1Locator.sendOtpButton).click();
    console.log('END: sendOtp method');
  }

  async submitOtp(otp: string) {
    console.log('START: submitOtp method');
    await this.resolveLocator(ClientIntake1Locator.otpTextbox).clear();
    await this.resolveLocator(ClientIntake1Locator.otpTextbox).fill(otp);
    await this.resolveLocator(ClientIntake1Locator.verifyOtpButton).click();
    console.log('END: submitOtp method');
  }

  async submitManualOtp(timeout: number = 10000) {
    console.log('START: submitManualOtp method');
    // Ensure all previous digits (like '111111') are removed before entering the new code
    await this.resolveLocator(ClientIntake1Locator.otpTextbox).clear();
    await this.resolveLocator(ClientIntake1Locator.otpTextbox).fill('000000');
    await this.resolveLocator(ClientIntake1Locator.verifyOtpButton).click({ timeout });
    console.log('END: submitManualOtp method');
  }

  // ==========================================
  // PART 4 METHODS (VERIFICATION)
  // ==========================================

  async verifyAutoPopulatedDetails(expectedData: {
    firstName: string;
    lastName: string;
    carrier: string;
    memberId: string;
    groupNumber: string;
  }) {
    console.log('START: verifyAutoPopulatedDetails method', expectedData);

    // Wait for the first auto-populated field to become visible to ensure page navigation is complete after OTP
    await expect(this.resolveLocator(ClientIntake1Locator.autoPopulatedFirstName)).toBeVisible({ timeout: 15000 });

    // Using soft assertions so we can see all failures if multiple fields are wrong
    await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedFirstName)).toHaveValue(expectedData.firstName);
    await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedLastName)).toHaveValue(expectedData.lastName);

    await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedZipCode)).toHaveValue('65109');

    await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedInsuranceCarrier)).toHaveValue(expectedData.carrier);
    await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedMemberId)).toHaveValue(expectedData.memberId);

    if (expectedData.groupNumber) {
      await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedGroupNumber)).toHaveValue(expectedData.groupNumber);
    }

    // Note: City and Date of Birth were not explicitly captured as specific strings in Part 1 
    // (e.g. DoB is just a click on a grid cell, City is auto-filled by Google Maps API), 
    // so we can assert they are not empty.
    await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedCity)).not.toBeEmpty();
    await expect.soft(this.resolveLocator(ClientIntake1Locator.autoPopulatedDob)).not.toBeEmpty();

    console.log('END: verifyAutoPopulatedDetails method');
  }

  // ==========================================
  // THERAPIST INFORMATION METHODS
  // ==========================================

  async fillTherapistDetails(details: {
    firstName: string;
    lastName: string;
    email: string;
    licenseType: string;
    licenseNumber: string;
    npi: string;
    taxId: string;
    practiceName: string;
    addressSearch: string;
    phone: string;
  }) {
    console.log('START: fillTherapistDetails method');

    await this.resolveLocator(ClientIntake1Locator.therapistFirstNameInput).click();
    await this.resolveLocator(ClientIntake1Locator.therapistFirstNameInput).fill(details.firstName);

    await this.resolveLocator(ClientIntake1Locator.therapistLastNameInput).click();
    await this.resolveLocator(ClientIntake1Locator.therapistLastNameInput).fill(details.lastName);

    await this.resolveLocator(ClientIntake1Locator.therapistEmailInput).click();
    await this.resolveLocator(ClientIntake1Locator.therapistEmailInput).fill(details.email);

    await this.resolveLocator(ClientIntake1Locator.licenseTypeInput).click();
    await this.resolveLocator(ClientIntake1Locator.licenseTypeInput).fill(details.licenseType);

    await this.resolveLocator(ClientIntake1Locator.licenseNumberInput).click();
    await this.resolveLocator(ClientIntake1Locator.licenseNumberInput).fill(details.licenseNumber);

    await this.resolveLocator(ClientIntake1Locator.npiInput).click();
    await this.resolveLocator(ClientIntake1Locator.npiInput).fill(details.npi);

    await this.resolveLocator(ClientIntake1Locator.taxIdInput).click();
    await this.resolveLocator(ClientIntake1Locator.taxIdInput).fill(details.taxId);

    await this.resolveLocator(ClientIntake1Locator.practiceNameInput).click();
    await this.resolveLocator(ClientIntake1Locator.practiceNameInput).fill(details.practiceName);

    await this.resolveLocator(ClientIntake1Locator.practiceAddressCombobox).click();
    await this.resolveLocator(ClientIntake1Locator.practiceAddressCombobox).fill(details.addressSearch);
    await this.resolveLocator(ClientIntake1Locator.addressSuggestion).click();

    await this.resolveLocator(ClientIntake1Locator.therapistPhoneInput).click();
    await this.resolveLocator(ClientIntake1Locator.therapistPhoneInput).fill(details.phone);

    await this.resolveLocator(ClientIntake1Locator.continueButton).click();

    console.log('END: fillTherapistDetails method');
  }

  // ==========================================
  // TREATMENT INFORMATION METHODS
  // ==========================================

  async fillTreatmentDetails(details: any) {
    console.log('START: fillTreatmentDetails method');

    await this.resolveLocator(ClientIntake1Locator.duration6MonthsRadio).click();
    await this.resolveLocator(ClientIntake1Locator.frequencyTwicePerWeekRadio).click();

    await this.resolveLocator(ClientIntake1Locator.feePerSessionInput).click();
    await this.resolveLocator(ClientIntake1Locator.feePerSessionInput).fill(details.feePerSession);

    await this.resolveLocator(ClientIntake1Locator.telehealthRadio).click();
    await this.resolveLocator(ClientIntake1Locator.telehealthExplanationInput).fill(details.telehealthExplanation);

    await this.resolveLocator(ClientIntake1Locator.coverageStartDateInput).click();
    await this.resolveLocator(ClientIntake1Locator.openDatePickerButton).click();
    await this.page.getByRole('gridcell', { name: details.coverageStartDateDay, exact: true }).click();

    await this.resolveLocator(ClientIntake1Locator.primaryDiagnosisCodeInput).click();
    await this.resolveLocator(ClientIntake1Locator.primaryDiagnosisCodeInput).fill(details.primaryDiagnosisCode);

    await this.resolveLocator(ClientIntake1Locator.secondaryDiagnosisCodeInput).fill(details.secondaryDiagnosisCode);

    await this.resolveLocator(ClientIntake1Locator.cptCodesInput).click();
    await this.resolveLocator(ClientIntake1Locator.cptCodesInput).fill(details.cptCodes);

    await this.resolveLocator(ClientIntake1Locator.continuingTreatmentExplanationInput).click();
    await this.resolveLocator(ClientIntake1Locator.continuingTreatmentExplanationInput).fill(details.continuingTreatmentExplanation);

    // Barriers checkboxes
    for (const barrier of details.barriers) {
      await this.page.getByRole('checkbox', { name: barrier }).click();
    }

    await this.resolveLocator(ClientIntake1Locator.otherBarriersExplanationInput).fill(details.otherBarriersExplanation);

    await this.resolveLocator(ClientIntake1Locator.medicalSurgicalLimitedExplanationInput).fill(details.medicalSurgicalLimitedExplanation);

    await this.resolveLocator(ClientIntake1Locator.clinicallyRelevantExplanationInput).click();
    await this.resolveLocator(ClientIntake1Locator.clinicallyRelevantExplanationInput).fill(details.clinicallyRelevantExplanation);

    await this.resolveLocator(ClientIntake1Locator.preferredLanguageInput).click();
    await this.resolveLocator(ClientIntake1Locator.preferredLanguageInput).fill(details.preferredLanguage);

    await this.resolveLocator(ClientIntake1Locator.culturalReligiousExplanationInput).click();
    await this.resolveLocator(ClientIntake1Locator.culturalReligiousExplanationInput).fill(details.culturalReligiousExplanation);

    await this.resolveLocator(ClientIntake1Locator.disruptionImpactExplanationInput).click();
    await this.resolveLocator(ClientIntake1Locator.disruptionImpactExplanationInput).fill(details.disruptionImpactExplanation);

    await this.resolveLocator(ClientIntake1Locator.specificTrainingDescriptionInput).click();
    await this.resolveLocator(ClientIntake1Locator.specificTrainingDescriptionInput).fill(details.specificTrainingDescription);

    await this.resolveLocator(ClientIntake1Locator.therapeuticApproachExplanationInput).click();
    await this.resolveLocator(ClientIntake1Locator.therapeuticApproachExplanationInput).fill(details.therapeuticApproachExplanation);

    await this.resolveLocator(ClientIntake1Locator.continueButton).click();

    console.log('END: fillTreatmentDetails method');
  }

  // ==========================================
  // PSYCHIATRIC & FILE UPLOAD METHODS
  // ==========================================

  async fillPsychiatricAndUploadDetails(details: any, filePaths: { front: string, back: string }) {
    console.log('START: fillPsychiatricAndUploadDetails method');
    const path = require('path');

    // Medication & Psychiatric 'Yes'
    await this.resolveLocator(ClientIntake1Locator.medicationRegionYesRadio).getByLabel('Yes').click();
    await this.resolveLocator(ClientIntake1Locator.medicationListInput).fill(details.medicationList);

    // Coordination and Adjustment
    await this.resolveLocator(ClientIntake1Locator.coordYesRadio).click();
    await this.resolveLocator(ClientIntake1Locator.adjustYesRadio).click();

    // Mental health services checkboxes
    for (const service of details.mentalHealthServices) {
      await this.page.getByRole('checkbox', { name: service, exact: false }).click();
    }

    await this.resolveLocator(ClientIntake1Locator.serviceExplanationInput).click();
    await this.resolveLocator(ClientIntake1Locator.serviceExplanationInput).fill(details.serviceExplanation);

    await this.resolveLocator(ClientIntake1Locator.primarySymptomDescriptionInput).click();
    await this.resolveLocator(ClientIntake1Locator.primarySymptomDescriptionInput).fill(details.primarySymptomDescription);

    // Risk checkboxes
    for (const risk of details.risks) {
      // Use a more flexible locator for risks as some might be divs or checkboxes
      const riskLocator = this.page.locator('div, [role="checkbox"]').filter({ hasText: new RegExp(`^${risk}`, 'i') }).first();
      await riskLocator.click();
    }

    await this.resolveLocator(ClientIntake1Locator.higherLevelCareExplanationInput).click();
    await this.resolveLocator(ClientIntake1Locator.higherLevelCareExplanationInput).fill(details.higherLevelCareExplanation);

    await this.resolveLocator(ClientIntake1Locator.priorDenialsExplanationInput).fill(details.priorDenialsExplanation);

    // Consent must be clicked before uploads
    await this.resolveLocator(ClientIntake1Locator.electronicConsentCheckbox).click();

    // File Uploads
    const uploadFile = async (text: string, filePath: string) => {
      const fullPath = path.resolve(filePath);
      console.log(`Triggering upload for: ${text}`);
      const [fileChooser] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        this.page.locator('div').filter({ hasText: new RegExp(`^${text}$`) }).first().click(),
      ]);
      await fileChooser.setFiles(fullPath);
    };

    await uploadFile('Click to upload front of insurance card', filePaths.front);
    await uploadFile('Click to upload back of insurance card', filePaths.back);

    // Verify consent is still checked before we transition
    await expect(this.getElectronicConsentCheckbox()).toBeChecked();

    // Click the final Continue div to transition out of the upload section
    // Wait for the upload process to settle and button to be active


    console.log('END: fillPsychiatricAndUploadDetails method');
    console.log('START: submitFinalPart method');
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  getElectronicConsentCheckbox(): Locator {
    return this.resolveLocator(ClientIntake1Locator.electronicConsentCheckbox);
  }

  // ==========================================
  // FINAL SUBMISSION & SIGNATURE METHODS
  // ==========================================

  async submitFinalPart() {
 
    // Final authorizations
    const readUnderstood = this.resolveLocator(ClientIntake1Locator.readUnderstoodCheckbox);
    await readUnderstood.waitFor({ state: 'visible', timeout: 30000 });
    await readUnderstood.scrollIntoViewIfNeeded();
    await readUnderstood.click();

    const certify = this.resolveLocator(ClientIntake1Locator.certifyCheckbox);
    await certify.scrollIntoViewIfNeeded();
    await certify.click();

    // Digital Signature drawing logic
    console.log('Starting signature drawing...');
    const signaturePad = this.resolveLocator(ClientIntake1Locator.finalSignaturePad);
    
    // Ensure it's in view and ready
    await signaturePad.scrollIntoViewIfNeeded();
    await signaturePad.waitFor({ state: 'visible' });
    
    // Click to focus
    await signaturePad.click();

    const box = await signaturePad.boundingBox();
    if (box) {
      console.log(`Signature pad found at: ${box.x}, ${box.y}`);
      const startX = box.x + (box.width / 4);
      const startY = box.y + (box.height / 2);

      // Perform drawing
      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();
      await this.page.mouse.move(startX + 100, startY + 10, { steps: 10 });
      await this.page.mouse.move(startX + 50, startY + 40, { steps: 10 });
      await this.page.mouse.move(startX + 150, startY + 20, { steps: 10 });
      await this.page.mouse.up();
      console.log('Signature drawing completed.');
    } else {
      console.warn('Could not find bounding box for signature pad, attempting simple click.');
      await signaturePad.click();
    }

    // Submit and return home
    await this.resolveLocator(ClientIntake1Locator.submitPartButton).click();
    await expect(this.resolveLocator(ClientIntake1Locator.successHeading)).toBeVisible({ timeout: 20000 });
    await this.resolveLocator(ClientIntake1Locator.returnHomeButton).click();

    console.log('END: submitFinalPart method');
  }
}
