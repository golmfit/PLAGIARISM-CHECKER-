import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] bg-pink-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container py-24">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link href="/legal" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Legal Documents
              </Link>
            </div>

            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                At Visionfy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our website, services, and applications (collectively, the
                "Services").
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, information we collect automatically when you
                use our Services, and information from third-party sources.
              </p>

              <h3>1.1 Information You Provide</h3>
              <p>We collect information you provide when you:</p>
              <ul>
                <li>Create an account (name, email address, password)</li>
                <li>Complete your profile (profile picture, biographical information)</li>
                <li>Subscribe to our Services (payment information, billing address)</li>
                <li>Contact customer support (communication content, contact information)</li>
                <li>Create content using our Services (text prompts, uploaded images)</li>
                <li>Participate in surveys, contests, or promotions</li>
              </ul>

              <h3>1.2 Information We Collect Automatically</h3>
              <p>When you use our Services, we automatically collect certain information, including:</p>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage information (pages visited, time spent, links clicked)</li>
                <li>Location information (general location based on IP address)</li>
                <li>Cookies and similar technologies (as described in our Cookie Policy)</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our Services</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Develop new products and services</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Train and improve our AI models (with your consent where required)</li>
              </ul>

              <h2>3. How We Share Your Information</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul>
                <li>With service providers who perform services on our behalf</li>
                <li>With business partners with whom we jointly offer products or services</li>
                <li>In connection with a business transaction (e.g., merger, acquisition, or sale of assets)</li>
                <li>To comply with legal obligations or protect rights</li>
                <li>With your consent or at your direction</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>

              <h2>4. AI Training and Content Generation</h2>
              <p>When you use our Services to generate images:</p>
              <ul>
                <li>We collect and store the text prompts you provide</li>
                <li>We generate and store the resulting images</li>
                <li>We may use this data to improve our AI models and Services</li>
              </ul>
              <p>You can opt out of having your data used for AI training by contacting us at privacy@visionfy.ai.</p>

              <h2>5. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>Access: You can request a copy of the personal information we hold about you</li>
                <li>Correction: You can request that we correct inaccurate or incomplete information</li>
                <li>Deletion: You can request that we delete your personal information</li>
                <li>Restriction: You can request that we restrict the processing of your information</li>
                <li>Portability: You can request a copy of your information in a structured, commonly used format</li>
                <li>Objection: You can object to our processing of your information</li>
              </ul>
              <p>To exercise these rights, please contact us at privacy@visionfy.ai.</p>

              <h2>6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, disclosure, alteration, and destruction. However, no method of transmission
                over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>

              <h2>7. International Data Transfers</h2>
              <p>
                We may transfer your personal information to countries other than the one in which you live. We rely on
                legally-provided mechanisms to lawfully transfer data across borders, such as Standard Contractual
                Clauses approved by the European Commission.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                Our Services are not directed to children under 16. We do not knowingly collect personal information
                from children under 16. If we learn we have collected personal information from a child under 16, we
                will delete this information.
              </p>

              <h2>9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
                email or through the Services prior to the changes becoming effective.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@visionfy.ai" className="text-primary hover:underline">
                  privacy@visionfy.ai
                </a>
                .
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
