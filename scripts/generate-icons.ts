/**
 * PNG icons in public/icons/ are now managed externally via realfavicongenerator.net.
 * This script is kept for reference. To regenerate icons:
 * 1. Go to https://realfavicongenerator.net
 * 2. Upload the source logo
 * 3. Follow the favicon migration process in the project
 *
 * Previously, this script used sharp to generate PNGs from the SVG source.
 * The SVG source (icon-192x192.svg) has been removed as icons are now
 * generated externally with the proper logo design.
 */
import sharp from "sharp"
import path from "path"

const SVG_PATH = path.resolve("public/icons/icon-192x192.svg")
const OUTPUT_DIR = path.resolve("public/icons")

async function main() {
  const sizes = [192, 512]

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
