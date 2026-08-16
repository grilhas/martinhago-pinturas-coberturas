# Running This Site Yourself

This document is for the owner of `martinhagopinturas.example` (or any client who has been given a copy of this codebase). It explains, accurately, what's involved in hosting and maintaining the site yourself if you ever decide not to use the managed plan.

The code in this repository is yours. You can take it to any developer or any host. This guide walks through what running it actually requires.

---

## The Short Version

To run this site yourself, you'll need to:

1. Have someone with developer skills (you or a hired developer) install the project locally
2. Choose and pay for a web host
3. Register a domain and configure DNS records correctly
4. Set up a contact-form backend service (the form does not work without one)
5. Set up an email destination for form submissions
6. Deploy a separate authentication proxy if you want to use the blog editor at `/admin`
7. Rebuild and redeploy the site every time a piece of content changes
8. Keep the underlying tools and dependencies up to date over time

None of those steps are impossible. Most of them are not difficult if you've done web development before. None of them are intuitive if you haven't.

If that list reads as more than you want to take on, the managed plan covers all of it for $90/month (site only) or $197/month (site plus the review-generation system). Either way, the code is yours.

---

## What's Actually In This Repository

This is an Astro project. Astro is a static-site generator: it takes the source files in `/src` and compiles them into a folder of plain HTML, CSS, JavaScript, and images that any web host can serve. That output folder is called `dist/` and is regenerated every time you run a build.

It is not a website builder like Wix or Squarespace. There is no in-browser drag-and-drop editor. Content lives in source files (`.astro`, `.json`, `.md`) and changes go through a build step before they're visible online.

Specifically, this codebase uses:

- **Astro 5** as the page framework
- **Sharp** (via `astro:assets`) for automatic image optimization
- **LESS** as the CSS preprocessor
- **TypeScript** for typed components and data files
- **Decap CMS** as an optional in-browser blog editor (configured at `/admin`)
- **Netlify Forms** as the contact-form backend (configured via the `data-netlify="true"` attribute on the contact form)
- **astrojs/sitemap** to auto-generate the sitemap on each build

If any of those names are unfamiliar, you will want a developer to handle the setup.

---

## Prerequisites

To work with this project, the person doing the work will need:

- **Node.js 18 or newer**, installed on their machine
- **npm** (comes with Node.js)
- **Git** for cloning the repository and tracking changes
- A **code editor** (VS Code is the most common)
- Comfort working in a **command-line terminal** (Terminal on Mac, PowerShell on Windows)
- Basic familiarity with **environment variables**, **DNS records**, and **deploy pipelines**

If you're hiring a developer, expect a few hours of setup work to get the site live on a new host with all of the above wired up correctly. Hourly rates for that kind of work in the United States typically run $75 to $200 per hour.

---

## Step 1: Get The Code Running Locally

```bash
git clone <your-copy-of-this-repo>
cd martinhago-pinturas-coberturas
npm install
npm run dev
```

`npm install` downloads roughly 400 MB of dependencies into a `node_modules/` folder. That folder is excluded from version control and must be regenerated on any new machine.

`npm run dev` starts a local development server, usually at `http://localhost:4321`. The site you see there is **not yet on the internet** — it's only running on your computer.

If `npm install` fails (which it can, depending on your Node version, your operating system, and several Sharp-specific binary dependencies), you'll need to read the error message and resolve it. Common issues include version mismatches between Node and Sharp, missing build tools on Windows, or permissions errors on Mac.

---

## Step 2: Choose A Web Host

Static sites can be hosted in many places. The four most common options for a project like this:

### Netlify

Netlify is what this codebase is currently configured for. The contact form uses Netlify's form-handling feature (the `data-netlify="true"` attribute on the form in `src/pages/contact.astro`), and the Decap CMS authentication is straightforward on Netlify because they offer a one-click GitHub OAuth integration.

Netlify has a free tier that's adequate for a single small business site. Above that, paid plans start at around $19 per user per month.

If you stay on Netlify, the contact form works without additional configuration and the blog editor at `/admin` can be enabled in a few clicks.

### Cloudflare Pages

Cloudflare Pages is free and very fast. The site itself will work fine. However:

- The contact form will **not** submit anywhere, because the `data-netlify="true"` attribute does nothing on Cloudflare. You will need to either rewrite the form to use a different backend (Formspree, Web3Forms, or a custom Cloudflare Worker) or accept that the form is broken.
- Decap CMS at `/admin` will require deploying a separate OAuth proxy (typically a small Cloudflare Worker or a Netlify function) so the GitHub login flow works.

### Vercel

Similar tradeoffs to Cloudflare Pages. Free tier is generous. Contact form and Decap CMS both require additional setup.

### GitHub Pages

Free, but the deployment flow is different — you'd need to configure GitHub Actions to build and publish the `dist/` folder. Contact form and Decap CMS both require additional setup. Custom domains are supported but the SSL setup has its own quirks.

