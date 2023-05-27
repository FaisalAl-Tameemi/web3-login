import { faker } from '@faker-js/faker'
import { User } from '../types'

export const createRandomUser = (): User => (
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    age: faker.number.int({ min: 18, max: 99 }),
    address: faker.location.streetAddress()
  }
)
