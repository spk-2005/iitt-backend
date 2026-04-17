import slide1Img from '../assets/Intro-Page-900.webp?w=640';
import slide1ImgSrcset from '../assets/Intro-Page-900.webp?w=400;640&format=webp&as=srcset';
import slide2Img from '../assets/Intro Page (1).png?format=webp&w=640&quality=80';
import slide2ImgSrcset from '../assets/Intro Page (1).png?w=400;640&format=webp&quality=80&as=srcset';
import slide3Img from '../assets/Intro Page (3).png?format=webp&w=640&quality=80';
import slide3ImgSrcset from '../assets/Intro Page (3).png?w=400;640&format=webp&quality=80&as=srcset';
import slide4Img from '../assets/Intro Page (4).png?format=webp&w=640&quality=80';
import slide4ImgSrcset from '../assets/Intro Page (4).png?w=400;640&format=webp&quality=80&as=srcset';

const style = document.createElement('style');
style.textContent = `

  /* ── Base defaults ── */
  .carousel-card-img-slide1,
  .carousel-card-img-slide2,
  .carousel-card-img-slide3,
  .carousel-card-img-slide4 {
    height: auto;
    object-fit: contain;
    display: block;
  }

  /* ══ MOBILE ══ */
    @media (min-width: 280px) and (max-width: 329px) {
    .carousel-card-img-slide1 { width: 95% !important; max-height: 145px !important; }
    .carousel-card-img-slide2 { width: 95% !important; max-height: 145px !important; }
    .carousel-card-img-slide3 { width: 95% !important; max-height: 145px !important; }
    .carousel-card-img-slide4 { width: 95% !important; max-height: 145px !important; }
  }


    @media (min-width: 330px) and (max-width: 360px) {
    .carousel-card-img-slide1 { width: 95% !important; max-height: 145px !important; }
    .carousel-card-img-slide2 { width: 95% !important; max-height: 145px !important; }
    .carousel-card-img-slide3 { width: 95% !important; max-height: 145px !important; }
    .carousel-card-img-slide4 { width: 95% !important; max-height: 145px !important; }
  }

  @media (min-width: 361px) and (max-width: 388px){
    .carousel-card-img-slide1 { width: 95% !important; max-height: 150px !important; }
    .carousel-card-img-slide2 { width: 95% !important; max-height: 150px !important; }
    .carousel-card-img-slide3 { width: 95% !important; max-height: 150px !important; }
    .carousel-card-img-slide4 { width: 95% !important; max-height: 150px !important; }
  }
@media (min-width: 389px) and (max-width: 389px) {
  .carousel-card-img-slide1 { width: 88% !important;  max-height: clamp(130px, 28vh, 180px) !important; }
  .carousel-card-img-slide2 { width: 92% !important;  max-height: clamp(100px, 18vh, 170px) !important; }
  .carousel-card-img-slide3 { width: 94% !important;  max-height: clamp(190px, 42vh, 270px) !important; }
  .carousel-card-img-slide4 { width: 94% !important;  max-height: clamp(140px, 30vh, 190px) !important; }
}
@media (min-width: 390px) and (max-width: 399px) {
  .carousel-card-img-slide1 { width: 90% !important;  max-height: clamp(100px, 32vh, 160px) !important; }
  .carousel-card-img-slide2 { width: 85% !important;  max-height: clamp(90px,  32vh, 170px) !important; }
  .carousel-card-img-slide3 { width: 85% !important;  max-height: clamp(120px, 50vh, 300px) !important; }
  .carousel-card-img-slide4 { width: 95% !important;  max-height: clamp(120px, 34vh, 160px) !important; }
}
@media (min-width: 400px) and (max-width: 529px) {
  .carousel-card-img-slide1 { width: 85% !important; max-height: clamp(200px, 32vh, 210px) !important; }
  .carousel-card-img-slide2 { width: 75% !important;  max-height: clamp(210px, 32vh, 240px) !important; }
  .carousel-card-img-slide3 { width: 90% !important;  max-height: clamp(210px, 50vh, 220px) !important; }
  .carousel-card-img-slide4 { width: 80% !important;  max-height: clamp(20px,  34vh, 220px) !important; }
}
@media (min-width: 530px) and (max-width: 639px) {
  .carousel-card-img-slide1 { width: 85% !important;  max-height: clamp(160px, 30vh, 220px) !important; }
  .carousel-card-img-slide2 { width: 85% !important;  max-height: clamp(160px, 30vh, 220px) !important; }
  .carousel-card-img-slide3 { width: 90% !important;  max-height: clamp(200px, 42vh, 300px) !important; }
  .carousel-card-img-slide4 { width: 90% !important;  max-height: clamp(160px, 32vh, 230px) !important; }
}
@media (min-width: 640px) and (max-width: 1023px) {
  .carousel-card-img-slide1 { width: 80% !important;  max-height: clamp(180px, 34vh, 260px) !important; }
  .carousel-card-img-slide2 { width: 80% !important;  max-height: clamp(180px, 34vh, 260px) !important; }
  .carousel-card-img-slide3 { width: 90% !important;  max-height: clamp(240px, 44vh, 340px) !important; }
  .carousel-card-img-slide4 { width: 85% !important;  max-height: clamp(190px, 36vh, 270px) !important; }
}
  /* ══════════════════════════════════════
     DESKTOP  (≥ 1024px)
     Strategy: fill the card from ~80px below
     the card title down to the bottom edge.
     Card height ≈ (100vh - sticky-header ~200px).
     Title block ≈ 70–90px → leave ~80px gap.
     So target ≈ calc(100vh - 280px) clamped.
     We split by viewport width bracket only;
     DPR differences are handled via a single
     unified clamp so HiDPI screens get the
     same visual fill (browser scales CSS px).
  ══════════════════════════════════════ */

  /* 1024 – 1199 px */
  @media (min-width: 1024px) and (max-width: 1199px) {
    .carousel-card-img-slide1 { width: 92% !important; max-height: clamp(260px, calc(100vh - 280px), 480px) !important; }
    .carousel-card-img-slide2 { width: 92% !important; max-height: clamp(240px, calc(100vh - 290px), 460px) !important; }
    .carousel-card-img-slide3 { width: 94% !important; max-height: clamp(280px, calc(100vh - 270px), 500px) !important; }
    .carousel-card-img-slide4 { width: 94% !important; max-height: clamp(250px, calc(100vh - 285px), 480px) !important; }
  }

  /* 1200 – 1439 px */
  @media (min-width: 1200px) and (max-width: 1439px) {
    .carousel-card-img-slide1 { width: 92% !important; max-height: clamp(300px, calc(100vh - 260px), 560px) !important; }
    .carousel-card-img-slide2 { width: 82% !important; max-height: clamp(280px, calc(100vh - 270px), 540px) !important; }
    .carousel-card-img-slide3 { width: 82% !important; max-height: clamp(320px, calc(100vh - 250px), 580px) !important; }
    .carousel-card-img-slide4 { width: 82% !important; max-height: clamp(290px, calc(100vh - 265px), 560px) !important; }
  }

  /* 1440 – 1919 px  (covers MacBook Air/Pro @1x and @2x) */
  @media (min-width: 1440px) and (max-width: 1919px) {
    .carousel-card-img-slide1 { width: 80% !important; max-height: clamp(340px, calc(100vh - 240px), 640px) !important; }
    .carousel-card-img-slide2 { width: 92% !important; max-height: clamp(320px, calc(100vh - 250px), 620px) !important; }
    .carousel-card-img-slide3 { width: 94% !important; max-height: clamp(460px, calc(100vh - 130px), 660px) !important; }
    .carousel-card-img-slide4 { width: 94% !important; max-height: clamp(330px, calc(100vh - 245px), 640px) !important; }
  }

  /* 1920 – 2559 px  (1080p monitors + QHD) */
  @media (min-width: 1920px) and (max-width: 2559px) {
    .carousel-card-img-slide1 { width: 92% !important; max-height: clamp(400px, calc(100vh - 220px), 740px) !important; }
    .carousel-card-img-slide2 { width: 92% !important; max-height: clamp(380px, calc(100vh - 230px), 720px) !important; }
    .carousel-card-img-slide3 { width: 94% !important; max-height: clamp(420px, calc(100vh - 210px), 760px) !important; }
    .carousel-card-img-slide4 { width: 94% !important; max-height: clamp(390px, calc(100vh - 225px), 740px) !important; }
  }

  /* 2560 px+  (4K, ultra-wide) */
  @media (min-width: 2560px) {
    .carousel-card-img-slide1 { width: 90% !important; max-height: clamp(500px, calc(100vh - 200px), 900px) !important; }
    .carousel-card-img-slide2 { width: 90% !important; max-height: clamp(480px, calc(100vh - 210px), 880px) !important; }
    .carousel-card-img-slide3 { width: 92% !important; max-height: clamp(520px, calc(100vh - 190px), 920px) !important; }
    .carousel-card-img-slide4 { width: 92% !important; max-height: clamp(490px, calc(100vh - 205px), 900px) !important; }
  }


  /* ── iPad mini / Air portrait (768–819px) ── */
  @media (min-width: 768px) and (max-width: 819px) {
    .carousel-card-img-slide1 { width: 78% !important; max-height: clamp(200px, 36vh, 280px) !important; }
    .carousel-card-img-slide2 { width: 78% !important; max-height: clamp(200px, 36vh, 280px) !important; }
    .carousel-card-img-slide3 { width: 88% !important; max-height: clamp(260px, 46vh, 360px) !important; }
    .carousel-card-img-slide4 { width: 82% !important; max-height: clamp(210px, 38vh, 290px) !important; }
  }

  /* ── iPad Air / Pro portrait (820–1023px) ── */
  @media (min-width: 820px) and (max-width: 1023px) {
    .carousel-card-img-slide1 { width: 76% !important; max-height: clamp(220px, 38vh, 320px) !important; }
    .carousel-card-img-slide2 { width: 76% !important; max-height: clamp(220px, 38vh, 320px) !important; }
    .carousel-card-img-slide3 { width: 86% !important; max-height: clamp(280px, 48vh, 380px) !important; }
    .carousel-card-img-slide4 { width: 80% !important; max-height: clamp(230px, 40vh, 330px) !important; }
  }
/* ── iPad Pro landscape + small laptop short screen ── */
  @media (min-width: 1024px) and (max-width: 1199px) and (max-height: 700px) {
    .carousel-card-img-slide1 { width: 90% !important; max-height: clamp(200px, calc(100vh - 300px), 380px) !important; }
    .carousel-card-img-slide2 { width: 90% !important; max-height: clamp(180px, calc(100vh - 310px), 360px) !important; }
    .carousel-card-img-slide3 { width: 92% !important; max-height: clamp(220px, calc(100vh - 290px), 400px) !important; }
    .carousel-card-img-slide4 { width: 92% !important; max-height: clamp(190px, calc(100vh - 305px), 380px) !important; }
  }

  /* ── MacBook 13/14 short viewport ── */
  @media (min-width: 1200px) and (max-width: 1439px) and (max-height: 750px) {
    .carousel-card-img-slide1 { width: 90% !important; max-height: clamp(240px, calc(100vh - 280px), 460px) !important; }
    .carousel-card-img-slide2 { width: 80% !important; max-height: clamp(220px, calc(100vh - 290px), 440px) !important; }
    .carousel-card-img-slide3 { width: 80% !important; max-height: clamp(260px, calc(100vh - 270px), 480px) !important; }
    .carousel-card-img-slide4 { width: 80% !important; max-height: clamp(230px, calc(100vh - 285px), 460px) !important; }
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
    cardImageSrcset: slide1ImgSrcset,
    cardImageAlt: '1. Connect your knowledge',
    cardImageClass: 'carousel-card-img-slide1 h-auto object-top rounded-b-[10px]',
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
    cardImageSrcset: slide2ImgSrcset,
    cardImageAlt: '2. Upload RFPs',
    cardImageClass: 'carousel-card-img-slide2 h-auto object-top rounded-b-[10px]',
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
    cardImageSrcset: slide3ImgSrcset,
    cardImageAlt: '3. Generate AI Draft Responses',
    cardImageClass: 'carousel-card-img-slide3 object-top rounded-b-[10px]',
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
    cardImageSrcset: slide4ImgSrcset,
    cardImageAlt: '4. SME Review & Approval',
    cardImageClass: 'carousel-card-img-slide4 h-auto object-top rounded-b-[10px]',
    description:
      'Anseru focuses your experts on what only they can answer. Standard questions arrive pre-drafted and ready to approve. Novel, flagged, and high-risk items are surfaced for review before anything leaves the building.',
    bullets: [
      'Routes only flagged and novel questions to subject matter experts',
      'Full audit trail of every review, edit, and approval decision',
      'Every submission is clean, compliant, and signed off before it goes out',
    ],
  },
];