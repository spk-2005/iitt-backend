import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "agreement", title: "1. Agreement to Terms" },
  { id: "services", title: "2. Services" },
  { id: "responsibilities", title: "3. Your Responsibilities" },
  { id: "acceptable-use", title: "4. Acceptable Use Policy" },
  { id: "ip", title: "5. Intellectual Property Rights" },
  { id: "generative-ai", title: "6. Generative AI Usage" },
  { id: "third-party", title: "7. Third-Party Services" },
  { id: "charges", title: "8. Charges & Payment" },
  { id: "term-termination", title: "9. Term, Termination & Suspension" },
  { id: "confidentiality", title: "10. Confidentiality & Data Privacy" },
  { id: "warranties", title: "11. Warranties & Disclaimers" },
  { id: "liability", title: "12. Limitation of Liability" },
  { id: "indemnification", title: "13. Indemnification" },
  { id: "governing", title: "14. Governing Law & Jurisdiction" },
  { id: "miscellaneous", title: "15. Miscellaneous" },
  { id: "definitions", title: "16. Definitions" },
  { id: "contact", title: "17. Contact Us" },
];

const brand = {
  blue: "#201CAE",
  mid: "#8E65F1",
  red: "#E74F62",
  gradient: "#201CAE",
  gradientSubtle: "rgba(32, 28, 174, 0.05)",
  gradientBorder: "rgba(32, 28, 174, 0.15)",
  pillBg: "#f3f4f6",
};

function GradientDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#000",
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
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[13.5px] no-underline transition-all duration-200 toc-link"
              style={
                activeSection === s.id
                  ? { color: brand.blue, background: "rgba(32, 28, 174, 0.09)", fontWeight: 500 }
                  : { color: "#4b5563" }
              }
            >

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
    <h2 className="text-[24px] text-gray-900 mb-5 tracking-tight flex items-center gap-2">
      {children}
    </h2>
  );
}

