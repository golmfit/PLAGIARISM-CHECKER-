import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-4xl mx-auto">
        <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-8 md:p-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your creative process?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start with our free tier today and upgrade anytime as your needs grow.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/sign-up">
                <Button size="lg">Get Started for Free</Button>
              </Link>
              <Link href="#pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
