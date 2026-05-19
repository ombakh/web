const fs = require('node:fs')
const path = require('node:path')
const esbuild = require('esbuild')

const root = process.cwd()
const dist = path.join(root, 'dist')
const assets = path.join(dist, 'assets')
const assetVersion = 'profile-bmp-1'

function copyDir(source, target) {
  if (!fs.existsSync(source)) return
  fs.mkdirSync(target, { recursive: true })

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name)
    const targetPath = path.join(target, entry.name)

    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  }
}

async function build() {
  fs.rmSync(dist, { recursive: true, force: true })
  fs.mkdirSync(assets, { recursive: true })

  copyDir(path.join(root, 'public'), dist)

  const css = fs
    .readFileSync(path.join(root, 'src/index.css'), 'utf8')
    .split('\n')
    .filter((line) => !line.startsWith('@tailwind '))
    .join('\n')
  fs.writeFileSync(path.join(assets, 'app.css'), css)

  await esbuild.build({
    stdin: {
      contents:
        "import { StrictMode } from 'react';\n" +
        "import { createRoot } from 'react-dom/client';\n" +
        "import App from './src/App.tsx';\n" +
        "createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);\n",
      resolveDir: root,
      loader: 'tsx',
    },
    bundle: true,
    outfile: path.join(assets, 'app.js'),
    format: 'esm',
    jsx: 'automatic',
    minify: true,
    sourcemap: false,
    define: { 'process.env.NODE_ENV': '"production"' },
  })

  fs.writeFileSync(
    path.join(dist, 'index.html'),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Om Bakhshi portfolio presented as a retro Windows 95 / Windows 98 blue screen diagnostic."
    />
    <title>OM_BAKHSHI.EXE</title>
    <link rel="icon" type="image/svg+xml" href="./favicon.svg?v=${assetVersion}" />
    <link rel="stylesheet" href="./assets/app.css?v=${assetVersion}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./assets/app.js?v=${assetVersion}"></script>
  </body>
</html>
`,
  )
}

build().catch((error) => {
  console.error(error)
  process.exit(1)
})