In every case other than Netlify, expect a developer to spend a few hours rewiring the form, the CMS, and the deployment pipeline.

---

## Step 3: Domain And DNS

You will need a domain registered with a domain registrar. Common ones include Cloudflare Registrar, Namecheap, Google Domains (now Squarespace Domains), and GoDaddy. A `.com` domain costs roughly $12 to $20 per year.

Once registered, the domain has to be pointed at your host using DNS records. The exact records depend on the host:

- Most static hosts ask for a **CNAME record** for the `www` subdomain, pointing to a hostname they provide (e.g. `martinhagopinturas.netlify.app`)
- Some require an **A record** for the apex/root domain (`martinhagopinturas.example`) pointing to a specific IP address
- Many hosts also have you add **TXT records** to verify ownership

DNS changes can take **anywhere from a few minutes to 72 hours** to propagate across the internet. During that window, the site may load for some visitors and not others. This is normal but disorienting if you've never seen it before.

After DNS is correctly pointed, **SSL/HTTPS provisioning** happens automatically on most hosts — but only after the DNS records are confirmed. If you go live and the site shows a "Not Secure" warning in browsers, the most common cause is incomplete DNS propagation or a misconfigured CNAME.

---

## Step 4: The Contact Form

The contact form in `src/pages/contact.astro` is currently wired to Netlify Forms via the `data-netlify="true"` attribute. On Netlify, this works automatically: form submissions are captured and visible in your Netlify dashboard, and you can configure email notifications to forward them to whatever inbox you want.

**On any other host, the form does nothing when submitted.** It will appear to work — the form will clear and the page will reload — but the message goes nowhere. You will need to:

1. Pick a form backend service. Common options:
   - **Formspree** ($0–$10/month for low volume; more for higher volume)
   - **Web3Forms** (free for low volume)
   - **Basin** (paid)
   - **A custom serverless function** (free if you write it; not free if you hire someone to write it)
2. Sign up for an account
3. Update the form's `action` attribute in `src/pages/contact.astro` to point to the service's endpoint
4. Configure the service to forward submissions to your email
5. Test it by submitting a real message and confirming it lands in your inbox
6. Repeat the test from a phone, a different network, and an incognito window — form backends silently fail more often than you'd expect

Skipping this step means leads from the contact form are silently lost.

---

## Step 5: Email Delivery

Form submissions, if configured correctly, will be forwarded to an email address of your choice. You'll want:

- A business email address (e.g., `info@martinhagopinturas.example` instead of a Gmail address) for credibility — this requires either Google Workspace (~$6/user/month), Microsoft 365 (~$6/user/month), or a basic email-forwarding setup at your domain registrar (usually free, but with limitations)
- Spam filtering set up so legitimate leads don't end up in junk
- A monitored inbox — leads that sit in an inbox for three days might as well not exist

If you're already using `martinhagopinturas@gmail.com` as your business email, the form can deliver to that address, but Google's deliverability rules are strict and form-backend emails sometimes land in Gmail's Promotions or Spam folders. Test thoroughly.

---

## Step 6: The Blog Editor (Decap CMS)

This site is configured with Decap CMS, an in-browser blog editor accessible at `/admin`. It allows non-technical users to write blog posts without touching code.

**Decap CMS does not work out of the box on any host other than Netlify.** It needs an OAuth authentication proxy so the editor can authenticate against your GitHub repository (where the markdown files for blog posts live).

On Netlify, this is a one-click integration in the Netlify dashboard. On any other host, you'll need to:

1. Deploy a separate Decap auth proxy (a small Node.js or Worker service)
2. Create a GitHub OAuth application and configure the proxy with its credentials
3. Update the Decap config in `public/admin/config.yml` to point at your proxy

If you skip this, `/admin` will load but the login button will fail silently or the editor will appear and then refuse to save changes.

If you're not going to write blog posts, you can ignore this entirely. If you are, expect this step alone to take a developer 2–4 hours on a non-Netlify host.

---

## Step 7: Updating Content

Every change to the site goes through this loop:

1. Pull the latest code: `git pull`
2. Edit the relevant file in the `src/` folder
3. Test the change locally with `npm run dev`
4. Build the site: `npm run build`
5. Commit the change to git: `git add`, `git commit`
6. Push to your repository: `git push`
7. Wait for the host to detect the push and redeploy (usually 1–3 minutes on Netlify, longer elsewhere)
8. Verify the change is live by visiting the production URL in a fresh browser tab

Common content changes and where to make them:

| Change | File |
|---|---|
| Phone number, email, hours | `src/data/client.ts` |
| Service descriptions, FAQs | `src/pages/services/<service>.astro` |
| City content, neighborhoods, scenarios | `src/data/cities.json` |
| Homepage hero copy | `src/components/Hero/Hero.astro` |
| Footer links | `src/components/Footer/Footer.astro` |
| Header / nav menu | `src/data/navData.json` |
| Reviews / testimonials | `src/components/Reviews/Reviews.astro` |
| Brand colors | `src/styles/root.less` |
| Photos | Drop new files in `src/assets/images/site/`, import them in the page that uses them |

