# Project description
This project uses convex + clerk + expo

# Bash commands
- bun run build: Build the project
- bun run lint: Run the linter
- tsc --noEmit: Run the typechecker
- bun run dev:backend: Run convex dev to test convex functions against the development server

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')
- prefer functional over object oriented
- prefer const over let
- no files over 500 lines
- maintain a clear directory structure and make sure to avoid file duplicates

# Workflow
- Be sure to typecheck when you’re done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance