import riAiIcon from '../assets/ri_ai.png';
import verifiedIcon from '../assets/material-symbols-light_verified-outline.png';
import accessControlIcon from '../assets/material-symbols_switch-access-outline.png';
import secureInfraIcon from '../assets/arcticons_secure-tan.png';

export const SECURITY_NODES = [
  {
    id: 'responsible-ai',
    title: 'Responsible AI & Model Usage',
    description: 'Customer data is never used to train shared or public AI models.',
    icon: riAiIcon,
    gradient: 'linear-gradient(135deg, #2837a2 0%, #5b82e2 100%)',
    desktopStyle: { top: '8%', left: '50%', transform: 'translate(-50%, -80%)' },
    iconExtraClass: 'translate-y-8',
    // Label positioned left of center
    labelClass: 'absolute -left-3/4 -top-1/4 -translate-y-1/2 w-[280px] text-left',
  },
  {
    id: 'verifiable-answers',
    title: 'Verifiable & Trusted Answers',
    description:
      'Every response is grounded in your company knowledge with traceable sources and review workflows.',
    icon: verifiedIcon,
    gradient: 'linear-gradient(180deg, #fe404b 0%, #61b6ef 100%)',
    desktopStyle: { top: '50%', left: '93%', transform: 'translate(-50%, -50%)' },
    iconExtraClass: '',
    labelClass: 'absolute left-[calc(100%+24px)] top-1/2 -translate-y-1/2 w-[280px] text-left',
  },
  {
    id: 'access-control',
    title: 'Access Control & Governance',
    description:
      'Granular permissions and audit logs ensure only authorized users can access sensitive information.',
    icon: accessControlIcon,
    gradient: 'linear-gradient(180deg, #2b2b2b 0%, #5b21b6 100%)',
    desktopStyle: { top: '100%', left: '50%', transform: 'translate(-50%, -50%)' },
    iconExtraClass: '-translate-y-10',
    labelClass: 'absolute -right-[calc(100%)] top-[125%] -translate-y-1/2 w-[280px] text-left',
  },
  {
    id: 'secure-infrastructure',
    title: 'Secure Infrastructure',
    description:
      'Your data is protected with encryption, secure storage, and isolated customer environments.',
    icon: secureInfraIcon,
    gradient: 'linear-gradient(180deg, #71b2cc 0%, #d4d145 100%)',
    desktopStyle: { top: '50%', left: '9%', transform: 'translate(-50%, -50%)' },
    iconExtraClass: '',
    labelClass: 'absolute right-[calc(80%)] top-1/2 -translate-y-1/2 w-[280px] text-left',
  },
];
