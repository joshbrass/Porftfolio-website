import { hero, person } from "@/data/site";

/**
 * Signature element: the title block.
 * Every engineering drawing carries one in the bottom-right corner —
 * name, part, scale, revision, date. Josh has a mechanical engineering
 * degree, so the page opens with his. It does the job a stats-and-gradient
 * hero normally does, but it says something true about him instead.
 */
function TitleBlock() {
  const rows: [string, React.ReactNode][] = [
    ["Name", person.name],
    ["Role", person.role],
    ["Base", `${person.base} · ${person.timezone}`],
    ["Shipping since", person.since],
    [
      "Status",
      <span key="s" className="inline-flex items-center gap-2">
        <span
          className={`inline-block h-[6px] w-[6px] shrink-0 rounded-full ${
            person.availability.open ? "bg-[#7FA8C9]" : "bg-[#4E5B6B]"
          }`}
        />
        <span className="leading-snug">{person.availability.label}</span>
      </span>,
    ],
  ];

  return (
    <dl className="u-mono w-full max-w-md border border-[#1C222C] text-[11px] leading-none">
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={`flex items-start gap-3 px-3.5 py-3 sm:items-center sm:gap-4 sm:px-4 ${
            i === 0 ? "" : "border-t border-[#1C222C]"
          }`}
        >
          <dt className="w-[5.75rem] shrink-0 uppercase tracking-[0.14em] text-[#4E5B6B] sm:w-[6.5rem]">
            {label}
          </dt>
          <dd className="min-w-0 text-[#C7CED8]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-16 pt-28 sm:px-8 sm:pb-12 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p
          className="u-mono rise mb-6 text-[10px] uppercase tracking-[0.24em] text-[#7FA8C9] sm:mb-8 sm:text-[11px]"
          style={{ animationDelay: "80ms" }}
        >
          {person.name} — {person.base}
        </p>

        <h1 className="u-display text-[clamp(2.25rem,8.5vw,5.5rem)] font-light leading-[1.05] tracking-[-0.028em] text-[#E9ECF1] sm:leading-[1.02]">
          {hero.headline.map((line, i) => (
            <span
              key={line}
              className="rise block"
              style={{ animationDelay: `${180 + i * 110}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>

        <div
          className="rise mt-8 grid gap-8 sm:mt-10 sm:gap-10 md:grid-cols-[1fr_auto] md:items-end"
          style={{ animationDelay: "580ms" }}
        >
          <div className="max-w-xl">
            <p className="text-[14.5px] leading-relaxed text-[#8B95A5] sm:text-[15px] sm:leading-relaxed md:text-base">
              {hero.intro}
            </p>
            <p className="u-mono mt-4 text-[11.5px] leading-relaxed text-[#7FA8C9] sm:mt-5 sm:text-[12px]">
              {hero.now}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3">
              <a
                href={`mailto:${person.email}`}
                className="u-mono rounded-sm bg-[#F5F2EC] px-3.5 py-2.5 text-[11.5px] tracking-[0.06em] text-[#0B0E13] transition-opacity hover:opacity-85 sm:px-4 sm:text-[12px]"
              >
                Start a conversation
              </a>
              <a
                href="#work"
                className="u-mono rounded-sm border border-[#2A3341] px-3.5 py-2.5 text-[11.5px] tracking-[0.06em] text-[#C7CED8] transition-colors hover:border-[#7FA8C9] hover:text-[#7FA8C9] sm:px-4 sm:text-[12px]"
              >
                See the work
              </a>
            </div>
          </div>

          <TitleBlock />
        </div>
      </div>

      <div
        className="rise pointer-events-none absolute inset-x-0 bottom-5 mx-auto max-w-5xl px-5 sm:bottom-6 sm:px-8"
        style={{ animationDelay: "900ms" }}
      >
        <span className="u-mono text-[10px] uppercase tracking-[0.28em] text-[#3A4552]">
          Scroll
        </span>
      </div>
    </section>
  );
}