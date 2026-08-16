// Post-build step for the temporary GitHub Pages deploy only (see .github/workflows/deploy.yml).
// Astro's `base` config auto-prefixes asset URLs from the astro:assets pipeline, but NOT
// hardcoded absolute hrefs written directly in templates (e.g. href="/contact/"). This repo
// has many of those, so we rewrite them across the built HTML/XML instead of touching every
// source file. Once this site moves to its own domain/host, delete this script and the
// isGithubPages block in astro.config.mjs — none of this runs in a normal `astro build`.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.GITHUB_PAGES_BASE; // e.g. "/francisco-croce"
if (!base) {
	console.log("GITHUB_PAGES_BASE not set — skipping (not a GitHub Pages build).");
	process.exit(0);
}

const baseSegment = base.replace(/^\//, ""); // "francisco-croce"
const escapedSegment = baseSegment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Matches href/src/content="/..." but NOT: "//external", "#fragment-only-refs",
// or paths that already start with the base segment (already correctly prefixed
// by Astro's own asset pipeline).
const pattern = new RegExp(
	`(href|src|content)="/(?!/)(?!${escapedSegment}(?:/|"))`,
	"g"
);

const distDir = path.resolve("dist");

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...(await walk(full)));
		else if (entry.name.endsWith(".html") || entry.name.endsWith(".xml")) files.push(full);
	}
	return files;
}

const files = await walk(distDir);
let changed = 0;

for (const file of files) {
	const before = await readFile(file, "utf8");
	const after = before.replace(pattern, (_match, attr) => `${attr}="${base}/`);

	if (after !== before) {
		await writeFile(file, after, "utf8");
		changed++;
	}
}

console.log(`Rewrote ${changed}/${files.length} file(s) for GitHub Pages base "${base}".`);
