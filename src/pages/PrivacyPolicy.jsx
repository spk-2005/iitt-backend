import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "scope", title: "2. Scope & Who This Applies To" },
  { id: "information-collect", title: "3. Information We Collect" },
  { id: "how-we-use", title: "4. How We Use Your Information" },
  { id: "how-we-share", title: "5. How We Share Your Information" },
  { id: "data-storage", title: "6. Data Storage & Security" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "international", title: "8. International Data Transfers" },
  { id: "data-privacy-framework", title: "9. Data Privacy Framework" },
  { id: "cookies", title: "10. Cookie Policy" },
  { id: "your-rights", title: "11. Your Rights" },
  { id: "access-control", title: "12. Access & Control" },
  { id: "notice-end-users", title: "13. Notice to End Users" },
  { id: "google-limited-use", title: "14. Google Workspace & Limited Use" },
  { id: "childrens", title: "15. Children's Privacy" },
  { id: "third-party", title: "16. Third-Party Links" },
  { id: "changes", title: "17. Changes to This Policy" },
  { id: "contact", title: "18. Contact Us" },
  { id: "governing", title: "19. Governing Law" },
];

const brand = {
  purple: "#7B5CF5",
  mid: "#A855C8",
  pink: "#C85FA8",
  gradient: "linear-gradient(135deg, #7B5CF5 0%, #A855C8 50%, #C85FA8 100%)",
  gradientSubtle: "linear-gradient(135deg, rgba(123,92,245,0.08) 0%, rgba(200,95,168,0.08) 100%)",
  gradientBorder: "rgba(168,85,200,0.25)",
  pillBg: "linear-gradient(135deg, rgba(123,92,245,0.10), rgba(200,95,168,0.10))",
};

function GradientText({ children, style = {} }) {
  return (
    <span
      style={{
        background: brand.gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function GradientDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: brand.gradient,
        marginRight: 10,
        flexShrink: 0,
        marginTop: 6,
      }}
    />
  );
}

function TableOfContents({ activeSection }) {
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeSection]);

  return (
    <nav className="bg-white border border-gray-200 rounded-xl px-5 pb-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
      <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray-500 pt-6 pb-4 sticky top-0 bg-white z-10">
        Contents
      </div>
      <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
        {sections.map((s) => (
          <li key={s.id} ref={activeSection === s.id ? activeRef : null}>
            <a
              href={`#${s.id}`}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[13.5px] no-underline transition-all duration-200"
              style={
                activeSection === s.id
                  ? {
                      color: brand.purple,
                      background: "rgba(123,92,245,0.09)",
                      fontWeight: 500,
                    }
                  : { color: "#4b5563" }
              }
            >
              {activeSection === s.id && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: brand.gradient,
                    flexShrink: 0,
                  }}
                />
              )}
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SectionHeader({ children }) {
  return (
    <h2 className="font-sans text-[24px] font-semibold text-gray-900 mb-5 tracking-tight flex items-center gap-2">
      <GradientDot />
      {children}
    </h2>
  );
}

function SubHeader({ children }) {
  return (
    <h3 className="font-sans text-[17px] font-medium text-gray-900 mt-8 mb-4">
      {children}
    </h3>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3 mb-6 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: brand.gradient,
              flexShrink: 0,
              marginTop: 8,
            }}
          />
          <span className="text-gray-600 text-[15.5px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ children }) {
  return (
    <div
      className="rounded-lg p-5 text-[14.5px] leading-relaxed text-gray-700 my-8"
      style={{
        background: brand.gradientSubtle,
        border: `0.5px solid ${brand.gradientBorder}`,
      }}
    >
      {children}
    </div>
  );
}

