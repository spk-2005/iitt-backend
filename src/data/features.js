import livingIcon from '../assets/living.png';
import collaborationIcon from '../assets/Frame.png';
import evidenceIcon from '../assets/evidence.png';
import governanceIcon from '../assets/governance.png';

export const FEATURES = [
  {
    id: 'knowledge-graph',
    title: 'Living\nKnowledge Graph',
    textPosition: 'bottom',
    shortDesc: 'Your always-on Deal knowledge graph that learns as you win.',
    longDesc: 'Centralize and continuously improve your RFP knowledge.',
    iconSrc: livingIcon,
    bullets: [
      'Automatically indexes RFPs, security docs, proposals, and internal content',
      'Stays current with real-time source updates \u2014 no manual maintenance',
      'Gets smarter with every deal, surfacing the most relevant past responses',
    ],
  },
  {
    id: 'collaboration',
    title: 'Cross-Team\nCollaboration',
    textPosition: 'top',
    shortDesc: 'Align sales, legal, security, and SMEs around every Deal in one place',
    longDesc: 'Align sales, legal, security, and SMEs around every Deal in one place',
    iconSrc: collaborationIcon,
    bullets: [
      'Assign sections to the right SMEs with role-based task management',
      'Real-time co-editing with full version history and audit trail',
      'Integrated review workflows to finalize proposals faster',
    ],
  },
  {
    id: 'citation-engine',
    title: 'Evidence & Citation\nEngine',
    textPosition: 'bottom',
    shortDesc: 'Answers you can trust with sources to prove it.',
    longDesc: 'Answers you can trust \u2014 with sources to prove it.',
    iconSrc: evidenceIcon,
    bullets: [
      'Every response is automatically linked to the source document it was drawn from',
      'Highlights low-confidence answers for human review before submission',
      'Builds evaluator trust with transparent, auditable response generation',
    ],
  },
  {
    id: 'governance',
    title: 'Governance &\nAnalytics',
    textPosition: 'top',
    shortDesc: 'Full visibility into every Deal from first draft to final submission',
    longDesc: 'Full visibility into every Deal \u2014 from first draft to final submission',
    iconSrc: governanceIcon,
    bullets: [
      'Track RFP status, completion rates, and submission deadlines in real time',
      'Analyze win/loss patterns to improve future proposal strategy',
      'Enforce content standards with approval workflows and compliance controls',
    ],
  },
];
