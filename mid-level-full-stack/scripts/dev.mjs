import { spawn } from 'node:child_process'

const children = [
  spawn(
    'uv',
    [
      'run',
      'uvicorn',
      'api.main:app',
      '--reload',
      '--port',
      '3000',
    ],
    { stdio: 'inherit' },
  ),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js'], {
    stdio: 'inherit',
  }),
]

const stop = () => {
  for (const child of children) child.kill('SIGTERM')
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
for (const child of children)
  child.on('exit', (code) => code && process.exit(code))
