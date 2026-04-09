export const ClientIntake1Locator = {
  // Button to start the application process
  startApplicationButton: { role: 'button', name: 'Start Application' },
  // Input field for First Name
  firstNameInput: { role: 'textbox', name: 'First Name*' },
  // Input field for Last Name
  lastNameInput: { role: 'textbox', name: 'Last Name*' },
  // Input field for Date of Birth
  dobInput: { role: 'textbox', name: 'Date of Birth*' },
  // Button to open the date picker calendar
  openDatePickerButton: { role: 'button', name: 'Open date picker' },
  // Specific date gridcell in the date picker
  dateGridCell: { role: 'gridcell', name: '8', exact: true },
  // Input field for Social Security Number
  ssnInput: { role: 'textbox', name: 'Social Security Number' },
  // Combobox for Home Address autocomplete
  homeAddressCombobox: { role: 'combobox', name: 'Home address with autocomplete' },
  // Specific address suggestion text from dropdown
  addressSuggestionText: 'text=Newbury StreetBoston, MA, USA',
  // Input field for ZIP Code
  zipCodeInput: { role: 'textbox', name: 'ZIP Code*' },
  // Input field for Primary Phone Number
  phoneInput: { role: 'textbox', name: 'Primary Phone Number*' },
  // Input field for Email Address
  emailInput: { role: 'textbox', name: 'Email Address*' },
} as const;
