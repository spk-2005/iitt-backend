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
  { id: "cookies", title: "9. Cookie Policy" },
  { id: "your-rights", title: "10. Your Rights" },
  { id: "childrens", title: "11. Children's Privacy" },
  { id: "third-party", title: "12. Third-Party Links" },
  { id: "changes", title: "13. Changes to This Policy" },
  { id: "contact", title: "14. Contact Us" },
  { id: "governing", title: "15. Governing Law" },
];

function TableOfContents({ activeSection }) {
  return (
    <nav style={styles.toc}>
      <div style={styles.tocHeader}>Contents</div>
      <ul style={styles.tocList}>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              style={{
                ...styles.tocLink,
                ...(activeSection === s.id ? styles.tocLinkActive : {}),
              }}
            >
              {activeSection === s.id && <span style={styles.tocDot} />}
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SectionHeader({ children }) {
  return <h2 style={styles.sectionHeader}>{children}</h2>;
}

function SubHeader({ children }) {
  return <h3 style={styles.subHeader}>{children}</h3>;
}

function BulletList({ items }) {
  return (
    <ul style={styles.bulletList}>
      {items.map((item, i) => (
        <li key={i} style={styles.bulletItem}>
          <span style={styles.bulletDot}>·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ children }) {
  return <div style={styles.infoBox}>{children}</div>;
}

export default function AnseruPrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const sectionRefs = useRef({});

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
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoText}>anseru</span>
            <span style={styles.logoAi}>.ai</span>
          </div>
          <div style={styles.headerMeta}>
            <span style={styles.badge}>Privacy Policy</span>
            <span style={styles.metaDate}>Last Updated: April 17, 2026</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.heroTitle}>Privacy Policy</h1>
          <p style={styles.heroSub}>
            How Anseru.ai collects, uses, and protects your personal data.
          </p>
        </div>
        <div style={styles.heroDecor} aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ ...styles.heroDot, ...getHeroDotStyle(i) }} />
          ))}
        </div>
      </div>

      {/* Layout */}
      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSticky}>
            <TableOfContents activeSection={activeSection} />
            <div style={styles.contactCard}>
              <div style={styles.contactCardTitle}>Questions?</div>
              <p style={styles.contactCardText}>
                Contact our Data Protection Officer
              </p>
              <a href="mailto:privacy@anseru.ai" style={styles.contactLink}>
                privacy@anseru.ai
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={styles.main}>
          {/* 1 */}
          <section id="introduction" style={styles.section}>
            <SectionHeader>1. Introduction</SectionHeader>
            <p style={styles.p}>
              Anseru.ai ("Anseru", "we", "us", or "our") provides an AI-powered
              RFP and proposal automation platform designed exclusively for
              business customers. We are committed to protecting the privacy and
              security of the personal data we process in connection with
              delivering our Services.
            </p>
            <p style={styles.p}>
              This Privacy Policy ("Policy") describes how we collect, use,
              share, and protect personal data when you access or use the Anseru
              platform, website, or related services (collectively, "Services").
              It also describes your rights and choices regarding that data.
            </p>
            <p style={styles.p}>
              By accessing or using the Services, you acknowledge that you have
              read and understood this Policy. If you do not agree, please
              discontinue use of the Services.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 2 */}
          <section id="scope" style={styles.section}>
            <SectionHeader>2. Scope and Who This Policy Applies To</SectionHeader>
            <p style={styles.p}>This Policy applies to:</p>
            <BulletList
              items={[
                "Users — individuals who access the Anseru platform on behalf of a subscribing business organisation.",
                "Website Visitors — individuals who visit anseru.ai or any of our web properties.",
                "Contacts — individuals whose contact information is provided to us by a Customer in the course of using the platform (e.g., RFP contacts, collaborators).",
              ]}
            />
            <InfoBox>
              <strong>Note to End Users:</strong> Where Anseru is made available
              to you through your employer or another organisation ("Customer"),
              that organisation controls the account and the data processed
              within it. Privacy inquiries relating to Customer-controlled data
              should first be directed to your organisation's administrator.
              Anseru acts as a data processor with respect to Customer Data.
            </InfoBox>
          </section>

          <div style={styles.divider} />

          {/* 3 */}
          <section id="information-collect" style={styles.section}>
            <SectionHeader>3. Information We Collect</SectionHeader>

            <SubHeader>3.1 Information You Provide Directly</SubHeader>
            <p style={styles.p}>We collect personal data when you:</p>
            <BulletList
              items={[
                "Register for an account — name, work email address, job title, employer name, phone number, and billing information.",
                "Use the platform — content you upload, including RFP documents, proposal responses, templates, knowledge-base materials, and any comments or feedback you submit.",
                "Contact us for support — correspondence, descriptions of technical issues, and any attachments you provide.",
                "Fill out web forms or surveys — any information submitted via our website or in-product forms.",
              ]}
            />

            <SubHeader>3.2 Information Collected Automatically</SubHeader>
            <p style={styles.p}>
              When you visit our website or use the platform, we automatically
              collect:
            </p>
            <BulletList
              items={[
                "Device and connection data — IP address, browser type, operating system, device identifiers, and referring URLs.",
                "Usage data — pages visited, features used, links clicked, search queries, and interaction patterns within the platform.",
                "Log data — server logs, crash reports, and performance metrics.",
                "Cookie and tracking data — please see Section 9 (Cookie Policy) for details.",
              ]}
            />

            <SubHeader>3.3 Information from Third-Party Sources</SubHeader>
            <p style={styles.p}>
              We may receive personal data about you from:
            </p>
            <BulletList
              items={[
                "Third-party integrations you connect to your account (e.g., Google Drive, CRM tools, SSO providers). The data we receive depends on the permissions you grant.",
                "Our partners or resellers who refer customers to us.",
                "Publicly available sources for sales and marketing outreach, in compliance with applicable law.",
              ]}
            />
          </section>

          <div style={styles.divider} />

          {/* 4 */}
          <section id="how-we-use" style={styles.section}>
            <SectionHeader>4. How We Use Your Information</SectionHeader>
            <p style={styles.p}>
              We use the personal data we collect for the following purposes:
            </p>
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

          <div style={styles.divider} />

          {/* 5 */}
          <section id="how-we-share" style={styles.section}>
            <SectionHeader>5. How We Share Your Information</SectionHeader>
            <p style={styles.p}>
              We do not sell personal data to third parties. We may share
              personal data in the following circumstances:
            </p>

            <SubHeader>5.1 Service Providers (Sub-Processors)</SubHeader>
            <p style={styles.p}>
              We engage trusted third-party service providers who process data
              on our behalf under contractual data processing agreements. These
              include:
            </p>
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
            <p style={styles.p}>
              All sub-processors are bound by confidentiality obligations and
              are permitted to process data only as instructed by us.
            </p>

            <SubHeader>5.2 Within Your Organisation</SubHeader>
            <p style={styles.p}>
              If your account is administered by your employer, certain account
              information and usage data may be visible to your organisation's
              administrators.
            </p>

            <SubHeader>5.3 Legal and Regulatory Disclosure</SubHeader>
            <p style={styles.p}>
              We may disclose personal data when required by law, regulation,
              legal process, or a valid governmental or court order — including
              under India's DPDPA and applicable laws in other jurisdictions.
            </p>

            <SubHeader>5.4 Business Transfers</SubHeader>
            <p style={styles.p}>
              In the event of a merger, acquisition, restructuring, or sale of
              assets, personal data may be transferred as part of the
              transaction. Affected users will be notified via email or a
              prominent notice on the Services.
            </p>

            <SubHeader>5.5 With Your Consent</SubHeader>
            <p style={styles.p}>
              We may share your data with third parties for other purposes where
              you have given explicit consent.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 6 */}
          <section id="data-storage" style={styles.section}>
            <SectionHeader>6. Data Storage and Security</SectionHeader>
            <p style={styles.p}>
              Personal data is primarily stored on servers located in the United
              States and/or India. We implement industry-standard technical and
              organisational measures to protect your data, including:
            </p>
            <BulletList
              items={[
                "Encryption of data in transit (TLS) and at rest (AES-256)",
                "Role-based access controls and least-privilege principles",
                "Regular security assessments and penetration testing",
                "Incident response procedures",
              ]}
            />
            <p style={styles.p}>
              No method of transmission over the internet is 100% secure. While
              we strive to protect your personal data, we cannot guarantee
              absolute security. You are responsible for keeping your account
              credentials confidential.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 7 */}
          <section id="data-retention" style={styles.section}>
            <SectionHeader>7. Data Retention</SectionHeader>
            <p style={styles.p}>
              We retain personal data for as long as necessary to fulfil the
              purposes described in this Policy, unless a longer retention
              period is required by law.
            </p>
            <BulletList
              items={[
                "Account data — retained for the duration of your account and for a reasonable period thereafter (typically 90 days post-termination) for legal, audit, or dispute-resolution purposes.",
                "Platform content — retained as configured by the Customer administrator; Customers are responsible for content retention settings within their accounts.",
                "Marketing data — retained until you opt out or withdraw consent, or until we determine there is no longer a legitimate business purpose.",
                "Usage and log data — typically retained for up to 12 months for security monitoring and analytics.",
              ]}
            />
            <p style={styles.p}>
              Upon verified request, or when data is no longer required, we
              will securely delete or anonymise personal data.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 8 */}
          <section id="international" style={styles.section}>
            <SectionHeader>8. International Data Transfers</SectionHeader>
            <p style={styles.p}>
              Anseru is headquartered in India. Some of our service providers
              and sub-processors are located outside India, including in the
              United States and the European Union. When we transfer personal
              data internationally, we put appropriate safeguards in place, such
              as:
            </p>
            <BulletList
              items={[
                "Standard Contractual Clauses (SCCs) approved by the European Commission (for EEA residents).",
                "Data Processing Agreements with all sub-processors.",
                "Compliance with India's DPDPA rules on cross-border data transfer.",
              ]}
            />
            <InfoBox>
              <strong>For EEA residents:</strong> Where Anseru processes your
              data as a controller, we rely on applicable legal bases including
              contractual necessity, legitimate interests, and consent. You may
              contact us for a copy of the applicable transfer mechanism.
            </InfoBox>
          </section>

          <div style={styles.divider} />

          {/* 9 */}
          <section id="cookies" style={styles.section}>
            <SectionHeader>9. Cookie Policy</SectionHeader>
            <p style={styles.p}>
              Our website uses cookies and similar tracking technologies. We use
              the following categories of cookies:
            </p>
            <BulletList
              items={[
                "Strictly Necessary Cookies — essential for the website to function (e.g., session management, security). You cannot opt out of these.",
                "Analytics Cookies — help us understand how visitors use our site (e.g., Google Analytics). These are set only with your consent.",
                "Marketing Cookies — used to deliver relevant advertisements. These are set only with your consent.",
              ]}
            />
            <p style={styles.p}>
              When you visit our website, a cookie banner will provide options
              to accept, reject, or customise non-essential cookies. You may
              also control cookies through your browser settings, though
              disabling certain cookies may affect functionality.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 10 */}
          <section id="your-rights" style={styles.section}>
            <SectionHeader>10. Your Rights</SectionHeader>
            <p style={styles.p}>
              Depending on your location and applicable law, you may have the
              following rights regarding your personal data:
            </p>
            <div style={styles.rightsGrid}>
              {[
                { right: "Right to Access", desc: "Request a copy of the personal data we hold about you." },
                { right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete data." },
                { right: "Right to Erasure", desc: "Request deletion of your personal data (subject to legal retention obligations)." },
                { right: "Right to Restriction", desc: "Request that we limit the processing of your data in certain circumstances." },
                { right: "Right to Data Portability", desc: "Receive your data in a structured, machine-readable format." },
                { right: "Right to Object", desc: "Object to processing based on legitimate interests or for direct marketing purposes." },
                { right: "Right to Withdraw Consent", desc: "Where processing is based on consent, withdraw it at any time without affecting prior processing." },
                { right: "Right to Opt Out of Marketing", desc: "Unsubscribe from marketing communications at any time via the unsubscribe link in our emails or by contacting us." },
              ].map((item) => (
                <div key={item.right} style={styles.rightCard}>
                  <div style={styles.rightCardTitle}>{item.right}</div>
                  <div style={styles.rightCardDesc}>{item.desc}</div>
                </div>
              ))}
            </div>
            <InfoBox>
              <strong>Note:</strong> If the Services are administered by your
              employer, please direct data rights requests to your
              organisation's administrator in the first instance. We will
              respond to all verified requests within 30 days (or as required
              by applicable law).
            </InfoBox>
          </section>

          <div style={styles.divider} />

          {/* 11 */}
          <section id="childrens" style={styles.section}>
            <SectionHeader>11. Children's Privacy</SectionHeader>
            <p style={styles.p}>
              Our Services are not directed to individuals under the age of 18.
              We do not knowingly collect personal data from minors. If we
              become aware that personal data of a minor has been collected, we
              will take steps to delete it promptly. If you believe a minor has
              provided us with personal data, please contact us immediately.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 12 */}
          <section id="third-party" style={styles.section}>
            <SectionHeader>12. Third-Party Links and Integrations</SectionHeader>
            <p style={styles.p}>
              Our platform and website may contain links to third-party websites
              or integrations with third-party services. This Policy does not
              apply to those third parties. We encourage you to review the
              privacy policies of any third-party services you interact with. We
              are not responsible for the privacy practices of third parties.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 13 */}
          <section id="changes" style={styles.section}>
            <SectionHeader>13. Changes to This Policy</SectionHeader>
            <p style={styles.p}>
              We may update this Privacy Policy from time to time. Material
              changes will be communicated via email or a prominent notice
              within the Services at least 30 days before taking effect. The
              "Last Updated" date at the top of this document indicates when the
              most recent changes were made. Continued use of the Services after
              changes take effect constitutes acceptance of the updated Policy.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 14 */}
          <section id="contact" style={styles.section}>
            <SectionHeader>14. Contact Us</SectionHeader>
            <p style={styles.p}>
              If you have any questions, concerns, or requests relating to this
              Privacy Policy or the processing of your personal data, please
              contact:
            </p>
            <div style={styles.contactBlock}>
              <div style={styles.contactBlockLabel}>Data Protection Officer</div>
              <div style={styles.contactBlockName}>Anseru.ai</div>
              <div>
                <span style={styles.contactFieldLabel}>Email: </span>
                <a href="mailto:privacy@anseru.ai" style={styles.contactFieldLink}>
                  privacy@anseru.ai
                </a>
              </div>
              <div>
                <span style={styles.contactFieldLabel}>Website: </span>
                <a href="https://anseru.ai" style={styles.contactFieldLink} target="_blank" rel="noreferrer">
                  https://anseru.ai
                </a>
              </div>
            </div>
            <p style={styles.p}>
              For EEA residents with unresolved complaints, you may also contact
              your local data protection authority.
            </p>
          </section>

          <div style={styles.divider} />

          {/* 15 */}
          <section id="governing" style={styles.section}>
            <SectionHeader>15. Governing Law</SectionHeader>
            <p style={styles.p}>
              This Privacy Policy is governed by the laws of India, including
              the Digital Personal Data Protection Act, 2023 (DPDPA) and rules
              made thereunder, as well as other applicable Indian laws. To the
              extent that users are located in the EEA or UK, relevant
              provisions of the GDPR and UK GDPR also apply to the processing
              of their personal data.
            </p>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <span style={styles.logoText}>anseru</span>
            <span style={styles.logoAi}>.ai</span>
          </div>
          <div style={styles.footerLinks}>
            <a href="https://anseru.ai" style={styles.footerLink}>Home</a>
            <span style={styles.footerSep}>·</span>
            <a href="mailto:privacy@anseru.ai" style={styles.footerLink}>privacy@anseru.ai</a>
          </div>
          <div style={styles.footerCopy}>
            © {new Date().getFullYear()} Anseru.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function getHeroDotStyle(i) {
  const positions = [
    { top: "20%", left: "8%", width: 80, opacity: 0.12 },
    { top: "60%", left: "15%", width: 40, opacity: 0.08 },
    { top: "30%", right: "12%", width: 60, opacity: 0.1 },
    { top: "70%", right: "20%", width: 100, opacity: 0.07 },
    { top: "10%", left: "50%", width: 30, opacity: 0.09 },
    { top: "80%", left: "45%", width: 50, opacity: 0.06 },
  ];
  const p = positions[i];
  return {
    position: "absolute",
    width: p.width,
    height: p.width,
    borderRadius: "50%",
    background: "white",
    opacity: p.opacity,
    top: p.top,
    left: p.left,
    right: p.right,
  };
}

