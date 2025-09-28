# Project description
See @README for project overview and @package.json for available bun commands for this project.

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


# Convex
We are using convex as our backend, please follow the convex documentation https://docs.convex.dev/ to understand how it works. see @convex/* for more details.
