import {
  StartBar,
  DesktopIcon,
  WelcomeWindow,
  AboutMeWindow,
  ProjectsWindow,
  ConnectWindow,
  BlogWindow,
} from "@rees/components";
import { Application } from "@rees/types";
import { useState } from "react";

export default function Home() {
  const [openApplications, setOpenApplications] = useState<Application[]>([
    "welcome",
  ]);
  const [runningApplications, setRunningApplications] = useState<Application[]>(
    ["welcome"]
  );
  const [focusedWindow, setFocusedWindow] = useState<Application | null>(
    "welcome"
  );

  const handleFocus = (application: Application) => {
    setFocusedWindow(application);
  };

  const handleMinimize = (application: Application) => {
    setOpenApplications((prev) => prev.filter((app) => app !== application));
  };

  const handleClose = (application: Application) => {
    setRunningApplications((prev) => prev.filter((app) => app !== application));
    setOpenApplications((prev) => prev.filter((app) => app !== application));
  };

  const handleOpen = (application: Application) => {
    if (!openApplications.includes(application))
      setOpenApplications((prev) => [...prev, application]);
    if (!runningApplications.includes(application))
      setRunningApplications((prev) => [...prev, application]);

    handleFocus(application);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 items-start">
      <div className="grid grid-cols-2 justify-items-start lg:flex lg:flex-col gap-6">
        <DesktopIcon
          imageSrc="/icons/welcome.png"
          title="Welcome"
          onClick={() => handleOpen("welcome")}
        />
        <DesktopIcon
          imageSrc="/icons/about-me.png"
          title="About Me"
          onClick={() => handleOpen("about-me")}
        />
        <DesktopIcon
          imageSrc="/icons/projects.png"
          title="Projects"
          onClick={() => handleOpen("projects")}
        />
        <DesktopIcon
          imageSrc="/icons/connect.png"
          title="Connect"
          onClick={() => handleOpen("connect")}
        />
        <DesktopIcon
          imageSrc="/icons/blog.png"
          title="Blog"
          onClick={() => handleOpen("blog")}
        />
      </div>
      {openApplications.map((application) => {
        if (application === "welcome") {
          return (
            <WelcomeWindow
              key={application}
              onMinimize={() => handleMinimize(application)}
              onClose={() => handleClose(application)}
              isFocused={focusedWindow === application}
              onFocus={() => handleFocus(application)}
            />
          );
        } else if (application === "about-me") {
          return (
            <AboutMeWindow
              key={application}
              onMinimize={() => handleMinimize(application)}
              onClose={() => handleClose(application)}
              isFocused={focusedWindow === application}
              onFocus={() => handleFocus(application)}
            />
          );
        } else if (application === "projects") {
          return (
            <ProjectsWindow
              key={application}
              onMinimize={() => handleMinimize(application)}
              onClose={() => handleClose(application)}
              isFocused={focusedWindow === application}
              onFocus={() => handleFocus(application)}
            />
          );
        } else if (application === "connect") {
          return (
            <ConnectWindow
              key={application}
              onMinimize={() => handleMinimize(application)}
              onClose={() => handleClose(application)}
              isFocused={focusedWindow === application}
              onFocus={() => handleFocus(application)}
            />
          );
        } else if (application === "blog") {
          return (
            <BlogWindow
              key={application}
              onMinimize={() => handleMinimize(application)}
              onClose={() => handleClose(application)}
              isFocused={focusedWindow === application}
              onFocus={() => handleFocus(application)}
            />
          );
        }
      })}
      <StartBar
        openApplications={openApplications}
        runningApplications={runningApplications}
        onApplicationClick={handleOpen}
      />
    </div>
  );
}
