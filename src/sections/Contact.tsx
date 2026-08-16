import Reveal from "@/components/Reveal";
import { person } from "@/data/site";

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="scroll-mt-24 border-t border-[#1C222C] px-6 sm:px-8"
      >
        <div className="mx-auto max-w-5xl py-28 md:py-36">
          <Reveal>
            <div className="md:grid md:grid-cols-[7rem_1fr] md:gap-10">
              <p className="u-mono mb-6 text-[11px] uppercase tracking-[0.2em] text-[#7FA8C9] md:mb-0 md:pt-[0.8rem]">
                <span className="text-[#4E5B6B]">06</span>
                <span className="mx-2 text-[#2A3341]">/</span>
                Contact
              </p>

              <div>
                <h2 className="u-display max-w-2xl text-[clamp(2rem,5.5vw,3.4rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#E9ECF1]">
                  If you are building something that has to work,{" "}
                  <span className="italic text-[#7FA8C9]">lets talk.</span>
                </h2>

                <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-[#8B95A5]">
                  I read everything and reply within a day. A sentence about
                  what you are building is enough to start.
                </p>

                <a
                  href={`mailto:${person.email}`}
                  className="u-display mt-10 inline-block text-[clamp(1.15rem,3.5vw,1.9rem)] text-[#E9ECF1] transition-colors hover:text-[#7FA8C9]"
                >
                  <span className="draw-link">{person.email}</span>
                </a>

                <ul className="u-mono mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[12px] tracking-[0.08em]">
                  {person.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="draw-link text-[#8B95A5] transition-colors hover:text-[#E9ECF1]"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={person.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="draw-link text-[#8B95A5] transition-colors hover:text-[#E9ECF1]"
                    >
                      Résumé
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-[#1C222C] px-6 sm:px-8">
        <div className="u-mono mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 py-7 text-[11px] tracking-[0.1em] text-[#3A4552]">
          <span>
            © {new Date().getFullYear()} {person.name}
          </span>
          <span>
            Built in Lagos · Next.js · Newsreader &amp; IBM Plex
          </span>
        </div>
      </footer>
    </>
  );
}