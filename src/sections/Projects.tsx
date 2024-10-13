import AppleCone from "@/assets/images/apple-clone.png";
import lElicheHealth from "@/assets/images/health-care.png";
import TODOAPP from "@/assets/images/todoApp.png";
import CRUD from "@/assets/images/crud.png";
import Fasion from "@/assets/images/fashion.png";
import Image from "next/image";
import CheckCircleIcon from '@/assets/icons/check-circle.svg'
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg'
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";

const portfolioProjects = [
  {
    company: "Personal Work",
    year: "2024",
    title: "Apple clone landing Page",
    results: [
      { title: "Developed an iPhone 15 landing page clone inspired by Apple's website using React and Framer Motion" },
      { title: "The project features responsive design and smooth animations, enhancing user interaction across devices" },
      { title: " It showcases modern web development practices with a focus on creating a visually engaging and dynamic experience" },
    ],
    link: "https://moonlit-cactus-427d09.netlify.app/",
    image: AppleCone,
  },
  {
    company: "Personal Work",
    year: "2024",
    title: "Eliche HealthCare System",
    results: [
      { title: "Developed a full-stack healthcare application using Next.js, TypeScript, and Appwrite" },
      { title: "The platform requires users to log in or create an account before booking appointments with doctors" },
      { title: "It features secure authentication, responsive design, and efficient data management for a seamless user experience." },
    ],
    link: "https://elichehealthcare.netlify.app/",
    image: lElicheHealth ,
  },
  {
    company: "Personal Project",
    year: "2023",
    title: "TODO APP",
    results: [
      { title: "Developed a task management app using React and TypeScript, allowing users to create, edit, and delete tasks." },
      { title: "The app features responsive design and local storage, ensuring task persistence across sessions." },
      { title: "It highlights skills in state management, front-end development, and data persistence." },
    ],
    link: "https://todo-app-nu-kohl.vercel.app/",
    image: TODOAPP,
  },
  {
    company: "Personal Project",
    year: "2023",
    title: "Simple CRUD app",
    results: [
      { title: "Built a simple CRUD application using React and TypeScript, allowing users to manage a list of items." },
      { title: "TypeScript was implemented for type safety and improved code maintainability, enhancing error detection." },
      { title: "The project demonstrates core web development concepts such as state management, component-based architecture, and real-time updates." },
    ],
    link: "https://crud-practice-ten.vercel.app/",
    image: CRUD,
  },
  {
    company: "Personal Project",
    year: "2023",
    title: "ELICHE Fashion Landing Page",
    results: [
      { title: "Developed a responsive fashion landing page using React, CSS." },
      { title: "The project features a modern UI with smooth navigation and interactive elements for an enhanced user experience." },
      { title: "It was deployed on Vercel, demonstrating strong front-end development skills and optimization for performance." },
    ],
    link: "https://eliche-fashion.vercel.app/",
    image: Fasion,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16 lg:py-24" id="projects">
      <div className="container">
        <SectionHeader
          eyebrow="Real World Result"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences"
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