Any change to a `.astro` or `.ts` or `.json` file requires a rebuild. Forgetting the rebuild step means your edit is committed but not visible to the public.

---

## Step 8: Images

Images on this site are not just dropped into a folder. They go through Astro's `astro:assets` pipeline, which uses the Sharp library to generate optimized variants in WebP, AVIF, and PNG/JPG fallbacks at multiple resolutions.

To add a new photo:

1. Drop the file into `src/assets/images/site/`
2. Open the `.astro` file where you want to use it
3. Add an import at the top: `import myPhoto from "@assets/images/site/my-photo.webp"`
4. Reference it in a `<Picture src={myPhoto} ... />` component
5. Run `npm run build` to regenerate the optimized variants
6. Commit and deploy

If you reference an image as a plain URL instead of importing it as a module, the image pipeline will not optimize it and the build may break. This is the most common mistake developers new to Astro make on this codebase.

---

## Step 9: SEO Assets

The site is configured with several SEO-related features that will need to keep working as the site evolves:

- **Sitemap** is auto-generated by `@astrojs/sitemap` on every build. Output is `/sitemap-index.xml` and `/sitemap-0.xml` in the deployed site.
- **Schema/JSON-LD markup** lives in `src/js/serviceSchema.js`. Every service page and city page injects Service, FAQPage, and BreadcrumbList structured data.
- **Open Graph and Twitter meta tags** are generated by `src/components/Meta/Meta.astro` based on the page's `title`, `description`, and `heroImage` props.
- **Canonical URLs** are derived from the `SITE.url` value in `src/data/client.ts`. If your domain ever changes, that value must be updated or every page will continue claiming a canonical URL on the old domain (which Google will eventually penalize).

Google Business Profile management, review acquisition, citation building, backlink work, and the rest of local SEO — none of that is covered by hosting the site. That's separate ongoing work, regardless of where the site lives.

---

## Step 10: Ongoing Maintenance

A static site is not a "set it and forget it" asset. Over the course of a year you should expect to:

- **Update dependencies** (`npm update`) periodically to receive security patches. Major version bumps of Astro, Sharp, or other tools occasionally require code changes.
- **Renew the domain** annually
- **Renew SSL certificates** — usually automatic on managed hosts, but worth verifying
- **Update business information** as it changes — hours, services, prices, photos, reviews
- **Fix broken images** as old hosts deprecate URLs or formats
- **Respond to Google Search Console alerts** for indexing or schema issues
- **Keep your form backend service current** — Formspree-type services occasionally change pricing, deprecate features, or require re-verification

Skipping maintenance doesn't break the site immediately. It breaks the site over six to twelve months in subtle ways — slower load times, missing form submissions, expired SSL certificates, security vulnerabilities, gradual SEO decline.

---

## Approximate Costs Of Self-Hosting

A realistic monthly cost breakdown for a non-technical owner running this site solo:

| Item | Cost |
|---|---|
| Static hosting (Netlify free tier or similar) | $0 |
| Domain renewal (amortized monthly) | $1–2 |
| Form backend (Formspree Personal plan) | $10 |
| Business email (Google Workspace, 1 user) | $6 |
| **Hard cost subtotal** | **$17–18/month** |
| Developer retainer for monthly content updates and maintenance (3–4 hours/month at $100/hr) | $300–400 |
| **Realistic all-in monthly cost** | **$317–418/month** |

If you have an in-house person who can do the developer work, the all-in cost is lower. If you skip the developer entirely and try to do it yourself with no technical background, the hard costs stay around $17/month but the practical reality is the site will gradually break in ways you may not notice for weeks at a time.

For comparison, the managed hosting plan is **$90/month** and includes hosting, form handling, email forwarding, SSL, ongoing content updates, image optimization, dependency maintenance, and a person to call when something breaks.

---

## When To Self-Host

Self-hosting genuinely makes sense if:

- You have a developer on staff or on retainer
- You want full control over every technical decision
- You expect to make frequent and complex content changes
- You're comfortable troubleshooting your own deployment, DNS, and email-delivery issues

Self-hosting does **not** make sense if:

- You'd rather spend your time running your business
- You want to call one number when the site goes down or the form stops working
- You don't already have a developer relationship and don't want to start one

---

## Getting Help

If you decide to self-host and run into problems, the codebase is built on standard, well-documented tools. Any developer comfortable with Astro, npm, and modern static-site deployment can pick this up quickly. Expect to pay between $75 and $200 per hour depending on the developer's experience and location.

If at any point you decide self-hosting is more than you signed up for, the managed hosting plan is available. Either way, the code in this repository remains yours.

Questions: [contact info in the site footer].
