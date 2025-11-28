import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
import { gridItems } from "../../data";

const Grid = () => {
  return (
    <section id="about" className="relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/5 to-transparent pointer-events-none" />
      
      {/* Container with better spacing and max width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 py-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Discover my skills, tech stack, and what I bring to the table
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="pb-20">
          {gridItems.map(({
            id,
            title,
            description,
            className,
            img,
            imgClassName,
            titleClassName,
            spareImg
          }) => (
            <BentoGridItem
              id={id}
              key={id}
              title={title}
              description={description}
              className={className}
              img={img}
              imgClassName={imgClassName}
              titleClassName={titleClassName}
              spareImg={spareImg}
            />
          ))}
        </BentoGrid>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Grid;