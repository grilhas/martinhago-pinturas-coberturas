import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// Temporary free hosting on GitHub Pages while this is a pitch site (not yet the
// client's own domain/host). GITHUB_PAGES is set only by .github/workflows/deploy.yml.
// Once this moves to a real domain/host, delete this whole isGithubPages block along
// with the workflow file, and restore `site` to the plain production URL.
const isGithubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
	// TODO: confirmar o domínio definitivo com o cliente antes de publicar
	site: isGithubPages
		? "https://grilhas.github.io/martinhago-pinturas-coberturas"
		: "https://martinhagopinturas.example",
	base: isGithubPages ? "/martinhago-pinturas-coberturas" : "/",
	integrations: [
		icon(),
		sitemap({
			filter: (page) => !page.includes("/admin"),
			changefreq: "weekly",
			priority: 0.7,
		}),
	],
	image: {
		layout: "constrained",
	},
});
