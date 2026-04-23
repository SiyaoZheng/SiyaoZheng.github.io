```markdown
# SiyaoZheng.github.io Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill covers the development patterns and conventions used in the `SiyaoZheng.github.io` repository, a TypeScript codebase with no detected framework. It details file organization, code style, testing patterns, and common workflows to ensure consistency and maintainability.

## Coding Conventions

### File Naming
- Use **kebab-case** for all file names.
  - Example: `my-component.ts`, `user-profile.test.ts`

### Import Style
- Use **absolute imports** throughout the codebase.
  - Example:
    ```typescript
    import { fetchData } from 'utils/api';
    ```

### Export Style
- Use **named exports** instead of default exports.
  - Example:
    ```typescript
    // Good
    export function calculateSum(a: number, b: number): number {
      return a + b;
    }

    // Bad
    // export default function calculateSum(a: number, b: number): number { ... }
    ```

### Commit Messages
- Freeform style, no enforced prefixes.
- Average commit message length: ~26 characters.

## Workflows

### Adding a New Module
**Trigger:** When you need to add a new feature or utility.
**Command:** `/add-module`

1. Create a new file using kebab-case (e.g., `new-feature.ts`).
2. Use absolute imports for dependencies.
3. Export functions or variables using named exports.
4. If applicable, create a corresponding test file (`new-feature.test.ts`).

### Writing Tests
**Trigger:** When adding or updating code that requires testing.
**Command:** `/write-test`

1. Create a test file with the same base name as the module, ending with `.test.ts` (e.g., `user-profile.test.ts`).
2. Follow the same import/export conventions as production code.
3. Use the project's testing framework (unknown, but use `.test.ts` pattern).

### Refactoring Code
**Trigger:** When improving or restructuring existing code.
**Command:** `/refactor`

1. Rename files using kebab-case if necessary.
2. Update imports to use absolute paths.
3. Ensure all exports are named.
4. Update or add tests as needed.

## Testing Patterns

- Test files follow the `*.test.ts` naming pattern.
- Place test files alongside the modules they test or in a dedicated test directory.
- Use absolute imports and named exports in test files as well.
- Example test file:
  ```typescript
  import { calculateSum } from 'utils/math';

  describe('calculateSum', () => {
    it('adds two numbers', () => {
      expect(calculateSum(2, 3)).toBe(5);
    });
  });
  ```

## Commands
| Command        | Purpose                                 |
|----------------|-----------------------------------------|
| /add-module    | Add a new module following conventions  |
| /write-test    | Create a new test file                  |
| /refactor      | Refactor code to match conventions      |
```