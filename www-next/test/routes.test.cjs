const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const net = require('node:net');

let server;
let baseUrl;

before(async () => {
  const listener = net.createServer();
  await new Promise((resolve, reject) => listener.once('error', reject).listen(0, '127.0.0.1', resolve));
  const port = listener.address().port;
  await new Promise((resolve, reject) => listener.close((error) => error ? reject(error) : resolve()));
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-H', '127.0.0.1', '-p', String(port)], {
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error(`Next.js did not start: ${output}`)), 15000);
    const handleData = (chunk) => {
      output += chunk.toString();
      if (output.includes('Ready in')) { clearTimeout(timer); resolve(); }
    };
    server.stdout.on('data', handleData);
    server.stderr.on('data', handleData);
    server.once('error', (error) => { clearTimeout(timer); reject(error); });
    server.once('exit', (code) => { clearTimeout(timer); reject(new Error(`Next.js exited (${code}): ${output}`)); });
  });
});

after(() => { if (server) server.kill(); });

test('dynamic redirect preserves the token ID', async () => {
  const response = await fetch(`${baseUrl}/customize/123`, { redirect: 'manual' });
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get('location'), baseUrl).pathname, '/mainnet/customize/123');
});

test('proof route rejects an invalid address', async () => {
  const response = await fetch(`${baseUrl}/fame/proof/not-an-address`);
  assert.equal(response.status, 400);
  assert.equal(await response.text(), 'Invalid address');
});

test('frame response uses the requested address', async () => {
  const address = '0x0000000000000000000000000000000000000001';
  const response = await fetch(`${baseUrl}/fame/claim/${address}/frame`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), new RegExp(`/fame/claim/${address}/og`));
});
