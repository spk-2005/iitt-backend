import slide1Img from '../assets/Intro-Page.webp';
import slide2Img from '../assets/Intro Page (1).png';
import slide3Img from '../assets/Intro Page (3).png';
import slide4Img from '../assets/Intro Page (4).png';

const style = document.createElement('style');
style.textContent = `

  /* ── Base defaults (mobile-first) ── */
  .carousel-card-img-slide1,
  .carousel-card-img-slide2,
  .carousel-card-img-slide3,
  .carousel-card-img-slide4 {
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* ══════════════════════════════════════
     MOBILE  (< 1024px)
  ══════════════════════════════════════ */

  @media (max-width: 389px) {
    .carousel-card-img-slide1 { width: 85% !important; max-height: clamp(130px, 28vh, 180px) !important; }
    .carousel-card-img-slide2 { width: 88% !important; max-height: clamp(100px, 18vh, 170px) !important; }
    .carousel-card-img-slide3 { width: 92% !important; max-height: clamp(190px, 42vh, 270px) !important; }
    .carousel-card-img-slide4 { width: 90% !important; max-height: clamp(140px, 30vh, 190px) !important; }
  }
  @media (min-width: 390px) and (max-width: 639px) {
    .carousel-card-img-slide1 { width: 90% !important; max-height: clamp(100px, 32vh, 160px) !important; }
    .carousel-card-img-slide2 { width: 85% !important; max-height: clamp(90px,  32vh, 170px) !important; }
    .carousel-card-img-slide3 { width: 85% !important; max-height: clamp(120px, 50vh, 300px) !important; }
    .carousel-card-img-slide4 { width: 95% !important; max-height: clamp(120px, 34vh, 160px) !important; }
  }
  @media (min-width: 640px) and (max-width: 1023px) {
    .carousel-card-img-slide1 { width: 80% !important; max-height: clamp(180px, 34vh, 260px) !important; }
    .carousel-card-img-slide2 { width: 80% !important; max-height: clamp(180px, 34vh, 260px) !important; }
    .carousel-card-img-slide3 { width: 90% !important; max-height: clamp(240px, 44vh, 340px) !important; }
    .carousel-card-img-slide4 { width: 85% !important; max-height: clamp(190px, 36vh, 270px) !important; }
  }

  /* ══════════════════════════════════════
     DESKTOP (≥ 1024px)
     - height: 100% fills the wrapper div
       which is sized to calc(100% - 90px)
     - max-height: none removes all caps
     - h-auto Tailwind class is NOT on these
       images (removed from cardImageClass)
  ══════════════════════════════════════ */

  @media (min-width: 1024px) {
    .carousel-card-img-slide1,
    .carousel-card-img-slide2,
    .carousel-card-img-slide3,
    .carousel-card-img-slide4 {
      height: 100% !important;
      max-height: none !important;
      width: 92% !important;
      object-fit: contain !important;
      object-position: bottom right !important;
    }
    .carousel-card-img-slide3,
    .carousel-card-img-slide4 {
      width: 94% !important;
    }
      @media (min-width: 1024px) {
  .carousel-card-img-slide3 {
    width: 94% !important;
    object-position: bottom right !important;  /* ensure bottom anchoring */
  }
}
  }

`;

if (!document.head.querySelector('[data-carousel-img-style]')) {
  style.setAttribute('data-carousel-img-style', 'true');
  document.head.appendChild(style);
}

export const CAROUSEL_SLIDES = [
  {
    index: 0,
    step: '1. Connect your knowledge',
    tabLabel: 'Connect',
    cardGradientClass: 'card-gradient-a1',
    cardImage: slide1Img,
    cardImageAlt: '1. Connect your knowledge',
    cardImageClass: 'carousel-card-img-slide1 object-top rounded-b-[10px]',  // no h-auto
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
    cardImageAlt: '2. Upload RFPs',
    cardImageClass: 'carousel-card-img-slide2 object-top rounded-b-[10px]',  // no h-auto
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
    cardImageClass: 'carousel-card-img-slide3 object-bottom rounded-b-[10px]',

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
    cardImageClass: 'carousel-card-img-slide4 object-top rounded-b-[10px]',  // no h-auto
    description:
      'Anseru focuses your experts on what only they can answer. Standard questions arrive pre-drafted and ready to approve. Novel, flagged, and high-risk items are surfaced for review before anything leaves the building.',
    bullets: [
      'Routes only flagged and novel questions to subject matter experts',
      'Full audit trail of every review, edit, and approval decision',
      'Every submission is clean, compliant, and signed off before it goes out',
    ],
  },
];