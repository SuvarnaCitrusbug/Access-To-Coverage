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

  // --- PART 4 LOCATORS (AUTO-POPULATED DETAILS) ---
  autoPopulatedFirstName: { role: 'textbox', name: 'First Name*', exact: true },
  autoPopulatedLastName: { role: 'textbox', name: 'Last Name*', exact: true },
  autoPopulatedDob: { role: 'textbox', name: 'Date of Birth*' },
  autoPopulatedCity: { role: 'textbox', name: 'City*' },
  autoPopulatedZipCode: { role: 'textbox', name: 'ZIP Code*' },
  autoPopulatedInsuranceCarrier: { role: 'textbox', name: 'Insurance Carrier*' },
  autoPopulatedMemberId: { role: 'textbox', name: 'Member ID*' },
  autoPopulatedGroupNumber: { role: 'textbox', name: 'Group Number' },

  // --- THERAPIST INFORMATION LOCATORS ---
  therapistFirstNameInput: { role: 'textbox', name: 'Therapist First Name*' },
  therapistLastNameInput: { role: 'textbox', name: 'Therapist Last Name*' },
  therapistEmailInput: { role: 'textbox', name: 'Therapist Email*' },
  licenseTypeInput: { role: 'textbox', name: 'License Type' },
  licenseNumberInput: { role: 'textbox', name: 'License Number' },
  npiInput: { role: 'textbox', name: 'NPI' },
  taxIdInput: { role: 'textbox', name: 'Tax ID' },
  practiceNameInput: { role: 'textbox', name: 'Practice Name' },
  practiceAddressCombobox: { role: 'combobox', name: 'Practice address with' },
  addressSuggestion: 'text=450 Lakeville RoadNorth New',
  therapistPhoneInput: { role: 'textbox', name: 'Therapist Phone Number' },

  // --- TREATMENT INFORMATION LOCATORS ---
  duration6MonthsRadio: { role: 'radio', name: '–6 months' },
  frequencyTwicePerWeekRadio: { role: 'radio', name: 'Twice per week' },
  feePerSessionInput: { role: 'textbox', name: 'Fee Charged Per Session*' },
  telehealthRadio: { role: 'radio', name: 'Telehealth' },
  telehealthExplanationInput: { role: 'textbox', name: 'If Telehealth is utilized,' },
  coverageStartDateInput: { role: 'textbox', name: 'Requested Coverage Start Date' },
  primaryDiagnosisCodeInput: { role: 'textbox', name: 'Primary Diagnosis Code(s) (' },
  secondaryDiagnosisCodeInput: { role: 'textbox', name: 'Secondary Diagnosis Code(s)' },
  cptCodesInput: { role: 'textbox', name: 'Current CPT Code(s) Utilized' },
  continuingTreatmentExplanationInput: { role: 'textbox', name: 'Please explain why continuing' },
  otherBarriersExplanationInput: { role: 'textbox', name: 'Please specify other barriers' },
  medicalSurgicalLimitedExplanationInput: { role: 'textbox', name: 'If yes, please explain:*' },
  clinicallyRelevantExplanationInput: { role: 'textbox', name: 'If yes, please explain why this is clinically relevant:' },
  preferredLanguageInput: { role: 'textbox', name: 'Preferred Language*' },
  culturalReligiousExplanationInput: { role: 'textbox', name: 'If yes, please explain:', exact: true },
  disruptionImpactExplanationInput: { role: 'textbox', name: 'If yes, please explain why disruption would negatively impact your treatment:' },
  specificTrainingDescriptionInput: { role: 'textbox', name: 'If yes, please describe:' },
  therapeuticApproachExplanationInput: { role: 'textbox', name: 'If yes, please explain how' },

  // --- PSYCHIATRIC & MEDICATION LOCATORS ---
  medicationRegionYesRadio: { role: 'region', name: 'Medication & Psychiatric' }, // Used with getByLabel('Yes')
  medicationListInput: { role: 'textbox', name: 'If yes, List medication(s)' },
  coordYesRadio: '#coord-yes',
  adjustYesRadio: '#adjust-yes',
  serviceExplanationInput: { role: 'textbox', name: 'If yes, please provide' },
  primarySymptomDescriptionInput: { role: 'textbox', name: 'Please describe your primary' },
  higherLevelCareExplanationInput: { role: 'textbox', name: 'If yes, explain why higher-' },
  priorDenialsExplanationInput: { role: 'textbox', name: 'If yes, explain prior denials' },
  electronicConsentCheckbox: { role: 'checkbox', name: 'I consent to electronic' },

  // File Uploads
  insuranceFrontUpload: 'div:has-text("Click to upload front of insurance card")',
  insuranceBackUpload: 'div:has-text("Click to upload back of insurance card")',

  // --- FINAL SUBMISSION LOCATORS ---
  finalContinueDiv: 'div:has-text("Continue")',
  readUnderstoodCheckbox: { role: 'checkbox', name: 'I have read, understood, and' },
  certifyCheckbox: { role: 'checkbox', name: 'By signing below, I certify' },
  finalSignaturePad: '#signature-r41',
  submitPartButton: { role: 'button', name: 'Submit Part' },
  successHeading: { role: 'heading', name: 'Part 2 Submitted Successfully!' },
  returnHomeButton: { role: 'button', name: 'Return Home' },
} as const;
