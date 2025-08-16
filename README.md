# Mini Booking System

Monorepo created using [pnpm workspace](https://pnpm.io/workspaces)

## Local Development Setup

// TODO:

## Backend

// TODO:

## Frontend

// TODO:

## Development Logs

### Assumptions

1. Assume each booking means book the whole room for the specified time range

### Shared Packages

By right, since this is monorepo, we should consolidate all the configs (ESLint, Prettier, TS config, etc.) into the shared packages. However, due to time constraints, this is skipped for now.

## Known Issues

### 1. Waring when installing packages

The following warning appears when installing packages:

```
|  WARN  `node_modules` is present. Lockfile only installation will make it out-of-date
```
