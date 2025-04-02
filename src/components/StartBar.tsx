import { Button } from "@rees/components";
import { Application } from "@rees/types";
import Image from "next/image";

interface Props {
  openApplications: Application[];
  runningApplications: Application[];
  onApplicationClick: (application: Application) => void;
}

export function StartBar({
  openApplications,
  runningApplications,
  onApplicationClick,
}: Props) {
  return (
    <div className="w-full gap-2 flex bg-dialogue p-1 border-t border-white border-inset absolute bottom-0 left-0">
      <Button className="text-2xl flex gap-2 px-2" onClick={() => {}}>
        <Image
          src="/icons/windows-logo-r.png"
          alt="Spoofed Windows Logo R"
          width={32}
          height={32}
          className="pr-[1px]"
        />
        <span>Start</span>
      </Button>
      <div className="w-1 border-r-2 border-b-2 border-dark-gray bg-white" />
      <div className="w-full flex gap-2 overflow-x-scroll">
        {runningApplications.map((application) => {
          const isOpen = openApplications.includes(application);
          let iconPath = "";
          let title = "";
          switch (application) {
            case "welcome":
              iconPath = "/icons/welcome.png";
              title = "Welcome";
              break;
            case "about-me":
              iconPath = "/icons/about-me.png";
              title = "About Me";
              break;
            case "projects":
              iconPath = "/icons/projects.png";
              title = "Projects";
              break;
            case "connect":
              iconPath = "/icons/connect.png";
              title = "Connect";
              break;
            case "blog":
              iconPath = "/icons/blog.png";
              title = "Blog";
              break;
            case "paint":
              iconPath = "/icons/paint.png";
              title = "Paint";
              break;
          }

          return (
            <Button
              key={application}
              className="lg:text-2xl font-normal flex gap-2 pr-1 lg:w-48 justify-start flex text-lg w-36"
              onClick={() => onApplicationClick(application)}
              isDisabled={isOpen}
            >
              <Image
                src={iconPath}
                alt={application}
                width={32}
                height={32}
                className="p-1"
              />
              <span>{title}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
