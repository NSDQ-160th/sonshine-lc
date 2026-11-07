# SEO, AEO, AIEO, LLMEO — SonShine Learning Center

Same job, different labels: make facts consistent, machine-readable, and easy to quote. No extra vendor.

## Who is searching

| Intent | Example | Page |
| --- | --- | --- |
| Local preschool | “Christian preschool Frederick MD” | `/` |
| Brand | “SonShine Learning Center Frederick” | `/` |
| Church preschool | “Calvary Chapel Frederick preschool” | `/` |
| Hours | “SonShine LC hours” | `/schedule/` |
| Weather | “SonShine Learning Center closed today” | `/closings/` |
| Enroll | “SonShine LC enrollment” | `/enroll/` |

AI assistants rephrase those as: *“Is there a Christian preschool at Calvary Chapel Frederick, and when does it meet?”*

## Shipped in this preview

- Unique title + description on every page (Squarespace had empty descriptions and homepage SEO title “About 2”)
- `ChildCare` + `EducationalOrganization` + `Preschool` JSON-LD, `parentOrganization` = Calvary Chapel Frederick
- `FAQPage` schema on Home
- Breadcrumbs on interior pages
- `llms.txt` quote card
- `robots.txt` allows Google, Bing, GPTBot, OAI-SearchBot, Claude, Perplexity, Applebot-Extended
- One NAP: 244A S Jefferson, (240) 651-0890, sonshinelc@calvaryfrederick.com
- `/s/` PDF slugs preserved
- Redirects from old Squarespace paths
- Preview is **noindex** until DNS cutover so Google does not index the Vercel host as the official site

## After cutover (not this deploy)

1. Flip `PREVIEW` to false in `src/data/schema.ts`
2. Remove `X-Robots-Tag: noindex` from `vercel.json`
3. Set `PUBLIC_SITE_URL=https://www.sonshinelc.com`
4. Point `sonshinelc.com` DNS (already on Squarespace nameservers — unlike the church domain, which is iPage)
5. Claim / clean Google Business Profile as Preschool / Child care, hours Mon/Wed/Fri 8:45–12:00, phone 240-651-0890
6. Search Console + Bing; submit sitemap
7. Keep Facebook [SonShineLCPreschool](https://www.facebook.com/SonShineLCPreschool) NAP identical

## Do not let models invent

- Infant or toddler care
- Monday–Friday full-day
- 2023 camp weeks as “now registering”
- Church 301 number as the preschool line
- Sunday children’s ministry as this program
