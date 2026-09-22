import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center bg-background py-24">
      <Container size="narrow" className="text-center space-y-6">
        <span className="font-mono text-sm uppercase tracking-widest text-accent font-bold">
          404 · PAGE NOT FOUND
        </span>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink">
          The requested page doesn&apos;t exist.
        </h1>

        <p className="text-base text-muted max-w-md mx-auto leading-relaxed">
          The link you followed may have moved or been archived. Explore recent case studies or get in touch below.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Button href="/work" variant="primary" size="md">
            View Selected Work →
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Contact Aditya
          </Button>
        </div>
      </Container>
    </div>
  );
}
