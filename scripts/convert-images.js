import fs from "fs";
import path from "path";
import sharp from "sharp";

// Directory containing image assets
const rootDir = path.resolve("src", "Assets");

// File extensions we want to convert
const SUPPORTED_EXT = [".png", ".jpg", ".jpeg"];

/**
 * Recursively walk a directory and convert supported images to WebP.
 * Generated files keep the original name but use the .webp extension.
 * Existing .webp files are left untouched.
 */
async function walkAndConvert(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walkAndConvert(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!SUPPORTED_EXT.includes(ext)) continue;

      const outputPath = fullPath.replace(ext, ".webp");
      // Skip if WebP version already exists
      if (fs.existsSync(outputPath)) continue;

      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted: ${path.relative(rootDir, fullPath)} → ${path.relative(rootDir, outputPath)}`);
      } catch (err) {
        console.error(`Failed converting ${fullPath}:`, err);
      }
    }
  }
}

(async () => {
  if (!fs.existsSync(rootDir)) {
    console.error(`Directory not found: ${rootDir}`);
    process.exit(1);
  }

  console.log(`Converting images in ${rootDir} to WebP...`);
  await walkAndConvert(rootDir);
  console.log("Conversion complete.");
})();