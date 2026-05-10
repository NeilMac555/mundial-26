#!/usr/bin/env node
// Cross-platform static-file server launcher for Railway / local prod preview.
// Reads PORT from env (Railway injects this), defaults to 5173 locally.
// We shell out to `serve` (already a dependency) so we don't reimplement
// SPA fallback / caching headers ourselves.

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const port = process.env.PORT ?? '5173';

const args = ['serve', '-s', distDir, '-l', String(port)];

console.log(`[start] serving ${distDir} on port ${port}`);

const child = spawn('npx', args, {
  stdio: 'inherit',
  shell: process.platform === 'win32', // npx.cmd resolution on Windows
});

child.on('exit', (code) => process.exit(code ?? 0));
