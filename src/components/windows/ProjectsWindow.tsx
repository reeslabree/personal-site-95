import { useWindow } from "@rees/hooks";
import { BaseWindow, BaseWindowProps } from "./BaseWindow";
import { useEffect, useState } from "react";
import { KEY_DOWN } from "@rees/constants";
import Link from "next/link";

interface Props
  extends Omit<
    BaseWindowProps,
    | "children"
    | "title"
    | "iconPath"
    | "minWidth"
    | "minHeight"
    | "width"
    | "height"
    | "top"
    | "left"
    | "setWidth"
    | "setHeight"
    | "setTop"
    | "setLeft"
  > {}

type Project = "fora" | "puppy" | "reeslabree" | "arduino-guitar-hero";

const WIDTH = 700;
const HEIGHT = 500;

interface ProjectDisplayProps {
  title: string;
  subtitle: string;
  techStack: string[];
  descriptionParagraphs: React.ReactNode[];
}

function ProjectDisplay({
  title,
  subtitle,
  techStack,
  descriptionParagraphs,
}: ProjectDisplayProps) {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full flex flex-col">
        <h2 className="font-bold text-lg">{title}</h2>
        <h3 className="italic">{subtitle}</h3>
      </div>
      <div className="relative border border-black p-4 mt-2">
        <span className="absolute -top-3 left-2 bg-dialogue px-1">
          Tech Stack
        </span>
        <div className="flex gap-4 flex-wrap">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
      {descriptionParagraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export function ProjectsWindow(props: Props) {
  const windowPosition = useWindow({
    initWidth: WIDTH,
    initHeight: HEIGHT,
    initTop: 100,
    initLeft: 400,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      console.log(key);
      switch (key) {
        case "f":
          setSelectedProject("fora");
          break;
        case "p":
          setSelectedProject("puppy");
          break;
        case "r":
          setSelectedProject("reeslabree");
          break;
        case "a":
          setSelectedProject("arduino-guitar-hero");
          break;
      }
    };

    window.addEventListener(KEY_DOWN, handleKeyPress);
    return () => window.removeEventListener(KEY_DOWN, handleKeyPress);
  }, []);

  return (
    <BaseWindow
      {...props}
      {...windowPosition}
      title="Projects"
      iconPath="/icons/projects.png"
      minWidth={Math.round(WIDTH * 0.5)}
      minHeight={Math.round(HEIGHT * 0.5)}
      allowResize
      triggerResize={[selectedProject]}
    >
      <div className="w-full h-full flex flex-col gap-2">
        <div className="w-full border-b border-white">
          <div className="w-full flex gap-4 pb-1 border-b border-dark-gray">
            <button
              className="cursor-pointer"
              onClick={() => {
                setSelectedProject("fora");
              }}
            >
              <span>
                <u>F</u>ora
              </span>
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                setSelectedProject("puppy");
              }}
            >
              <span>
                <u>P</u>UPpy
              </span>
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                setSelectedProject("reeslabree");
              }}
            >
              <span>
                <u>r</u>eeslabree.com
              </span>
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                setSelectedProject("arduino-guitar-hero");
              }}
            >
              <span>
                <u>A</u>rduino/Guitar Hero
              </span>
            </button>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-2">
          {selectedProject === "fora" && (
            <ProjectDisplay
              title="Fora"
              subtitle="A social media network built on the Solana blockchain."
              techStack={["Rust", "AnchorLang", "Next.js", "Typescript"]}
              descriptionParagraphs={[
                "Personal passion project in collaboration with my friend. We've built Fora over the course of about 6 months, concurrently with my capstone project. I became increasingly interested in blockchain technology towards the end of my tenure as a student, and this project was a great way to explore the technology.",
                "We built an uncensorable social media network on the Solana and Arweave blockchains. Solana programs written in Rust using the Anchor Lang wrapper, Arweave contracts and API written in Typescript, frontend built with React.",
                "My contributions are across the entire stack, but mostly on the backend of the application. Since Solana programming is relatively new, there isn't much documentation or Stack Overflow reference, and as such this project has been a great exercise in independent research and discovery.",
                "This project was submitted to the Solana Riptide hackathon, and won the Arweave Open Web Foundry 6 hackathon.",
              ]}
            />
          )}
          {selectedProject === "puppy" && (
            <ProjectDisplay
              title="PUPpy"
              subtitle="A pay-per-use platform built on the Ethereum blockchain."
              techStack={[
                "Solidity",
                "Next.js",
                "Typescript",
                "Rust",
                "Truffle",
                "AWS Lambda",
              ]}
              descriptionParagraphs={[
                "For my senior capstone project, my team built a full-stack web application to implement pay-per-use functionality for Festo machines using the Ethereum blockchain. Backend written in Rust, Ethereum contracts written in Solidity, Hosted on AWS.",
                "We implemented Agile project management to expedite development process.",
                "Over the duration of my capstone project, I developed a full-stack pay-per-use platform for Festo machines leveraging Ethereum blockchain technology. The system combines Rust-based AWS Lambda functions with Solidity smart contracts to track machine usage through MQTT packets and handle payments. Working alongside DZ Bank's development team, we implemented a payment solution that enables users to pay for services in Euros through traditional bank transfers.",
                "After graduating, I was fortunate enough to be offered a contract for Festo continuing development on the project. Over the course of the contract I expanded the front end to include customized dashboards for system administrators, machine builders and machine users. I also rebuilt the IoT device on Rust to optimize performance and maintain company standards. Along side all of this were regular maintenance and upgrades for the supporting smart contracts.",
              ]}
            />
          )}
          {selectedProject === "reeslabree" && (
            <ProjectDisplay
              title="reeslabree.com"
              subtitle="My personal website"
              techStack={["Typescript", "Next.js", "Tailwind CSS"]}
              descriptionParagraphs={[
                <p key="1">
                  This website represents my journey in web development over the
                  past two years. What started as a basic Next.js application
                  has evolved through multiple iterations, reflecting my growing
                  understanding of modern web development practices.
                </p>,
                <p key="2">
                  Looking back at the original version (codebase available at{" "}
                  <Link
                    className="text-blue-700 underline"
                    href="https://github.com/reeslabree/mysite"
                    target="_blank"
                  >
                    github.com/reeslabree/mysite
                  </Link>
                  ), I&apos;m amazed at how much my React knowledge and coding
                  practices have improved. The adoption of more sophisticated
                  state management and component architecture mirrors my growth
                  as a developer.
                </p>,
                <p key="3">
                  The current iteration is a nostalgic tribute to Windows 95,
                  the operating system that introduced me to computers. This
                  redesign challenged me to recreate the iconic UI elements
                  while maintaining modern development practices and responsive
                  design principles. The current codebase can be found at{" "}
                  <Link
                    className="text-blue-700 underline"
                    href="https://github.com/reeslabree/personal-site-95"
                    target="_blank"
                  >
                    github.com/reeslabree/personal-site-95
                  </Link>
                  .
                </p>,
                <p key="4">
                  While the site serves as a platform for sharing blog posts and
                  project updates, it&apos;s also become a playground for
                  experimenting with new technologies and design patterns. Each
                  update represents another step in my ongoing journey as a
                  developer.
                </p>,
              ]}
            />
          )}
          {selectedProject === "arduino-guitar-hero" && (
            <ProjectDisplay
              title="Arduino Guitar-Hero Guitar"
              subtitle="The Quintessential Covid Project"
              techStack={["Arduino", "Circuits"]}
              descriptionParagraphs={[
                "Over the first few months of the Covid lockdowns, I discovered the game CloneHero, an open source build of Guitar Hero for PC. I enjoyed playing it on my computer using the keyboard, but naturally I felt like I needed to have a native guitar hero controller to really enjoy it.",
                "There was one main problem, however, that guitars built for the PC were expensive and rare to find. On the other hand, Goodwill was selling Playstation 3 wireless guitars for only a couple bucks, and Amazon sold Arduino Leonardos at 3 for $10.",
                "One day I'll try to throw up my circuit diagram and code snippet (although the code for turning a button press into a game controller event isn't particularly complicated). For now, I'll leave this project summary be, and spend some time mastering the Van Halen's Panama guitar solo on expert mode.",
              ]}
            />
          )}
          {selectedProject === null && (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <h2 className="font-semibold">
                Select a project from the top row
              </h2>
              <p className="text-center">
                You can also press the corresponding letter on your keyboard to
                select a project
              </p>
            </div>
          )}
        </div>
      </div>
    </BaseWindow>
  );
}
