import Reveal from "@/components/Reveal";
import DrawRule from "@/components/motion/DrawRule";
import SplitHeading from "@/components/motion/SplitHeading";


type Props = {
  id: string;
  /** Chapter number — the page reads top-to-bottom as a sequence. */
  index: string;
  label: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
};

/**
 * Every section shares one grid: a ~7rem left gutter for mono annotations
 * (the drawing-callout rail) and a single measure of content beside it.
 * Keeping this constant is what makes the page feel drafted rather than
 * assembled.
 */
export default function Section({
  id,
  index,
  label,
  title,
  lede,
  children,
}: Props) {
  return (
    <section
      id={id}
      className="relative scroll-mt-24 px-6 sm:px-8"
    >
      <DrawRule className="absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-5xl py-24 md:py-32">
        <header className="md:grid md:grid-cols-[7rem_1fr] md:gap-10">
          <Reveal>
            <p className="u-mono mb-4 text-[11px] uppercase tracking-[0.2em] text-[#7FA8C9] md:mb-0 md:pt-[0.6rem]">
              <span className="text-[#4E5B6B]">{index}</span>
              <span className="mx-2 text-[#2A3341]">/</span>
              {label}
            </p>
          </Reveal>
          <div>
            <SplitHeading className="u-display text-[2.1rem] font-normal leading-[1.1] tracking-[-0.015em] text-[#E9ECF1] sm:text-5xl">
              {title}
            </SplitHeading>
            {lede && (
              <Reveal delay={250}>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#8B95A5]">
                  {lede}
                </p>
              </Reveal>
            )}
          </div>
        </header>

        <div className="mt-14 md:mt-20 md:grid md:grid-cols-[7rem_1fr] md:gap-10">
          <div aria-hidden />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}