import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function AcceptableUsePage() {
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
              <h1 className="text-3xl font-bold mb-4">Acceptable Use Policy</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                This Acceptable Use Policy ("Policy") outlines the acceptable use of Visionfy's website, services, and
                applications (collectively, the "Services"). By using our Services, you agree to comply with this
                Policy.
              </p>

              <h2>1. Prohibited Content</h2>
              <p>You may not use our Services to generate, upload, or share content that:</p>
              <ul>
                <li>Is illegal or promotes illegal activities</li>
                <li>Is sexually explicit or pornographic</li>
                <li>Depicts minors in a sexual or suggestive context</li>
                <li>Is violent, graphic, or promotes violence or harm against individuals or groups</li>
                <li>Promotes discrimination, bigotry, racism, hatred, or harassment against any individual or group</li>
                <li>Is false, inaccurate, or misleading in a way that could cause harm</li>
                <li>Infringes or violates someone else's intellectual property rights</li>
                <li>Violates or attempts to violate someone's privacy or security</li>
                <li>Contains personal information or private data about others without their consent</li>
                <li>Impersonates another person or entity in a misleading or deceptive manner</li>
                <li>Promotes self-harm, suicide, eating disorders, or other harmful behaviors</li>
                <li>Contains malware, viruses, or other harmful code</li>
              </ul>

              <h2>2. Prohibited Uses</h2>
              <p>You may not use our Services to:</p>
              <ul>
                <li>Engage in any activity that violates any applicable law or regulation</li>
                <li>Manipulate identifiers to disguise the origin of content</li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                <li>
                  Attempt to gain unauthorized access to the Services, other accounts, computer systems, or networks
                </li>
                <li>Collect or harvest data about other users without their consent</li>
                <li>Use the Services for any commercial purpose not expressly permitted by Visionfy</li>
                <li>Generate deepfakes or other synthetic media that could be used to deceive others</li>
                <li>Create images of public figures for commercial or defamatory purposes</li>
                <li>
                  Automate the use of the Services in a way that could degrade the quality of experience for other users
                </li>
              </ul>

              <h2>3. AI-Generated Content Guidelines</h2>
              <p>When using our AI image generation features:</p>
              <ul>
                <li>
                  Do not attempt to circumvent our content filters by using code words, misspellings, or other
                  techniques
                </li>
                <li>Do not use prompts designed to generate content that violates this Policy</li>
                <li>Be mindful of potential copyright implications when creating derivative works</li>
                <li>Consider the ethical implications of the content you create</li>
                <li>Do not use generated images to spread misinformation or engage in deceptive practices</li>
              </ul>

              <h2>4. Commercial Use</h2>
              <p>
                Depending on your subscription plan, you may use images generated by our Services for commercial
                purposes, subject to the following conditions:
              </p>
              <ul>
                <li>You comply with all other aspects of this Policy</li>
                <li>You do not resell or redistribute the raw output of our AI models</li>
                <li>You do not use the generated images to compete directly with Visionfy</li>
                <li>You acknowledge that AI-generated images may inadvertently resemble existing copyrighted works</li>
              </ul>
              <p>Please refer to your subscription terms for specific commercial use rights.</p>

              <h2>5. Reporting Violations</h2>
              <p>
                If you become aware of content that violates this Policy, please report it to us at{" "}
                <a href="mailto:trust@visionfy.ai" className="text-primary hover:underline">
                  trust@visionfy.ai
                </a>
                . Please include:
              </p>
              <ul>
                <li>A description of the content</li>
                <li>Where you encountered it</li>
                <li>Why you believe it violates our Policy</li>
              </ul>

              <h2>6. Consequences of Violation</h2>
              <p>Violations of this Policy may result in:</p>
              <ul>
                <li>Removal of the violating content</li>
                <li>Temporary or permanent suspension of your account</li>
                <li>Termination of your subscription without refund</li>
                <li>Legal action, if appropriate</li>
              </ul>
              <p>
                We reserve the right to take any action we deem appropriate in response to violations of this Policy.
              </p>

              <h2>7. Changes to This Policy</h2>
              <p>
                We may update this Policy from time to time. If we make material changes, we will notify you by email or
                through the Services prior to the changes becoming effective. Your continued use of the Services after
                such notice constitutes your acceptance of the updated Policy.
              </p>

              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Acceptable Use Policy, please contact us at{" "}
                <a href="mailto:trust@visionfy.ai" className="text-primary hover:underline">
                  trust@visionfy.ai
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
