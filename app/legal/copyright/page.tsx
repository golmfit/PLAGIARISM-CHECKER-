import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CopyrightPolicyPage() {
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
              <h1 className="text-3xl font-bold mb-4">Copyright Policy</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                This Copyright Policy explains how Visionfy addresses copyright issues on our platform, including how we
                handle copyright ownership of AI-generated images and respond to claims of copyright infringement.
              </p>

              <h2>1. Copyright Ownership of AI-Generated Images</h2>
              <p>
                The copyright status of AI-generated images is an evolving area of law. Visionfy's position on copyright
                ownership of images generated through our Services is as follows:
              </p>
              <ul>
                <li>
                  <strong>User-Generated Content:</strong> You retain ownership of the content you create, including the
                  text prompts you input into our system.
                </li>
                <li>
                  <strong>AI-Generated Images:</strong> Subject to the terms of your subscription plan, you are granted
                  rights to use the images generated through our Services for personal and/or commercial purposes.
                </li>
                <li>
                  <strong>Limitations:</strong> Your rights to use AI-generated images are subject to the restrictions
                  in our Terms of Service and Acceptable Use Policy.
                </li>
              </ul>
              <p>
                Please note that copyright laws regarding AI-generated content are still developing, and Visionfy's
                policies may change to reflect legal developments in this area.
              </p>

              <h2>2. Copyright Infringement and DMCA Notices</h2>
              <p>
                Visionfy respects the intellectual property rights of others and expects our users to do the same. We
                will respond to notices of alleged copyright infringement that comply with applicable law.
              </p>
              <p>
                If you believe that your copyrighted work has been copied in a way that constitutes copyright
                infringement, please provide us with the following information:
              </p>
              <ul>
                <li>
                  A physical or electronic signature of the copyright owner or a person authorized to act on their
                  behalf;
                </li>
                <li>Identification of the copyrighted work claimed to have been infringed;</li>
                <li>
                  Identification of the material that is claimed to be infringing or to be the subject of infringing
                  activity and that is to be removed or access to which is to be disabled, and information reasonably
                  sufficient to permit us to locate the material;
                </li>
                <li>
                  Your contact information, including your address, telephone number, and an email address at which you
                  can be contacted;
                </li>
                <li>
                  A statement by you that you have a good faith belief that use of the material in the manner complained
                  of is not authorized by the copyright owner, its agent, or the law; and
                </li>
                <li>
                  A statement that the information in the notification is accurate, and, under penalty of perjury, that
                  you are authorized to act on behalf of the copyright owner.
                </li>
              </ul>
              <p>
                We reserve the right to remove content alleged to be infringing without prior notice, at our sole
                discretion, and without liability to you. In appropriate circumstances, we will also terminate a user's
                account if they are determined to be a repeat infringer.
              </p>

              <h2>3. Counter-Notification</h2>
              <p>
                If you believe that your content was removed by mistake or misidentification, you can send us a
                counter-notification. Your counter-notification must include:
              </p>
              <ul>
                <li>Your physical or electronic signature;</li>
                <li>
                  Identification of the content that has been removed or to which access has been disabled and the
                  location at which the content appeared before it was removed or disabled;
                </li>
                <li>
                  A statement under penalty of perjury that you have a good faith belief that the content was removed or
                  disabled as a result of mistake or misidentification; and
                </li>
                <li>
                  Your name, address, telephone number, and email address, and a statement that you consent to the
                  jurisdiction of the federal court in San Francisco, California, and a statement that you will accept
                  service of process from the person who provided notification of the alleged infringement.
                </li>
              </ul>
              <p>
                If we receive a counter-notification, we may send a copy to the original complaining party informing
                them that we may restore the removed content or cease disabling it in 10 business days. Unless the
                copyright owner files an action seeking a court order against the content provider, the removed content
                may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the
                counter-notification, at our sole discretion.
              </p>

              <h2>4. Repeat Infringer Policy</h2>
              <p>
                In accordance with the Digital Millennium Copyright Act (DMCA) and other applicable law, Visionfy has
                adopted a policy of terminating, in appropriate circumstances and at our sole discretion, users who are
                deemed to be repeat infringers. We may also at our sole discretion limit access to the Services and/or
                terminate the accounts of any users who infringe any intellectual property rights of others, whether or
                not there is any repeat infringement.
              </p>

              <h2>5. Third-Party Content</h2>
              <p>
                Our AI models are trained on a diverse dataset of images. While we take steps to respect copyright, it
                is possible that AI-generated images may bear similarities to existing copyrighted works. Users are
                responsible for ensuring that their use of generated images does not infringe on third-party rights.
              </p>
              <p>
                If you believe an AI-generated image infringes on your copyright, please follow the DMCA notice
                procedure outlined above.
              </p>

              <h2>6. Trademark Policy</h2>
              <p>
                In addition to copyright protections, Visionfy also respects the trademark rights of others. Users may
                not use our Services to generate images that infringe upon the trademark rights of third parties.
              </p>
              <p>
                If you believe that your trademark is being infringed upon through our Services, please contact us at{" "}
                <a href="mailto:legal@visionfy.ai" className="text-primary hover:underline">
                  legal@visionfy.ai
                </a>
                .
              </p>

              <h2>7. Changes to This Policy</h2>
              <p>
                We may update this Copyright Policy from time to time. If we make material changes, we will notify you
                by email or through the Services prior to the changes becoming effective.
              </p>

              <h2>8. Contact Information</h2>
              <p>
                For copyright matters, including DMCA notices, please contact us at{" "}
                <a href="mailto:copyright@visionfy.ai" className="text-primary hover:underline">
                  copyright@visionfy.ai
                </a>
                .
              </p>
              <p>
                For all other legal inquiries, please contact us at{" "}
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
