import { Page, Locator } from '@playwright/test';
import { ClientIntake1Locator } from '../locators/client-intake1.locator';
import { applicationMessages } from '../messages/messages';

export class ClientIntake1Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Helper method for conditional locator resolution.
   * If locator object has a role, it will use getByRole. Otherwise, it will use locator() with the string.
   */
  private resolveLocator(locatorDef: any): Locator {
    if (typeof locatorDef === 'string') {
      return this.page.locator(locatorDef);
    }
    const { role, ...options } = locatorDef;
    return this.page.getByRole(role, options);
  }

  /**
   * Navigates to the base application URL and initiates the application process.
   */
  async startApplication() {
    console.log('START: startApplication method');
    await this.page.goto(applicationMessages.appUrl);
    await this.resolveLocator(ClientIntake1Locator.startApplicationButton).click();
    console.log('END: startApplication method');
  }

  /**
   * Fills personal details including the applicant's name, Date of Birth, and Social Security Number.
   */
  async fillPersonalDetails(firstName: string, lastName: string, ssn: string) {
    console.log('START: fillPersonalDetails method');
    
    // First Name
    await this.resolveLocator(ClientIntake1Locator.firstNameInput).click();
    await this.resolveLocator(ClientIntake1Locator.firstNameInput).fill(firstName);
    
    // Last Name
    await this.resolveLocator(ClientIntake1Locator.lastNameInput).click();
    await this.resolveLocator(ClientIntake1Locator.lastNameInput).fill(lastName);
    
    // Date of Birth (from date picker)
    await this.resolveLocator(ClientIntake1Locator.dobInput).click();
    await this.resolveLocator(ClientIntake1Locator.openDatePickerButton).click();
    await this.resolveLocator(ClientIntake1Locator.dateGridCell).click();
    
    // Social Security Number
    await this.resolveLocator(ClientIntake1Locator.ssnInput).click();
    await this.resolveLocator(ClientIntake1Locator.ssnInput).fill(ssn);
    
    console.log('END: fillPersonalDetails method');
  }

  /**
   * Fills address information and selects the appropriate entry from the autocomplete dropdown.
   */
  async fillAddressDetails(addressPartial: string, zipCode: string) {
    console.log('START: fillAddressDetails method');
    
    // Home Address Combobox
    await this.resolveLocator(ClientIntake1Locator.homeAddressCombobox).click();
    await this.resolveLocator(ClientIntake1Locator.homeAddressCombobox).fill(addressPartial);
    await this.resolveLocator(ClientIntake1Locator.addressSuggestionText).click();
    
    // ZIP Code
    await this.resolveLocator(ClientIntake1Locator.zipCodeInput).click();
    await this.resolveLocator(ClientIntake1Locator.zipCodeInput).fill(zipCode);
    
    console.log('END: fillAddressDetails method');
  }

  /**
   * Fills contact information including phone number and email address.
   */
  async fillContactDetails(phone: string, email: string) {
    console.log('START: fillContactDetails method');
    
    // Primary Phone Number
    await this.resolveLocator(ClientIntake1Locator.phoneInput).click();
    await this.resolveLocator(ClientIntake1Locator.phoneInput).fill(phone);
    
    // Email Address
    await this.resolveLocator(ClientIntake1Locator.emailInput).click();
    await this.resolveLocator(ClientIntake1Locator.emailInput).fill(email);
    
    console.log('END: fillContactDetails method');
  }

  /**
   * Returns the Locator for the Email Address input.
   * Useful for assertions within the test file.
   */
  getEmailInput(): Locator {
    return this.resolveLocator(ClientIntake1Locator.emailInput);
  }
}
