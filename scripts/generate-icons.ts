/**
 * Generate PNG icons from SVG source for PWA and Apple touch icon.
 * Usage: npx tsx scripts/generate-icons.ts
 */
import sharp from "sharp"
import path from "path"

const SVG_PATH = path.resolve("public/icons/icon-192x192.svg")
const OUTPUT_DIR = path.resolve("public/icons")

async function main() {
  const sizes = [180, 192, 512]

  for (const size of sizes) {
    const output = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`)
    await sharp(SVG_PATH).resize(size, size).png().toFile(output)
    console.log(`Generated ${output}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
