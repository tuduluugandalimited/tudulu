export type OrganizationType =
  | "International NGO"
  | "Local NGO"
  | "Community Based Organization (CBO)"
  | "Civil Society Organization (CSO)"
  | "Faith Based Organization (FBO)"
  | "Foundation"
  | "Charity"
  | "Research Institute"
  | "University"
  | "Think Tank"
  | "Government Agency"
  | "Development Bank"
  | "UN Agency"
  | "Donor"
  | "Private Foundation"
  | "Social Enterprise"
  | "Startup"
  | "Corporate CSR Program";

export type Continent =
  | "Africa"
  | "Global"
  | "Europe"
  | "North America"
  | "Asia";

export type Region =
  | "Global"
  | "Pan-African"
  | "East Africa"
  | "West Africa"
  | "Central Africa"
  | "Southern Africa"
  | "North Africa";

export type Coverage =
  | "Global"
  | "Pan-African"
  | "Regional"
  | "National"
  | "District"
  | "Community";

export type VerificationLevel =
  | "Verified"
  | "Pending"
  | "Community Verified"
  | "Government Verified";

export type OrganizationSize = "Small" | "Medium" | "Large" | "Global";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  acronym?: string;
  logo?: string;
  description: string;
  mission?: string;
  vision?: string;
  foundedYear?: number;
  organizationType: OrganizationType;
  continent: Continent;
  region: Region;
  countriesServed: string[];
  headquarters: string;
  coverage: Coverage;
  organizationSize: OrganizationSize;
  verificationLevel: VerificationLevel;
  featured: boolean;

  // Taxonomies
  sectors: string[];
  programs: string[];
  beneficiaries: string[];
  sdgs: number[];
  donors: string[];
  partners: string[];
  tags: string[];

  // Metrics & Impact
  metrics: {
    employees?: string;
    countriesCount: number;
    projectsCompleted?: number;
    activeProjects: number;
    beneficiariesReached?: string;
    annualBudget?: string;
  };

  // Ecosystem Counters
  counts: {
    jobs: number;
    grants: number;
    events: number;
    reports: number;
    news: number;
  };

  // Contacts & Socials
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
}

export const AVAILABLE_REGIONS = [
  "All Regions",
  "Global",
  "Pan-African",
  "East Africa",
  "West Africa",
  "Central Africa",
  "Southern Africa",
  "North Africa",
];

export const AVAILABLE_TYPES = [
  "All Types",
  "International NGO",
  "Local NGO",
  "Community Based Organization (CBO)",
  "Civil Society Organization (CSO)",
  "Faith Based Organization (FBO)",
  "Foundation",
  "Research Institute",
  "University",
  "UN Agency",
  "Development Bank",
  "Social Enterprise",
];

export const AVAILABLE_SECTORS = [
  "Health",
  "Digital Health",
  "Education",
  "Agriculture",
  "Nutrition",
  "Climate",
  "Environment",
  "Conservation",
  "Forestry",
  "Renewable Energy",
  "Water",
  "Sanitation (WASH)",
  "Youth",
  "Women",
  "Gender",
  "Children",
  "Refugees",
  "Disability",
  "Governance",
  "Justice",
  "Human Rights",
  "Peace Building",
  "Conflict Resolution",
  "Technology",
  "AI",
  "Cybersecurity",
  "FinTech",
  "Economic Development",
  "Entrepreneurship",
  "Research",
  "Food Security",
  "Mental Health",
  "Housing",
  "Urban Development",
  "Transport",
  "Sports",
  "Arts",
  "Culture",
  "Media",
  "Emergency Response",
  "Humanitarian Aid",
];

export const AVAILABLE_BENEFICIARIES = [
  "Women",
  "Girls",
  "Children",
  "Youth",
  "Farmers",
  "Health Workers",
  "Refugees",
  "Persons with Disabilities",
  "Small Businesses",
  "Students",
  "Teachers",
  "Pastoralists",
  "Elderly",
  "Urban Poor",
  "Rural Communities",
  "Startups",
];

export const AVAILABLE_DONORS = [
  "USAID",
  "EU",
  "UNICEF",
  "WHO",
  "Gates Foundation",
  "Mastercard Foundation",
  "World Bank",
  "AfDB",
  "GIZ",
  "FCDO",
  "SIDA",
  "NORAD",
  "Irish Aid",
  "KOICA",
  "JICA",
  "Global Fund",
  "PEPFAR",
  "Wellcome Trust",
];

export const AVAILABLE_SDGS = [
  { id: 1, label: "SDG 1: No Poverty" },
  { id: 2, label: "SDG 2: Zero Hunger" },
  { id: 3, label: "SDG 3: Good Health & Well-being" },
  { id: 4, label: "SDG 4: Quality Education" },
  { id: 5, label: "SDG 5: Gender Equality" },
  { id: 6, label: "SDG 6: Clean Water & Sanitation" },
  { id: 7, label: "SDG 7: Affordable & Clean Energy" },
  { id: 8, label: "SDG 8: Decent Work & Economic Growth" },
  { id: 9, label: "SDG 9: Industry, Innovation & Infrastructure" },
  { id: 10, label: "SDG 10: Reduced Inequalities" },
  { id: 11, label: "SDG 11: Sustainable Cities" },
  { id: 12, label: "SDG 12: Responsible Consumption" },
  { id: 13, label: "SDG 13: Climate Action" },
  { id: 14, label: "SDG 14: Life Below Water" },
  { id: 15, label: "SDG 15: Life on Land" },
  { id: 16, label: "SDG 16: Peace & Justice" },
  { id: 17, label: "SDG 17: Partnerships for the Goals" },
];

