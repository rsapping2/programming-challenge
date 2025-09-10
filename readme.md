# Playwright Data-Driven Test Suite

A comprehensive test automation framework built with Playwright using data-driven techniques, authentication fixtures, and organized test structure.

## Quick Start Guide

### Prerequisites
- Node.js (version 20 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone and setup project**
   ```bash
   git clone git@github.com:rsapping2/programming-challenge.git
   cd programming-challenge
   npm install
   npm install --save-dev @types/node
   npm install dotenv
   ```

2. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

3. **Environment Configuration**
   Create a `.env` file in the project root:
   ```env
   TEST_EMAIL=your_test_email
   TEST_PASSWORD=your_test_password
   ```
   Contact myself for the credentials.

4. **Run your first test**
   ```bash
   npm test
   ```

## Dependencies

- `@playwright/test`: Playwright testing framework
- `dotenv`: Environment variable loading
- `@types/node`: Node.js type definitions
- `typescript`: TypeScript compiler

Install all dependencies:
```bash
npm install @playwright/test@^1.55.0 dotenv@^17.2.2 --save-dev
npm install @types/node@^20.19.13 typescript@^5.0.0 --save-dev
```

## 🎯 Usage Examples

### Run All Tests
```bash
npm test                    # Run complete test suite
npm run test:headed         # Run with browser UI visible
npm run test:debug          # Run in debug mode
```

### Run Specific Test Suites
```bash
npm run test:login          # Run only login tests
npm run test:asana          # Run only asana tests
```

### Run Individual Test Files
```bash
npx playwright test tests/login/login.spec.ts
npx playwright test tests/asana/asana.spec.ts --headed
npx playwright test tests/asana/asana.spec.ts --debug
```

### Generate Test Report
```bash
npm test                    # Run tests
npx playwright show-report  # View HTML report
```

## Authentication & Security

### Environment Variables
Store sensitive credentials in `.env` file (never commit this file):

```env
# .env file
TEST_EMAIL=your_test_email
TEST_PASSWORD=your_test_password
```

### Authentication Flow
1. `auth.setup.ts` runs first and creates authentication state
2. `user.json` stores login session data
3. All other tests reuse this authentication state
4. No need to login for each individual test

## Data-Driven Testing

### Browser Configuration
```typescript
// Run on specific browser only
npx playwright test --project=chromium
```

## Troubleshooting

### Common Issues

**1. Missing Environment Variables**
```bash
Error: Missing required environment variables
```
**Solution**: Create `.env` file with `TEST_EMAIL` and `TEST_PASSWORD`

**2. Authentication Failures**
```bash
Error: Timeout waiting for login
```
**Solution**: Verify credentials in `.env` file and check application URL

**3. Element Not Found**
```bash
Error: Locator not found
```
**Solution**: Check if page selectors match your application's HTML structure

### Debug Mode
```bash
npm run test:debug    # Opens Playwright inspector
```
