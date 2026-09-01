# Testing with Jest
Tests give the developer confidence that changes do not break existing behavior.
Keep the first tests small and test the behavior that users or other services
can observe.

# Install Jest
Install Jest as a development dependency. Run the tests with:

```sh
npm test
```

To keep Jest running while writing tests:

```sh
npm run test:watch
```

To see the lines, functions, and branches covered by the tests:

```sh
npm run test:coverage
```

# Unit test example
Review `tests/math-utils.test.js`:

```js
import { sum } from "../supplementary-snippets/exploring-node-js/math-utils.js";

test("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
});
```

Unit tests check one function without a database or network. They should be
fast and deterministic.

# What to test in the API
- Unit tests for services and utility functions.
- Request tests for status codes, response bodies, and validation errors.
- Database tests for important queries and constraints.
- Authentication tests for missing, invalid, and expired credentials.
- Authorization tests for both allowed and forbidden users.

Use test data that is isolated from development data. Mock external services
when testing business logic, and add a small number of integration tests for
the real boundaries.