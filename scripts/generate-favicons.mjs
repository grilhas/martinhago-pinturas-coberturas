// Renders favicon.svg to all the raster sizes Meta.astro references,
// then assembles the multi-resolution favicon.ico from the small PNGs.
// Run: node scripts/generate-favicons.mjs

import sharp from "sharp";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pngToIcoModule = require("png-to-ico");
const pngToIco = pngToIcoModule.default || pngToIcoModule;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const faviconDir = path.resolve(__dirname, "..", "public", "assets", "favicons");
const svgPath = path.join(faviconDir, "favicon.svg");

const svgBuffer = await readFile(svgPath);

const targets = [
	{ size: 96, name: "favicon-96x96.png" },
	{ size: 180, name: "apple-touch-icon.png" },
	{ size: 192, name: "web-app-manifest-192x192.png" },
	{ size: 512, name: "web-app-manifest-512x512.png" },
	// Used to assemble the .ico
	{ size: 16, name: "_favicon-16.png", temp: true },
	{ size: 32, name: "_favicon-32.png", temp: true },
	{ size: 48, name: "_favicon-48.png", temp: true },
];

for (const { size, name } of targets) {
	const out = path.join(faviconDir, name);
	await sharp(svgBuffer, { density: Math.max(72, size * 4) })
		.resize(size, size)
		.png()
		.toFile(out);
	console.log(`Wrote ${name} (${size}x${size})`);
}

const icoSources = targets
	.filter((t) => t.temp)
	.map((t) => path.join(faviconDir, t.name));
const icoBuffer = await pngToIco(icoSources);
await writeFile(path.join(faviconDir, "favicon.ico"), icoBuffer);
console.log(`Wrote favicon.ico (${icoBuffer.length} bytes)`);

for (const src of icoSources) {
	await unlink(src);
}

console.log("Done.");
