import salesCheckIcon from '../assets/Group.png?format=webp&quality=80';
import securityCheckIcon from '../assets/Group (1).png?format=webp&quality=80';
import complianceCheckIcon from '../assets/Group (2).png?format=webp&quality=80';

export const TEAM_CARDS = [
  {
    id: 'sales',
    title: 'Sales\nTeams',
    description:
      'Responding to RFPs and RFIs requires collecting information from different teams & documents, which slows down deal cycles.',
    accentGradient: 'from-[#11119A] to-[#4A86E8]',
    checkIcon: salesCheckIcon,
    benefits: [
      'Auto-assemble deal context from CRM data, call transcripts, and competitive insights',
      'Detect requirements and map proof points to your strongest capabilities',
      'Reduce proposal assembly time by 60%+ with AI-generated first drafts',
    ],
    benefitHighlight: { index: 2, text: '60%+' },
    frontSvg: 'sales',
  },
  {
    id: 'security',
    title: 'Security\nTeams',
    description:
      'Vendor security questionnaires require detailed answers about policies, compliance, and infrastructure.',
    accentGradient: 'from-[#D53B44] to-[#3B82F6]',
    checkIcon: securityCheckIcon,
    benefits: [
      'Auto-draft security responses from your verified security documentation',
      'Ground answers in verified security evidence',
      'Cut security review time from hours to minutes',
    ],
    frontSvg: 'security',
  },
  {
    id: 'compliance',
    title: 'Compliance\nTeams',
    description:
      'Compliance teams spend hours preparing responses for audits, vendor reviews, and regulatory forms.',
    accentGradient: 'from-[#658CA6] to-[#C9C21A]',
    checkIcon: complianceCheckIcon,
    benefits: [
      'Generate compliance responses with source-backed citations',
      'Enforce mandatory human review for regulatory answers',
      'Maintain a complete audit trail for every response',
    ],
    frontSvg: 'compliance',
  },
];