function SubHeader({ children }) {
  return (
    <h3 className="text-[17px] font-medium text-gray-900 mt-8 mb-4">
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
              background: "#000",
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
    <div className="bg-white text-gray-900 min-h-screen">

      {/* Hero */}
      <div className="border-b border-gray-100 px-6 py-16 md:py-4 relative overflow-hidden">

        <div className="max-w-6xl mx-auto relative">
          <span
            className="inline-block px-3 py-1 rounded-full text-[12px] font-bold mb-4 uppercase tracking-wider"
            style={{ background: brand.pillBg, color: brand.mid, border: `0.5px solid ${brand.gradientBorder}` }}
          >
            Legal
          </span>
          <h1
            className="text-4xl md:text-[52px]  tracking-tight mb-6 text-gray-900"
          >
            Terms of Service
          </h1>
          <p className="text-[18px] text-gray-500 max-w-4xl leading-relaxed">
            The terms and conditions governing your access to and use of the Anseru platform and services.
          </p>
          <p className="text-[14px] text-gray-400 mt-3 font-medium">Last Updated: April 17, 2026</p>
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
            <div className="  text-[15px] mb-2 text-gray-900">Questions?</div>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
              Contact our legal team for any service-related inquiries.
            </p>
            <a
              href="mailto:legal@anseru.ai"
              className="text-[14px] font-medium no-underline transition-opacity hover:opacity-75"
              style={{ color: brand.blue }}
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
              These Terms of Service ("Terms") constitute a legally binding agreement between you, whether personally or on behalf of an entity ("you", "your"), and Anseru.ai ("Anseru", "we", "us", or "our"), concerning your access to and use of our AI-powered RFP and proposal automation platform, website, and related services (collectively, the "Services"). Our platform is accessible at{" "}
              <a href="https://anseru.ai" className="underline" style={{ color: brand.blue }}>https://anseru.ai</a>.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              By accessing or using the Services, you confirm that: (a) you have read, understood, and agreed to be bound by these Terms; (b) you have the legal capacity to enter into this agreement and are not a minor in your jurisdiction of residence; and (c) if entering on behalf of a company or entity, you have the authority to bind that entity to these Terms.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If you do not agree to these Terms, you must immediately discontinue use of the Services. Anseru reserves the right to amend these Terms at any time. Material changes will be communicated with at least ten (10) days' notice prior to taking effect. Your continued use of the Services after such changes constitutes acceptance of the revised Terms. We encourage you to periodically review this page to stay informed of any updates.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or would subject us to any registration requirement. Users who access the Services from jurisdictions outside India do so on their own initiative and are solely responsible for compliance with applicable local laws.
            </p>
            <InfoBox>
              The Services are not intended to be accessed for monitoring availability, performance, benchmarking, or competitive analysis purposes. Anseru's competitors are prohibited from accessing the Services without prior written consent. In the event of any conflict between these Terms and a separately executed Master Subscription Agreement or Order Form, the terms of the executed agreement will prevail.
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
                "Not materially decrease the overall functionality of the Services during the Subscription Term.",
              ]}
            />

            <SubHeader>2.3 Updates, Patches, and Downtime</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Enhancements, new features, patches, bug fixes, upgrades, or updates ("Updates") to the Services are subject to these Terms. Anseru reserves the right to deploy Updates at any time. Some Updates may be installed automatically without additional notice or consent. By continuing to use the Services, you consent to automatic Updates. If you do not wish to receive Updates, your sole remedy is to stop using the Services. The Services may be temporarily unavailable due to scheduled maintenance, and Anseru will use commercially reasonable efforts to provide advance notice.
            </p>

            <SubHeader>2.4 Beta Features</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              From time to time, Anseru may offer new "Beta" features or tools on an experimental basis. Such features are provided solely for evaluation purposes, without any warranty of any kind, and may be modified or discontinued at Anseru's sole discretion at any time without notice or liability. Beta features do not constitute a commitment to release any final product or feature.
            </p>

            <SubHeader>2.5 Trials</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru may offer trial access for a limited period ("Trial Period") subject to these Terms and any additional trial-specific terms. Anseru may terminate trial access at any time at its sole discretion without liability.
            </p>

            <SubHeader>2.6 Corrections</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              There may be information on the platform or website that contains typographical errors, inaccuracies, or omissions, including pricing, availability, and feature descriptions. Anseru reserves the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 3. Your Responsibilities */}
          <section id="responsibilities" className="mb-16 scroll-mt-24">
            <SectionHeader>3. Your Responsibilities</SectionHeader>

            <SubHeader>3.1 Your Account</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Your access to the Services is limited to the number of Users specified in the relevant Order Form. Each User must be identified by unique login credentials, which may only be used by one individual. Shared login credentials are not permitted. You are responsible for maintaining the confidentiality of all login credentials and for all activities that occur under your account. You must contact Anseru promptly if account credentials are lost, stolen, or disclosed to an unauthorised party.
            </p>

            <SubHeader>3.2 Compliance</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You are responsible for ensuring that all Service Data you transmit to Anseru complies with applicable laws, regulations, and third-party proprietary rights, including obtaining all necessary authorisations, notices, and consents. Anseru shall have no liability for claims arising from your failure to comply with this obligation. You must ensure that your use of the Services does not violate any applicable data protection, privacy, export control, or consumer protection laws.
            </p>

            <SubHeader>3.3 Restricted Data</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The Services are not designed to host, process, or store Sensitive Personal Information (as defined in Section 16). Both Customer and User are responsible for ensuring that any personal data uploaded to the Services is handled in compliance with applicable privacy laws. You represent that you have obtained all necessary notices, consents, and authority to upload any personal data into the Services.
            </p>

            <SubHeader>3.4 Prohibited Activity</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If Anseru notifies you that a specified activity poses a threat to the security, integrity, or availability of the Services, you must immediately cease that activity. Failure to do so may result in immediate suspension or termination of your account.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 4. Acceptable Use Policy — NEW SECTION */}
          <section id="acceptable-use" className="mb-16 scroll-mt-24">
            <SectionHeader>4. Acceptable Use Policy</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The following policy governs permitted and prohibited use of the Services. These examples are not exhaustive. You agree not to use, and not to encourage or allow any User to use, the Services in the following ways:
            </p>

            <SubHeader>4.1 Platform Misuse</SubHeader>
            <BulletList
              items={[
                "License, sublicense, sell, resell, rent, lease, transfer, assign, or distribute the Services to any third party.",
                "Modify, adapt, reverse engineer, decompile, or disassemble the Services or attempt to derive source code, underlying algorithms, or architecture.",
                "Attempt to bypass or circumvent any security mechanism of the Services, including features that prevent copying or enforce usage limitations.",
                "Access the Services through automated or non-human means, including bots, scripts, scrapers, or other data extraction tools, except as expressly permitted.",
                "Use the Services to build a similar or competitive product or service, or to engage in benchmarking or competitive analysis.",
                "Permit multiple end users to access the Services using shared login credentials.",
                "Frame, distribute, or resell access to the Services to any third party.",
              ]}
            />

            <SubHeader>4.2 Content Violations</SubHeader>
            <BulletList
              items={[
                "Use the Services to store or transmit Sensitive Personal Information in violation of applicable laws.",
                "Use the Services to store or transmit any content that infringes upon any person's intellectual property rights or is unlawful, racist, hateful, abusive, libellous, obscene, or discriminatory.",
                "Upload or transmit viruses, malware, trojan horses, time bombs, or any other harmful software.",
                "Submit false, misleading, defamatory, threatening, or offensive content.",
                "Engage in spamming, mass mailings, or other forms of unsolicited communications through the Services.",
                "Upload or transmit passive or active information collection mechanisms such as spyware, pixels, or tracking bugs without authorisation.",
              ]}
            />

            <SubHeader>4.3 Platform Disruption</SubHeader>
            <BulletList
              items={[
                "Interfere with or disrupt the integrity or performance of the Services or related networks or systems.",
                "Attempt to gain unauthorised access to the Services, related systems, accounts, or data.",
                "Use the Services in a manner inconsistent with any applicable laws or regulations.",
                "Harass, intimidate, or threaten Anseru employees, agents, or other users.",
                "Process any personal data through the Services without appropriate authorisation or for any purpose not covered by applicable consents.",
              ]}
            />

            <InfoBox>
              Violation of this Acceptable Use Policy may result in immediate suspension or termination of access, without notice or liability, even where a breach is committed unintentionally. Anseru's right to suspend or terminate applies where suspension is necessary to ensure compliance with laws, or to protect the rights, safety, security, or property of Anseru, its customers, or third parties.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 5. Intellectual Property Rights */}
          <section id="ip" className="mb-16 scroll-mt-24">
            <SectionHeader>5. Intellectual Property Rights</SectionHeader>

            <SubHeader>5.1 Services</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Except for the rights expressly granted under these Terms, all intellectual property rights in the Services — including patents, copyrights, trademarks, trade secrets, and know-how — belong exclusively to Anseru, its affiliates, and licensors. This includes all Updates, customisations, and improvements to the Services. All rights not expressly granted are reserved by Anseru.
            </p>

            <SubHeader>5.2 Service Data</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You retain ownership of all Service Data you provide to Anseru. You grant Anseru a royalty-free licence to use Service Data solely to provide, maintain, and improve the Services, address technical issues, and fulfil support requests, in accordance with these Terms. Anseru does not claim ownership over your Service Data or Content.
            </p>

            <SubHeader>5.3 User Content Licence</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You grant Anseru a worldwide, royalty-free licence to use, reproduce, distribute, modify, and otherwise process your Content solely for the limited purposes of providing the Services to you, as permitted by Anseru's Privacy Policy. This licence extends to trusted third-party sub-processors working on our behalf. You are responsible for ensuring that you have all rights and permissions necessary to use Content in connection with the Services. Anseru is not responsible for any actions you take with respect to Content you share.
            </p>

            <SubHeader>5.4 Content Review</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              To ensure compliance with legal obligations, Anseru may review Content submitted to the Services to determine whether it is unlawful or violates these Terms. Anseru may modify, restrict access to, delete, or decline to display Content believed to violate the law or these Terms. Anseru otherwise has no obligation to proactively monitor or review all submitted Content.
            </p>

            <SubHeader>5.5 Feedback</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Any suggestions, enhancement requests, recommendations, or other feedback you provide to Anseru shall become the sole property of Anseru. Anseru shall own all intellectual property rights in such feedback and may incorporate it into the Services or use it for any lawful purpose, without obligation or compensation to you. You hereby assign to Anseru all rights, title, and interest in any such feedback.
            </p>

            <SubHeader>5.6 Aggregated Data</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru may aggregate and anonymise data relating to the use and performance of the Services and use such data to develop and improve the Services and other offerings. Such aggregated data will not identify you or any individual and may be disclosed to third parties in anonymised format.
            </p>

            <SubHeader>5.7 Publicity</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Unless otherwise agreed in an Order Form, Anseru may identify you as a customer using your name, trademark, and logo on its website, social media, and marketing materials, in accordance with your branding guidelines if provided. Anseru will not use your marks in any other way without your prior written consent (email consent deemed sufficient).
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 6. Generative AI Usage — NEW SECTION */}
          <section id="generative-ai" className="mb-16 scroll-mt-24">
            <SectionHeader>6. Generative AI Usage</SectionHeader>

            <SubHeader>6.1 AI-Powered Features</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The Services incorporate Generative AI Technologies — artificial intelligence systems, including large language models, that generate text-based content based on inputs and training data. Anseru grants you a limited, revocable, non-exclusive, non-transferable, and non-sublicensable licence to use Generative AI Technologies within the Services during the Subscription Term, solely for the intended purposes described in the Documentation.
            </p>

            <SubHeader>6.2 AI Output Ownership</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              When you use Generative AI Technologies within the Services, you will receive output generated by those systems based on your Service Data ("Output"). As between you and Anseru, and to the extent permitted by applicable law, you own the Output. Output may be used for any lawful purpose, including commercial purposes and publication, at your own risk. It is recommended that you add a disclosure where appropriate indicating that Output was generated with the assistance of artificial intelligence tools.
            </p>

            <SubHeader>6.3 AI Limitations and User Responsibility</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You are solely responsible for the Service Data you submit through Generative AI features. Due to the nature of AI systems, Output may not be unique across users, and similar or identical Output may be generated for different users. Anseru does not warrant that Output will be accurate, complete, or suitable for any particular purpose.
            </p>
            <BulletList
              items={[
                "Always review and verify AI-generated Output before use, publication, or submission.",
                "Do not rely on Output as professional, legal, financial, or regulatory advice.",
                "Ensure that any Output you publish or share complies with applicable laws and does not infringe third-party rights.",
                "Anseru will not permit third-party sub-processors of Generative AI Technologies to use your Service Data to train their models without your consent.",
              ]}
            />

            <SubHeader>6.4 U.S. Government Rights</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              To the extent the Services are acquired by or on behalf of a U.S. government agency, the Services are "commercial items" as defined in Federal Acquisition Regulation (FAR) 2.101 and are subject to the terms of these Terms of Service in accordance with applicable FAR and DFARS provisions. This clause is in lieu of, and supersedes, any other clause addressing government rights in computer software or technical data under these Terms.
            </p>

            <InfoBox>
              AI-powered outputs and recommendations provided through the Services are intended as suggestions only. You are solely responsible for verifying outputs and ensuring compliance with any applicable standards, regulations, or requirements. Following AI recommendations does not constitute a guarantee of compliance with any such standards.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 7. Third-Party Services */}
          <section id="third-party" className="mb-16 scroll-mt-24">
            <SectionHeader>7. Third-Party Services</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The Services may enable integrations with third-party applications and services ("Third-Party Services"). Your use of Third-Party Services is subject to the terms and privacy policies of those third parties. Anseru is not responsible for your use of Third-Party Services or any data processed by them outside the Anseru platform. You should contact the relevant third-party service provider directly for any issues arising in connection with those services.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              By enabling integrations, you: (a) authorise Anseru to share Service Data (including Personal Data where necessary) with the relevant third-party providers to facilitate the integration; and (b) grant Anseru permission to allow those third-party services to access Service Data as required for interoperability. Anseru and third-party service providers are not processors or sub-processors of personal data with respect to each other.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru shall have access only to such Third-Party Services that you choose to integrate, and only to the extent authorised by you. Except as expressly authorised, Anseru will not attempt to access your accounts with third-party services.
            </p>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Our website or Services may include links to third-party websites. Trademarks displayed in connection with the Services are the property of their respective owners. Anseru is not responsible for content on third-party websites and does not represent that it has reviewed such sites.
            </p>
            <InfoBox>
              Anseru shall only be liable for your data while it is being transmitted through the Anseru platform. For issues arising from Third-Party Services, please contact the respective service provider directly.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 8. Charges & Payment */}
          <section id="charges" className="mb-16 scroll-mt-24">
            <SectionHeader>8. Charges & Payment</SectionHeader>

            <SubHeader>8.1 Subscription Charges</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              All charges associated with your use of the Services are set out in the applicable Order Form ("Subscription Charges"). Unless otherwise stated in the Order Form, Subscription Charges are due in full and payable in advance upon subscription. Anseru reserves the right to change prices at any time; changes will be communicated in advance and will take effect on renewal.
            </p>

            <SubHeader>8.2 Payment Terms</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Payment is due within thirty (30) days of receipt of Anseru's invoice, unless the Order Form specifies otherwise. We accept ACH/wire transfer and other methods as specified in the Order Form. All payments shall be in the currency stated in the Order Form. By subscribing to recurring Services, you authorise Anseru to charge your chosen payment method on a recurring basis without requiring prior approval for each charge, until you notify us of cancellation.
            </p>

            <SubHeader>8.3 Taxes</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Subscription Charges are exclusive of applicable taxes, levies, duties, GST, VAT, or similar governmental assessments. You are responsible for all such taxes unless Anseru is legally required to collect and remit them. We reserve the right to correct any pricing errors, even if payment has already been received.
            </p>

            <SubHeader>8.4 Late Payments</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If payment is not received by the due date, Anseru will notify you. If payment is not received within ten (10) days of such notice, Anseru may suspend or terminate your access to the Services, with at least five (5) days' prior written notice before doing so.
            </p>

            <SubHeader>8.5 Payment Disputes</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              If you reasonably dispute any portion of an invoice, you must notify Anseru in writing within seven (7) days of receipt of that invoice. Anseru will not exercise its late payment rights if you are disputing charges in good faith and cooperating diligently to resolve the dispute. You may withhold disputed amounts until resolved, but must still pay any undisputed amounts when due.
            </p>

            <SubHeader>8.6 Refunds and Cancellation</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Unless otherwise specified in these Terms or an Order Form, all Subscription Charges are non-refundable. You may cancel your subscription at any time by contacting us at legal@anseru.ai. Cancellation takes effect at the end of the current paid Subscription Term. If you are unsatisfied with the Services, please contact us at support@anseru.ai to discuss your concerns.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 9. Term, Termination & Suspension */}
          <section id="term-termination" className="mb-16 scroll-mt-24">
            <SectionHeader>9. Term, Termination & Suspension</SectionHeader>

            <SubHeader>9.1 Term and Renewal</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The Subscription Term is set out in your Order Form. Unless terminated, subscriptions automatically renew for an equivalent term at the then-current Subscription Charges. Anseru will notify you of renewal at least thirty (30) days before the current term expires.
            </p>

            <SubHeader>9.2 Termination for Breach</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Either party may terminate these Terms upon written notice if the other party materially breaches these Terms and the breach remains uncured for thirty (30) days after notice. Activities that threaten the security or integrity of the Services, or any payment breach, may result in immediate termination without a cure period.
            </p>

            <SubHeader>9.3 Termination for Insolvency</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Either party may terminate these Terms immediately upon notice if the other party becomes insolvent, makes an assignment for the benefit of creditors, or has a receiver or trustee appointed for substantially all of its property.
            </p>

            <SubHeader>9.4 Suspension of Access</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru may immediately suspend or deny access to all or part of the Services, without liability, if: (i) required to do so by law or court order; (ii) you have accessed or used the Services in violation of these Terms; (iii) you have been involved in fraudulent or unlawful activities relating to the Services; or (iv) your use threatens the security, integrity, or availability of the Services. Anseru will promptly restore access as soon as the applicable breach is cured or legal requirement is lifted.
            </p>

            <SubHeader>9.5 Effect of Termination</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Upon termination, your access to the Services will cease immediately. You remain liable for all Subscription Charges accrued prior to termination. Anseru will delete your Service Data within forty-five (45) days of termination unless legally prohibited. You may request data export within this period. Deleted data cannot be recovered. If your account is terminated, you are prohibited from registering a new account without Anseru's prior written consent.
            </p>

            <SubHeader>9.6 Surviving Provisions</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              The following sections shall survive any termination or expiry of these Terms: Section 5 (Intellectual Property Rights), Section 8 (Charges and Payment), Section 9.5 (Effect of Termination), Section 10 (Confidentiality and Data Privacy), Section 11 (Warranties and Disclaimers), Section 12 (Limitation of Liability), Section 13 (Indemnification), Section 14 (Governing Law and Jurisdiction), Section 15 (Miscellaneous), and Section 16 (Definitions).
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 10. Confidentiality & Data Privacy */}
          <section id="confidentiality" className="mb-16 scroll-mt-24">
            <SectionHeader>10. Confidentiality & Data Privacy</SectionHeader>

            <SubHeader>10.1 Confidential Information</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              "Confidential Information" means any information disclosed by one party to the other that is labelled confidential or that a reasonable person would consider confidential given the context. This includes Service Data, account credentials, business plans, financial information, product development details, trade secrets, and technical specifications. Confidential Information excludes information that is: (i) publicly known prior to disclosure; (ii) becomes publicly known without breach of confidentiality obligations; (iii) already in the receiving party's possession without confidentiality obligations; (iv) lawfully obtained from a third party without restriction; or (v) independently developed without reference to the disclosing party's information.
            </p>

            <SubHeader>10.2 Obligations</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Each party will protect the other's Confidential Information using at least the same care it applies to its own confidential information, and no less than reasonable care. Confidential Information may only be disclosed to employees or agents who have a need to know and are bound by confidentiality obligations. Where disclosure is required by law, the receiving party must provide the disclosing party with advance written notice (where legally permitted) and reasonable opportunity to seek a protective order before making such disclosure.
            </p>

            <SubHeader>10.3 Data Privacy & Security</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru will implement and maintain appropriate administrative, physical, and technical security measures to protect Service Data in accordance with its security policy. Anseru processes Personal Data as a data processor on your behalf, in accordance with India's Digital Personal Data Protection Act, 2023 (DPDPA), and where applicable, the GDPR and UK GDPR. Processing of personal data is further governed by the Data Processing Addendum incorporated into these Terms and available upon request at privacy@anseru.ai.
            </p>

            <InfoBox>
              For details on how Anseru collects, uses, and protects personal data, please refer to our{" "}
              <a href="https://anseru.ai/privacy" style={{ color: brand.blue }}>Privacy Policy</a>. Your use of the Services constitutes agreement to the Privacy Policy in addition to these Terms.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 11. Warranties & Disclaimers */}
          <section id="warranties" className="mb-16 scroll-mt-24">
            <SectionHeader>11. Warranties & Disclaimers</SectionHeader>

            <SubHeader>11.1 Anseru's Warranties</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              During the Subscription Term, Anseru warrants that: (a) it will not materially decrease the overall functionality of the Services; and (b) it will maintain accurate and appropriate security measures to protect Service Data as described in its security policy.
            </p>

            <SubHeader>11.2 Warranty Remedy Procedure</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You must notify Anseru of any non-conformance of the Services under a warranty within thirty (30) days of becoming aware of the issue. Upon timely notification, Anseru will use commercially reasonable efforts to correct the non-conformance at no additional charge. If Anseru is unable to correct the non-conforming Services within a reasonable period, you may elect to terminate the applicable Order Form and receive a pro-rated refund of any prepaid, unused Subscription Charges for the remainder of the Subscription Term. This shall be your sole and exclusive remedy for a breach of the warranties in Section 11.1.
            </p>

            <SubHeader>11.3 User Representations and Warranties</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">By using the Services, you represent and warrant that:</p>
            <BulletList
              items={[
                "You have the legal capacity to agree to these Terms and are not a minor in your jurisdiction of residence.",
                "All information you provide is true, accurate, current, and complete.",
                "Your use of the Services will not violate any applicable law, regulation, or third-party right.",
                "You will not use the Services for any illegal or unauthorised purpose.",
              ]}
            />

            <SubHeader>11.4 Disclaimer</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Except as expressly stated herein, the Services are provided "as is" and "as available" without warranties of any kind — express, implied, or statutory — including any implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Anseru does not warrant that the Services will be error-free, uninterrupted, or that AI-generated outputs will be accurate or suitable for your purposes. The Services may be subject to limitations, delays, and other problems inherent in internet and electronic communications. Anseru is not responsible for delays, delivery failures, or other damages resulting from such problems.
            </p>
            <InfoBox>
              AI-powered outputs and recommendations provided through the Services are intended as suggestions only. You are solely responsible for verifying outputs and ensuring compliance with any applicable standards or regulations.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 12. Limitation of Liability */}
          <section id="liability" className="mb-16 scroll-mt-24">
            <SectionHeader>12. Limitation of Liability</SectionHeader>

            <SubHeader>12.1 Exclusion of Certain Damages</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              To the maximum extent permitted by applicable law, neither party nor its affiliates will be liable for any indirect, incidental, special, consequential, punitive, cover, or exemplary damages — including lost profits, loss of data, loss of goodwill, business interruption, or personal injury — arising out of or related to these Terms, even if advised of the possibility of such damages, and regardless of the theory of liability.
            </p>

            <SubHeader>12.2 Liability Cap</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Except for amounts payable under a party's indemnification obligations under Section 13, the aggregate total liability of either party arising out of or related to these Terms shall not exceed the total Subscription Charges paid by you in the twelve (12) months preceding the event giving rise to the claim. This limitation applies whether an action is in contract or tort and regardless of the theory of liability, but shall not limit your payment obligations under Section 8.
            </p>

            <SubHeader>12.3 User Data</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru will maintain certain data you transmit for the purpose of managing the performance of the Services. Although Anseru performs regular backups, you are solely responsible for all data you transmit and any activity you undertake using the Services. You agree that Anseru shall have no liability for any loss or corruption of such data, and you waive any right of action against Anseru arising from any such loss or corruption.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 13. Indemnification */}
          <section id="indemnification" className="mb-16 scroll-mt-24">
            <SectionHeader>13. Indemnification</SectionHeader>

            <SubHeader>13.1 Indemnification by Anseru</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Anseru will defend you against any third-party claim alleging that the Services infringe that party's intellectual property rights, and will indemnify you from any resulting damages, attorney fees, and costs finally awarded, provided you: (a) give Anseru prompt written notice; (b) give Anseru sole control of the defence and settlement; and (c) provide all reasonable assistance at Anseru's expense. If Anseru receives notice of an infringement claim, it may at its discretion: (i) modify the Services to eliminate the claimed infringement; (ii) obtain a licence for your continued use; or (iii) terminate your account upon thirty (30) days' notice and refund any prepaid unused fees. This obligation does not apply to claims arising from your misuse of the Services, unauthorised modifications, or combination with third-party materials not provided by Anseru.
            </p>

            <SubHeader>13.2 Indemnification by You</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              You will defend Anseru and its affiliates, officers, agents, partners, and employees against any third-party claim arising from: (1) your use of the Services; (2) breach of these Terms or your representations and warranties; (3) your violation of any third-party right, including intellectual property rights; or (4) any harmful act toward another user. You will indemnify Anseru from any resulting damages, attorney fees, and costs, provided Anseru gives you prompt written notice and reasonable cooperation. Anseru reserves the right to assume exclusive defence of any matter for which you are required to indemnify Anseru.
            </p>

            <SubHeader>13.3 Sole Remedy</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              This Section 13 sets forth each party's sole liability and the other party's exclusive remedy with respect to third-party indemnification claims described herein.
            </p>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 14. Governing Law */}
          <section id="governing" className="mb-16 scroll-mt-24">
            <SectionHeader>14. Governing Law & Jurisdiction</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              These Terms are governed by the laws of India, including the Digital Personal Data Protection Act, 2023, and other applicable Indian laws. The courts of Hyderabad, India shall have exclusive jurisdiction over all disputes arising from these Terms, except as provided below for specific regions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { region: "EEA Customers", text: "Governed by the laws of Ireland; Commercial Courts in Dublin have exclusive jurisdiction." },
                { region: "UK Customers", text: "Governed by the laws of England and Wales; County Courts in London have exclusive jurisdiction." },
                { region: "GCC Region", text: "Governed by the laws of England and Wales; DIFC Courts have exclusive jurisdiction." },
                { region: "APAC Region", text: "Governed by the laws of Singapore; disputes resolved by binding arbitration under SIAC Rules." },
                { region: "US Customers", text: "Governed by the laws of California; courts in San Francisco have exclusive jurisdiction. Class action proceedings are waived; disputes resolved on an individual basis only." },
              ].map((item) => (
                <div
                  key={item.region}
                  className="rounded-lg p-5"
                  style={{ background: brand.gradientSubtle, border: `0.5px solid ${brand.gradientBorder}` }}
                >
                  <div
                    className="mb-1.5 text-[15px]"
                    style={{ color: "#201CAE" }}
                  >
                    {item.region}
                  </div>
                  <div className="text-[14px] text-gray-500 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>

            <SubHeader>14.1 Dispute Resolution</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Before initiating formal legal proceedings, the parties agree to first attempt to resolve any dispute informally for at least thirty (30) days through good-faith negotiation, commencing upon written notice from one party to the other. Where applicable, binding arbitration may be pursued after informal negotiation is exhausted, in accordance with the rules of the applicable arbitral body for the relevant jurisdiction. Disputes involving intellectual property rights, theft, piracy, invasion of privacy, or claims for injunctive relief are not subject to informal negotiation requirements.
            </p>

            <SubHeader>14.2 Class Action Waiver (US Customers)</SubHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-5">
              Where US law applies, all disputes shall be resolved on an individual basis only. Neither party may bring a claim in a class, consolidated, group, or representative action. Both parties waive any right to a jury trial. You have the right to opt out of the class action waiver by sending written notice to legal@anseru.ai within 30 days of accepting these Terms. If you elect to opt out, Anseru may, at its sole discretion, terminate your account and refund any prepaid unused fees.
            </p>

            <InfoBox>
              Where applicable, disputes will first be subject to informal negotiation for at least thirty (30) days before formal proceedings are commenced. Application of the United Nations Convention on Contracts for the International Sale of Goods (CISG) is excluded from these Terms where permitted.
            </InfoBox>
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 15. Miscellaneous */}
          <section id="miscellaneous" className="mb-16 scroll-mt-24">
            <SectionHeader>15. Miscellaneous</SectionHeader>
            <BulletList
              items={[
                "Entire Agreement: These Terms, together with all Order Forms, incorporated policies (including the Privacy Policy, Data Processing Addendum, and Acceptable Use Policy), constitute the entire agreement between the parties and supersede all prior agreements relating to the subject matter herein. In the event of a conflict between an Order Form and these Terms, the Order Form shall govern.",
                "Electronic Communications and Signatures: Visiting the Site, sending emails, and completing online forms constitute electronic communications. You consent to receive electronic communications and agree that all agreements, notices, and disclosures provided electronically satisfy any legal requirement for written communication. You agree to the use of electronic signatures, contracts, orders, and records.",
                "Assignment: Neither party may assign these Terms without the other's prior written consent, except to an affiliate or successor entity in connection with a merger, acquisition, or sale of substantially all assets. The assigning party shall promptly notify the other party of such assignment.",
                "Force Majeure: Neither party is liable for delays or failures caused by circumstances beyond their reasonable control, including acts of God, government actions, civil unrest, technical failures outside their control, or network failures, provided the affected party provides prompt notice and uses reasonable efforts to resume performance.",
                "Relationship: The parties are independent contractors. These Terms do not create a partnership, joint venture, agency, fiduciary, or employment relationship.",
                "Severability: If any provision of these Terms is found to be unlawful or unenforceable, that provision will be severed and the remaining provisions will remain in full force and effect.",
                "No Waiver: Failure of either party to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right. Waivers must be in writing to be effective and shall not constitute a waiver of any future breach.",
                "Notices: Notices may be sent by nationally recognised courier or by email to the addresses specified in the Order Form or as provided in these Terms. Email notices are deemed delivered immediately upon sending.",
                "Export Compliance: Each party represents that it is not on any government denied-party list. You will not permit access to the Services from a U.S.-embargoed country or region (including Cuba, Iran, North Korea, Syria, or Crimea) or in violation of any applicable export law or regulation.",
                "Anti-Bribery: Neither party has received or been offered any illegal or improper bribe, rebate, payoff, influence payment, kickback, or other thing of value from an employee or agent of the other party in connection with these Terms.",
                "Site Management: Anseru reserves the right to monitor the Services for violations of these Terms, take appropriate legal action against violators, restrict or disable content or access, and otherwise manage the Services to protect its rights and facilitate proper functioning.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 16. Definitions */}
          <section id="definitions" className="mb-16 scroll-mt-24">
            <SectionHeader>16. Definitions</SectionHeader>
            <BulletList
              items={[
                "Account: Any account or instance created by you or on your behalf to access and use the Services.",
                "Affiliate: An entity that controls, is controlled by, or is under common control with the subject entity (more than 50% voting interest).",
                "API: The application programming interfaces developed, enabled by, or licensed to Anseru that permit access to certain functionality within the Services.",
                "Beta Feature: A new feature or tool offered by Anseru on an experimental basis, without warranty of any kind, subject to modification or discontinuation at Anseru's discretion.",
                "Confidential Information: As defined in Section 10.1 above.",
                "Content: All electronic data, text, documents, files, materials, or other content submitted to the Services by you, including RFP documents, proposal responses, templates, and knowledge-base materials.",
                "Documentation: Written or electronic documentation specifying the functionalities of the Services provided or made available by Anseru.",
                "Generative AI Technologies: Artificial intelligence systems, including large language models, that can generate text-based content and other outputs based on user inputs and training data.",
                "Order Form: A service order form or statement of work executed by the parties specifying subscription details, Subscription Charges, payment terms, and Subscription Term.",
                "Output: Text-based or other content generated by Generative AI Technologies within the Services based on your Service Data.",
                "Personal Data: Data relating to a living individual who is or can be identified from the data, as defined under applicable data protection law.",
                "Sensitive Personal Information: Information relating to an individual's racial or ethnic origin, political opinions, religious or philosophical beliefs, health data, biometric data, genetic data, financial information, government IDs, criminal records, sexual orientation, or other categories deemed sensitive under applicable law.",
                "Service Data: All electronic data, text, messages, Personal Data, or other materials submitted to the Services by you through your account in connection with your use of the Services.",
                "Services: Anseru's AI-powered RFP and proposal automation platform, including all related features, APIs, software, Documentation, and services.",
                "Subscription Term: The period during which you have agreed to subscribe to the Services, as specified in the relevant Order Form.",
                "Third-Party Services: Third-party applications or services that integrate with the Services via APIs or other means.",
                "Updates: Enhancements, new features, patches, bug fixes, upgrades, or modifications to the Services deployed by Anseru from time to time.",
                "User: An individual designated to access and use the Services within a Customer's account, including administrators, agents, and collaborators.",
              ]}
            />
          </section>

          <hr className="border-gray-100 my-16" />

          {/* 17. Contact Us */}
          <section id="contact" className="mb-16 scroll-mt-24">
            <SectionHeader>17. Contact Us</SectionHeader>
            <p className="text-gray-600 text-[15.5px] leading-[1.8] mb-6">
              For any questions, concerns, complaints, or requests relating to these Terms, the Acceptable Use Policy, or the Services, please contact our legal team. We will respond to all inquiries within a reasonable timeframe.
            </p>
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: brand.gradientSubtle, border: `0.5px solid ${brand.gradientBorder}` }}
            >
              <div
                className="mb-1 text-[16px]"
                style={{ color: brand.blue }}
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
                    style={{ color: brand.blue }}
                  >
                    legal@anseru.ai
                  </a>
                </div>
                <div className="flex items-center text-[15px]">
                  <span className="text-gray-400 font-medium w-24">Support:</span>
                  <a
                    href="mailto:support@anseru.ai"
                    className="no-underline transition-opacity hover:opacity-75"
                    style={{ background: brand.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    support@anseru.ai
                  </a>
                </div>
                <div className="flex items-center text-[15px]">
                  <span className="text-gray-400 font-medium w-24">Website:</span>
                  <a
                    href="https://anseru.ai"
                    className="no-underline transition-opacity hover:opacity-75"
                    style={{ color: brand.blue }}
                  >
                    https://anseru.ai
                  </a>
                </div>
              </div>
            </div>

            {/* Footer gradient bar */}
            <div className="mt-16 h-px bg-gray-100" />
          </section>

        </main>
      </div>
    </div>
  );
}