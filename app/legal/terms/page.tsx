import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
              <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Welcome to Visionfy. These Terms of Service ("Terms") govern your access to and use of Visionfy's
                website, services, and applications (collectively, the "Services"). Please read these Terms carefully
                before using our Services.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you
                do not agree to these Terms, you may not access or use the Services.
              </p>

              <h2>2. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. If we make changes, we will provide notice of such changes, such
                as by sending an email notification, providing notice through the Services, or updating the "Last
                Updated" date at the beginning of these Terms. Your continued use of the Services following notification
                of changes will constitute your acceptance of such changes.
              </p>

              <h2>3. Account Registration</h2>
              <p>
                To use certain features of the Services, you may be required to register for an account. You agree to
                provide accurate, current, and complete information during the registration process and to update such
                information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your account credentials and for all activities that occur under
                your account. You agree to notify us immediately if you suspect any unauthorized access to your account
                or breach of security.
              </p>

              <h2>4. User Content</h2>
              <p>
                Our Services allow you to create, upload, store, and share content, including text prompts and generated
                images ("User Content"). You retain all rights in, and are solely responsible for, the User Content you
                create using our Services.
              </p>
              <p>By using our Services to generate images, you understand that:</p>
              <ul>
                <li>The AI models may generate content that resembles existing copyrighted works</li>
                <li>You are responsible for ensuring your use of generated images complies with applicable laws</li>
                <li>We do not claim ownership of AI-generated images, but we may use them to improve our Services</li>
              </ul>

              <h2>5. License Grant</h2>
              <p>
                You grant Visionfy a non-exclusive, transferable, sublicensable, worldwide, royalty-free license to use,
                copy, modify, create derivative works based on, distribute, publicly display, publicly perform, and
                otherwise use the User Content for the purposes of operating, developing, providing, and improving the
                Services.
              </p>

              <h2>6. Acceptable Use</h2>
              <p>You agree not to use the Services to:</p>
              <ul>
                <li>
                  Generate, upload, or share content that is illegal, harmful, threatening, abusive, harassing,
                  defamatory, vulgar, obscene, or otherwise objectionable
                </li>
                <li>
                  Generate, upload, or share content that infringes or violates any patent, trademark, trade secret,
                  copyright, or other intellectual property right of any party
                </li>
                <li>
                  Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a
                  person or entity
                </li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                <li>
                  Attempt to gain unauthorized access to the Services, other accounts, computer systems, or networks
                  connected to the Services
                </li>
              </ul>

              <h2>7. Subscription and Payments</h2>
              <p>
                Some of our Services are provided on a subscription basis. You agree to pay all fees charged to your
                account based on the pricing and billing terms presented to you at the time of purchase.
              </p>
              <p>
                Subscription fees are billed in advance on a monthly or annual basis. Your subscription will
                automatically renew unless you cancel it at least 24 hours before the end of the current billing period.
              </p>

              <h2>8. Termination</h2>
              <p>
                We may terminate or suspend your access to the Services immediately, without prior notice or liability,
                for any reason, including if you breach these Terms. Upon termination, your right to use the Services
                will immediately cease.
              </p>

              <h2>9. Disclaimer of Warranties</h2>
              <p>
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL VISIONFY, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS,
                DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO
                ACCESS OR USE THE SERVICES.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of the State of California, without respect to its conflict of
                laws principles. You agree to submit to the personal and exclusive jurisdiction of the courts located in
                San Francisco County, California.
              </p>

              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@visionfy.ai" className="text-primary hover:underline">
                  legal@visionfy.ai
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
