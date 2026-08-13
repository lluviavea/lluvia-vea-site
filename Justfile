default:
    @just --list

# Install tools (mise) and dependencies (pnpm via corepack)
setup:
    mise install
    corepack enable
    pnpm install

# Start the dev server (run this in your own terminal)
dev:
    pnpm dev

# Production build
build:
    pnpm build

# Start the production server
start:
    pnpm start

# Lint with ESLint
lint:
    pnpm lint

# Type-check the whole project
typecheck:
    pnpm exec tsc --noEmit

# Format the codebase
format:
    pnpm exec prettier --write .

# Lint + type-check together
check: lint typecheck