export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "world-vision",
    name: "World Vision International",
    acronym: "WVI",
    slug: "world-vision-international",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80",
    description:
      "World Vision is a Christian humanitarian organization dedicated to working with children, families, and their communities worldwide to reach their full potential by tackling the root causes of poverty and injustice.",
    mission:
      "To follow Jesus Christ's example to show unconditional love to the least of these.",
    vision: "Our vision for every child, life in all its fullness.",
    foundedYear: 1950,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Uganda",
      "Kenya",
      "Tanzania",
      "Rwanda",
      "Democratic Republic of Congo",
      "Ethiopia",
      "Ghana",
      "Zambia",
    ],
    headquarters: "London, United Kingdom",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Humanitarian Aid",
      "Children",
      "Education",
      "Health",
      "Food Security",
      "Water",
    ],
    programs: [
      "Child Sponsorship",
      "Emergency Relief",
      "WASH Initiative",
      "Maternal Health",
    ],
    beneficiaries: ["Children", "Girls", "Rural Communities", "Refugees"],
    sdgs: [1, 2, 3, 4, 5, 6, 17],
    donors: ["USAID", "EU", "World Bank", "FCDO"],
    partners: ["UNICEF", "WFP", "WHO"],
    tags: [
      "Humanitarian",
      "Child Protection",
      "Emergency Response",
      "Food Security",
    ],
    metrics: {
      employees: "35,000+",
      countriesCount: 100,
      activeProjects: 450,
      beneficiariesReached: "10M+",
      annualBudget: "$3B+",
    },
    counts: { jobs: 12, grants: 8, events: 4, reports: 35, news: 120 },
    website: "https://www.wvi.org",
    email: "contact@wvi.org",
    phone: "+44 20 7484 2200",
    address: confidentialPlaceholder("London HQ"),
    socialLinks: {
      linkedin: "https://linkedin.com/company/world-vision",
      twitter: "https://twitter.com/WorldVision",
    },
  },
  {
    id: "brac",
    name: "BRAC",
    slug: "brac",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&auto=format&fit=crop&q=80",
    description:
      "BRAC is a global leader in developing cost-effective, evidence-based programs to empower people in situations of poverty and inequality, with extensive operations across East and West Africa.",
    mission:
      "To empower people and communities in situations of poverty, illiteracy, disease and social injustice.",
    foundedYear: 1972,
    organizationType: "International NGO",
    continent: "Asia",
    region: "East Africa",
    countriesServed: [
      "Uganda",
      "Tanzania",
      "Rwanda",
      "Sierra Leone",
      "Liberia",
    ],
    headquarters: "Dhaka, Bangladesh",
    coverage: "Pan-African",
    organizationSize: "Large",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Microfinance",
      "Education",
      "Agriculture",
      "Economic Development",
      "Youth",
    ],
    programs: [
      "Graduation Approach",
      "Empowerment and Livelihoods for Adolescents",
      "Primary Education",
    ],
    beneficiaries: ["Women", "Youth", "Farmers", "Small Businesses"],
    sdgs: [1, 2, 4, 5, 8],
    donors: ["Mastercard Foundation", "Gates Foundation", "FCDO", "USAID"],
    partners: ["Mastercard Foundation", "World Food Programme"],
    tags: [
      "Microfinance",
      "Youth Empowerment",
      "Agriculture",
      "Women Empowerment",
    ],
    metrics: {
      employees: "100,000+",
      countriesCount: 14,
      activeProjects: 85,
      beneficiariesReached: "5M+ in Africa",
      annualBudget: "$800M+",
    },
    counts: { jobs: 24, grants: 5, events: 2, reports: 18, news: 64 },
    website: "https://www.brac.net",
    email: "info@brac.net",
    socialLinks: {
      linkedin: "https://linkedin.com/company/brac",
      twitter: "https://twitter.com/BRACworld",
    },
  },
  {
    id: "amref-health-africa",
    name: "Amref Health Africa",
    slug: "amref-health-africa",
    logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80",
    description:
      "Amref Health Africa is the largest African-led international organization, reaching over 30 countries with a focus on building sustainable healthcare systems and training community health workers.",
    mission:
      "To increase sustainable health access to communities in Africa through solutions led by Africans.",
    foundedYear: 1957,
    organizationType: "International NGO",
    continent: "Africa",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Senegal",
      "South Africa",
      "Ethiopia",
    ],
    headquarters: "Nairobi, Kenya",
    coverage: "Pan-African",
    organizationSize: "Large",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Health",
      "Digital Health",
      "Research",
      "Emergency Response",
      "Water",
    ],
    programs: [
      "Leap Digital Training",
      "Maternal and Newborn Health",
      "WASH in Schools",
    ],
    beneficiaries: ["Health Workers", "Women", "Children", "Rural Communities"],
    sdgs: [3, 5, 6],
    donors: [
      "Global Fund",
      "Gates Foundation",
      "USAID",
      "EU",
      "Wellcome Trust",
    ],
    partners: ["WHO", "Ministries of Health"],
    tags: [
      "Digital Health",
      "Maternal Health",
      "Community Health Workers",
      "Capacity Building",
    ],
    metrics: {
      employees: "1,500+",
      countriesCount: 35,
      activeProjects: 110,
      beneficiariesReached: "12M+",
      annualBudget: "$150M+",
    },
    counts: { jobs: 9, grants: 14, events: 6, reports: 29, news: 82 },
    website: "https://amref.org",
    email: "info@amref.org",
    socialLinks: {
      linkedin: "https://linkedin.com/company/amref-health-africa",
      twitter: "https://twitter.com/Amref_Worldwide",
    },
  },
];

function confidentialPlaceholder(text: string) {
  return text;
}
