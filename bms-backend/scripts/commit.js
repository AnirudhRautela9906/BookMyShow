#!/usr/bin/env node

/**
 * git-commit.js
 * Run TypeScript + ESLint + Prettier checks before committing
 * Usage: node git-commit.js -m "your message"
 */

import { execSync } from 'child_process';

const args = process.argv.slice(2); // get git commit args

try {
  console.log('\x1b[34m%s\x1b[0m', 'Running TypeScript checks...');
  execSync('tsc --noEmit', { stdio: 'inherit' });

  console.log('\x1b[34m%s\x1b[0m', 'Running lint-staged (ESLint + Prettier)...');
  execSync('npx lint-staged', { stdio: 'inherit' });

  console.log('\x1b[32m%s\x1b[0m', 'All checks passed! Committing...');
  execSync(`git commit ${args.join(' ')}`, { stdio: 'inherit' });
} catch (err) {
  console.error('\x1b[31m%s\x1b[0m', 'Commit aborted due to errors.');
  process.exit(1);
}
