#!/usr/bin/env node

const path = require('path');
const resource = require('./lib/resource');

// read all from stdin
async function stdin() {
  if (process.stdin.isTTY) return null;
  let buffer = Buffer.alloc(0);
  for await (const chunk of process.stdin)
    buffer = Buffer.concat([buffer, chunk]);
  return buffer.toString('utf8');
}

// thin wrapper arround concourse resource interface
async function main() {
  try {
    console.log = console.warn; // log to stderr
    console.debug = function() {};  // disable debug
    const input = JSON.parse(await stdin());
    const method = path.basename(process.argv[1]);
    const dest = process.argv[2] || null;
    if (!input) throw new Error('ERROR: empty input!');
    if (!resource[method]) throw new Error('ERROR: unknown method!');
    const output = JSON.stringify(await resource[method].call(null, input, dest) || null);
    console.info(output);  // output to stdout
  } catch (e) {
    console.error(e.message || e);
    process.exit(1);
  }
}

main();

