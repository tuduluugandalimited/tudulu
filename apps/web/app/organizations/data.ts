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
      "Christian humanitarian organization dedicated to working with children, families, and communities worldwide to tackle poverty and injustice.",
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
  },
  {
    id: "care-international",
    name: "CARE International",
    slug: "care-international",
    logo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=120&auto=format&fit=crop&q=80",
    description:
      "Global humanitarian agency delivering emergency relief and long-term international development projects with a core focus on empowering women and girls.",
    mission:
      "To serve individuals and families in the poorest communities in the world.",
    foundedYear: 1945,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Ethiopia",
      "Somalia",
      "Niger",
      "Mali",
      "Mozambique",
    ],
    headquarters: "Geneva, Switzerland",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Humanitarian Aid",
      "Women",
      "Gender",
      "Agriculture",
      "Food Security",
      "Economic Development",
    ],
    programs: [
      "Women's Empowerment",
      "Climate Resilient Agriculture",
      "Emergency Response",
    ],
    beneficiaries: ["Women", "Girls", "Farmers", "Rural Communities"],
    sdgs: [1, 2, 5, 8, 13],
    donors: ["USAID", "EU", "FCDO", "SIDA"],
    partners: ["UNHCR", "WFP"],
    tags: [
      "Gender Equality",
      "Women Empowerment",
      "Food Security",
      "Livelihoods",
    ],
    metrics: {
      employees: "10,000+",
      countriesCount: 100,
      activeProjects: 300,
      beneficiariesReached: "90M+",
      annualBudget: "$700M+",
    },
    counts: { jobs: 8, grants: 6, events: 3, reports: 22, news: 45 },
    website: "https://www.care-international.org",
    email: "info@careinternational.org",
  },
  {
    id: "save-the-children",
    name: "Save the Children",
    slug: "save-the-children",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80",
    description:
      "Leading international organization promoting children's rights, providing emergency relief, and supporting educational and health outcomes in developing nations.",
    mission:
      "To inspire breakthroughs in the way the world treats children and to achieve immediate and lasting change in their lives.",
    foundedYear: 1919,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Uganda",
      "Kenya",
      "Somalia",
      "South Sudan",
      "DRC",
      "Nigeria",
      "Egypt",
    ],
    headquarters: "London, United Kingdom",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Children",
      "Education",
      "Health",
      "Nutrition",
      "Humanitarian Aid",
    ],
    programs: [
      "Every Last Child",
      "Emergency Child Protection",
      "Quality Basic Education",
    ],
    beneficiaries: ["Children", "Girls", "Refugees"],
    sdgs: [1, 3, 4, 5],
    donors: ["USAID", "EU", "NORAD", "Irish Aid"],
    partners: ["UNICEF", "WHO"],
    tags: ["Child Rights", "Education", "Nutrition", "Emergency Relief"],
    metrics: {
      employees: "25,000+",
      countriesCount: 115,
      activeProjects: 400,
      beneficiariesReached: "45M+",
      annualBudget: "$2.5B+",
    },
    counts: { jobs: 15, grants: 9, events: 5, reports: 40, news: 95 },
    website: "https://www.savethechildren.net",
    email: "contact@savethechildren.org",
  },
  {
    id: "msf",
    name: "Médecins Sans Frontières",
    acronym: "MSF",
    slug: "medecins-sans-frontieres",
    logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80",
    description:
      "International humanitarian medical non-governmental organization providing emergency medical assistance to people affected by armed conflict, epidemics, and disasters.",
    mission:
      "To provide independent, neutral emergency medical assistance to populations in danger.",
    foundedYear: 1971,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "DRC",
      "South Sudan",
      "Nigeria",
      "Somalia",
      "Central African Republic",
      "Ethiopia",
    ],
    headquarters: "Geneva, Switzerland",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Health",
      "Emergency Response",
      "Humanitarian Aid",
      "Mental Health",
    ],
    programs: [
      "Emergency Medical Interventions",
      "Malnutrition Treatment",
      "Epidemic Response",
    ],
    beneficiaries: ["Refugees", "Communities", "Children", "Urban Poor"],
    sdgs: [3, 16],
    donors: ["Global Fund", "EU", "Private Philanthropy"],
    partners: ["WHO", "Ministry Ministries"],
    tags: [
      "Emergency Medical Care",
      "Doctors Without Borders",
      "Epidemics",
      "Crisis Response",
    ],
    metrics: {
      employees: "45,000+",
      countriesCount: 75,
      activeProjects: 200,
      beneficiariesReached: "15M+",
      annualBudget: "$1.8B+",
    },
    counts: { jobs: 10, grants: 2, events: 1, reports: 19, news: 110 },
    website: "https://www.msf.org",
    email: "office@geneva.msf.org",
  },
  {
    id: "irc",
    name: "International Rescue Committee",
    acronym: "IRC",
    slug: "international-rescue-committee",
    logo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=120&auto=format&fit=crop&q=80",
    description:
      "Responds to world's worst humanitarian crises, helping people whose lives have been shattered by conflict and disaster to survive, recover, and rebuild.",
    mission:
      "To help people whose lives have been shattered by conflict and disaster to survive, recover, and rebuild their lives.",
    foundedYear: 1933,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Uganda",
      "Kenya",
      "Tanzania",
      "Ethiopia",
      "Sudan",
      "Nigeria",
      "Burundi",
    ],
    headquarters: "New York, United States",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: false,
    sectors: [
      "Humanitarian Aid",
      "Refugees",
      "Governance",
      "Economic Development",
      "Health",
    ],
    programs: [
      "Refugee Livelihoods",
      "Women's Protection and Empowerment",
      "Children and Youth Protection",
    ],
    beneficiaries: ["Refugees", "Women", "Youth"],
    sdgs: [1, 5, 8, 16],
    donors: ["USAID", "EU", "FCDO", "UNICEF"],
    partners: ["UNHCR", "WFP"],
    tags: [
      "Refugee Support",
      "Humanitarian Crisis",
      "Conflict Recovery",
      "Economic Recovery",
    ],
    metrics: {
      employees: "15,000+",
      countriesCount: 40,
      activeProjects: 180,
      beneficiariesReached: "30M+",
      annualBudget: "$900M+",
    },
    counts: { jobs: 14, grants: 7, events: 2, reports: 15, news: 54 },
    website: "https://www.rescue.org",
    email: "info@rescue.org",
  },
  {
    id: "mercy-corps",
    name: "Mercy Corps",
    slug: "mercy-corps",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80",
    description:
      "Global team of humanitarians working together on the front lines of crisis, disaster, poverty, and climate change to create bold solutions.",
    mission:
      "To alleviate suffering, poverty, and oppression by helping people build secure, productive, and just communities.",
    foundedYear: 1979,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Ethiopia",
      "Niger",
      "Nigeria",
      "DRC",
      "Zimbabwe",
    ],
    headquarters: "Portland, United States",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: false,
    sectors: [
      "Economic Development",
      "Agriculture",
      "Climate",
      "Emergency Response",
      "Youth",
    ],
    programs: [
      "Youth Employment",
      "Agri-Fintech Innovation",
      "Climate Resilience",
    ],
    beneficiaries: ["Youth", "Farmers", "Small Businesses", "Urban Poor"],
    sdgs: [1, 2, 8, 13],
    donors: ["USAID", "Mastercard Foundation", "EU", "FCDO"],
    partners: ["World Bank", "Private Sector Firms"],
    tags: [
      "Market Systems",
      "Youth Employment",
      "Climate Adaptation",
      "Agribusiness",
    ],
    metrics: {
      employees: "6,000+",
      countriesCount: 40,
      activeProjects: 120,
      beneficiariesReached: "40M+",
      annualBudget: "$550M+",
    },
    counts: { jobs: 6, grants: 4, events: 1, reports: 12, news: 38 },
    website: "https://www.mercycorps.org",
    email: "info@mercycorps.org",
  },
  {
    id: "catholic-relief-services",
    name: "Catholic Relief Services",
    acronym: "CRS",
    slug: "catholic-relief-services",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&auto=format&fit=crop&q=80",
    description:
      "Official international humanitarian agency of the Catholic community in the United States, providing assistance to people in over 100 countries.",
    mission:
      "To assist the poor and vulnerable abroad, alleviating suffering and fostering development.",
    foundedYear: 1943,
    organizationType: "Faith Based Organization (FBO)",
    continent: "North America",
    region: "Pan-African",
    countriesServed: [
      "Uganda",
      "Rwanda",
      "Kenya",
      "Tanzania",
      "Ethiopia",
      "Madagascar",
      "Zambia",
    ],
    headquarters: "Baltimore, United States",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: false,
    sectors: [
      "Agriculture",
      "Health",
      "Education",
      "Humanitarian Aid",
      "Peace Building",
    ],
    programs: [
      "Farmer-to-Farmer Program",
      "HIV Care & Support",
      "Emergency Food Security",
    ],
    beneficiaries: ["Farmers", "Children", "Rural Communities"],
    sdgs: [1, 2, 3, 4],
    donors: ["USAID", "USDA", "Global Fund", "EU"],
    partners: ["Local Caritas Networks", "Church Bodies"],
    tags: ["Faith-Based", "Agriculture", "Food Security", "Health Systems"],
    metrics: {
      employees: "7,000+",
      countriesCount: 100,
      activeProjects: 220,
      beneficiariesReached: "130M+",
      annualBudget: "$1B+",
    },
    counts: { jobs: 7, grants: 5, events: 2, reports: 14, news: 42 },
    website: "https://www.crs.org",
    email: "webmaster@crs.org",
  },
  {
    id: "plan-international",
    name: "Plan International",
    slug: "plan-international",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80",
    description:
      "Development and humanitarian organization that advances children's rights and equality for girls across Africa and globally.",
    mission:
      "To strive for a just world that advances children's rights and equality for girls.",
    foundedYear: 1937,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Uganda",
      "Kenya",
      "Tanzania",
      "Ghana",
      "Senegal",
      "Mali",
      "Rwanda",
    ],
    headquarters: "Woking, United Kingdom",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: false,
    sectors: ["Children", "Women", "Education", "Health", "Human Rights"],
    programs: [
      "Girls Get Equal",
      "Youth Economic Empowerment",
      "Early Childhood Care",
    ],
    beneficiaries: ["Girls", "Children", "Youth"],
    sdgs: [4, 5, 8],
    donors: ["EU", "USAID", "NORAD", "SIDA"],
    partners: ["UNICEF", "UNESCO"],
    tags: ["Girls Rights", "Education", "Gender Equality", "Youth Development"],
    metrics: {
      employees: "10,000+",
      countriesCount: 80,
      activeProjects: 250,
      beneficiariesReached: "25M+",
      annualBudget: "$900M+",
    },
    counts: { jobs: 9, grants: 3, events: 2, reports: 16, news: 50 },
    website: "https://www.plan-international.org",
    email: "info@plan-international.org",
  },
  {
    id: "brac",
    name: "BRAC",
    slug: "brac",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&auto=format&fit=crop&q=80",
    description:
      "Global leader in developing cost-effective, evidence-based poverty alleviation and microfinance programs, with extensive operations across East and West Africa.",
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
  },
  {
    id: "amref-health-africa",
    name: "Amref Health Africa",
    slug: "amref-health-africa",
    logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80",
    description:
      "Largest African-led international health organization, training health workers and building sustainable healthcare systems across 35+ countries.",
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
  },
  {
    id: "african-wildlife-foundation",
    name: "African Wildlife Foundation",
    acronym: "AWF",
    slug: "african-wildlife-foundation",
    logo: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=120&auto=format&fit=crop&q=80",
    description:
      "Premier wildlife conservation organization focused on protecting endangered species, securing natural habitats, and empowering local African communities.",
    mission: "To ensure wildlife and wild lands thrive in modern Africa.",
    foundedYear: 1961,
    organizationType: "International NGO",
    continent: "Africa",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Tanzania",
      "Uganda",
      "Rwanda",
      "Zambia",
      "Zimbabwe",
      "Democratic Republic of Congo",
    ],
    headquarters: "Nairobi, Kenya",
    coverage: "Pan-African",
    organizationSize: "Medium",
    verificationLevel: "Verified",
    featured: false,
    sectors: ["Conservation", "Wildlife", "Environment", "Climate", "Research"],
    programs: [
      "Species Protection",
      "Landscape Conservation",
      "Community Enterprise",
    ],
    beneficiaries: ["Rural Communities", "Pastoralists"],
    sdgs: [13, 15],
    donors: ["EU", "USAID", "Private Foundations"],
    partners: ["Government Wildlife Authorities", "Research Institutes"],
    tags: [
      "Wildlife Conservation",
      "Biodiversity",
      "Ecotourism",
      "Habitat Protection",
    ],
    metrics: {
      employees: "300+",
      countriesCount: 15,
      activeProjects: 45,
      beneficiariesReached: "1M+",
      annualBudget: "$45M+",
    },
    counts: { jobs: 3, grants: 4, events: 2, reports: 12, news: 31 },
    website: "https://www.awf.org",
    email: "africanwildlife@awf.org",
  },
  {
    id: "aphrc",
    name: "African Population and Health Research Center",
    acronym: "APHRC",
    slug: "african-population-and-health-research-center",
    logo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=120&auto=format&fit=crop&q=80",
    description:
      "Leading pan-African research institution headquartered in Nairobi, conducting policy-relevant research on population, health, and education across sub-Saharan Africa.",
    mission:
      "To generate evidence for policy and action to improve population health and wellbeing in Africa.",
    foundedYear: 2001,
    organizationType: "Research Institute",
    continent: "Africa",
    region: "East Africa",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Malawi",
      "Nigeria",
      "Senegal",
      "Burkina Faso",
    ],
    headquarters: "Nairobi, Kenya",
    coverage: "Pan-African",
    organizationSize: "Medium",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Research",
      "Health",
      "Education",
      "Urban Development",
      "Population",
    ],
    programs: [
      "Health Systems Research",
      "Aging and Development",
      "Education and Youth Empowerment",
    ],
    beneficiaries: ["Governments", "Researchers", "Students", "Urban Poor"],
    sdgs: [3, 4, 11],
    donors: ["Gates Foundation", "Wellcome Trust", "IDRC", "SIDA"],
    partners: ["Universities across Africa", "WHO"],
    tags: [
      "Public Health Research",
      "Demographics",
      "Evidence-Based Policy",
      "Think Tank",
    ],
    metrics: {
      employees: "200+",
      countriesCount: 20,
      activeProjects: 60,
      beneficiariesReached: "N/A",
      annualBudget: "$30M+",
    },
    counts: { jobs: 5, grants: 12, events: 8, reports: 65, news: 40 },
    website: "https://aphrc.org",
    email: "info@aphrc.org",
  },
  {
    id: "action-against-hunger",
    name: "Action Against Hunger",
    slug: "action-against-hunger",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80",
    description:
      "Global humanitarian organization leading the fight against hunger, saving lives of malnourished children and providing communities with sustainable access to safe water.",
    mission:
      "To save lives by eliminating hunger through improved prevention, detection, and treatment.",
    foundedYear: 1979,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Somalia",
      "South Sudan",
      "Niger",
      "Chad",
      "Madagascar",
    ],
    headquarters: "Paris, France",
    coverage: "Global",
    organizationSize: "Large",
    verificationLevel: "Verified",
    featured: false,
    sectors: [
      "Nutrition",
      "Food Security",
      "Water",
      "Sanitation (WASH)",
      "Emergency Response",
    ],
    programs: [
      "Severe Acute Malnutrition Treatment",
      "WASH in Emergency",
      "Resilient Livelihoods",
    ],
    beneficiaries: ["Children", "Rural Communities", "Refugees"],
    sdgs: [2, 3, 6],
    donors: ["USAID", "EU", "ECHO", "WFP"],
    partners: ["UNICEF", "WHO"],
    tags: ["Malnutrition", "Food Security", "WASH", "Emergency Relief"],
    metrics: {
      employees: "8,000+",
      countriesCount: 50,
      activeProjects: 150,
      beneficiariesReached: "20M+",
      annualBudget: "$400M+",
    },
    counts: { jobs: 7, grants: 6, events: 1, reports: 18, news: 44 },
    website: "https://www.actionagainsthunger.org",
    email: "info@actionagainsthunger.org",
  },
  {
    id: "wateraid",
    name: "WaterAid",
    slug: "wateraid",
    logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80",
    description:
      "International NGO working to make clean water, decent toilets, and good hygiene normal for everyone, everywhere within a generation.",
    mission:
      "To transform lives by improving access to clean water, hygiene, and sanitation in the world's poorest communities.",
    foundedYear: 1981,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Uganda",
      "Kenya",
      "Tanzania",
      "Ethiopia",
      "Rwanda",
      "Ghana",
      "Nigeria",
      "Zambia",
    ],
    headquarters: "London, United Kingdom",
    coverage: "Global",
    organizationSize: "Medium",
    verificationLevel: "Verified",
    featured: false,
    sectors: ["Water", "Sanitation (WASH)", "Health", "Education"],
    programs: [
      "Sustainable WASH in Healthcare Facilities",
      "Community-Led Total Sanitation",
    ],
    beneficiaries: ["Rural Communities", "Schools", "Hospitals", "Children"],
    sdgs: [3, 6],
    donors: ["FCDO", "SIDA", "Gates Foundation", "Private Donors"],
    partners: ["Ministries of Water and Health", "UNICEF"],
    tags: ["Clean Water", "Sanitation", "Hygiene", "WASH"],
    metrics: {
      employees: "1,200+",
      countriesCount: 28,
      activeProjects: 80,
      beneficiariesReached: "28M+",
      annualBudget: "$130M+",
    },
    counts: { jobs: 5, grants: 3, events: 2, reports: 22, news: 35 },
    website: "https://www.wateraid.org",
    email: "wateraid@wateraid.org",
  },
  {
    id: "oxfam",
    name: "Oxfam",
    slug: "oxfam",
    logo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=120&auto=format&fit=crop&q=80",
    description:
      "Global confederation of organizations dedicated to fighting inequality to end poverty and injustice around the world.",
    mission:
      "To create a future without the injustice of poverty through systemic change and emergency relief.",
    foundedYear: 1942,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Ethiopia",
      "Somalia",
      "South Sudan",
      "DRC",
      "South Africa",
      "Nigeria",
    ],
    headquarters: "Nairobi, Kenya",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Humanitarian Aid",
      "Economic Development",
      "Governance",
      "Climate",
      "Women",
    ],
    programs: [
      "Inequality Campaign",
      "Right to Food",
      "Climate Justice",
      "Humanitarian Response",
    ],
    beneficiaries: ["Small Businesses", "Farmers", "Women", "Urban Poor"],
    sdgs: [1, 2, 5, 10, 13],
    donors: ["EU", "DFAT", "SIDA", "NORAD"],
    partners: ["Local Civil Society Alliances", "UN Agencies"],
    tags: ["Inequality", "Advocacy", "Climate Justice", "Humanitarian Aid"],
    metrics: {
      employees: "10,000+",
      countriesCount: 87,
      activeProjects: 200,
      beneficiariesReached: "15M+",
      annualBudget: "$1B+",
    },
    counts: { jobs: 11, grants: 7, events: 4, reports: 45, news: 88 },
    website: "https://www.oxfam.org",
    email: "oxfam@oxfam.org",
  },
  {
    id: "the-carter-center",
    name: "The Carter Center",
    slug: "the-carter-center",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&auto=format&fit=crop&q=80",
    description:
      "Not-for-profit organization founded by Jimmy and Rosalynn Carter, advancing human rights, election observation, and the eradication of neglected tropical diseases in Africa.",
    mission: "Waging peace, fighting disease, and building hope.",
    foundedYear: 1982,
    organizationType: "Foundation",
    continent: "North America",
    region: "Pan-African",
    countriesServed: [
      "Uganda",
      "Ethiopia",
      "Sudan",
      "Mali",
      "Nigeria",
      "Democratic Republic of Congo",
    ],
    headquarters: "Atlanta, United States",
    coverage: "Global",
    organizationSize: "Medium",
    verificationLevel: "Verified",
    featured: false,
    sectors: [
      "Health",
      "Governance",
      "Human Rights",
      "Peace Building",
      "Justice",
    ],
    programs: [
      "Worm Eradication Program (Guinea Worm)",
      "Mental Health Program",
      "Democracy Election Monitoring",
    ],
    beneficiaries: ["Governments", "Communities", "Rural Populations"],
    sdgs: [3, 16],
    donors: ["Gates Foundation", "USAID", "Private Donors"],
    partners: ["WHO", "Ministries of Health"],
    tags: [
      "Disease Eradication",
      "Election Monitoring",
      "Human Rights",
      "Public Health",
    ],
    metrics: {
      employees: "350+",
      countriesCount: 15,
      activeProjects: 30,
      beneficiariesReached: "10M+",
      annualBudget: "$100M+",
    },
    counts: { jobs: 2, grants: 3, events: 1, reports: 14, news: 28 },
    website: "https://www.cartercenter.org",
    email: "carterweb@cartercenter.org",
  },
  {
    id: "path",
    name: "PATH",
    slug: "path",
    logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80",
    description:
      "Global team of innovators accelerating health equity by bringing together public health, private enterprise, and communities to tackle infectious diseases and maternal mortality.",
    mission: "To drive transformative health innovation across the globe.",
    foundedYear: 1977,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Senegal",
      "South Africa",
      "DRC",
      "Zambia",
    ],
    headquarters: "Seattle, United States",
    coverage: "Global",
    organizationSize: "Large",
    verificationLevel: "Verified",
    featured: true,
    sectors: [
      "Health",
      "Digital Health",
      "Research",
      "Innovation",
      "Nutrition",
    ],
    programs: [
      "Vaccine Innovation",
      "Digital Health Solutions",
      "Maternal and Child Health",
    ],
    beneficiaries: [
      "Health Workers",
      "Children",
      "Pregnant Mothers",
      "Governments",
    ],
    sdgs: [3, 9, 17],
    donors: ["Gates Foundation", "USAID", "Wellcome Trust", "Global Fund"],
    partners: ["WHO", "Local Biotech Firms"],
    tags: [
      "Health Innovation",
      "Vaccines",
      "Digital Health",
      "Medical Research",
    ],
    metrics: {
      employees: "1,600+",
      countriesCount: 70,
      activeProjects: 95,
      beneficiariesReached: "50M+",
      annualBudget: "$350M+",
    },
    counts: { jobs: 9, grants: 11, events: 4, reports: 30, news: 60 },
    website: "https://www.path.org",
    email: "info@path.org",
  },
  {
    id: "fhi-360",
    name: "FHI 360",
    slug: "fhi-360",
    logo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=120&auto=format&fit=crop&q=80",
    description:
      "Nonprofit human development organization dedicated to improving lives in lasting ways by advancing integrated, locally driven solutions in health, education, and nutrition.",
    mission:
      "To build healthier, more prosperous, and equitable communities worldwide.",
    foundedYear: 1971,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Nigeria",
      "Nigeria",
      "Rwanda",
      "Mozambique",
    ],
    headquarters: "Durham, United States",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: false,
    sectors: [
      "Health",
      "Education",
      "Research",
      "Economic Development",
      "Youth",
    ],
    programs: [
      "HIV/AIDS Prevention and Treatment",
      "Basic Education Support",
      "Civil Society Strengthening",
    ],
    beneficiaries: ["Youth", "Students", "Health Workers", "Communities"],
    sdgs: [3, 4, 8, 17],
    donors: ["USAID", "PEPFAR", "Gates Foundation", "Global Fund"],
    partners: ["Ministries of Health & Education", "Local NGOs"],
    tags: ["Public Health", "Education", "Research", "Civil Society"],
    metrics: {
      employees: "4,000+",
      countriesCount: 60,
      activeProjects: 140,
      beneficiariesReached: "35M+",
      annualBudget: "$650M+",
    },
    counts: { jobs: 12, grants: 8, events: 2, reports: 25, news: 52 },
    website: "https://www.fhi360.org",
    email: "info@fhi360.org",
  },
  {
    id: "population-services-international",
    name: "Population Services International",
    acronym: "PSI",
    slug: "population-services-international",
    logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80",
    description:
      "Global health organization working in over 50 countries, using commercial marketing strategies to make healthcare more affordable and accessible for vulnerable populations.",
    mission:
      "To make it easier for people in the developing world to lead healthier lives and plan the families they desire.",
    foundedYear: 1970,
    organizationType: "International NGO",
    continent: "Global",
    region: "Pan-African",
    countriesServed: [
      "Kenya",
      "Uganda",
      "Tanzania",
      "Nigeria",
      "Democratic Republic of Congo",
      "Madagascar",
    ],
    headquarters: "Washington, D.C., United States",
    coverage: "Global",
    organizationSize: "Global",
    verificationLevel: "Verified",
    featured: false,
    sectors: [
      "Health",
      "Digital Health",
      "Reproductive Health",
      "Malaria",
      "HIV",
    ],
    programs: [
      "Social Marketing of Health Products",
      "Malaria Diagnostics & Treatment",
      "Family Planning",
    ],
    beneficiaries: ["Women", "Youth", "Communities"],
    sdgs: [3, 5],
    donors: ["USAID", "Global Fund", "UNITAID", "Gates Foundation"],
    partners: ["Local Distributors", "Ministry of Health"],
    tags: [
      "Social Marketing",
      "Reproductive Health",
      "Malaria",
      "Healthcare Access",
    ],
    metrics: {
      employees: "5,000+",
      countriesCount: 50,
      activeProjects: 90,
      beneficiariesReached: "45M+",
      annualBudget: "$500M+",
    },
    counts: { jobs: 6, grants: 5, events: 1, reports: 16, news: 34 },
    website: "https://www.psi.org",
    email: "psi@psi.org",
  },
];
