import slide1Img from '../assets/Intro-Page.webp';
import slide2Img from '../assets/Intro Page (3).png';
import slide3Img from '../assets/Intro Page (8).png';
import slide4Img from '../assets/Intro Page (1).png';

export const CAROUSEL_SLIDES = [
  {
    index: 0,
    step: '1. Connect your knowledge',
    tabLabel: 'Connect',
    cardGradientClass: 'card-gradient-a1',
    height:'65vh',
    cardImage: slide1Img,
    cardImageAlt: '1. Connect your knowledge',
    cardImageWidth: '85%',
    cardImageClass: 'h-auto object-bottom rounded-b-[10px]',
    description:
      'Your single living source of truth. Anseru connects to where your knowledge already lives. Sync Google Drive, SharePoint, Teams, Jira, Slack, and Dropbox or upload your internal documents directly. Your answer library builds itself and stays current automatically.',
    bullets: [
      'Indexes past RFPs, security docs, and compliance content automatically',
      'Integrates with your existing storage and communication systems',
      'Improves continuously as your team uses and approves new answers',
    ],
  },
  {
    index: 1,
    step: '2. Upload RFPs & Security Questionnaires',
    tabLabel: 'Upload',
    cardGradientClass: 'card-gradient-a2',
    cardImage: slide2Img,
    height:'65vh',
    cardImageAlt: '2. Upload RFPs',
    cardImageWidth: '75%',
    cardImageClass: 'h-auto object-top rounded-b-[10px]',
    description:
      'Drop in any document in any format. Anseru reads the full document, identifies every requirement, and maps each question to your verified knowledge base, in seconds.',
    bullets: [
      'Accepts PDF, DOCX, XLSX documents.',
      'Automatically identifies and classifies every question and sub-requirement',
      'Maps each item to your verified answer library before you begin',
    ],
  },
  {
    index: 2,
    step: '3. Generate AI Draft Responses',
    tabLabel: 'Respond',
    cardGradientClass: 'card-gradient-a3',
    cardImage: slide3Img,
    cardImageAlt: '3. Generate AI Draft Responses',
    cardImageWidth: '85%',
    height:'55vh',
    cardImageClass: 'h-auto object-top rounded-b-[10px]',
    description:
      'Anseru generates a full response draft using your verified documentation and past approved answers. Every answer is traceable to a real source, so drafts arrive ready for review, not ready to be rewritten from scratch.',
    bullets: [
      'Drafts complete responses from your verified internal knowledge base',
      'Flags low-confidence answers for SME review before submission',
      'Saves hours of manual writing and cross-referencing per deal',
    ],
  },
  {
    index: 3,
    step: '4. SME Review & Approval',
    tabLabel: 'Approve',
    cardGradientClass: 'card-gradient-a4',
    cardImage: slide4Img,
    cardImageAlt: '4. SME Review & Approval',
    cardImageWidth: '85%',
    cardImageClass: 'h-auto object-top rounded-b-[10px]',
    height:'55vh',
    description:
      'Anseru focuses your experts on what only they can answer. Standard questions arrive pre-drafted and ready to approve. Novel, flagged, and high-risk items are surfaced for review before anything leaves the building.',
    bullets: [
      'Routes only flagged and novel questions to subject matter experts',
      'Full audit trail of every review, edit, and approval decision',
      'Every submission is clean, compliant, and signed off before it goes out',
    ],
  },
];