# SonShine Learning Center

Christian preschool ministry of [Calvary Chapel Frederick](https://www.calvaryfrederick.com). Home, enroll, schedule, teachers, beliefs, closings, camp.

**Do not attach sonshinelc.com** until leadership signs a cutover. The live domain still points at Squarespace.

## Stack

Astro 5, static, YAML, Vercel. Sibling visual language to the church rebrand (Oswald / Source Sans / teal), with a warmer gold for preschool.

## Preview

```
npm install
npm run dev   # 127.0.0.1:4322
```

Vercel preview host is `https://sonshine-lc.vercel.app` (noindex until cutover). `npm run build` fetches published photos and PDFs from the live Squarespace site when they are missing from the checkout.

## Content

Edit `src/data/center.yaml`. Forms live in `public/s/` with the original Squarespace slugs so old PDF links keep working after DNS.

Fees on the site are labeled with the PDF date. Always prefer the PDF if they disagree.
