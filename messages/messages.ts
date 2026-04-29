export const applicationMessages = {
  // URLs
  appUrl: 'https://stg-app.accesstocoverage.com/',
  
  // Static details for forms
  addressPartialSearch: 'f',
  defaultZipCode: '12345-6789',
  
  // Test Payment Credentials
  stripeTestCard: '4242 4242 4242 4242',
  stripeTestExpiry: '04 / 65',
  stripeTestCvc: '6566',

  // Therapist Data
  therapistData: {
    firstName: 'test',
    lastName: 'details',
    email: 'ogtherapist@yopmail.com',
    licenseType: 'TEST',
    licenseNumber: 'LIC',
    npi: '1234567983',
    taxId: '12-3456798',
    practiceName: 'WELLNESS ',
    addressSearch: '4',
    phone: '(444) 444-44444',
  },

  // Treatment Data
  treatmentData: {
    duration: '–6 months',
    frequency: 'Twice per week',
    feePerSession: '500',
    telehealthOption: 'Telehealth',
    telehealthExplanation: 'Telehealth is clinically appropriate as it ensures consistent access to care, supports ongoing monitoring and communication, and allows treatment to continue effectively without the need for in-person visits.',
    coverageStartDateDay: '21',
    primaryDiagnosisCode: 'F4123',
    secondaryDiagnosisCode: 'f321',
    cptCodes: '123456,456789',
    continuingTreatmentExplanation: 'Continuing treatment with my current therapist is important because they have an established understanding of my history, symptoms, and treatment goals, which supports consistent and effective care. Transitioning to a new, in-network provider would require rebuilding rapport and repeating background information, potentially disrupting progress and delaying therapeutic outcomes. ',
    barriers: [
      'No availability / excessive',
      'Geographic distance or',
      'Prior negative treatment',
      'Cultural, religious, or',
      'Other'
    ],
    otherBarriersExplanation: 'I searched for in-network providers, but they either had long wait times, limited availability, or did not offer the specific type of care I require.',
    medicalSurgicalLimitedExplanation: 'Yes, access to in-network mental health providers is more limited, with fewer available providers, longer wait times, and limited appointment availability compared to medical or surgical providers.',
    clinicallyRelevantExplanation: 'I have a preference for a therapist with whom I feel comfortable and safe, as this is important for effective treatment.',
    preferredLanguage: 'English',
    culturalReligiousExplanation: 'Yes, my therapist understands and respects the cultural, religious, and personal values that are important to me, which supports effective treatment.',
    disruptionImpactExplanation: 'Yes, my current session schedule is important for maintaining consistency and stability in my treatment.',
    specificTrainingDescription: 'Yes, my therapist has specific training and experience that are important to my treatment and support my progress.',
    therapeuticApproachExplanation: 'Yes, my therapist uses a specific therapeutic approach that has been effective in supporting my progress.'
  },

  // Psychiatric & Medication Data
  psychiatricData: {
    medicationList: 'testing the dtails of the data here ',
    medicationYes: 'Yes',
    mentalHealthServices: [
      'Inpatient psychiatric',
      'Intensive Outpatient Program',
      'Crisis stabilization services',
      'Emergency room visits for'
    ],
    serviceExplanation: 'testignt he deualjwo aweqwoieuowq weiwqeo',
    primarySymptomDescription: 'rwerhqwori werjwqorw wrjwqorqow qwrjoqw ',
    risks: [
      'Symptom regression',
      'Risk of hospitalization or',
      'Loss of therapeutic progress',
      'Increased anxiety or depression',
      'Safety concerns'
    ],
    higherLevelCareExplanation: 'tesing the dtail adta oevbre ehrer ',
    priorDenialsExplanation: 'perivous expereniernd of the denial dseriw'
  },

  // File Paths
  insuranceCardPaths: {
    front: 'documents/insurance_card_front.pdf',
    back: 'documents/insurance_card_back.pdf'
  }
};
