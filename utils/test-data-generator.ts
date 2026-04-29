import { faker } from '@faker-js/faker';

export const generateClientData = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    ssn: `${faker.string.numeric(3)}-${faker.string.numeric(2)}-${faker.string.numeric(4)}`,
    phone: `(${faker.string.numeric(3)}) ${faker.string.numeric(3)}-${faker.string.numeric(4)}`,
    email: `${faker.internet.username().toLowerCase()}@yopmail.com`,
    carrier: faker.company.name(),
    memberId: faker.string.alphanumeric(10).toUpperCase(),
    groupNumber: faker.string.alphanumeric(8).toUpperCase(),
  };
};
