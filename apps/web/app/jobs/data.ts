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
