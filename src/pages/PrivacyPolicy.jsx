import { useState, useEffect } from "react";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "scope", title: "2. Scope & Who This Applies To" },
  { id: "information-collect", title: "3. Information We Collect" },
  { id: "how-we-use", title: "4. How We Use Your Information" },
  { id: "how-we-share", title: "5. How We Share Your Information" },
  { id: "data-storage", title: "6. Data Storage & Security" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "international", title: "8. International Data Transfers" },
  { id: "cookies", title: "9. Cookie Policy" },
  { id: "your-rights", title: "10. Your Rights" },
  { id: "childrens", title: "11. Children's Privacy" },
  { id: "third-party", title: "12. Third-Party Links" },
  { id: "changes", title: "13. Changes to This Policy" },
  { id: "contact", title: "14. Contact Us" },
  { id: "governing", title: "15. Governing Law" },
];

// Brand colors extracted from logo gradient (purple → pink)
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
  return (
    <nav className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray-500 mb-4">
        Contents
      </div>
      <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
        {sections.map((s) => (
          <li key={s.id}>
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
      <div
        className="border-b border-gray-100 px-6 py-16 md:py-4 relative overflow-hidden"
        style={{ background: "#fff" }}
      >
        {/* Ambient glow blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(123,92,245,0.13) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -60,
            left: -60,
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle, rgba(200,95,168,0.11) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          {/* Legal badge */}
          <span
            className="inline-block px-3 py-1 rounded-full text-[12px] font-bold mb-4 uppercase tracking-wider"
            style={{
              background: brand.pillBg,
              color: brand.mid,
              border: `0.5px solid ${brand.gradientBorder}`,
            }}
          >
            Legal
          </span>

          {/* Title with gradient */}
          <h1
            className="text-4xl md:text-[52px] font-semibold tracking-tight mb-6"
            style={{
              background: brand.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Privacy Policy
          </h1>

          <p className="text-[18px] text-gray-500 max-w-2xl leading-relaxed">
            How Anseru collects, uses, and protects your personal data.
          </p>
          <p className="text-[14px] text-gray-400 mt-8 font-medium">
            Last Updated: April 17, 2026
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-4 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24">
          <TableOfContents activeSection={activeSection} />

          <div
            className="mt-8 rounded-xl p-6 border"
            style={{
              background: brand.gradientSubtle,
              borderColor: brand.gradientBorder,
            }}
          >
            <div className="font-semibold text-[15px] mb-2 text-gray-900">
              Questions?
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
              Contact our Data Protection Officer for any inquiries.
            </p>
            <a
              href="mailto:privacy@anseru.ai"
              className="text-[14px] font-medium no-underline transition-opacity hover:opacity-75"
              style={{
                background: brand.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              privacy@anseru.ai
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-3xl">

          <section id="introduction" className="mb-16 scroll-mt-24">
            <SectionHeader>1. Introduction</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru ("Anseru", "we", "us", or "our") provides an AI-powered RFP and proposal automation platform designed exclusively for business customers. We are committed to protecting the privacy and security of the personal data we process in connection with delivering our Services.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              This Privacy Policy ("Policy") describes how we collect, use, share, and protect personal data when you access or use the Anseru platform, website, or related services (collectively, "Services"). It also describes your rights and choices regarding that data.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              By accessing or using the Services, you acknowledge that you have read and understood this Policy. If you do not agree, please discontinue use of the Services.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="scope" className="mb-16 scroll-mt-24">
            <SectionHeader>2. Scope and Who This Policy Applies To</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">This Policy applies to:</p>
            <BulletList
              items={[
                "Users — individuals who access the Anseru platform on behalf of a subscribing business organisation.",
                "Website Visitors — individuals who visit anseru.ai or any of our web properties.",
                "Contacts — individuals whose contact information is provided to us by a Customer in the course of using the platform (e.g., RFP contacts, collaborators).",
              ]}
            />
            <InfoBox>
              <strong>Note to End Users:</strong> Where Anseru is made available to you through your employer or another organisation ("Customer"), that organisation controls the account and the data processed within it. Privacy inquiries relating to Customer-controlled data should first be directed to your organisation's administrator. Anseru acts as a data processor with respect to Customer Data.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="information-collect" className="mb-16 scroll-mt-24">
            <SectionHeader>3. Information We Collect</SectionHeader>

            <SubHeader>3.1 Information You Provide Directly</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We collect personal data when you:</p>
            <BulletList
              items={[
                "Register for an account — name, work email address, job title, employer name, phone number, and billing information.",
                "Use the platform — content you upload, including RFP documents, proposal responses, templates, knowledge-base materials, and any comments or feedback you submit.",
                "Contact us for support — correspondence, descriptions of technical issues, and any attachments you provide.",
                "Fill out web forms or surveys — any information submitted via our website or in-product forms.",
              ]}
            />

            <SubHeader>3.2 Information Collected Automatically</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">When you visit our website or use the platform, we automatically collect:</p>
            <BulletList
              items={[
                "Device and connection data — IP address, browser type, operating system, device identifiers, and referring URLs.",
                "Usage data — pages visited, features used, links clicked, search queries, and interaction patterns within the platform.",
                "Log data — server logs, crash reports, and performance metrics.",
                "Cookie and tracking data — please see Section 9 (Cookie Policy) for details.",
              ]}
            />

            <SubHeader>3.3 Information from Third-Party Sources</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We may receive personal data about you from:</p>
            <BulletList
              items={[
                "Third-party integrations you connect to your account (e.g., Google Drive, CRM tools, SSO providers). The data we receive depends on the permissions you grant.",
                "Our partners or resellers who refer customers to us.",
                "Publicly available sources for sales and marketing outreach, in compliance with applicable law.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="how-we-use" className="mb-16 scroll-mt-24">
            <SectionHeader>4. How We Use Your Information</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We use the personal data we collect for the following purposes:</p>
            <BulletList
              items={[
                "Service delivery — to create and manage your account, authenticate you, process transactions, and operate the platform.",
                "AI-powered features — to power proposal generation, RFP analysis, content recommendations, and other AI-driven capabilities within the platform.",
                "Customer support — to respond to queries, troubleshoot issues, and resolve disputes.",
                "Platform improvement — to analyse usage patterns, conduct research, test new features, and improve the quality and accuracy of our AI models and Services.",
                "Security — to detect, investigate, and prevent fraud, abuse, or unauthorised access.",
                "Communication — to send transactional emails, security alerts, product updates, and (where you have opted in) marketing communications.",
                "Legal compliance — to meet obligations under applicable law, including India's Digital Personal Data Protection Act, 2023 (DPDPA), the GDPR (where applicable), and other relevant regulations.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="how-we-share" className="mb-16 scroll-mt-24">
            <SectionHeader>5. How We Share Your Information</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We do not sell personal data to third parties. We may share personal data in the following circumstances:</p>

            <SubHeader>5.1 Service Providers (Sub-Processors)</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We engage trusted third-party service providers who process data on our behalf under contractual data processing agreements. These include:</p>
            <BulletList
              items={[
                "Cloud infrastructure and hosting providers (e.g., AWS, Microsoft Azure)",
                "AI and machine learning model providers (e.g., OpenAI, Cohere)",
                "Authentication providers (e.g., Auth0)",
                "Analytics and monitoring tools",
                "CRM and email communication platforms",
                "Payment processors",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">All sub-processors are bound by confidentiality obligations and are permitted to process data only as instructed by us.</p>

            <SubHeader>5.2 Within Your Organisation</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">If your account is administered by your employer, certain account information and usage data may be visible to your organisation's administrators.</p>

            <SubHeader>5.3 Legal and Regulatory Disclosure</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We may disclose personal data when required by law, regulation, legal process, or a valid governmental or court order — including under India's DPDPA and applicable laws in other jurisdictions.</p>

            <SubHeader>5.4 Business Transfers</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">In the event of a merger, acquisition, restructuring, or sale of assets, personal data may be transferred as part of the transaction. Affected users will be notified via email or a prominent notice on the Services.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="data-storage" className="mb-16 scroll-mt-24">
            <SectionHeader>6. Data Storage and Security</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Personal data is primarily stored on servers located in the United States and/or India. We implement industry-standard technical and organisational measures to protect your data, including:</p>
            <BulletList
              items={[
                "Encryption of data in transit (TLS) and at rest (AES-256)",
                "Role-based access controls and least-privilege principles",
                "Regular security assessments and penetration testing",
                "Incident response procedures",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">No method of transmission over the internet is 100% secure. While we strive to protect your personal data, we cannot guarantee absolute security. You are responsible for keeping your account credentials confidential.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="data-retention" className="mb-16 scroll-mt-24">
            <SectionHeader>7. Data Retention</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">We retain personal data for as long as necessary to fulfil the purposes described in this Policy, unless a longer retention period is required by law.</p>
            <BulletList
              items={[
                "Account data — retained for the duration of your account and for a reasonable period thereafter (typically 90 days post-termination) for legal, audit, or dispute-resolution purposes.",
                "Platform content — retained as configured by the Customer administrator; Customers are responsible for content retention settings within their accounts.",
                "Marketing data — retained until you opt out or withdraw consent, or until we determine there is no longer a legitimate business purpose.",
                "Usage and log data — typically retained for up to 12 months for security monitoring and analytics.",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Upon verified request, or when data is no longer required, we will securely delete or anonymise personal data.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="international" className="mb-16 scroll-mt-24">
            <SectionHeader>8. International Data Transfers</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Anseru is headquartered in India. Some of our service providers and sub-processors are located outside India, including in the United States and the European Union. When we transfer personal data internationally, we put appropriate safeguards in place, such as:</p>
            <BulletList
              items={[
                "Standard Contractual Clauses (SCCs) approved by the European Commission (for EEA residents).",
                "Data Processing Agreements with all sub-processors.",
                "Compliance with India's DPDPA rules on cross-border data transfer.",
              ]}
            />
            <InfoBox>
              <strong>For EEA residents:</strong> Where Anseru processes your data as a controller, we rely on applicable legal bases including contractual necessity, legitimate interests, and consent. You may contact us for a copy of the applicable transfer mechanism.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="cookies" className="mb-16 scroll-mt-24">
            <SectionHeader>9. Cookie Policy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Our website uses cookies and similar tracking technologies. We use the following categories of cookies:</p>
            <BulletList
              items={[
                "Strictly Necessary Cookies — essential for the website to function (e.g., session management, security). You cannot opt out of these.",
                "Analytics Cookies — help us understand how visitors use our site (e.g., Google Analytics). These are set only with your consent.",
                "Marketing Cookies — used to deliver relevant advertisements. These are set only with your consent.",
              ]}
            />
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">When you visit our website, a cookie banner will provide options to accept, reject, or customise non-essential cookies. You may also control cookies through your browser settings, though disabling certain cookies may affect functionality.</p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="your-rights" className="mb-16 scroll-mt-24">
            <SectionHeader>10. Your Rights</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-8">Depending on your location and applicable law, you may have the following rights regarding your personal data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { right: "Right to Access", desc: "Request a copy of the personal data we hold about you." },
                { right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete data." },
                { right: "Right to Erasure", desc: "Request deletion of your personal data." },
                { right: "Right to Restriction", desc: "Limit the processing of your data." },
                { right: "Right to Data Portability", desc: "Receive your data in a structured, machine-readable format." },
                { right: "Right to Object", desc: "Object to processing based on legitimate interests." },
                { right: "Right to Withdraw Consent", desc: "Withdraw consent at any time without affecting prior processing." },
                { right: "Right to Opt Out of Marketing", desc: "Unsubscribe from marketing communications at any time." },
              ].map((item) => (
                <div
                  key={item.right}
                  className="rounded-lg p-5"
                  style={{
                    background: brand.gradientSubtle,
                    border: `0.5px solid ${brand.gradientBorder}`,
                  }}
                >
                  <div
                    className="font-semibold mb-1.5 text-[15px]"
                    style={{
                      background: brand.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.right}
                  </div>
                  <div className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
            <InfoBox>
              <strong>Note:</strong> If the Services are administered by your employer, please direct data rights requests to your organisation's administrator in the first instance. We will respond to all verified requests within 30 days (or as required by applicable law).
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="childrens" className="mb-16 scroll-mt-24">
            <SectionHeader>11. Children's Privacy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal data from minors. If we become aware that personal data of a minor has been collected, we will take steps to delete it promptly. If you believe a minor has provided us with personal data, please contact us immediately.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="third-party" className="mb-16 scroll-mt-24">
            <SectionHeader>12. Third-Party Links</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Our platform and website may contain links to third-party websites or integrations with third-party services. This Policy does not apply to those third parties. We encourage you to review the privacy policies of any third-party services you interact with. We are not responsible for the privacy practices of third parties.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="changes" className="mb-16 scroll-mt-24">
            <SectionHeader>13. Changes to This Policy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice within the Services at least 30 days before taking effect. The "Last Updated" date at the top of this document indicates when the most recent changes were made. Continued use of the Services after changes take effect constitutes acceptance of the updated Policy.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="contact" className="mb-16 scroll-mt-24">
            <SectionHeader>14. Contact Us</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-6">
              If you have any questions, concerns, or requests relating to this Privacy Policy or the processing of your personal data, please contact:
            </p>
            <div
              className="rounded-xl p-6 mb-6"
              style={{
                background: brand.gradientSubtle,
                border: `0.5px solid ${brand.gradientBorder}`,
              }}
            >
              <div
                className="font-semibold mb-1 text-[16px]"
                style={{
                  background: brand.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
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
                    style={{
                      background: brand.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    privacy@anseru.ai
                  </a>
                </div>
                <div className="flex items-center text-[15px]">
                  <span className="text-gray-400 font-medium w-24">Website:</span>
                  <a
                    href="https://anseru.ai"
                    className="no-underline transition-opacity hover:opacity-75"
                    style={{
                      background: brand.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    https://anseru.ai
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              For EEA residents with unresolved complaints, you may also contact your local data protection authority.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          <section id="governing" className="mb-16 scroll-mt-24">
            <SectionHeader>15. Governing Law</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              This Privacy Policy is governed by the laws of India, including the Digital Personal Data Protection Act, 2023 (DPDPA) and rules made thereunder, as well as other applicable Indian laws. To the extent that users are located in the EEA or UK, relevant provisions of the GDPR and UK GDPR also apply to the processing of their personal data.
            </p>

            {/* Footer gradient bar */}
            <div
              className="mt-16 h-1 rounded-full"
              style={{ background: brand.gradient }}
            />
          </section>

        </main>
      </div>
    </div>
  );
}