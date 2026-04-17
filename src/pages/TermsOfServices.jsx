import { useState, useEffect } from "react";

const sections = [
  { id: "agreement", title: "1. Agreement to Terms" },
  { id: "services", title: "2. Services" },
  { id: "responsibilities", title: "3. Your Responsibilities" },
  { id: "ip", title: "4. Intellectual Property Rights" },
  { id: "third-party", title: "5. Third-Party Services" },
  { id: "charges", title: "6. Charges & Payment" },
  { id: "term-termination", title: "7. Term, Termination & Suspension" },
  { id: "confidentiality", title: "8. Confidentiality & Data Privacy" },
  { id: "warranties", title: "9. Warranties & Disclaimers" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "indemnification", title: "11. Indemnification" },
  { id: "governing", title: "12. Governing Law & Jurisdiction" },
  { id: "miscellaneous", title: "13. Miscellaneous" },
  { id: "definitions", title: "14. Definitions" },
  { id: "contact", title: "15. Contact Us" },
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
                  ? { color: brand.purple, background: "rgba(123,92,245,0.09)", fontWeight: 500 }
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

export default function AnseruTermsOfService() {
  const [activeSection, setActiveSection] = useState("agreement");

  useEffect(() => {
    const observers = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
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
      <div className="border-b border-gray-100 px-6 py-16 md:py-14 relative overflow-hidden">
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
            Terms of Service
          </h1>
          <p className="text-[18px] text-gray-500 max-w-2xl leading-relaxed">
            The terms and conditions governing your access to and use of the Anseru platform and services.
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
              Contact our legal team for any service-related inquiries.
            </p>
            <a
              href="mailto:legal@anseru.ai"
              className="text-[14px] font-medium no-underline transition-opacity hover:opacity-75"
              style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              legal@anseru.ai
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-3xl">

          {/* 1. Agreement to Terms */}
          <section id="agreement" className="mb-16 scroll-mt-24">
            <SectionHeader>1. Agreement to Terms</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              These Terms of Service ("Terms") constitute a legally binding agreement between you, whether personally or on behalf of an entity ("you", "your"), and Anseru.ai ("Anseru", "we", "us", or "our"), concerning your access to and use of our AI-powered RFP and proposal automation platform, website, and related services (collectively, the "Services"). Our platform is accessible at <a href="https://anseru.ai" className="underline" style={{ color: brand.purple }}>https://anseru.ai</a>.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              By accessing or using the Services, you confirm that: (a) you have read, understood, and agreed to be bound by these Terms; (b) you have the legal capacity to enter into this agreement; and (c) if entering on behalf of a company or entity, you have the authority to bind that entity to these Terms.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If you do not agree to these Terms, you must immediately discontinue use of the Services. Anseru reserves the right to amend these Terms at any time. Material changes will be communicated with at least 10 days' notice. Continued use after such changes constitutes acceptance.
            </p>
            <InfoBox>
              The Services are not intended to be accessed for monitoring availability, performance, benchmarking, or competitive analysis purposes. Anseru's competitors are prohibited from accessing the Services without prior written consent.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 2. Services */}
          <section id="services" className="mb-16 scroll-mt-24">
            <SectionHeader>2. Services</SectionHeader>
            <SubHeader>2.1 Your Rights</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Subject to your compliance with these Terms and solely during the Subscription Term, Anseru grants you a limited, non-exclusive, non-transferable, revocable right to access and use the Services solely for your internal business purposes in accordance with these Terms and the applicable Order Form.
            </p>
            <SubHeader>2.2 Anseru's Responsibilities</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">Anseru will:</p>
            <BulletList
              items={[
                "Make the Services available in accordance with these Terms, Documentation, and your Order Form.",
                "Provide standard customer support in accordance with Anseru's then-current support policy.",
                "Comply with all applicable laws and regulations in the provision of the Services.",
              ]}
            />
            <SubHeader>2.3 Updates and Downtime</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Enhancements, new features, or updates ("Updates") to the Services are subject to these Terms. Anseru reserves the right to deploy Updates at any time. The Services may be temporarily unavailable due to scheduled maintenance, and Anseru will use commercially reasonable efforts to provide advance notice.
            </p>
            <SubHeader>2.4 Trials</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru may offer trial access for a limited period ("Trial Period") subject to these Terms and any additional trial-specific terms. Anseru may terminate trial access at any time at its sole discretion without liability.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 3. Your Responsibilities */}
          <section id="responsibilities" className="mb-16 scroll-mt-24">
            <SectionHeader>3. Your Responsibilities</SectionHeader>
            <SubHeader>3.1 Your Account</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Your access to the Services is limited to the number of Users specified in the relevant Order Form. Each User must be identified by unique login credentials, which may only be used by one individual. You are responsible for maintaining the confidentiality of all login credentials and for all activities that occur under your account.
            </p>
            <SubHeader>3.2 Acceptable Use</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">You agree not to:</p>
            <BulletList
              items={[
                "License, sublicense, sell, resell, rent, lease, transfer, assign, or distribute the Services to any third party.",
                "Modify, adapt, reverse engineer, decompile, or disassemble the Services or attempt to derive source code.",
                "Use the Services to store or transmit Sensitive Personal Information or data in violation of applicable laws.",
                "Access the Services to build competitive or derivative products, or engage in benchmarking or competitive analysis.",
                "Use the Services to store or transmit unlawful, infringing, hateful, abusive, obscene, or discriminatory content.",
                "Upload or transmit viruses, malware, trojans, or any other harmful software.",
                "Crawl, scrape, or spider any page or data of the Services through manual or automated means.",
                "Attempt to gain unauthorized access to the Services, related systems, or networks.",
              ]}
            />
            <SubHeader>3.3 Compliance</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You are responsible for ensuring that all Service Data you transmit to Anseru complies with applicable laws, regulations, and third-party proprietary rights, including obtaining all necessary authorizations and consents. Anseru shall have no liability for claims arising from your failure to comply with this obligation.
            </p>
            <SubHeader>3.4 Prohibited Activity</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If Anseru notifies you that a specified activity poses a threat to the security, integrity, or availability of the Services, you must immediately cease that activity.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 4. Intellectual Property Rights */}
          <section id="ip" className="mb-16 scroll-mt-24">
            <SectionHeader>4. Intellectual Property Rights</SectionHeader>
            <SubHeader>4.1 Services</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Except for the rights expressly granted under these Terms, all intellectual property rights in the Services — including patents, copyrights, trademarks, trade secrets, and know-how — belong exclusively to Anseru, its affiliates, and licensors. All rights not expressly granted are reserved by Anseru.
            </p>
            <SubHeader>4.2 Service Data</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You retain ownership of all Service Data you provide to Anseru. You grant Anseru a royalty-free licence to use Service Data solely to provide, maintain, and improve the Services, address technical issues, and fulfil support requests, in accordance with these Terms.
            </p>
            <SubHeader>4.3 Feedback</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru may incorporate any suggestions, recommendations, or feedback you provide into the Services without obligation or compensation to you, and you are not referenced in any such use.
            </p>
            <SubHeader>4.4 Aggregated Data</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru may aggregate and anonymise data relating to the use and performance of the Services and use such data to develop and improve the Services and other offerings. Such aggregated data will not identify you or any individual.
            </p>
            <SubHeader>4.5 Publicity</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Unless otherwise agreed in an Order Form, Anseru may identify you as a customer using your name, trademark, and logo on its website, social media, and marketing materials, in accordance with your branding guidelines if provided. Anseru will not use your marks in any other way without your prior written consent.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 5. Third-Party Services */}
          <section id="third-party" className="mb-16 scroll-mt-24">
            <SectionHeader>5. Third-Party Services</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The Services may enable integrations with third-party applications and services ("Third-Party Services"). Your use of Third-Party Services is subject to the terms and privacy policies of those third parties. Anseru is not responsible for your use of Third-Party Services or any data processed by them outside the Anseru platform.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              By enabling integrations, you authorise Anseru to share Service Data (including Personal Data where necessary) with the relevant Third-Party Service providers to facilitate the integration. Anseru's access to Third-Party Services is limited to what you authorise and is used solely for providing the Services.
            </p>
            <InfoBox>
              Anseru shall only be liable for your data while it is being transmitted through the Anseru platform. For issues arising from Third-Party Services, please contact the respective service provider directly.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 6. Charges & Payment */}
          <section id="charges" className="mb-16 scroll-mt-24">
            <SectionHeader>6. Charges & Payment</SectionHeader>
            <SubHeader>6.1 Subscription Charges</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              All charges associated with your use of the Services are set out in the applicable Order Form ("Subscription Charges"). Unless otherwise stated in the Order Form, Subscription Charges are due in full and payable in advance upon subscription.
            </p>
            <SubHeader>6.2 Payment Terms</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Payment is due within thirty (30) days of receipt of Anseru's invoice, unless the Order Form specifies otherwise. We accept ACH/wire transfer and other methods as specified in the Order Form. All payments shall be in the currency stated in the Order Form.
            </p>
            <SubHeader>6.3 Taxes</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Subscription Charges are exclusive of applicable taxes, levies, duties, GST, VAT, or similar governmental assessments. You are responsible for all such taxes unless Anseru is legally required to collect and remit them.
            </p>
            <SubHeader>6.4 Late Payments</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If payment is not received by the due date, Anseru will notify you. If payment is not received within ten (10) days of such notice, Anseru may suspend or terminate your access to the Services, with at least five (5) days' prior written notice before doing so.
            </p>
            <SubHeader>6.5 Refunds</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Unless otherwise specified in these Terms or an Order Form, all Subscription Charges are non-refundable. Payment disputes must be raised in writing within seven (7) days of invoice receipt.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 7. Term, Termination & Suspension */}
          <section id="term-termination" className="mb-16 scroll-mt-24">
            <SectionHeader>7. Term, Termination & Suspension</SectionHeader>
            <SubHeader>7.1 Term and Renewal</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The Subscription Term is set out in your Order Form. Unless terminated, subscriptions automatically renew for an equivalent term at the then-current Subscription Charges. Anseru will notify you of renewal at least thirty (30) days before the current term expires.
            </p>
            <SubHeader>7.2 Termination for Breach</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Either party may terminate these Terms upon written notice if the other party materially breaches these Terms and the breach remains uncured for thirty (30) days after notice. Activities that threaten the security or integrity of the Services may result in immediate termination.
            </p>
            <SubHeader>7.3 Termination for Insolvency</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Either party may terminate these Terms immediately upon notice if the other party becomes insolvent, makes an assignment for the benefit of creditors, or has a receiver or trustee appointed for substantially all of its property.
            </p>
            <SubHeader>7.4 Effect of Termination</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Upon termination, your access to the Services will cease immediately. You remain liable for all Subscription Charges accrued prior to termination. Anseru will delete your Service Data within forty-five (45) days of termination unless legally prohibited. You may request data export within this period. Deleted data cannot be recovered.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 8. Confidentiality & Data Privacy */}
          <section id="confidentiality" className="mb-16 scroll-mt-24">
            <SectionHeader>8. Confidentiality & Data Privacy</SectionHeader>
            <SubHeader>8.1 Confidential Information</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              "Confidential Information" means any information disclosed by one party to the other that is labelled confidential or that a reasonable person would consider confidential given the context. This includes Service Data and account credentials. Confidential Information excludes information that is publicly known, independently developed, or lawfully obtained from third parties.
            </p>
            <SubHeader>8.2 Obligations</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Each party will protect the other's Confidential Information using at least the same care it applies to its own confidential information, and no less than reasonable care. Confidential Information may only be disclosed to employees or agents who have a need to know and are bound by confidentiality obligations.
            </p>
            <SubHeader>8.3 Data Privacy & Security</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru will implement and maintain appropriate administrative, physical, and technical security measures to protect Service Data in accordance with its security policy. Anseru processes Personal Data as a data processor on your behalf, in accordance with India's Digital Personal Data Protection Act, 2023 (DPDPA), and where applicable, the GDPR and UK GDPR, and the Data Processing Addendum incorporated into these Terms.
            </p>
            <InfoBox>
              For details on how Anseru processes personal data, please refer to our <a href="https://anseru.ai/privacy" style={{ color: brand.purple }}>Privacy Policy</a>.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 9. Warranties & Disclaimers */}
          <section id="warranties" className="mb-16 scroll-mt-24">
            <SectionHeader>9. Warranties & Disclaimers</SectionHeader>
            <SubHeader>9.1 Anseru's Warranties</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              During the Subscription Term, Anseru warrants that: (a) it will not materially decrease the overall functionality of the Services; and (b) it will maintain accurate and appropriate security measures to protect Service Data as described in its security policy.
            </p>
            <SubHeader>9.2 Disclaimer</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Except as expressly stated herein, the Services are provided "as is" without warranties of any kind — express, implied, or statutory — including any implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Anseru does not warrant that the Services will be error-free, uninterrupted, or that AI-generated outputs will be accurate or suitable for your purposes.
            </p>
            <InfoBox>
              AI-powered outputs and recommendations provided through the Services are intended as suggestions only. You are solely responsible for verifying outputs and ensuring compliance with any applicable standards or regulations.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 10. Limitation of Liability */}
          <section id="liability" className="mb-16 scroll-mt-24">
            <SectionHeader>10. Limitation of Liability</SectionHeader>
            <SubHeader>10.1 Exclusion of Certain Damages</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              To the maximum extent permitted by applicable law, neither party nor its affiliates will be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages — including lost profits, loss of data, or business interruption — arising out of or related to these Terms, even if advised of the possibility of such damages.
            </p>
            <SubHeader>10.2 Liability Cap</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Except for amounts payable under a party's indemnification obligations, the aggregate total liability of either party arising out of or related to these Terms shall not exceed the total Subscription Charges paid by you in the twelve (12) months preceding the event giving rise to the claim.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 11. Indemnification */}
          <section id="indemnification" className="mb-16 scroll-mt-24">
            <SectionHeader>11. Indemnification</SectionHeader>
            <SubHeader>11.1 Indemnification by Anseru</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru will defend you against any third-party claim alleging that the Services infringe that party's intellectual property rights, and will indemnify you from any resulting damages or costs, provided you: (a) give Anseru prompt written notice; (b) give Anseru sole control of the defence; and (c) provide all reasonable assistance. This obligation does not apply to claims arising from your misuse of the Services, unauthorised modifications, or combination with third-party materials not provided by Anseru.
            </p>
            <SubHeader>11.2 Indemnification by You</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You will defend Anseru and its affiliates against any third-party claim arising from your use of the Services in violation of these Terms or applicable law, and will indemnify Anseru from any resulting damages or costs, provided Anseru gives you prompt notice and reasonable cooperation.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 12. Governing Law */}
          <section id="governing" className="mb-16 scroll-mt-24">
            <SectionHeader>12. Governing Law & Jurisdiction</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              These Terms are governed by the laws of India, including the Digital Personal Data Protection Act, 2023, and other applicable Indian laws. The courts of Hyderabad, India shall have exclusive jurisdiction over all disputes arising from these Terms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { region: "EEA Customers", text: "Governed by the laws of Ireland; Commercial Courts in Dublin have exclusive jurisdiction." },
                { region: "UK Customers", text: "Governed by the laws of England and Wales; County Courts in London have exclusive jurisdiction." },
                { region: "GCC Region", text: "Governed by the laws of England and Wales; DIFC Courts have exclusive jurisdiction." },
                { region: "APAC Region", text: "Governed by the laws of Singapore; disputes resolved by binding arbitration under SIAC Rules." },
              ].map((item) => (
                <div
                  key={item.region}
                  className="rounded-lg p-5"
                  style={{ background: brand.gradientSubtle, border: `0.5px solid ${brand.gradientBorder}` }}
                >
                  <div
                    className="font-semibold mb-1.5 text-[15px]"
                    style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    {item.region}
                  </div>
                  <div className="text-[14px] text-gray-500 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
            <InfoBox>
              Where applicable, disputes will first be subject to informal negotiation for at least thirty (30) days before formal proceedings are commenced.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 13. Miscellaneous */}
          <section id="miscellaneous" className="mb-16 scroll-mt-24">
            <SectionHeader>13. Miscellaneous</SectionHeader>
            <BulletList
              items={[
                "Entire Agreement: These Terms, together with all Order Forms and incorporated policies, constitute the entire agreement between the parties and supersede all prior agreements relating to the subject matter herein.",
                "Assignment: Neither party may assign these Terms without the other's prior written consent, except to an affiliate. Anseru will notify you of any assignment to an affiliate.",
                "Force Majeure: Neither party is liable for delays caused by circumstances beyond their reasonable control, including acts of God, government actions, or technical failures outside their control.",
                "Relationship: The parties are independent contractors. These Terms do not create a partnership, joint venture, agency, or employment relationship.",
                "Severability: If any provision of these Terms is found to be unlawful or unenforceable, that provision will be severed and the remaining provisions will remain in full force.",
                "No Waiver: Failure to enforce any right under these Terms does not constitute a waiver of that right.",
                "Notices: Notices may be sent by email or nationally recognised courier to the addresses specified in the Order Form. Email notices are deemed delivered immediately upon sending.",
                "Export Compliance: You represent that you are not on any government denied-party list and will not permit access to the Services from sanctioned countries or regions.",
                "Anti-Bribery: Neither party has received or been offered any improper bribe, rebate, or kickback in connection with these Terms.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 14. Definitions */}
          <section id="definitions" className="mb-16 scroll-mt-24">
            <SectionHeader>14. Definitions</SectionHeader>
            <BulletList
              items={[
                "Account: Any account or instance created by you or on your behalf to access and use the Services.",
                "Affiliate: An entity that controls, is controlled by, or is under common control with the subject entity (more than 50% voting interest).",
                "Documentation: Written or electronic documentation specifying the functionalities of the Services provided by Anseru.",
                "Order Form: A service order form executed by the parties specifying subscription details, Subscription Charges, and Subscription Term.",
                "Personal Data: Data relating to a living individual who is or can be identified from the data, as defined under applicable data protection law.",
                "Sensitive Personal Information: Information relating to racial or ethnic origin, health data, biometric data, government IDs, financial data, criminal records, or other categories deemed sensitive under applicable law.",
                "Service Data: All electronic data, text, messages, personal data, or other materials submitted to the Services by you through your account.",
                "Services: Anseru's AI-powered RFP and proposal automation platform, including all related features, APIs, software, and documentation.",
                "Subscription Term: The period during which you have agreed to subscribe to the Services, as specified in the relevant Order Form.",
                "Third-Party Services: Third-party applications or services that integrate with the Services via APIs or other means.",
                "User: An individual designated to access and use the Services within a Customer's account, including administrators and collaborators.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 15. Contact Us */}
          <section id="contact" className="mb-16 scroll-mt-24">
            <SectionHeader>15. Contact Us</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-6">
              For any questions, concerns, or requests relating to these Terms or the Services, please contact:
            </p>
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: brand.gradientSubtle, border: `0.5px solid ${brand.gradientBorder}` }}
            >
              <div
                className="font-semibold mb-1 text-[16px]"
                style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Legal Team
              </div>
              <div className="text-gray-500 text-[15.5px] mb-5">Anseru.ai</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center text-[15px]">
                  <span className="text-gray-400 font-medium w-24">Email:</span>
                  <a
                    href="mailto:legal@anseru.ai"
                    className="no-underline transition-opacity hover:opacity-75"
                    style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    legal@anseru.ai
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

            {/* Footer gradient bar */}
            <div className="mt-16 h-1 rounded-full" style={{ background: brand.gradient }} />
          </section>

        </main>
      </div>
    </div>
  );
}