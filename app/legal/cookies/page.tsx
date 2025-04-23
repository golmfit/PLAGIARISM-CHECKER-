import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CookiePolicyPage() {
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
              <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                This Cookie Policy explains how Visionfy ("we", "us", or "our") uses cookies and similar technologies on
                our website and applications (collectively, the "Services"). It explains what these technologies are and
                why we use them, as well as your rights to control our use of them.
              </p>

              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website.
                They are widely used to make websites work more efficiently and provide information to the owners of the
                site. Cookies allow us to recognize your device and store information about your preferences or past
                actions.
              </p>

              <h2>2. Types of Cookies We Use</h2>
              <p>We use the following types of cookies:</p>

              <h3>2.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable basic functions like page
                navigation, secure areas of the website, and access to account features. The website cannot function
                properly without these cookies.
              </p>

              <h3>2.2 Performance and Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously. They help us improve the functionality and user experience of our website.
              </p>

              <h3>2.3 Functionality Cookies</h3>
              <p>
                These cookies enable the website to provide enhanced functionality and personalization. They may be set
                by us or by third-party providers whose services we have added to our pages.
              </p>

              <h3>2.4 Targeting and Advertising Cookies</h3>
              <p>
                These cookies are used to track visitors across websites. They are used to display ads that are relevant
                and engaging for the individual user and thereby more valuable for publishers and third-party
                advertisers.
              </p>

              <h2>3. Specific Cookies We Use</h2>
              <table className="border-collapse border border-border w-full my-4">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-2 text-left">Cookie Name</th>
                    <th className="border border-border p-2 text-left">Purpose</th>
                    <th className="border border-border p-2 text-left">Duration</th>
                    <th className="border border-border p-2 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-2">_session</td>
                    <td className="border border-border p-2">Maintains user session state</td>
                    <td className="border border-border p-2">Session</td>
                    <td className="border border-border p-2">Essential</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">_csrf</td>
                    <td className="border border-border p-2">Helps prevent cross-site request forgery attacks</td>
                    <td className="border border-border p-2">Session</td>
                    <td className="border border-border p-2">Essential</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">_ga</td>
                    <td className="border border-border p-2">Used by Google Analytics to distinguish users</td>
                    <td className="border border-border p-2">2 years</td>
                    <td className="border border-border p-2">Analytics</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">_gid</td>
                    <td className="border border-border p-2">Used by Google Analytics to distinguish users</td>
                    <td className="border border-border p-2">24 hours</td>
                    <td className="border border-border p-2">Analytics</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">_fbp</td>
                    <td className="border border-border p-2">Used by Facebook to deliver advertisements</td>
                    <td className="border border-border p-2">3 months</td>
                    <td className="border border-border p-2">Advertising</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-2">user_preferences</td>
                    <td className="border border-border p-2">Stores user preferences like theme and language</td>
                    <td className="border border-border p-2">1 year</td>
                    <td className="border border-border p-2">Functionality</td>
                  </tr>
                </tbody>
              </table>

              <h2>4. Similar Technologies We Use</h2>
              <p>In addition to cookies, we may use other similar technologies on our Services, including:</p>

              <h3>4.1 Web Beacons</h3>
              <p>
                Small graphic images (also known as "pixel tags" or "clear GIFs") that may be included on our Services,
                which typically work in conjunction with cookies to identify our users and user behavior.
              </p>

              <h3>4.2 Local Storage</h3>
              <p>
                We may use local storage technologies, like HTML5 localStorage and IndexedDB, that provide similar
                functionality to cookies but can store larger amounts of data on your device outside of your browser in
                connection with specific applications.
              </p>

              <h3>4.3 Session Replay Technologies</h3>
              <p>
                We may use session replay technologies to record your interactions with our Services to help us improve
                user experience and diagnose technical problems.
              </p>

              <h2>5. How to Control Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit
                the ability of websites to set cookies, you may worsen your overall user experience, since it will no
                longer be personalized to you. It may also stop you from saving customized settings like login
                information.
              </p>

              <h3>5.1 Browser Controls</h3>
              <p>
                Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary
                from browser to browser, and from version to version. You can obtain up-to-date information about
                blocking and deleting cookies via the support pages of your browser:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Safari
                  </a>
                </li>
              </ul>

              <h3>5.2 Cookie Preference Tool</h3>
              <p>
                We provide a cookie preference tool that allows you to customize your cookie settings. You can access
                this tool by clicking on "Cookie Settings" in the footer of our website.
              </p>

              <h3>5.3 Do Not Track</h3>
              <p>
                Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have
                your online activities tracked. These features are not yet uniform, so we are currently not set up to
                respond to such signals.
              </p>

              <h2>6. Updates to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or
                for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay
                informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated. If we make material
                changes to this policy, we will notify you through a notice on our website or by sending you an email.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please contact us at{" "}
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
