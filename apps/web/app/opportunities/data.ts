// D:\tudulu\apps\web\app\opportunities\data.ts

export interface KeyDate {
  label: string;
  date: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: "Grant" | "Equipment Subsidy" | "Partnership" | "Fellowship";
  amount: string;
  deadline: string;
  target: string;
  description: string;
  category:
    | "HealthTech"
    | "Energy Resilience"
    | "Youth & Sports"
    | "Digital Tech";
  eligibility: string[];
  applicationSteps: string[];
  keyDates: KeyDate[];
  contactEmail: string;
}

export const opportunitiesData: Opportunity[] = [
  {
    id: "1",
    title: "East Africa Digital Health & AI Innovation Fund 2026",
    type: "Grant",
    amount: "$50,000 - $250,000",
    deadline: "Aug 30, 2026",
    target: "HealthTech Startups, Hospitals & Clinics",
    description:
      "Funding for low-latency Health Information Systems (HIS), offline-first clinical tools, and Edge AI integrations tailored for East African health centers.",
    category: "HealthTech",
    eligibility: [
      "Registered entity operating within the East African Community (EAC).",
      "Demonstrated pilot deployment or functional software MVP.",
      "Clear data privacy & HIPAA / local health regulation compliance framework.",
    ],
    applicationSteps: [
      "Submit initial technical proposal and institutional background deck.",
      "Technical review by Tudulu's HealthTech review panel.",
      "Shortlisted candidates present live demo and financial audit readiness.",
    ],
    keyDates: [
      { label: "Applications Open", date: "June 1, 2026" },
      { label: "Submission Deadline", date: "August 30, 2026" },
      { label: "Grant Awards Announced", date: "October 15, 2026" },
    ],
    contactEmail: "grants@tudulu.org",
  },
  {
    id: "2",
    title: "Community Solar Resilience Equipment Grant",
    type: "Equipment Subsidy",
    amount: "Up to 60% Subsidy",
    deadline: "Rolling Basis",
    target: "Rural Clinics & Community Schools",
    description:
      "Subsidy program providing hybrid solar power systems, battery storage, and installation support for off-grid healthcare and education centers.",
    category: "Energy Resilience",
    eligibility: [
      "Must be a licensed health clinic, school, or community hub.",
      "Located in off-grid or power-unstable peri-urban/rural zones.",
      "Willingness to co-fund 40% of hardware installation costs.",
    ],
    applicationSteps: [
      "Request on-site energy audit through our online portal.",
      "Receive customized solar system bill of materials and co-pay quote.",
      "Sign installation agreement and schedule hardware deployment.",
    ],
    keyDates: [
      { label: "Subsidies Open", date: "Rolling Basis" },
      { label: "Site Inspection Cycle", date: "Bi-Weekly" },
    ],
    contactEmail: "energy@tudulu.org",
  },
  {
    id: "3",
    title: "Grassroots Sports Analytics & Tournament Tech Sponsorship",
    type: "Partnership",
    amount: "Technical Support & Tools",
    deadline: "Sept 15, 2026",
    target: "Youth Sports Foundations & Academies",
    description:
      "Providing tournament management software, player stat tracking, and digital scouting directories to grassroots sports organizations.",
    category: "Youth & Sports",
    eligibility: [
      "Registered non-profit youth sports academy or league operator.",
      "Active engagement with youth age groups (U13 - U20).",
      "Dedicated coordinator for player statistics and schedule logging.",
    ],
    applicationSteps: [
      "Fill out organization profile and active team headcount.",
      "Attend 1-hour platform orientation session.",
      "Receive workspace credentials and hardware sponsorship equipment.",
    ],
    keyDates: [
      { label: "Partner Applications", date: "September 15, 2026" },
      { label: "Software Onboarding", date: "October 1, 2026" },
    ],
    contactEmail: "sports@tudulu.org",
  },
  {
    id: "4",
    title: "East Africa Open Data & Connectivity Fellowship",
    type: "Fellowship",
    amount: "$15,000 + Mentorship",
    deadline: "Oct 12, 2026",
    target: "Software Engineers & Data Scientists",
    description:
      "A 6-month hands-on fellowship focused on developing open-source APIs, public health data pipelines, and distributed connectivity solutions.",
    category: "Digital Tech",
    eligibility: [
      "Proficiency in modern TypeScript, Rust, or Python.",
      "Commitment of 20 hours per week for 6 months.",
      "Demonstrated contributions to open-source software or public tools.",
    ],
    applicationSteps: [
      "Submit GitHub profile and sample project portfolio.",
      "Complete a 48-hour async technical code challenge.",
      "Final interview with engineering leads.",
    ],
    keyDates: [
      { label: "Applications Close", date: "October 12, 2026" },
      { label: "Fellowship Starts", date: "November 1, 2026" },
    ],
    contactEmail: "fellows@tudulu.org",
  },
];
