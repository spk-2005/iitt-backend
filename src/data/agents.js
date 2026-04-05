import archerTabIcon from '../assets/Sud.png';
import knoxTabIcon from '../assets/kg.png';
import archerAgentIcon from '../assets/Frame (9).png';
import knoxAgentIcon from '../assets/Frame (10).png';

export const AGENTS = [
  {
    id: 'archer',
    tabLabel: 'Meet Archer',
    tabIcon: archerTabIcon,
    gradient: 'linear-gradient(180deg, #201cae 0%, #6aa4ee 100%)',
    agentIcon: archerAgentIcon,
    title: 'RFP Agent - Archer',
    tags: ['Instant RFP breakdown', 'Terminology translation', 'Proposal-ready answers'],
    features: [
      {
        title: 'Instant RFP\nintelligence',
        description: 'Automatically extracts key requirements, timelines, stakeholders, and evaluation criteria.',
      },
      {
        title: 'Terminology\nmapping',
        description: 'Translates feature requirements to your internal product language.',
      },
      {
        title: 'Bid / No\u2013\nBid clarity',
        description: 'Helps teams decide whether to pursue.',
      },
      {
        title: 'Structured proposal\ngeneration',
        description: 'Generates responses across technical, product, security, and legal sections with contextual intelligence.',
      },
    ],
  },
  {
    id: 'knox',
    tabLabel: 'Meet Knox',
    tabIcon: knoxTabIcon,
    gradient: 'linear-gradient(45deg, #1d80f9 0%, #e74f62 100%)',
    agentIcon: knoxAgentIcon,
    title: 'Security\nQuestionnaire Agent - Knox',
    tags: ['Evidence-backed answers', 'No contradictions', 'Compliance-ready'],
    features: [
      {
        title: '95%+ response\naccuracy',
        description: 'Generated from verified security documentation.',
      },
      {
        title: '70\u201390% faster\nreviews',
        description: 'Eliminates repetitive questionnaires saving SME time',
      },
      {
        title: 'Audit\u2013ready\nanswers',
        description: 'Aligned with current policies and controls.',
      },
      {
        title: 'Evidence\u2013backed\nresponses',
        description: 'Every answer is grounded in policies, certifications, and security evidence.',
      },
    ],
  },
];
