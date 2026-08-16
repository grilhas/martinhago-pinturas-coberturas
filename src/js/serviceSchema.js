import { SITE, BUSINESS } from "@data/client";

const provider = {
	"@type": "LocalBusiness",
	"name": BUSINESS.name,
	"telephone": BUSINESS.phoneForTel,
	"email": BUSINESS.email,
	"url": SITE.url,
	"address": {
		"@type": "PostalAddress",
		"streetAddress": BUSINESS.address.lineOne,
		"addressLocality": BUSINESS.address.city,
		"addressRegion": BUSINESS.address.state,
		"postalCode": BUSINESS.address.zip,
	},
};

const areaServed = BUSINESS.serviceArea.map((a) => ({
	"@type": "City",
	"name": a,
}));

export function buildServiceSchema({ name, description, slug, serviceType }) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		"name": name,
		"description": description,
		"url": `${SITE.url}/services/${slug}/`,
		"serviceType": serviceType || name,
		"provider": provider,
		"areaServed": areaServed,
	};
}

export function buildFaqSchema(questions) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": questions.map((q) => ({
			"@type": "Question",
			"name": q.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": q.answer,
			},
		})),
	};
}

export function buildBreadcrumbSchema(crumbs) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": crumbs.map((c, i) => ({
			"@type": "ListItem",
			"position": i + 1,
			"name": c.name,
			"item": c.url.startsWith("http") ? c.url : `${SITE.url}${c.url}`,
		})),
	};
}