const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#f8f7f5",
    color: "#1a1a1a",
    minHeight: "100vh",
  },
  // Header
  header: {
    background: "#0e0e0e",
    borderBottom: "1px solid #2a2a2a",
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: { display: "flex", alignItems: "baseline" },
  logoText: {
    fontFamily: "'Georgia', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "-0.5px",
  },
  logoAi: {
    fontFamily: "'Georgia', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#4f9cf9",
    letterSpacing: "-0.5px",
  },
  headerMeta: { display: "flex", alignItems: "center", gap: 16 },
  badge: {
    background: "#1a2a3a",
    color: "#4f9cf9",
    border: "1px solid #2a4a6a",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontFamily: "'Georgia', sans-serif",
    letterSpacing: "0.5px",
  },
  metaDate: {
    color: "#666",
    fontSize: 13,
    fontFamily: "'Georgia', sans-serif",
  },
  // Hero
  hero: {
    background: "linear-gradient(135deg, #0e1a2e 0%, #1a2e4a 50%, #0e2233 100%)",
    padding: "64px 32px",
    position: "relative",
    overflow: "hidden",
  },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  heroTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: 48,
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 16px",
    letterSpacing: "-1px",
  },
  heroSub: {
    fontFamily: "'Georgia', sans-serif",
    fontSize: 18,
    color: "#8ab4d4",
    margin: 0,
    maxWidth: 500,
    lineHeight: 1.6,
  },
  heroDecor: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  heroDot: {},
  // Layout
  layout: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "48px 32px",
    display: "flex",
    gap: 48,
    alignItems: "flex-start",
  },
  // Sidebar
  sidebar: {
    width: 260,
    flexShrink: 0,
  },
  sidebarSticky: {
    position: "sticky",
    top: 24,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  toc: {
    background: "#ffffff",
    border: "1px solid #e8e4e0",
    borderRadius: 8,
    padding: "20px",
  },
  tocHeader: {
    fontFamily: "'Georgia', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#888",
    marginBottom: 16,
  },
  tocList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  tocLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 8px",
    borderRadius: 4,
    fontSize: 12.5,
    color: "#555",
    textDecoration: "none",
    fontFamily: "'Georgia', sans-serif",
    lineHeight: 1.4,
    transition: "all 0.15s",
  },
  tocLinkActive: {
    color: "#1a5fa8",
    background: "#eef4ff",
    fontWeight: 600,
  },
  tocDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#4f9cf9",
    flexShrink: 0,
  },
  contactCard: {
    background: "linear-gradient(135deg, #0e1a2e, #1a3050)",
    borderRadius: 8,
    padding: "20px",
    color: "#fff",
  },
  contactCardTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 8,
    color: "#fff",
  },
  contactCardText: {
    fontFamily: "'Georgia', sans-serif",
    fontSize: 13,
    color: "#8ab4d4",
    margin: "0 0 12px",
    lineHeight: 1.5,
  },
  contactLink: {
    color: "#4f9cf9",
    textDecoration: "none",
    fontSize: 13,
    fontFamily: "'Georgia', sans-serif",
  },
  // Main
  main: {
    flex: 1,
    minWidth: 0,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontFamily: "'Georgia', serif",
    fontSize: 24,
    fontWeight: 700,
    color: "#0e1a2e",
    margin: "0 0 20px",
    letterSpacing: "-0.3px",
  },
  subHeader: {
    fontFamily: "'Georgia', serif",
    fontSize: 16,
    fontWeight: 700,
    color: "#1a3050",
    margin: "24px 0 12px",
  },
  p: {
    fontFamily: "'Georgia', serif",
    fontSize: 15.5,
    lineHeight: 1.8,
    color: "#333",
    margin: "0 0 16px",
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg, #ddd 0%, transparent 100%)",
    margin: "40px 0",
  },
  bulletList: {
    listStyle: "none",
    margin: "0 0 16px",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  bulletItem: {
    display: "flex",
    gap: 12,
    fontSize: 15.5,
    lineHeight: 1.7,
    color: "#333",
    fontFamily: "'Georgia', serif",
  },
  bulletDot: {
    color: "#4f9cf9",
    fontSize: 20,
    lineHeight: 1.4,
    flexShrink: 0,
  },
  infoBox: {
    background: "#f0f6ff",
    borderLeft: "3px solid #4f9cf9",
    borderRadius: "0 6px 6px 0",
    padding: "16px 20px",
    fontFamily: "'Georgia', serif",
    fontSize: 14.5,
    lineHeight: 1.7,
    color: "#2a4060",
    marginTop: 20,
  },
  rightsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    margin: "20px 0",
  },
  rightCard: {
    background: "#ffffff",
    border: "1px solid #e0dcd8",
    borderRadius: 8,
    padding: "16px 18px",
  },
  rightCardTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#1a3050",
    marginBottom: 6,
  },
  rightCardDesc: {
    fontFamily: "'Georgia', serif",
    fontSize: 13.5,
    lineHeight: 1.6,
    color: "#555",
  },
  contactBlock: {
    background: "#ffffff",
    border: "1px solid #e0dcd8",
    borderRadius: 8,
    padding: "24px",
    margin: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  contactBlockLabel: {
    fontFamily: "'Georgia', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#4f9cf9",
    marginBottom: 4,
  },
  contactBlockName: {
    fontFamily: "'Georgia', serif",
    fontSize: 18,
    fontWeight: 700,
    color: "#0e1a2e",
    marginBottom: 8,
  },
  contactFieldLabel: {
    fontFamily: "'Georgia', sans-serif",
    fontSize: 14,
    color: "#888",
  },
  contactFieldLink: {
    fontFamily: "'Georgia', sans-serif",
    fontSize: 14,
    color: "#1a5fa8",
    textDecoration: "none",
  },
  // Footer
  footer: {
    background: "#0e0e0e",
    borderTop: "1px solid #2a2a2a",
    padding: "32px",
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  footerLogo: { display: "flex", alignItems: "baseline" },
  footerLinks: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  footerLink: {
    color: "#888",
    textDecoration: "none",
    fontSize: 13,
    fontFamily: "'Georgia', sans-serif",
  },
  footerSep: {
    color: "#444",
  },
  footerCopy: {
    color: "#555",
    fontSize: 13,
    fontFamily: "'Georgia', sans-serif",
  },
};