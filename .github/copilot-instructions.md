# PlaywrightAutomation - Copilot Instructions

## Project Overview
This is a **Playwright-based test automation framework** for testing a sample ecommerce application. The project supports **Web UI testing**, **API testing**, and **BDD-style testing** with Cucumber.

**Tech Stack**: Playwright Test, Azure Playwright Service, Cucumber, Allure Reporter, Node.js

## Architecture & Key Directories

### Test Organization (`/tests`)
- **`api-test/`** - API testing suites (REST API calls using Playwright's `request` fixture)
  - Tests follow REST patterns: GET, POST, PUT, DELETE operations
  - Example: `Apitest.spec.js` tests a public REST API (restful-api.dev)
- **`web-ui/`** - Web UI automation using Page Object Model (POM)
  - Example: `clientapp.spec.js` tests ecommerce login and purchase flows
  - Uses parameterized testing with `testdata.json`
- **`webautomation/`** - Basic Playwright tests

### Page Object Model (`/pageobjects`)
- Each page class encapsulates selectors and interactions: `LoginPage`, `LandingPage`, `CartPage`, `OrderPage`
- Constructor pattern: `constructor(page)` receives Playwright page object
- Methods: separate navigation, action, and assertion methods (e.g., `navigateToApp()`, `loginToApplication()`)
- **Pattern**: Class exports via `module.exports = ClassName`

### Test Data (`/utils`)
- `testdata.json` - Array of test credentials for parameterized tests
- Used with: `const dataset = JSON.parse(JSON.stringify(require("../../utils/testdata.json")))`
- Iteration pattern: `for (const data of dataset) { test(...) }`

### BDD Testing (`/features`)
- **`login.feature`** - Cucumber feature files (incomplete, sketch stage)
- **`stepDefinations/`** - Step implementation files (note: typo in folder name "stepDefinations")
- Not heavily used; framework is primarily test-first via `.spec.js`

## Critical Workflows

### Running Tests
```bash
npm run regression      # Run all tests via Playwright (see package.json)
npx playwright test    # Standard Playwright runner
npx playwright test --config=playwright.service.config.js  # Azure Playwright Service (CI)
```

### Test Execution Configuration
- **Local**: `playwright.config.js` - Chrome headless=false, no retries, parallel workers
- **CI/Azure**: `playwright.service.config.js` - Uses Azure Playwright Service with managed infrastructure
- **Reporter**: HTML + Allure (results in `/allure-results/`)
- **Trace**: Enabled on first retry for debugging

### CI/CD Pipeline (Azure DevOps)
- File: `azure-pipeline.yml`
- Steps: Install → Run tests on Playwright Service → Upload reports
- Environment: Requires `PLAYWRIGHT_SERVICE_URL` & `PLAYWRIGHT_SERVICE_RUN_ID`

## Code Patterns & Conventions

### Test Structure
```javascript
// Pattern: Use fixtures + descriptive test names
test('client app test for ${data.username}', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToApp();
  // ... actions ...
});

// API testing pattern: Use request fixture
test('get product', async ({request}) => {
  const response = await request.get(url);
  expect(response.ok).toBeTruthy();
});
```

### Page Object Model
```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#userEmail");  // Store selectors
    this.login = page.locator("#login");
  }
  
  async navigateToApp() { /* ... */ }
  async loginToApplication(username, password) { /* ... */ }
}

module.exports = LoginPage;
```

### Parameterized Testing
- Tests iterate over datasets without `test.describe` 
- Each dataset entry generates a separate test case
- Test names include parameter value: ``client app test for ${data.username}``

### Network/State Management
- **State persistence**: `context.storageState({path:'state.json'})` saves auth tokens
- **Network handling**: Wait for `'networkidle'` before assertions
- **Conditional flow**: Dropdown selections use loops + text matching (see `clientapp.spec.js` line 29+)

## Important Files & Their Roles

| File | Purpose |
|------|---------|
| `playwright.config.js` | Local test config (headless=false, single worker) |
| `playwright.service.config.js` | Azure service config (managed infra) |
| `pageobjects/*.js` | Page classes encapsulating UI interactions |
| `utils/testdata.json` | Reusable credentials & test data |
| `tests/*/` | Test specs organized by type (API, Web UI) |
| `allure-results/` | Test execution artifacts (reports, screenshots, traces) |

## Integration Points

### External Dependencies
- **Target App**: https://rahulshettyacademy.com/client/ (ecommerce test site)
- **Public API**: https://api.restful-api.dev/objects (CRUD testing)
- **Azure**: Playwright Service for cloud execution (CI environment)

### Cross-Component Communication
- Tests → Page Objects: Via constructor injection of `page` fixture
- Page Objects → Selectors: Locators stored in constructor
- Tests → Data: Via synchronous JSON parsing (`JSON.stringify` cloning)
- State: Shared via `state.json` between test sessions (auth persistence)

## Development Conventions

1. **Test naming**: Descriptive, includes test data context (e.g., `client app test for ${username}`)
2. **Selector strategy**: Prefer semantic selectors (`getByRole`) over CSS unless fragile
3. **Async/await**: Always await Playwright actions; no callback chains
4. **Module imports**: CommonJS (`require` / `module.exports`), not ES6
5. **Headless mode**: Off by default locally (easier debugging), on in CI
6. **Assertion style**: `expect()` from `@playwright/test` (not assertions library)

## When Writing Tests

- **API tests**: Use `request` fixture; test HTTP methods (GET, POST, PUT, DELETE); store response IDs for chaining
- **UI tests**: Instantiate Page Objects in test; chain methods for readability
- **Data-driven**: Wrap test in loop; reference dataset in test name
- **Debugging**: Use `await page.pause()` to stop execution (seen in `clientapp.spec.js`)
- **Assertions**: Keep simple; `expect(response.ok).toBeTruthy()` or `expect(element).toBeVisible()`

## Known Issues & Notes
- BDD/Cucumber features are scaffolded but incomplete (sketch phase)
- Step definitions folder has typo: "stepDefinations" (not "definitions")
- Some tests have incomplete implementations (e.g., `cartpage.textConetnt()` called but not implemented)
- Service config mixes Azure-specific credential handling with local playwright config
