# GitHub Actions CI/CD Workflows

This directory contains GitHub Actions workflows for continuous integration and deployment.

## Workflows

### 1. Basic CI Pipeline (`ci.yml`)
**Triggers**: Pull requests and pushes to main/master/develop branches

**Jobs**:
- **Quality Checks**: Type checking, linting, formatting, tests, and build
- **Security Audit**: npm security audit with moderate level threshold

**Usage**: This is the main workflow that runs on every PR and push.

### 2. Advanced CI Pipeline (`ci-advanced.yml`)
**Triggers**: Pull requests and pushes to main/master/develop branches

**Jobs**:
- **Quality Checks**: Comprehensive code quality validation
- **Security & Dependencies**: Security audit, outdated packages check
- **Docker Build**: Docker image building and validation
- **Storybook**: Storybook build and tests

**Usage**: More comprehensive checks for important branches or when you need additional validation.

## Status Badges

Add these badges to your README.md:

```markdown
[![CI Pipeline](https://github.com/{username}/{repo}/actions/workflows/ci.yml/badge.svg)](https://github.com/{username}/{repo}/actions/workflows/ci.yml)

[![Advanced CI](https://github.com/{username}/{repo}/actions/workflows/ci-advanced.yml/badge.svg)](https://github.com/{username}/{repo}/actions/workflows/ci-advanced.yml)
```

## Local Testing

You can test the CI steps locally before pushing:

```bash
# Install dependencies
npm ci

# Type checking
npm run typecheck

# Linting
npm run lint

# Format check
npm run format:fix

# Tests
npm run test

# Build
npm run build

# Security audit
npm audit --audit-level=moderate
```

## Workflow Dependencies

The advanced pipeline has job dependencies:
- `docker` job waits for `quality-checks` and `security` to complete
- This ensures Docker builds only run after code quality is validated

## Customization

### Adding New Checks
To add new checks, modify the workflow files and add new steps:

```yaml
- name: New Check
  run: npm run new-check
```

### Environment Variables
Add environment variables to the workflow:

```yaml
env:
  CUSTOM_VAR: 'value'
```

### Conditional Steps
Use conditions to run steps only in certain situations:

```yaml
- name: Conditional Step
  if: github.event_name == 'pull_request'
  run: echo "Only on PRs"
```

## Troubleshooting

### Common Issues
1. **Type checking fails**: Run `npm run typecheck` locally to see errors
2. **Linting fails**: Run `npm run lint:fix` to auto-fix issues
3. **Build fails**: Check for missing dependencies or configuration issues
4. **Tests fail**: Run `npm run test` locally to debug test issues

### Debug Mode
To enable debug logging, add this secret to your repository:
- Name: `ACTIONS_STEP_DEBUG`
- Value: `true`

This will provide detailed logging for troubleshooting workflow issues.