export default function AnseruPrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const observers = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen">
      {/* Hero */}
      <div className="border-b border-gray-100 px-6 py-16 md:py-4 relative overflow-hidden" style={{ background: "#fff" }}>
        <div
          className="absolute pointer-events-none"
          style={{ top: -80, right: -80, width: 400, height: 400, background: "radial-gradient(circle, rgba(123,92,245,0.13) 0%, transparent 70%)", borderRadius: "50%" }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ bottom: -60, left: -60, width: 280, height: 280, background: "radial-gradient(circle, rgba(200,95,168,0.11) 0%, transparent 70%)", borderRadius: "50%" }}
        />
        <div className="max-w-6xl mx-auto relative">
          <span
            className="inline-block px-3 py-1 rounded-full text-[12px] font-bold mb-4 uppercase tracking-wider"
            style={{ background: brand.pillBg, color: brand.mid, border: `0.5px solid ${brand.gradientBorder}` }}
          >
            Legal
          </span>
          <h1
            className="text-4xl md:text-[52px] font-semibold tracking-tight mb-6"
            style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[18px] text-gray-500 max-w-2xl leading-relaxed">
            How Anseru collects, uses, and protects your personal data.
          </p>
          <p className="text-[14px] text-gray-400 mt-8 font-medium">Last Updated: April 17, 2026</p>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-4 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24">
          <TableOfContents activeSection={activeSection} />
          <div
            className="mt-8 rounded-xl p-6 border"
            style={{ background: brand.gradientSubtle, borderColor: brand.gradientBorder }}
          >
            <div className="font-semibold text-[15px] mb-2 text-gray-900">Questions?</div>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
              Contact our Data Protection Officer for any inquiries.
            </p>
            <a
              href="mailto:privacy@anseru.ai"
              className="text-[14px] font-medium no-underline transition-opacity hover:opacity-75"
              style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              privacy@anseru.ai
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-3xl">

          {/* 1. Introduction */}
          <section id="introduction" className="mb-16 scroll-mt-24">
            <SectionHeader>1. Introduction</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru ("Anseru", "we", "us", or "our") provides an AI-powered RFP and proposal automation platform designed exclusively for business customers. We are committed to protecting the privacy and security of the personal data we process in connection with delivering our Services.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              This Privacy Policy ("Policy") describes how we collect, use, share, and protect personal data when you access or use the Anseru platform, website, or related services (collectively, "Services"). It also describes your rights and choices regarding that data, including how you may access, correct, or request deletion of information we hold about you.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              By accessing or using the Services, you acknowledge that you have read and understood this Policy. If you do not agree with the practices described herein, please discontinue use of the Services. If you disagree with any future changes to this Policy, you will need to stop using the Services and deactivate your account as described in Section 12.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 2. Scope */}
          <section id="scope" className="mb-16 scroll-mt-24">
            <SectionHeader>2. Scope and Who This Policy Applies To</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">This Policy applies to:</p>
            <BulletList
              items={[
                "Users — individuals who access the Anseru platform on behalf of a subscribing business organisation, including account administrators, agents, and other designated users.",
                "Website Visitors — individuals who visit anseru.ai or any of our web properties.",
                "Contacts — individuals whose contact information is provided to us by a Customer in the course of using the platform (e.g., RFP contacts, collaborators, end-users whose data is transmitted through a Customer account).",
                "Prospects — individuals who interact with our marketing channels, web forms, or sales representatives.",
              ]}
            />
            <InfoBox>
              <strong>Note to End Users:</strong> Where Anseru is made available to you through your employer or another organisation ("Customer"), that organisation controls the account and the data processed within it. The Customer is the data controller for Customer Data; Anseru acts as a data processor with respect to such data. Privacy inquiries relating to Customer-controlled data should first be directed to your organisation's administrator. We are not responsible for the privacy or security practices of a Customer organisation, which may differ from this Policy.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 3. Information We Collect */}
          <section id="information-collect" className="mb-16 scroll-mt-24">
            <SectionHeader>3. Information We Collect</SectionHeader>

            <SubHeader>3.1 Information You Provide Directly</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We collect personal data when you:</p>
            <BulletList
              items={[
                "Register for an account — name, work email address, job title, employer name, phone number, and billing information.",
                "Use the platform — content you upload, including RFP documents, proposal responses, templates, knowledge-base materials, support documents, comments, and any feedback you submit.",
                "Contact us for support — correspondence, descriptions of technical issues, screenshots, and any attachments you provide.",
                "Fill out web forms, surveys, or participate in events — any information submitted via our website, in-product forms, contests, or promotional activities.",
                "Interact with our sales team — contact information and details you provide during sales conversations or product demonstrations.",
              ]}
            />

            <SubHeader>3.2 Information Collected Automatically</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">When you visit our website or use the platform, we automatically collect:</p>
            <BulletList
              items={[
                "Device and connection data — IP address, browser type, operating system, device identifiers, and referring URLs.",
                "Usage data — pages visited, features used, links clicked, search queries, interaction patterns, and how you collaborate with others within the platform.",
                "Log data — server logs, crash reports, and performance metrics.",
                "Geolocation data — approximate location derived from your IP address or browser settings.",
                "Cookie and tracking data — please see Section 10 (Cookie Policy) for details.",
              ]}
            />

            <SubHeader>3.3 Information from Third-Party Sources</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We may receive personal data about you from:</p>
            <BulletList
              items={[
                "Third-party integrations you connect to your account (e.g., Google Drive, CRM tools, SSO providers). The data we receive depends on the permissions you grant. Please review the privacy settings of those third-party services.",
                "Our partners or resellers who refer customers to us.",
                "Publicly available sources (e.g., company websites, professional directories) for sales and marketing outreach, in compliance with applicable law.",
                "Other users of the Services, who may mention or reference you in comments, shared documents, or collaborative activities.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 4. How We Use */}
          <section id="how-we-use" className="mb-16 scroll-mt-24">
            <SectionHeader>4. How We Use Your Information</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We use the personal data we collect for the following purposes:</p>
            <BulletList
              items={[
                "Service delivery — to create and manage your account, authenticate you, process transactions, and operate the platform.",
                "Personalisation — to tailor the platform experience to your role, usage patterns, and preferences, including surfacing relevant content recommendations.",
                "AI-powered features — to power proposal generation, RFP analysis, content recommendations, and other AI-driven capabilities within the platform.",
                "Customer support — to respond to queries, troubleshoot issues, and resolve disputes.",
                "Platform improvement — to analyse usage patterns, conduct research, test new features, and improve the quality and accuracy of our AI models and Services.",
                "Security — to detect, investigate, and prevent fraud, abuse, or unauthorised access.",
                "Marketing and engagement — to send promotional communications that may be of interest to you, including by email and through digital advertising on third-party platforms (where you have opted in or where permitted by applicable law). You may opt out at any time as described in Section 12.",
                "Communication — to send transactional emails, security alerts, product updates, and administrative notices.",
                "Legal compliance — to meet obligations under applicable law, including India's Digital Personal Data Protection Act, 2023 (DPDPA), the GDPR and UK GDPR (where applicable), and other relevant regulations.",
                "Business operations — for audit, compliance, legal claims, and in connection with corporate transactions such as mergers or acquisitions.",
                "With your consent — for any specific purpose for which you have provided consent, such as featuring your testimonial on our website.",
              ]}
            />

            <SubHeader>Legal Bases for Processing (EEA and UK Users)</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If you are an individual in the European Economic Area (EEA) or the United Kingdom (UK), our legal bases for collecting and processing your personal data are:
            </p>
            <BulletList
              items={[
                "Contractual necessity — to provide you the Services, including authentication, support, and platform operations.",
                "Legitimate interests — for research and development, marketing, security, and protecting our legal rights, where such interests are not overridden by your data protection rights.",
                "Consent — where you have given us consent for a specific purpose (e.g., marketing emails, analytics cookies). You may withdraw consent at any time without affecting prior processing.",
                "Legal obligation — to comply with applicable laws and regulatory requirements.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 5. How We Share */}
          <section id="how-we-share" className="mb-16 scroll-mt-24">
            <SectionHeader>5. How We Share Your Information</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We do not sell personal data to third parties. We may share personal data in the following circumstances:</p>

            <SubHeader>5.1 Service Providers (Sub-Processors)</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We engage trusted third-party service providers who process data on our behalf under contractual data processing agreements. Our current sub-processors include, but are not limited to:</p>
            <BulletList
              items={[
                "Cloud infrastructure and hosting providers (e.g., AWS, Microsoft Azure)",
                "AI and machine learning model providers (e.g., OpenAI, Cohere)",
                "Authentication providers (e.g., Auth0)",
                "Analytics, monitoring, and crash-reporting tools",
                "CRM and email communication platforms",
                "Payment processors",
                "Third-party integration platforms (e.g., Zapier, where applicable)",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">All sub-processors are bound by confidentiality obligations and are permitted to process data only as instructed by us.</p>

            <SubHeader>5.2 Within Your Organisation</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">If your account is administered by your employer, certain account information, profile data, and usage activity may be visible to your organisation's administrators. Administrators may control and manage your account settings, restrict or suspend access, and view content stored within your account.</p>

            <SubHeader>5.3 Collaboration Features</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">When you collaborate on RFP projects or share content within the platform, other authorised users within your organisation may see information associated with your contributions, such as your name, profile picture, and authored content.</p>

            <SubHeader>5.4 With Your Consent</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We may share your information with third parties where you have given us consent, such as when you authorise a third-party integration or agree to appear in a customer testimonial.</p>

            <SubHeader>5.5 Legal and Regulatory Disclosure</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We may disclose personal data when required by law, regulation, legal process, or a valid governmental or court order — including under India's DPDPA and applicable laws in other jurisdictions, or to protect the rights, property, or safety of Anseru, our customers, or the public.</p>

            <SubHeader>5.6 Business Transfers</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">In the event of a merger, acquisition, restructuring, or sale of assets, personal data may be transferred as part of the transaction. Affected users will be notified via email or a prominent notice on the Services, along with any choices they may have regarding their information.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 6. Data Storage */}
          <section id="data-storage" className="mb-16 scroll-mt-24">
            <SectionHeader>6. Data Storage and Security</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Personal data is primarily stored on servers located in the United States and/or India. We implement industry-standard technical and organisational measures to protect your data, including:</p>
            <BulletList
              items={[
                "Encryption of data in transit (TLS) and at rest (AES-256)",
                "Role-based access controls and least-privilege principles",
                "Regular security assessments and penetration testing",
                "Incident response and breach notification procedures",
                "Vendor security reviews and contractual data protection obligations",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">No method of transmission over the internet is 100% secure. While we strive to protect your personal data, we cannot guarantee absolute security. You are responsible for keeping your account credentials confidential and for notifying us promptly if you suspect unauthorised access.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 7. Data Retention */}
          <section id="data-retention" className="mb-16 scroll-mt-24">
            <SectionHeader>7. Data Retention</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We retain personal data for as long as necessary to fulfil the purposes described in this Policy, unless a longer retention period is required by law. After such time, we will delete or anonymise your information or, if this is not possible, securely store and isolate it until deletion is feasible.</p>
            <BulletList
              items={[
                "Account data — retained for the duration of your account and for a reasonable period thereafter (typically 90 days post-termination) for legal, audit, or dispute-resolution purposes.",
                "Platform content — retained as configured by the Customer administrator; Customers are responsible for content retention settings within their accounts.",
                "Marketing data — retained until you opt out or withdraw consent, or until we determine there is no longer a legitimate business purpose.",
                "Usage and log data — typically retained for up to 12 months for security monitoring and analytics.",
                "Support communications — retained for a reasonable period to enable follow-up and audit purposes.",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Upon verified request, or when data is no longer required, we will securely delete or anonymise personal data in accordance with applicable law.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 8. International Transfers */}
          <section id="international" className="mb-16 scroll-mt-24">
            <SectionHeader>8. International Data Transfers</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Anseru is headquartered in India. Some of our service providers and sub-processors are located outside India, including in the United States and the European Union. When we transfer personal data internationally, we put appropriate safeguards in place, such as:</p>
            <BulletList
              items={[
                "Standard Contractual Clauses (SCCs) approved by the European Commission (for EEA and UK residents).",
                "Data Processing Agreements with all sub-processors.",
                "Compliance with India's DPDPA rules on cross-border data transfer.",
                "Consent-based transfers, or transfers necessary to perform a contract with you, where applicable.",
              ]}
            />
            <InfoBox>
              <strong>For EEA and UK residents:</strong> Where Anseru processes your data as a controller, we rely on applicable legal bases including contractual necessity, legitimate interests, and consent. You may contact us at privacy@anseru.ai for a copy of the applicable transfer mechanism.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 9. Data Privacy Framework — NEW SECTION */}
          <section id="data-privacy-framework" className="mb-16 scroll-mt-24">
            <SectionHeader>9. Data Privacy Framework</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              To the extent Anseru receives personal data from individuals in the European Economic Area (EEA), the United Kingdom (UK), or Switzerland in connection with our Services, we commit to processing such data in compliance with the EU-U.S. Data Privacy Framework (EU-U.S. DPF), the UK Extension to the EU-U.S. DPF, and the Swiss-U.S. Data Privacy Framework (Swiss-U.S. DPF), where applicable and as our certifications may be extended.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Where Anseru relies on the Data Privacy Framework, we remain responsible for personal data we transfer to third-party agents or sub-processors acting on our behalf, and we remain liable if such parties process data in a manner inconsistent with the applicable DPF Principles.
            </p>
            <BulletList
              items={[
                "EEA and UK individuals with inquiries or complaints regarding our data handling practices may contact us at privacy@anseru.ai. We will endeavour to respond within 45 days of receipt.",
                "If your complaint cannot be resolved through our internal process, you may seek resolution through an independent dispute resolution mechanism — we will communicate the applicable body at the time of any unresolved complaint.",
                "In compliance with applicable DPF requirements, binding arbitration may be available as a final recourse, subject to the conditions set forth in the DPF Principles.",
                "We are subject to the investigatory and enforcement powers of applicable regulatory authorities in the jurisdictions where we operate.",
                "Notwithstanding the above, we may disclose personal data when required by law, including in response to valid requests from public authorities for national security or law enforcement purposes.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 10. Cookie Policy */}
          <section id="cookies" className="mb-16 scroll-mt-24">
            <SectionHeader>10. Cookie Policy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Our website uses cookies and similar tracking technologies (e.g., web beacons, device identifiers, and pixels) to provide functionality and recognise you across different sessions and devices. We use the following categories of cookies:</p>
            <BulletList
              items={[
                "Strictly Necessary Cookies — essential for the website to function (e.g., session management, authentication, security). You cannot opt out of these.",
                "Analytics Cookies — help us understand how visitors use our site, identify usage trends, and improve our Services (e.g., aggregate page view data). These are set only with your consent.",
                "Marketing Cookies — used to deliver relevant advertisements and measure campaign effectiveness. These are set only with your consent.",
                "Preference Cookies — store your settings and choices (e.g., language, display preferences) to personalise your experience.",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">When you visit our website, a cookie banner will provide options to accept, reject, or customise non-essential cookies. You may also control cookies through your browser settings, though disabling certain cookies may affect functionality.</p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              <strong>Do Not Track:</strong> Some browsers include a "Do Not Track" (DNT) feature that sends a signal to websites you visit indicating you prefer not to be tracked. Because there is not yet a universally accepted standard for interpreting DNT signals, our Services do not currently respond to DNT browser signals. You may use the opt-out tools described in Section 12 to control data collection.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You may also opt out of receiving personalised advertisements from companies that participate in the Network Advertising Initiative or subscribe to the Digital Advertising Alliance's Self-Regulatory Principles by visiting <a href="https://youradchoices.com" className="underline text-gray-700">youradchoices.com</a> or <a href="https://optout.networkadvertising.org" className="underline text-gray-700">optout.networkadvertising.org</a>.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 11. Your Rights */}
          <section id="your-rights" className="mb-16 scroll-mt-24">
            <SectionHeader>11. Your Rights</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-8">Depending on your location and applicable law, you may have the following rights regarding your personal data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { right: "Right to Access", desc: "Request a copy of the personal data we hold about you." },
                { right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete data." },
                { right: "Right to Erasure", desc: "Request deletion of your personal data, subject to legal retention obligations." },
                { right: "Right to Restriction", desc: "Limit the processing of your data in certain circumstances." },
                { right: "Right to Data Portability", desc: "Receive your data in a structured, machine-readable format." },
                { right: "Right to Object", desc: "Object to processing based on legitimate interests, including for direct marketing." },
                { right: "Right to Withdraw Consent", desc: "Withdraw consent at any time without affecting prior processing." },
                { right: "Right to Opt Out of Marketing", desc: "Unsubscribe from marketing communications at any time." },
                { right: "Right to be Informed", desc: "Receive clear information about how and why your data is processed." },
                { right: "Right to Lodge a Complaint", desc: "Complain to a relevant data protection authority in the country where you live or work." },
              ].map((item) => (
                <div
                  key={item.right}
                  className="rounded-lg p-5"
                  style={{ background: brand.gradientSubtle, border: `0.5px solid ${brand.gradientBorder}` }}
                >
                  <div
                    className="font-semibold mb-1.5 text-[15px]"
                    style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    {item.right}
                  </div>
                  <div className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
            <InfoBox>
              <strong>Note:</strong> If the Services are administered by your employer, please direct data rights requests to your organisation's administrator in the first instance, as they may control the relevant data. We will respond to all verified requests within 30 days (or as required by applicable law). Some requests may be limited where fulfilling them would reveal information about another person, conflict with our legal obligations, or be overridden by legitimate business interests.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 12. Access & Control — NEW SECTION */}
          <section id="access-control" className="mb-16 scroll-mt-24">
            <SectionHeader>12. Access and Control of Your Information</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">You have several options for managing your personal data and how we interact with you:</p>

            <SubHeader>12.1 Accessing and Updating Your Information</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">You can access and update certain information about yourself directly from within the platform — for example, by editing your profile settings. You may also search for content containing your information using the platform's search features.</p>

            <SubHeader>12.2 Deactivating Your Account</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">If you no longer wish to use our Services, you or your administrator may deactivate your account through account settings or by contacting us. Please be aware that deactivating your account does not automatically delete all of your information — content you have contributed may remain visible to other users who have access to it. For full deletion, please submit a deletion request as described below.</p>

            <SubHeader>12.3 Deleting Your Information</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">You may request deletion of your personal data by contacting us at privacy@anseru.ai. We will process verified deletion requests within 30 days, subject to retention obligations under applicable law. Please note that we may need to retain certain information for record-keeping, legal compliance, or dispute resolution purposes.</p>

            <SubHeader>12.4 Opting Out of Marketing Communications</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">You may opt out of receiving promotional emails by clicking the "unsubscribe" link in any marketing email, updating your email preferences in account settings, or contacting us directly. Even after opting out of marketing, you will continue to receive transactional and service-related communications.</p>

            <SubHeader>12.5 Withdrawing Consent</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Where we process data based on your consent, you may withdraw that consent at any time by contacting us at privacy@anseru.ai. Withdrawal of consent does not affect the lawfulness of processing that occurred before withdrawal.</p>

            <SubHeader>12.6 Data Portability</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Upon request, we will provide you with an electronic copy of your basic account information and content you have created in areas under your sole control, in a structured and machine-readable format, where technically feasible.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 13. Notice to End Users — NEW SECTION */}
          <section id="notice-end-users" className="mb-16 scroll-mt-24">
            <SectionHeader>13. Notice to End Users and Administrator Capabilities</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Our Services are designed for use by business organisations. Where the Services are made available to you through an organisation (e.g., your employer), that organisation is the Customer and administrator of the Services, and is responsible for the accounts and data within its subscription.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Your use of the Services is subject to your organisation's policies. You should direct privacy inquiries, including requests to exercise your data protection rights, to your organisation's administrator in the first instance.</p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Administrators of a Customer account may have the ability to:</p>
            <BulletList
              items={[
                "Control and administer your Anseru account, including privacy-related settings.",
                "Require you to reset your account password.",
                "Restrict, suspend, or terminate your access to the Services.",
                "Access information in and about your account, including content you have stored.",
                "Install or uninstall third-party app integrations connected to the account.",
                "Change your profile information, email address, or other account details.",
                "Restrict your ability to edit, modify, or delete information within the platform.",
              ]}
            />
            <InfoBox>
              If you use an email address provided by your organisation (e.g., your work email) to access the Services, the owner of that email domain may assert administrative control over your account at a later date. You will be notified if this occurs. Please refer to your organisation's own privacy policies for information about how your data is managed internally.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 14. Google Workspace Limited Use — NEW SECTION */}
          <section id="google-limited-use" className="mb-16 scroll-mt-24">
            <SectionHeader>14. Google Workspace and Limited Use Policy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru offers integrations with Google Workspace services, including Google Drive, to enable users to access, import, and work with documents directly within the platform. Our use of data obtained through Google Workspace APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="underline text-gray-700">Google API Services User Data Policy</a>, including the Limited Use requirements.
            </p>
            <BulletList
              items={[
                "Data Access and Purpose: Upon authorisation by the user, Anseru may access certain Google Workspace data (e.g., Google Drive files) solely to provide the specific features and functionality the user has requested. This data is used exclusively to serve the user's needs within the platform.",
                "No Use for Generalised AI/ML Model Training: Data received from Google Workspace APIs is not used to develop, improve, or train generalised or non-personalised AI or machine learning models. It is used only to provide personalised, user-requested functionality.",
                "No Unauthorised Data Transfer: Data received from Google APIs is not shared with any other apps or third parties except as strictly necessary to provide the requested service and in compliance with the Google API Services User Data Policy.",
                "Limited Use Compliance: All Google Workspace data usage complies with Google's Limited Use requirements and is not used for advertising or any purpose beyond what is required to deliver the requested functionality.",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If you choose to connect other third-party integrations (e.g., CRM tools, SSO providers), please review the privacy policies of those services. The data we receive depends on the permissions you grant, and those services are governed by their own privacy practices.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 15. Children's Privacy */}
          <section id="childrens" className="mb-16 scroll-mt-24">
            <SectionHeader>15. Children's Privacy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Our Services are not directed to individuals under the age of 18. We do not knowingly collect, solicit, or receive personal data from minors. If we become aware that personal data of a minor has been collected without appropriate consent, we will take prompt steps to delete it. If you believe a minor has provided us with personal data, please contact us immediately at privacy@anseru.ai.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 16. Third-Party Links */}
          <section id="third-party" className="mb-16 scroll-mt-24">
            <SectionHeader>16. Third-Party Links and Services</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Our platform and website may contain links to third-party websites, social media platforms, or integrations with third-party services. This Policy does not apply to those third parties. We encourage you to review the privacy policies of any third-party services you interact with, as their privacy practices may differ significantly from ours. We are not responsible for the content, privacy practices, or data handling of third-party services.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Our website may also include social media widgets (e.g., LinkedIn, Twitter/X share buttons). These widgets may collect your IP address and set cookies to enable the feature to function properly. Your interactions with such features are governed by the privacy policy of the applicable third-party provider.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 17. Changes */}
          <section id="changes" className="mb-16 scroll-mt-24">
            <SectionHeader>17. Changes to This Policy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice within the Services at least 30 days before taking effect. We will also maintain an archive of prior versions of this Policy, which you may request by contacting us. The "Last Updated" date at the top of this document indicates when the most recent changes were made.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Continued use of the Services after changes take effect constitutes acceptance of the updated Policy. If you disagree with any changes, you must stop using the Services and may deactivate your account as described in Section 12.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 18. Contact */}
          <section id="contact" className="mb-16 scroll-mt-24">
            <SectionHeader>18. Contact Us</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-6">
              If you have any questions, concerns, or requests relating to this Privacy Policy or the processing of your personal data, please contact our Data Protection Officer. We will acknowledge your inquiry promptly and respond within 30 days (or as required by applicable law). If access cannot be provided within a reasonable timeframe, we will provide you with an estimated date.
            </p>
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: brand.gradientSubtle, border: `0.5px solid ${brand.gradientBorder}` }}
            >
              <div
                className="font-semibold mb-1 text-[16px]"
                style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Data Protection Officer
              </div>
              <div className="text-gray-500 text-[15.5px] mb-5">Anseru.ai</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center text-[15px]">
                  <span className="text-gray-400 font-medium w-24">Email:</span>
                  <a
                    href="mailto:privacy@anseru.ai"
                    className="no-underline transition-opacity hover:opacity-75"
                    style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    privacy@anseru.ai
                  </a>
                </div>
                <div className="flex items-center text-[15px]">
                  <span className="text-gray-400 font-medium w-24">Website:</span>
                  <a
                    href="https://anseru.ai"
                    className="no-underline transition-opacity hover:opacity-75"
                    style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    https://anseru.ai
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              For EEA or UK residents with unresolved complaints, you may also contact your local data protection authority (e.g., the ICO in the UK, or your national supervisory authority within the EEA). For EEA/UK users seeking resolution of Data Privacy Framework-related complaints that we have not resolved to your satisfaction, we will communicate the applicable independent recourse mechanism at the time of the complaint.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 19. Governing Law */}
          <section id="governing" className="mb-16 scroll-mt-24">
            <SectionHeader>19. Governing Law</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              This Privacy Policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023 (DPDPA) and rules made thereunder, as well as other applicable Indian laws. To the extent that users are located in the EEA or UK, relevant provisions of the GDPR and UK GDPR also apply to the processing of their personal data. For users in the United States, applicable state privacy laws may additionally apply.
            </p>

            {/* Footer gradient bar */}
            <div className="mt-16 h-1 rounded-full" style={{ background: brand.gradient }} />
          </section>

        </main>
      </div>
    </div>
  );
}