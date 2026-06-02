import { Container } from "@/components/layout/Container";

interface ContentPageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function ContentPageHero({ eyebrow, title, description }: ContentPageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-[120px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-0 h-[400px] w-[600px]"
          style={{
            background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>
      <Container>
        <div className="flex max-w-[620px] flex-col gap-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-25)]">
            {eyebrow}
          </span>
          <h1
            className="font-semibold leading-[1] tracking-[-0.04em] text-[var(--foreground)]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            {title}
          </h1>
          <p className="text-[16px] leading-relaxed text-[var(--fg-40)]">{description}</p>
        </div>
      </Container>
    </section>
  );
}
