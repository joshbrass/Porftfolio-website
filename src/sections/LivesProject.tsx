import Salesunbox from "@/assets/images/salesunbox.png";
import SaleWeb from "@/assets/images/salesWeb.png";
import RESQX from "@/assets/images/resqx.png";
import HOODLIFE from "@/assets/images/hoodlife.png";
import Fasion from "@/assets/images/fashion.png";
import Image from "next/image";
import CheckCircleIcon from '@/assets/icons/check-circle.svg'
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";

const portfolioProjects = [
  {
    company: "LIVE PROJECTS",
    year: "2024",
    title: "SalesUnbox Africa website",
    results: [
      { title: "Contributed to the development of key pages (Home, About,Features Learn Training, Blog) on the SalesUnbox website" },
      { title: " Integrated APIs for dynamic content display and enhanced the site's responsiveness and user experience" },
      { title: "  Collaborated on improving layouts and implementing features to support SMEs" },
    ],
    link: "https://www.salesunbox.africa/",
    image: Salesunbox,
  },
  {
    company: "LIVE PROJECT",
    year: "2024",
    title: "SaleUnbox Web App",
    results: [
      { title: "Worked on the authentication system for the SalesUnbox dashboard, ensuring secure user access." },
      { title: "Integrated APIs to implement key features on the dashboard, improving functionality and user experience" },
      { title: "Played a significant role in managing data flow and enhancing the overall efficiency of the platform." },
    ],
    link: "https://www.app.salesunbox.africa/",
    image: SaleWeb ,
  },
  {
    company: "LIVE Project",
    year: "2024",
    title: "RESQX",
    results: [
      { title: "Contributed to parts of the Home page, FAQs, and Blogs on the Resqx website." },
      { title: "Implemented smooth animations using Framer Motion, enhancing user interaction and visual appeal" },
      { title: "Played a key role in ensuring responsiveness and dynamic design elements across the site." },
    ],
    link: "https://resqx.net/",
    image: RESQX,
  },
  {
    company: "LIVE PROJECTS",
    year: "2024",
    title: "HOODHUB",
    results: [
      { title: "Contributed to the development of the HoodHub landing page, focusing on user experience and visual appeal." },
      { title: "Implemented animations to create a dynamic and engaging interface." },
      { title: " Ensured the page was responsive and high-performing, aligning with the brand's vision." },
    ],
    link: "https://www.hoodhub.life/",
    image: HOODLIFE,
  },
];

export const LivesProject = () => {
  return (
    <section className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real World Result"
          title="Live Projects Contributions"
          description="See how I Contributed to Live Projects"
        />

        <div className="flex flex-col mt-10 gap-20 md:mt-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="md:pt-12 md:px-10 lg:pt-16 lg:px-20 pb-0 px-8 pt-8 sticky"
              style={{
                top: `calc(64px + ${projectIndex * 40}px`
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div
                    className="
                      bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex
                      gap-2 font-bold uppercase
                      tracking-widest text-sm text-transparent bg-clip-text
                    "
                  >
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm md:text-base text-white/50"
                      >
                        <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.link}>
                    <button
                      className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl 
                      font-semibold inline-flex items-center justify-center gap-2 mt-8"
                    >
                      <span>View live site</span>
                      <ArrowUpRightIcon />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:h-full lg:absolute lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
