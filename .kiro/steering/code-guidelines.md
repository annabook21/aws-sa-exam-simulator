---
inclusion: always
---

# Code Guidelines (non-negotiable)

These rules apply to every change in this workspace. They are not suggestions.

Two copies exist so both tools actually load them. Kiro reads this file from `.kiro/steering/` because `inclusion: always` is its [documented always-on mode](https://kiro.dev/docs/steering/). Cursor ignores that directory, and it ignores a plain `.md` file in `.cursor/rules/`. Cursor reads `.cursor/rules/code-guidelines.mdc` because `alwaysApply: true` is its [documented always-on mode](https://cursor.com/docs/rules). The rule text is the same in both files.

## Design

- **Single Responsibility** — each module, class, and function does one thing.
- **Loose Coupling** — modules have minimal dependencies. Changes in one module should not ripple through the codebase.
- **High Cohesion** — related functionality is grouped together.

## Structure

- **Small Functions** — functions do one thing and do it well.
- **Clear Interfaces** — public APIs are well-defined and easy to replace.
- **Consistent Naming** — descriptive, predictable names throughout.
- Mine any existing code bases for documentation and structure before making any assumptions.

## Reuse

- **Libraries** — common functionality is abstracted into modules.
- **Generic Code** — use parameterization, generics, and templates where appropriate.
- **Configuration** — no hardcoded magic values. Use config files.

## Testing

- **Unit Tests** — verify small, isolated pieces of code.
- **Mocking** — test in isolation, independent of dependencies.
- **Coverage** — strive for high test coverage on pure logic.

## Documentation

- **Comments** — explain *why*, not *what*.
- **README** — every module or library has clear usage instructions.
- **Examples** — usage examples accompany every public API.

Do not write excessively. Use documented standards for merge request descriptions, commit messages, and documentation. An engineer should be able to understand the writing without running it through another model.

## Hard rules

- **File size ceiling**: no file exceeds 300 lines of code. Split or extract when approaching the limit.
- **2026 research**: before using any library, pattern, or API, verify its current (2026) documented usage. Do not rely on training-data defaults.
- **Reference games**: the old no-cloning restriction is waived. This workspace is a private, non-commercial study tool for one exam. A named older game, including Reader Rabbit 2nd Grade (The Learning Company, 1998, out of print), may be the pattern for interaction, pacing, and presentation. Do not commit disc images or extracted commercial asset files.

## Enforcement

If a proposed change would violate any of the above, stop and refactor before proceeding. Do not ship code that breaks these rules.
