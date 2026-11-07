import spec from './center.yaml';

export type Teacher = {
  name: string;
  role: string;
  photo: string;
  bio: string;
};

export type FileLink = { label: string; href: string };

export type Center = {
  name: string;
  shortName: string;
  tagline: string;
  established: number | string;
  purpose: string;
  mission: string;
  scripture: { text: string; ref: string };
  address: {
    line: string;
    city: string;
    region: string;
    postal: string;
    mapsQuery: string;
  };
  phone: string;
  phoneDisplay: string;
  email: string;
  church: { name: string; url: string; phone: string };
  social: { facebook: string };
  program: {
    ages: string;
    days: string;
    daysShort: string;
    arrival: string;
    classStart: string;
    classEnd: string;
    dismissal: string;
    notes: string;
  };
  capacityNote: string;
  msde: string;
  nondiscrimination: string;
  fees: {
    asOf: string;
    source: string;
    registrationFirst: string;
    registrationAdditional: string;
    materials: string;
    monthly: string;
    yearly: string;
    yearlyNote: string;
    latePickup: string;
    tuitionCheck: string;
  };
  calendar: { label: string; firstDay: string; lastDay: string; items: string[] };
  day: { time: string; label: string }[];
  closings: string[];
  teachers: Teacher[];
  camp: { showDates: boolean; ages: string; window: string; note: string };
  files: FileLink[];
};

export const center = spec as Center;

export const nap = `${center.address.line}, ${center.address.city}, ${center.address.region} ${center.address.postal}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address.mapsQuery)}`;

export const telHref = `tel:${center.phone.replace(/[^\d+]/g, '')}`;
export const mailHref = `mailto:${center.email}`;
