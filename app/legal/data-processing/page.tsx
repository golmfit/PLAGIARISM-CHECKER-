import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function DataProcessingAgreementPage() {
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
              <h1 className="text-3xl font-bold mb-4">Data Processing Agreement</h1>
              <p className="text-muted-foreground">Last updated: January 15, 2025</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                This Data Processing Agreement ("DPA") forms part of the Terms of Service or other agreement between
                Visionfy ("Processor") and the Customer ("Controller") for the provision of Visionfy's services
                (collectively, the "Services"), which involves the processing of personal data subject to applicable
                data protection laws.
              </p>

              <h2>1. Definitions</h2>
              <p>
                The terms "Controller", "Processor", "Data Subject", "Personal Data", "Processing", "Personal Data
                Breach", and "Supervisory Authority" shall have the meanings given to them in applicable data protection
                laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act
                (CCPA), as applicable.
              </p>

              <h2>2. Scope and Purpose</h2>
              <p>
                This DPA applies to the Processing of Personal Data by Processor on behalf of Controller in connection
                with the provision of the Services. The purpose of the Processing is to provide the Services in
                accordance with the Terms of Service.
              </p>

              <h3>2.1 Categories of Data Subjects</h3>
              <p>The categories of Data Subjects whose Personal Data may be processed include:</p>
              <ul>
                <li>Controller's end users and customers</li>
                <li>Controller's employees, contractors, and agents</li>
                <li>Other individuals whose Personal Data is uploaded to the Services by Controller</li>
              </ul>

              <h3>2.2 Types of Personal Data</h3>
              <p>The types of Personal Data that may be processed include:</p>
              <ul>
                <li>Contact information (name, email address, etc.)</li>
                <li>Account credentials</li>
                <li>Usage data and analytics</li>
                <li>Content data (text prompts, generated images, etc.)</li>
                <li>Payment information</li>
                <li>Other Personal Data uploaded to the Services by Controller</li>
              </ul>

              <h2>3. Processor's Obligations</h2>

              <h3>3.1 Processing Instructions</h3>
              <p>
                Processor shall process Personal Data only on documented instructions from Controller, including with
                regard to transfers of Personal Data to a third country or an international organization, unless
                required to do so by applicable law; in such a case, Processor shall inform Controller of that legal
                requirement before processing, unless that law prohibits such information on important grounds of public
                interest.
              </p>

              <h3>3.2 Confidentiality</h3>
              <p>
                Processor shall ensure that persons authorized to process the Personal Data have committed themselves to
                confidentiality or are under an appropriate statutory obligation of confidentiality.
              </p>

              <h3>3.3 Security Measures</h3>
              <p>
                Processor shall implement appropriate technical and organizational measures to ensure a level of
                security appropriate to the risk, including:
              </p>
              <ul>
                <li>The pseudonymization and encryption of Personal Data where appropriate</li>
                <li>
                  The ability to ensure the ongoing confidentiality, integrity, availability, and resilience of
                  processing systems and services
                </li>
                <li>
                  The ability to restore the availability and access to Personal Data in a timely manner in the event of
                  a physical or technical incident
                </li>
                <li>
                  A process for regularly testing, assessing, and evaluating the effectiveness of technical and
                  organizational measures for ensuring the security of the processing
                </li>
              </ul>

              <h3>3.4 Sub-processors</h3>
              <p>
                Processor shall not engage another processor (a "Sub-processor") without prior specific or general
                written authorization of Controller. In the case of general written authorization, Processor shall
                inform Controller of any intended changes concerning the addition or replacement of Sub-processors,
                thereby giving Controller the opportunity to object to such changes.
              </p>
              <p>
                Where Processor engages a Sub-processor for carrying out specific processing activities on behalf of
                Controller, the same data protection obligations as set out in this DPA shall be imposed on that
                Sub-processor by way of a contract, providing sufficient guarantees to implement appropriate technical
                and organizational measures.
              </p>
              <p>
                A current list of Sub-processors is available upon request to{" "}
                <a href="mailto:privacy@visionfy.ai" className="text-primary hover:underline">
                  privacy@visionfy.ai
                </a>
                .
              </p>

              <h3>3.5 Data Subject Rights</h3>
              <p>
                Processor shall assist Controller by appropriate technical and organizational measures, insofar as this
                is possible, for the fulfillment of Controller's obligation to respond to requests for exercising the
                Data Subject's rights under applicable data protection laws.
              </p>

              <h3>3.6 Data Protection Impact Assessment</h3>
              <p>
                Processor shall assist Controller in ensuring compliance with the obligations regarding security of
                processing, notification of Personal Data Breaches, data protection impact assessments, and prior
                consultations with Supervisory Authorities, taking into account the nature of processing and the
                information available to Processor.
              </p>

              <h3>3.7 Personal Data Breach</h3>
              <p>
                Processor shall notify Controller without undue delay after becoming aware of a Personal Data Breach.
                Such notification shall:
              </p>
              <ul>
                <li>Describe the nature of the Personal Data Breach</li>
                <li>Communicate the name and contact details of the data protection officer or other contact point</li>
                <li>Describe the likely consequences of the Personal Data Breach</li>
                <li>Describe the measures taken or proposed to address the Personal Data Breach</li>
              </ul>

              <h3>3.8 Deletion or Return of Personal Data</h3>
              <p>
                At the choice of Controller, Processor shall delete or return all Personal Data to Controller after the
                end of the provision of Services relating to processing, and delete existing copies unless applicable
                law requires storage of the Personal Data.
              </p>

              <h3>3.9 Audit Rights</h3>
              <p>
                Processor shall make available to Controller all information necessary to demonstrate compliance with
                the obligations laid down in this DPA and allow for and contribute to audits, including inspections,
                conducted by Controller or another auditor mandated by Controller.
              </p>

              <h2>4. Controller's Obligations</h2>
              <p>Controller represents and warrants that:</p>
              <ul>
                <li>
                  It has provided notice to and obtained consent from Data Subjects for the Processing of their Personal
                  Data by Processor as required by applicable data protection laws
                </li>
                <li>
                  Its instructions to Processor regarding the Processing of Personal Data comply with applicable data
                  protection laws
                </li>
                <li>
                  It will not instruct Processor to Process Personal Data in violation of applicable data protection
                  laws
                </li>
              </ul>

              <h2>5. International Data Transfers</h2>
              <p>
                Processor may transfer Personal Data to countries outside the European Economic Area (EEA) or the
                country where Controller is located only if:
              </p>
              <ul>
                <li>
                  The transfer is to a country that has been determined by the European Commission or applicable
                  Supervisory Authority to provide an adequate level of protection for Personal Data
                </li>
                <li>
                  The transfer is subject to appropriate safeguards, such as Standard Contractual Clauses approved by
                  the European Commission
                </li>
                <li>
                  The transfer is necessary for the performance of a contract between Controller and the Data Subject
                </li>
                <li>The Data Subject has explicitly consented to the transfer</li>
                <li>The transfer is otherwise permitted under applicable data protection laws</li>
              </ul>

              <h2>6. Liability</h2>
              <p>
                Each party shall be liable to the other party for damages it causes by any breach of this DPA. Processor
                shall be liable to Controller for the damage caused by Processing only where it has not complied with
                obligations of applicable data protection laws specifically directed to processors or where it has acted
                outside or contrary to lawful instructions of Controller.
              </p>

              <h2>7. Term and Termination</h2>
              <p>
                This DPA shall remain in effect for as long as Processor processes Personal Data on behalf of Controller
                under the Terms of Service. Upon termination of the Terms of Service, this DPA shall automatically
                terminate.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                This DPA shall be governed by the laws specified in the Terms of Service, without regard to choice of
                law principles.
              </p>

              <h2>9. Modifications</h2>
              <p>
                This DPA may only be modified by a written amendment signed by both parties or by an updated version
                issued by Processor and accepted by Controller.
              </p>

              <h2>10. Contact Information</h2>
              <p>
                For any questions about this DPA, please contact us at{" "}
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
