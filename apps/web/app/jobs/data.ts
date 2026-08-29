// app/jobs/data.ts
export interface JobOpportunity {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
  location: string;
  country: string;
  region: string;
  employmentType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Consultancy"
    | "Internship";
  experienceLevel: "Entry" | "Mid-Level" | "Senior" | "Executive";
  sector: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  applicationEmail?: string;
  applicationUrl?: string;
  deadline: string;
  postedDate: string;
  verified: boolean;
}

export const MOCK_JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: "gff-biomedical-engineer-2026",
    title: "Biomedical Engineer",
    organizationId: "gould-family-foundation",
    organizationName: "The Gould Family Foundation",
    organizationLogo:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80",
    location: "Kampala (with field travel across partner sites)",
    country: "Uganda",
    region: "East Africa",
    employmentType: "Full-time",
    experienceLevel: "Mid-Level",
    sector: "Health",
    description:
      "The Gould Family Foundation is seeking a dedicated Biomedical Engineer to join our field team in East Africa. The role involves hands-on support across the full medical equipment lifecycle—from facility assessments and installations to user training, routine maintenance, and troubleshooting at partner clinics and hospitals.",
    responsibilities: [
      "Conduct timely technical assessments of medical and laboratory equipment at partner health facilities.",
      "Install, commission, test, calibrate, maintain, and repair critical biomedical care equipment.",
      "Provide technical training and mentorship to local biomedical technicians and apprentices to achieve high proficiency in servicing and troubleshooting.",
      "Collaborate with clinical teams to ensure equipment readiness for maternal, newborn, and child healthcare units.",
    ],
    qualifications: [
      "Degree in Biomedical Engineering, Electrical Engineering, or a related technical field.",
      "Demonstrated hands-on field experience in maintaining and repairing hospital and laboratory equipment in low-resource settings.",
      "Strong communication and training skills with an aptitude for mentoring local technicians.",
      "Willingness to travel regularly to partner hospitals and rural health centers.",
    ],
    applicationEmail: "gouldfamilyfoundation06@gmail.com",
    deadline: "2026-08-24",
    postedDate: "2026-07-30",
    verified: true,
  },
  {
    id: "usaid-ea-climate-specialist-2026",
    title: "Senior Climate Resilience & Adaptation Specialist",
    organizationId: "usaid-east-africa",
    organizationName: "USAID East Africa",
    organizationLogo:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=80",
    location: "Nairobi, Kenya",
    country: "Kenya",
    region: "East Africa",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    sector: "Climate & Resilience",
    description:
      "USAID East Africa is looking for an expert Climate Resilience & Adaptation Specialist to guide regional programming, support local governments in climate action planning, and oversee grants targeting arid and semi-arid lands (ASAL) communities.",
    responsibilities: [
      "Provide strategic oversight for climate adaptation portfolios across East African partner states.",
      "Design frameworks for scaling community-based early warning systems and drought resilience initiatives.",
      "Coordinate with inter-governmental bodies like IGAD on regional climate policy alignment.",
      "Evaluate proposal submissions and monitor key performance indicators for ongoing climate grants.",
    ],
    qualifications: [
      "Master's degree in Climate Science, Environmental Economics, Development Studies, or related discipline.",
      "Minimum 8 years of professional experience in climate change mitigation, adaptation, or sustainable development in Africa.",
      "Extensive experience working with international donors, UN agencies, or regional development banks.",
      "Exceptional analytical, policy-drafting, and stakeholder engagement skills.",
    ],
    applicationUrl: "https://www.usaid.gov/east-africa/careers",
    deadline: "2026-09-15",
    postedDate: "2026-08-01",
    verified: true,
  },
  {
    id: "who-afro-public-health-epidem-2026",
    title: "Lead Epidemiologist - Emergency Response",
    organizationId: "who-africa",
    organizationName: "World Health Organization (WHO AFRO)",
    organizationLogo:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80",
    location: "Brazzaville / Regional Deployments",
    country: "Republic of the Congo",
    region: "Central Africa",
    employmentType: "Full-time",
    experienceLevel: "Executive",
    sector: "Health",
    description:
      "The WHO Regional Office for Africa is seeking an experienced Lead Epidemiologist to direct outbreak investigation teams, strengthen disease surveillance networks, and coordinate rapid response operations for emerging public health threats across the continent.",
    responsibilities: [
      "Lead regional epidemiological investigations and outbreak control responses for infectious disease threats.",
      "Strengthen integrated disease surveillance and response (IDSR) systems across member states.",
      "Manage rapid deployment teams and collaborate with ministries of health during health emergencies.",
      "Author high-impact policy guidelines, risk assessments, and epidemiological situation reports.",
    ],
    qualifications: [
      "Advanced medical degree (MD) with a Master's in Public Health (MPH) and a PhD in Epidemiology or equivalent.",
      "At least 10 years of field epidemiology experience managing epidemic-prone diseases in resource-constrained contexts.",
      "Demonstrated crisis leadership and coordination experience with international health organizations.",
      "Fluency in English and French is strongly preferred.",
    ],
    applicationUrl: "https://www.who.int/careers",
    deadline: "2026-08-30",
    postedDate: "2026-07-28",
    verified: true,
  },
  {
    id: "brac-uganda-agritech-pm-2026",
    title: "AgriTech Project Manager",
    organizationId: "brac-uganda",
    organizationName: "BRAC Uganda",
    organizationLogo:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120&auto=format&fit=crop&q=80",
    location: "Kampala, Uganda",
    country: "Uganda",
    region: "East Africa",
    employmentType: "Full-time",
    experienceLevel: "Mid-Level",
    sector: "Agriculture & Food",
    description:
      "BRAC Uganda is scaling its digital agriculture initiative connecting smallholder farmers with market intelligence, micro-loans, and weather advisory services. We are looking for a dynamic Project Manager to oversee field rollouts and technology adoption.",
    responsibilities: [
      "Manage end-to-end execution of the digital agriculture extension program across 15 target districts.",
      "Partner with agritech software developers to refine user interfaces and offline-first mobile features.",
      "Train community agriculture extension workers and farmer cooperatives on digital tool utilization.",
      "Monitor project impact metrics, budget allocations, and donor reporting schedules.",
    ],
    qualifications: [
      "Bachelor's or Master's degree in Agriculture, Agribusiness, Project Management, or Information Systems.",
      "Minimum 5 years managing community-based agricultural or digital inclusion programs in East Africa.",
      "Strong understanding of smallholder farming ecosystems and agricultural value chains.",
      "Excellent interpersonal, public speaking, and data synthesis capabilities.",
    ],
    applicationEmail: "careers.uganda@brac.net",
    deadline: "2026-09-10",
    postedDate: "2026-08-02",
    verified: true,
  },
  {
    id: "afdb-fintech-analyst-2026",
    title: "Digital Financial Inclusion Analyst",
    organizationId: "afdb",
    organizationName: "African Development Bank (AfDB)",
    organizationLogo:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80",
    location: "Abidjan, Côte d'Ivoire",
    country: "Côte d'Ivoire",
    region: "West Africa",
    employmentType: "Full-time",
    experienceLevel: "Mid-Level",
    sector: "Technology & AI",
    description:
      "The African Development Bank invites applications for a Digital Financial Inclusion Analyst. The role supports the development of venture financing instruments, regulatory sandbox policies, and fintech innovation hubs across regional member countries.",
    responsibilities: [
      "Conduct macroeconomic research on fintech adoption, mobile money growth, and SME credit gaps across Africa.",
      "Assist in structuring venture capital investments, lines of credit, and technical assistance packages for tech startups.",
      "Collaborate with central banks and regulatory bodies on harmonizing cross-border digital payment frameworks.",
      "Draft policy notes, investment briefs, and board presentations on regional digital transformation.",
    ],
    qualifications: [
      "Master's degree in Finance, Economics, Financial Technology, or related quantitative field.",
      "4+ years of experience in investment banking, development finance, venture capital, or fintech advisory.",
      "Deep familiarity with African startup ecosystems and regulatory environments.",
      "Advanced financial modeling and written communication skills.",
    ],
    applicationUrl: "https://www.afdb.org/en/about-us/careers",
    deadline: "2026-09-05",
    postedDate: "2026-07-29",
    verified: true,
  },
  {
    id: "mcf-youth-empowerment-officer-2026",
    title: "Youth Employment & Skills Program Officer",
    organizationId: "mastercard-foundation",
    organizationName: "Mastercard Foundation",
    organizationLogo:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=120&auto=format&fit=crop&q=80",
    location: "Kigali, Rwanda",
    country: "Rwanda",
    region: "East Africa",
    employmentType: "Full-time",
    experienceLevel: "Mid-Level",
    sector: "Education & EdTech",
    description:
      "The Mastercard Foundation is searching for a passionate Program Officer to support our Young Africa Works strategy. The role focuses on expanding dignified and fulfilling work opportunities for young women and men through vocational training and entrepreneurship support.",
    responsibilities: [
      "Support partner portfolio management across educational institutions, incubators, and private sector employers.",
      "Review grant proposals and monitor implementation milestones for youth skills development projects.",
      "Facilitate knowledge sharing and collaborative learning sessions among regional implementing partners.",
      "Prepare periodic impact evaluations, beneficiary success stories, and executive summaries.",
    ],
    qualifications: [
      "University degree in International Development, Education, Business Administration, or Social Sciences.",
      "Minimum 4 years of experience in youth livelihood programs, TVET systems, or workforce development.",
      "Demonstrated commitment to youth empowerment and gender-inclusive economic development.",
      "Exceptional project management, budgeting, and writing skills.",
    ],
    applicationEmail: "recruitment@mastercardfdn.org",
    deadline: "2026-08-28",
    postedDate: "2026-08-02",
    verified: true,
  },
  {
    id: "world-vision-wash-engineer-2026",
    title: "WASH (Water, Sanitation & Hygiene) Engineer",
    organizationId: "world-vision-ea",
    organizationName: "World Vision East Africa",
    organizationLogo:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80",
    location: "Juba / Field Deployments",
    country: "South Sudan",
    region: "East Africa",
    employmentType: "Contract",
    experienceLevel: "Senior",
    sector: "Humanitarian Aid",
    description:
      "World Vision is looking for an experienced WASH Engineer to lead emergency water supply projects, borehole rehabilitations, and community hygiene promotion campaigns in displaced populations and vulnerable rural communities.",
    responsibilities: [
      "Design and oversee the construction of solar-powered water supply systems, boreholes, and institutional sanitation facilities.",
      "Ensure adherence to international humanitarian engineering standards and environmental safety protocols.",
      "Train local water committees and community technicians in sustainable operations and maintenance.",
      "Manage procurement of construction materials and supervise contractor performance in the field.",
    ],
    qualifications: [
      "Bachelor's degree in Civil Engineering, Environmental Engineering, or Hydraulic Engineering.",
      "At least 6 years of humanitarian field experience managing WASH projects in fragile or emergency settings.",
      "Proficiency in CAD software, water testing methodologies, and community mobilization.",
      "Resilience, adaptability, and readiness to work in challenging field conditions.",
    ],
    applicationUrl: "https://www.wvi.org/careers",
    deadline: "2026-09-01",
    postedDate: "2026-07-31",
    verified: true,
  },
  {
    id: "giz-renewable-energy-advisor-2026",
    title: "Renewable Energy & Mini-Grid Advisor",
    organizationId: "giz-germany",
    organizationName: "GIZ / Energising Development (EnDev)",
    organizationLogo:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=120&auto=format&fit=crop&q=80",
    location: "Addis Ababa, Ethiopia",
    country: "Ethiopia",
    region: "East Africa",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    sector: "Climate & Resilience",
    description:
      "GIZ is seeking a technical Renewable Energy Advisor to support decentralized solar mini-grid deployments, productive use of energy (PUE) programs, and regulatory frameworks for rural electrification across Ethiopia.",
    responsibilities: [
      "Provide technical advisory services to private developers and rural electrification agencies on solar mini-grid projects.",
      "Design capacity building programs for local technicians on photovoltaic system maintenance and business management.",
      "Conduct feasibility studies and site assessments for community-level productive use applications (agro-processing, refrigeration).",
      "Draft policy recommendations for improving tariff setting and licensing procedures.",
    ],
    qualifications: [
      "Master's degree in Electrical Engineering, Renewable Energy, Energy Economics, or related field.",
      "Minimum 7 years of professional experience in decentralized renewable energy projects in Sub-Saharan Africa.",
      "Strong stakeholder management skills working with ministries, donors, and private sector enterprises.",
      "Fluency in written and spoken English; knowledge of local languages is an advantage.",
    ],
    applicationEmail: "giz-ethiopia-hr@giz.de",
    deadline: "2026-09-20",
    postedDate: "2026-08-03",
    verified: true,
  },
  {
    id: "unicef-child-protection-specialist-2026",
    title: "Child Protection Specialist (Emergency)",
    organizationId: "unicef-esaro",
    organizationName: "UNICEF Eastern and Southern Africa",
    organizationLogo:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80",
    location: "Nairobi (with travel to emergency zones)",
    country: "Kenya",
    region: "East Africa",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    sector: "Humanitarian Aid",
    description:
      "UNICEF ESARO is recruiting a Child Protection Specialist to coordinate regional emergency response frameworks, prevent family separation in crisis zones, and strengthen mental health and psychosocial support (MHPSS) services for children.",
    responsibilities: [
      "Coordinate regional child protection emergency preparedness and contingency planning across country offices.",
      "Provide technical guidance on grave child rights violations monitoring and reporting (MRM) mechanisms.",
      "Support national partners in scaling up community-based psychosocial support and case management systems.",
      "Mobilize resources and coordinate funding allocations with humanitarian donors and cluster leads.",
    ],
    qualifications: [
      "Advanced university degree in International Law, Human Rights, Psychology, Social Work, or International Development.",
      "At least 8 years of progressively responsible humanitarian experience in child protection and emergency response.",
      "Proven track record in inter-agency coordination and working in complex socio-political environments.",
      "Exceptional negotiation, advocacy, and report writing abilities.",
    ],
    applicationUrl: "https://www.unicef.org/careers",
    deadline: "2026-09-12",
    postedDate: "2026-08-03",
    verified: true,
  },
  {
    id: "oxfam-food-security-lead-2026",
    title: "Food Security & Livelihoods Technical Coordinator",
    organizationId: "oxfam-international",
    organizationName: "Oxfam International",
    organizationLogo:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=120&auto=format&fit=crop&q=80",
    location: "Abuja, Nigeria",
    country: "Nigeria",
    region: "West Africa",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    sector: "Agriculture & Food",
    description:
      "Oxfam is seeking a Food Security & Livelihoods Technical Coordinator to design, fundraise, and oversee resilience-building interventions, cash transfer programming, and climate-smart agriculture initiatives across West Africa.",
    responsibilities: [
      "Lead the strategic development of FSL programs, ensuring integration with gender justice and humanitarian advocacy.",
      "Oversee large-scale cash and voucher assistance (CVA) distributions and market assessments in vulnerable regions.",
      "Mentor field project managers and ensure high standards of monitoring, evaluation, accountability, and learning (MEAL).",
      "Represent Oxfam in food security cluster coordination meetings and donor consortium discussions.",
    ],
    qualifications: [
      "Master's degree in Agriculture, Agricultural Economics, Food Security, Development Studies, or related field.",
      "Minimum 7 years of international humanitarian and development experience managing complex FSL portfolios.",
      "Expertise in cash transfer programming, livelihood recovery, and resilience frameworks.",
      "Strong leadership, cross-cultural communication, and grant writing skills.",
    ],
    applicationEmail: "oxfamwestafricajobs@oxfam.org",
    deadline: "2026-09-18",
    postedDate: "2026-08-02",
    verified: true,
  },
  {
    id: "mercy-corps-drc-mne-manager-2026",
    title: "Monitoring, Evaluation & Learning (MEL) Manager",
    organizationId: "mercy-corps",
    organizationName: "Mercy Corps",
    organizationLogo:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&auto=format&fit=crop&q=80",
    location: "Goma, Democratic Republic of the Congo",
    country: "Democratic Republic of the Congo",
    region: "Central Africa",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    sector: "Humanitarian Aid",
    description:
      "Mercy Corps is seeking an experienced MEL Manager to lead data collection systems, quality assurance, and impact measurement for our multi-sector humanitarian and economic recovery portfolio in eastern DRC.",
    responsibilities: [
      "Design and implement robust MEL frameworks, data collection tools, and feedback mechanisms across active programs.",
      "Train program teams and local partner organizations on digital data gathering (KoboToolbox, ODK) and data hygiene.",
      "Lead periodic internal evaluations, data quality audits, and baseline/endline studies.",
      "Synthesize impact findings into high-quality donor reports, learning briefs, and adaptive management plans.",
    ],
    qualifications: [
      "Master's degree in Statistics, Economics, Social Sciences, International Development, or related discipline.",
      "Minimum 6 years of professional MEL experience in humanitarian or development contexts, preferably in fragile states.",
      "Advanced proficiency in statistical software (SPSS, R, Stata) and mobile data collection platforms.",
      "Bilingual proficiency in English and French (written and spoken) is required.",
    ],
    applicationUrl: "https://www.mercycorps.org/careers",
    deadline: "2026-09-25",
    postedDate: "2026-08-03",
    verified: true,
  },
  {
    id: "undp-governance-analyst-2026",
    title: "Democratic Governance & Civic Tech Analyst",
    organizationId: "undp-africa",
    organizationName: "United Nations Development Programme (UNDP)",
    organizationLogo:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&auto=format&fit=crop&q=80",
    location: "Accra, Ghana",
    country: "Ghana",
    region: "West Africa",
    employmentType: "Full-time",
    experienceLevel: "Mid-Level",
    sector: "Governance & Policy",
    description:
      "UNDP Ghana is looking for a Governance & Civic Tech Analyst to support institutional strengthening, digital public infrastructure initiatives, and youth-led accountability platforms across West Africa.",
    responsibilities: [
      "Provide advisory support to electoral commissions, anti-corruption agencies, and civil society networks.",
      "Manage partnerships with civic tech innovators building transparent public procurement and budgeting tools.",
      "Conduct policy analysis on digital governance frameworks, data privacy laws, and civic space protection.",
      "Draft project proposals, briefing notes, and donor partnership agreements.",
    ],
    qualifications: [
      "Master's degree in Political Science, Public Administration, Law, International Relations, or Tech Policy.",
      "At least 5 years of experience working in democratic governance, institutional reform, or civic technology.",
      "Strong track record in stakeholder convening, facilitation, and multi-actor project management.",
      "Excellent research and written communication skills in English.",
    ],
    applicationEmail: "hrcandidates.gh@undp.org",
    deadline: "2026-09-22",
    postedDate: "2026-08-01",
    verified: true,
  },
  {
    id: "amref-health-africa-sr-nurse-2026",
    title: "Maternal & Child Health Master Trainer",
    organizationId: "amref-health-africa",
    organizationName: "Amref Health Africa",
    organizationLogo:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120&auto=format&fit=crop&q=80",
    location: "Dar es Salaam, Tanzania",
    country: "Tanzania",
    region: "East Africa",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    sector: "Health",
    description:
      "Amref Health Africa is seeking a Maternal & Child Health Master Trainer to spearhead capacity building initiatives for frontline health workers, midwives, and community health volunteers across underserved rural districts.",
    responsibilities: [
      "Develop and update clinical training curricula for emergency obstetric and newborn care (EmONC).",
      "Facilitate training-of-trainers (ToT) workshops for district nursing supervisors and midwifery tutors.",
      "Supervise clinical mentorship programs in rural health clinics to ensure high standards of patient care.",
      "Collaborate with the Ministry of Health to evaluate maternal mortality reduction strategies.",
    ],
    qualifications: [
      "Master's degree in Nursing, Midwifery, Public Health, or reproductive health sciences.",
      "Minimum 7 years of clinical nursing/midwifery experience with at least 4 years in training and curriculum development.",
      "Active registration with the Tanzania Nurses and Midwives Council (or reciprocal regional body).",
      "Exceptional instructional, mentorship, and interpersonal skills.",
    ],
    applicationUrl: "https://amref.org/vacancies",
    deadline: "2026-09-14",
    postedDate: "2026-08-02",
    verified: true,
  },
  {
    id: "ilu-sports-development-director-2026",
    title: "Grassroots Sports & Youth Academy Director",
    organizationId: "future-afrika-sports",
    organizationName: "Afrika Sports & Education Initiative",
    organizationLogo:
      "https://images.unsplash.com/photo-1517649763962-0c623266cf10?w=120&auto=format&fit=crop&q=80",
    location: "Dakar, Senegal",
    country: "Senegal",
    region: "West Africa",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    sector: "Youth & Sports",
    description:
      "We are looking for a visionary Sports Development Director to oversee community sports academies combining athletic training with academic tutoring, life skills coaching, and digital literacy for youth across West Africa.",
    responsibilities: [
      "Design and manage holistic sports-for-development training schedules across regional academy hubs.",
      "Forge partnerships with professional clubs, sports tech companies, and educational sponsors.",
      "Monitor athlete progression metrics, academic standing, and scholarship placements.",
      "Ensure safeguarding, child protection, and health protocols are rigorously maintained.",
    ],
    qualifications: [
      "Bachelor's or Master's degree in Sports Management, Physical Education, Youth Work, or Social Enterprise.",
      "Minimum 6 years of experience managing sports academies, community development programs, or youth initiatives.",
      "Deep understanding of the African sports talent pipeline and youth empowerment models.",
      "Fluency in French and English is required.",
    ],
    applicationEmail: "talent@afrikasportsedu.org",
    deadline: "2026-09-30",
    postedDate: "2026-08-03",
    verified: true,
  },
];

export const AVAILABLE_JOB_TYPES = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Consultancy",
  "Internship",
];

export const AVAILABLE_EXPERIENCE_LEVELS = [
  "All Levels",
  "Entry",
  "Mid-Level",
  "Senior",
  "Executive",
];
