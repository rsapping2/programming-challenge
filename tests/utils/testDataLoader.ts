import * as fs from 'fs';
import * as path from 'path';

export interface TestCredentials {
  email: string;
  password: string;
}

export interface TestCase {
  id: string;
  description: string;
  taskName: string;
  expectedColumn: string;
  expectedTags: string[];
}

export interface TestData {
  projectName: string;
  testCases: TestCase[];
}

export function loadTestData(): TestData {
  const dataPath = path.join(__dirname, '../data/testData.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData) as TestData;
}

export function getCredentials(): TestCredentials {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Missing required environment variables: TEST_EMAIL and/or TEST_PASSWORD. ' +
      'Please create a .env file with these credentials.'
    );
  }

  return {
    email,
    password
  };
}