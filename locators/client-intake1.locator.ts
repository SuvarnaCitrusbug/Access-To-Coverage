export const ClientIntake1Locator = {
  // --- PART 1 LOCATORS ---
  startApplicationButton: { role: 'button', name: 'Start Application' },
  firstNameInput: { role: 'textbox', name: 'First Name*' },
  lastNameInput: { role: 'textbox', name: 'Last Name*' },
  dobInput: { role: 'textbox', name: 'Date of Birth*' },
  openDatePickerButton: { role: 'button', name: 'Open date picker' },
  dateGridCell: { role: 'gridcell', name: '8', exact: true },
  ssnInput: { role: 'textbox', name: 'Social Security Number' },
  homeAddressCombobox: { role: 'combobox', name: 'Home address with autocomplete' },
  addressSuggestionText: 'text=Frank Lee Lane',
  zipCodeInput: { role: 'textbox', name: 'ZIP Code*' },
  phoneInput: { role: 'textbox', name: 'Primary Phone Number*' },
  emailInput: { role: 'textbox', name: 'Email Address*' },
  
  // Insurance Information
  insuranceCarrierInput: { role: 'textbox', name: 'Insurance Carrier / Plan' },
  memberIdInput: { role: 'textbox', name: 'Member ID Number*' },
  groupNumberInput: { role: 'textbox', name: 'Group Number (if applicable)' },
  
  // Transition Button bridging Part 1 and Part 2
  continueButton: { role: 'button', name: 'Continue' },

  // --- PART 2 LOCATORS (PAYMENT & SIGNATURE) ---
  readAndUnderstandCheckbox: { role: 'checkbox', name: 'I have read and understand' },
  readUnderstoodLabel: 'label:has-text("I have read, understood, and")',
  signatureCanvas: '#signature-r28',
  stripeIframe: 'iframe[title="Secure card payment input frame"]',
  cardNumberInput: { role: 'textbox', name: 'Credit or debit card number' },
  cardExpiryInput: { role: 'textbox', name: 'Credit or debit card expiration date' },
  cardCvcInput: { role: 'textbox', name: 'Credit or debit card CVC/CVV' },
  payButton: { role: 'button', name: 'Pay $' },
  continueToPart2Button: { role: 'button', name: 'Continue to Part' },

  // --- PART 3 LOCATORS (OTP VERIFICATION) ---
  sendOtpButton: { role: 'button', name: 'Send OTP' },
  otpTextbox: { role: 'textbox' }, // Note: may need a more specific locator if there are multiple textboxes
  verifyOtpButton: { role: 'button', name: 'Verify OTP' },
  clientTherapistHeading: { role: 'heading', name: 'Client & Therapist' },
} as const;
