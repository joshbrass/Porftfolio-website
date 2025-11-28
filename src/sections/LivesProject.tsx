import Salesunbox from "@/assets/images/salesunbox.png";
import SaleWeb from "@/assets/images/salesWeb.png";
import Radnon from "@/assets/images/radnon.png";
import HARDE from "@/assets/images/hardevers.png";
import Magent from "@/assets/images/magent.png";
import Comtrova from "@/assets/images/comtrova.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";

const portfolioProjects = [
  {
    company: "LIVE PROJECTS",
    year: "2024",
    title: "SalesUnbox Africa website",
    results: [
      {
        title:
          "Owned and delivered the full frontend implementation of SalesUnbox’s main website (Home, About, Features, Learn, Training, Blog)",
      },
      {
        title:
          "Built and integrated APIs to enable dynamic content loading, resulting in faster page-load improvements and richer user experience",
      },
      {
        title:
          "Designed responsive, SME-centric layouts and features in close collaboration with stakeholders",
      },
    ],
    link: "https://www.salesunbox.africa/",
    image: Salesunbox,
  },
  {
    company: "LIVE PROJECT",
    year: "2024",
    title: "SaleUnbox Web App",
    results: [
      {
        title:
          "Designed and implemented a secure authentication system for the SalesUnbox dashboard using JWT and protected routes",
      },
      {
        title:
          "Led API integration for core dashboard features, enabling real-time data syncing, analytics, and user management",
      },
      {
        title:
          "Architected efficient state and data flow management (React Query + Redux), significantly improving performance and scalability",
      },
    ],
    link: "https://www.app.salesunbox.africa/",
    image: SaleWeb,
  },
  {
    company: "LIVE Project",
    year: "2025",
    title: "Comtrova NG",
    results: [
      {
        title:
          "Developed comprehensive user web application and admin dashboard using React, TypeScript, and modern frontend frameworks",
      },
      {
        title:
          "Implemented secure authentication, role-based access control, and complex state management for multi-user platform",
      },
      {
        title:
          "Integrated backend APIs for inventory management, order processing, and business analytics dashboards",
      },
      {
        title:
          "Optimized application performance for smooth user experience across various devices and network conditions",
      },
    ],
    link: "https://comtrova.ng/",
    image: Comtrova,
  },
  {
    company: "LIVE PROJECTS",
    year: "2025",
    title: "Radnon Media",
    results: [
      {
        title:
          "Built responsive web interfaces for media content management and distribution using React and Next.js.",
      },
      {
        title:
          "Implemented content organization systems, media galleries, and interactive user engagement features",
      },
      {
        title:
          "Collaborated with backend team to integrate CMS functionality and optimize content delivery.",
      },
      {
        title:
          "Ensured cross-browser compatibility and mobile responsiveness for optimal user accessibility",
      },
    ],
    link: "https://www.radnonmedia.com/",
    image: Radnon,
  },
  {
    company: "LIVE PROJECTS",
    year: "2025",
    title: "Harde Businees School",
    results: [
      {
        title:
          "Built responsive Hardeverse LMS interfaces with React, TypeScript and Chakra UI for 35,000+ learners; improved client-side performance leading to a 20% faster page load.",
      },
      {
        title:
          "Implemented RESTful API integrations for course management and real-time progress tracking, reducing backend response times by 20%",
      },
      {
        title:
          "Collaborated on gamification features that increased course completion and engagement; supported platform reliability with proactive debugging to maintain 99% uptime.",
      },
      {
        title:
          "Ensured cross-browser compatibility and mobile responsiveness for optimal user accessibility",
      },
    ],
    link: "https://www.radnonmedia.com/",
    image: HARDE,
  },
  {
    company: "LIVE PROJECTS",
    year: "2025",
    title: "Magent",
    results: [
      {
        title:
          "Contributed to development of innovative AI-powered marketing assistant that transforms marketing data into actionable insights and personalized strategies",
      },
      {
        title:
          "Implemented responsive interfaces for marketing automation tools and Web3-native advertising features",
      },
      {
        title:
          "Collaborated with AI/ML team to integrate natural language processing capabilities for marketing content generation",
      },
      {
        title:
          "Ensured cross-browser compatibility and mobile responsiveness for optimal user accessibility",
      },
    ],
    link: "https://magent-fe.vercel.app/",
    image: Magent,
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
                top: `calc(64px + ${projectIndex * 40}px`,
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
