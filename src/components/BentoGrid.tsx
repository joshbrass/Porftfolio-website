'use client';

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "react-lottie";
import animationData from "../../data/confetti.json";
import { BackgroundGradientAnimation } from "./GradientBg";
import GlobeDemo from "./GridGlobe";
import { cn } from "../../lib/utils";
import MagicButton from "./MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // Updated grid configuration for better alignment
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["Tailwind", "NextJS", "Mongo-Db"];
  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "joshuaomeonu@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/[0.1] group hover:shadow-xl transition duration-200 shadow-input dark:shadow-none flex flex-col",
        "h-full", // Ensure the grid item takes full height
        className
      )}
      style={{
        background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Wrapper with Flexbox to distribute space vertically */}
      <div className="flex flex-col h-full">
        {/* Image Containers */}
        <div className="relative flex-grow">
          {/* Main Image */}
          {img && (
            <div className="absolute inset-0">
              <img
                src={img}
                alt={img}
                className={cn(imgClassName, "object-cover w-full h-full")}
              />
            </div>
          )}

          {/* Spare Image */}
          {spareImg && (
            <div className={`absolute right-0 -bottom-5 ${id === 5 ? "w-full opacity-80" : ""}`}>
              <img
                src={spareImg}
                alt={spareImg}
                className="object-cover object-center w-full h-full"
              />
            </div>
          )}

          {/* Background Animation for id === 6 */}
          {id === 6 && (
            <BackgroundGradientAnimation>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold px-4 text-3xl md:text-4xl lg:text-7xl"></div>
            </BackgroundGradientAnimation>
          )}
        </div>

        {/* Content Area */}
        <div
          className={cn(
            titleClassName,
            "relative flex flex-col justify-between flex-grow p-5 lg:p-10"
          )}
        >
          {/* Description and Title */}
          <div>
            {/* Description */}
            <div className="font-sans font-extralight text-sm md:text-xs lg:text-base text-[#C1C2D3] z-10">
              {description}
            </div>

            {/* Title */}
            <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
              {title}
            </div>
          </div>

          {/* Conditional Components */}
          <div className="mt-4">
            {/* GlobeDemo for id === 2 */}
            {id === 2 && <GlobeDemo />}

            {/* Tech stack list for id === 3 */}
            {id === 3 && (
              <div className="flex gap-1 lg:gap-5 w-fit mx-auto lg:mx-0">
                {/* Left List */}
                <div className="flex flex-col gap-3 lg:gap-8">
                  {leftLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Right List */}
                <div className="flex flex-col gap-3 lg:gap-8">
                  {rightLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Copy Email Button for id === 6 */}
          {id === 6 && (
            <div className="mt-5 relative flex items-center justify-center">
              {/* Lottie Animation */}
              {copied && (
                <div className="absolute -top-10 right-0">
                  <Lottie options={defaultOptions} height={100} width={100} />
                </div>
              )}

              {/* Magic Button */}
              <MagicButton
                title={copied ? "Email Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
