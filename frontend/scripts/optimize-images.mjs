import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/projects',
)
const EXTENSIONS = ['.jpg', '.jpeg', '.png']

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full)
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      const out = path.join(dir, path.basename(entry.name, path.extname(entry.name)) + '.webp')
      await sharp(full).rotate().webp({ quality: 80 }).toFile(out)
      console.log(`✓ ${path.relative(ROOT, full)} → ${path.relative(ROOT, out)}`)
    }
  }
}

walk(ROOT).catch((err) => {
  console.error(err)
  process.exit(1)
})
