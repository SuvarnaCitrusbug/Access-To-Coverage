import { Page, Locator } from '@playwright/test';
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

  async fillAddressDetails(addressPartial: string, zipCode: string) {
    console.log('START: fillAddressDetails method');
    
    await this.resolveLocator(ClientIntake1Locator.homeAddressCombobox).click();
    await this.resolveLocator(ClientIntake1Locator.homeAddressCombobox).fill(addressPartial);
    await this.resolveLocator(ClientIntake1Locator.addressSuggestionText).click();
    
    await this.resolveLocator(ClientIntake1Locator.zipCodeInput).click();
    await this.resolveLocator(ClientIntake1Locator.zipCodeInput).fill(zipCode);
    
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

  async handleOtpVerification(otp: string) {
    console.log('START: handleOtpVerification method');
    
    // Click Send OTP
    await this.resolveLocator(ClientIntake1Locator.sendOtpButton).click();
    
    // If an OTP is provided via code, fill it. Otherwise, assume manual entry.
    if (otp) {
      await this.resolveLocator(ClientIntake1Locator.otpTextbox).fill(otp);
    } else {
      console.log('Waiting for manual user input of OTP (up to 120 seconds)...');
    }
    
    await this.resolveLocator(ClientIntake1Locator.verifyOtpButton).click({ timeout: 120000 });
    
    console.log('END: handleOtpVerification method');
  }

  // getClientTherapistHeading(): Locator {
  //   return this.resolveLocator(ClientIntake1Locator.clientTherapistHeading);
  // }
}
