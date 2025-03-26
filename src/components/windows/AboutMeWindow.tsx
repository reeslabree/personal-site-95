import { useWindow } from "@rees/hooks";
import { BaseWindow, BaseWindowProps } from "./BaseWindow";
import Image from "next/image";
import { useState } from "react";

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

const WIDTH = 700;
const HEIGHT = 210;

export function AboutMeWindow(props: Props) {
  const windowPosition = useWindow({
    initWidth: WIDTH,
    initHeight: HEIGHT,
    initTop: 100,
    initLeft: 100,
  });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <BaseWindow
      {...props}
      {...windowPosition}
      title="About Me"
      iconPath="/icons/about-me.png"
      minHeight={HEIGHT}
      minWidth={WIDTH}
    >
      <div className="w-full grid grid-cols-[150px_1fr] gap-4">
        <div className="row-span-2">
          <Image
            src={isHovered ? "/portrait-highres.png" : "/portrait-pixel.jpg"}
            alt="portrait"
            width={150}
            height={150}
            className="mb-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <div>
          <h2 className="text-black text-xl font-bold mb-2">About Me</h2>
          <p className="text-black text-md">
            I&apos;m a software engineer who enjoys exploring different domains
            of programming, from web development to embedded systems. I spend a
            lot of time tinkering with CAD software and my 3D printer, always
            trying to design and create practical objects that solve real
            problems. When I&apos;m not on my computer, you&apos;ll find me
            skiing down mountains, hiking up them, or brewing beer in my free
            time.
          </p>
        </div>
      </div>
    </BaseWindow>
  );
}
