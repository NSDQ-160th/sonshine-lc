import { center, mapsUrl, nap } from './center';
import { siteFaqs, type Faq } from './faq';

export const PREVIEW = true;
export const BRAND_ORIGIN = 'https://www.sonshinelc.com';

export function siteOrigin(): string {
  return (import.meta.env.PUBLIC_SITE_URL as string | undefined) || 'https://sonshine-lc.vercel.app';
}

export function orgJsonLd() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ChildCare', 'EducationalOrganization', 'Preschool'],
        '@id': `${origin}/#org`,
        name: center.name,
        alternateName: ['SonShine LC', 'SSLC', 'SonShine Christian Preschool Frederick'],
        description: `${center.name} is a Christian preschool ministry of ${center.church.name} in downtown Frederick, Maryland. ${center.program.ages}, ${center.program.days}, mornings ${center.program.classStart}–${center.program.dismissal}.`,
        url: origin,
        image: `${origin}/images/og.jpg`,
        logo: `${origin}/images/logo.jpg`,
        telephone: center.phone,
        email: center.email,
        foundingDate: String(center.established),
        slogan: center.tagline,
        priceRange: center.fees.monthly,
        address: {
          '@type': 'PostalAddress',
          streetAddress: center.address.line,
          addressLocality: center.address.city,
          addressRegion: center.address.region,
          postalCode: center.address.postal,
          addressCountry: 'US',
        },
        hasMap: mapsUrl,
        areaServed: {
          '@type': 'City',
          name: 'Frederick',
          containedInPlace: { '@type': 'State', name: 'Maryland' },
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Wednesday', 'Friday'],
            opens: '08:45',
            closes: '12:00',
          },
        ],
        employee: center.teachers.map((t) => ({
          '@type': 'Person',
          name: t.name,
          jobTitle: t.role,
        })),
        parentOrganization: {
          '@type': 'Church',
          name: center.church.name,
          url: center.church.url,
          telephone: center.church.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: center.address.line,
            addressLocality: center.address.city,
            addressRegion: center.address.region,
            postalCode: center.address.postal,
            addressCountry: 'US',
          },
        },
        sameAs: [center.social.facebook, BRAND_ORIGIN],
        knowsAbout: [
          'Christian preschool Frederick MD',
          'Calvary Chapel preschool',
          'Bible-based early childhood education',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: center.name,
        description: center.tagline,
        publisher: { '@id': `${origin}/#org` },
        inLanguage: 'en-US',
      },
    ],
  };
}

export function faqJsonLd(faqs: Faq[] = siteFaqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}

export { nap };
