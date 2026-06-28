import PageLayout from "@/components/PageLayout";
import { ReactNode } from "react";

const Doc = ({ title, children }: { title: string; children: ReactNode }) => (
  <PageLayout title={title}>
    <div className="container max-w-3xl prose prose-invert text-cosmic-silver/85 leading-relaxed">{children}</div>
  </PageLayout>
);

export const Privacy = () => (
  <Doc title="Privacy Policy">
    <p>Astro With Hrishi ("we", "us") respects your privacy. This policy explains how we collect and protect your personal information.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Information We Collect</h2>
    <p>Name, contact details, birth details (for astrology), and order/shipping information you voluntarily provide.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">How We Use It</h2>
    <p>To deliver consultations, ship products, send confirmations on WhatsApp, and improve our service. We never sell your data.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Storage & Security</h2>
    <p>Data is stored securely on encrypted servers. Access is restricted to authorised personnel only.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Your Rights</h2>
    <p>You may request data access, correction, or deletion any time by emailing hello@astrowithhrishi.com.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Cookies</h2>
    <p>We use minimal cookies for cart persistence and language preference only.</p>
    <p className="text-xs text-cosmic-silver/60 mt-8">Last updated: June 2026</p>
  </Doc>
);

export const Refund = () => (
  <Doc title="Refund Policy">
    <h2 className="text-gold font-display text-xl mb-2">Consultations</h2>
    <p>Once a consultation has been delivered (call, video, or report), it is non-refundable. If you wish to cancel before the scheduled time, please contact us at least 24 hours in advance for a full credit.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Physical Products (Gemstones, Malas, Yantras)</h2>
    <p>Unused, unopened products may be returned within 7 days of delivery. Return shipping is the buyer's responsibility. Refund is processed within 7 business days of receiving the returned item.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Digital Reports</h2>
    <p>PDF reports and digital downloads are non-refundable once delivered.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Process</h2>
    <p>To request a refund, WhatsApp us at +91 9558565655 with your order ID and reason.</p>
  </Doc>
);

export const Terms = () => (
  <Doc title="Terms & Conditions">
    <p>By using Astro With Hrishi, you agree to these terms.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Service Disclaimer</h2>
    <p>Astrological consultations are provided for guidance and spiritual purposes only. They are not a substitute for professional medical, legal, financial, or psychological advice.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Accuracy</h2>
    <p>Predictions depend on accurate birth details. We are not liable for outcomes based on incorrect information.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Payments</h2>
    <p>All orders are processed via WhatsApp confirmation. Prices are in INR unless stated otherwise.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Intellectual Property</h2>
    <p>All content — text, images, reports — is owned by Astro With Hrishi and protected by copyright.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Limitation of Liability</h2>
    <p>To the maximum extent permitted by law, we are not liable for any indirect or consequential damages arising from use of our services.</p>
    <h2 className="text-gold font-display text-xl mt-6 mb-2">Governing Law</h2>
    <p>These terms are governed by the laws of India. Jurisdiction lies with the courts of Vadodara, Gujarat.</p>
  </Doc>
);
