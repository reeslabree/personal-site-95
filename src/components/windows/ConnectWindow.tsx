import Link from "next/link";
import { Pixelmage } from "../Pixelmage";
import { BaseWindow, BaseWindowProps } from "./BaseWindow";
import { useWindow } from "@rees/hooks";

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

const WIDTH = 300;
const HEIGHT = 200;

export function ConnectWindow(props: Props) {
  const windowPosition = useWindow({
    initWidth: WIDTH,
    initHeight: HEIGHT,
    initTop: 100,
    initLeft: 300,
  });

  return (
    <BaseWindow
      {...props}
      {...windowPosition}
      title="Connect"
      iconPath="/icons/connect.png"
      minWidth={WIDTH}
      minHeight={HEIGHT}
    >
      <div className="w-full h-full grid grid-cols-2 items-center justify-center justify-items-center gap-4">
        <Link
          className="w-fit h-full flex flex-col items-center justify-center gap-2"
          href="https://github.com/reeslabree"
          target="_blank"
        >
          <h2 className="text-black text-xl font-bold">Github</h2>
          <Pixelmage
            src="/icons/github-logo.png"
            alt="Github"
            width={50}
            height={50}
          />
        </Link>
        <Link
          className="w-fit h-full flex flex-col items-center justify-center gap-2"
          href="https://www.linkedin.com/in/rees-labree-bb1566187/"
          target="_blank"
        >
          <h2 className="text-black text-xl font-bold">LinkedIn</h2>
          <Pixelmage
            src="/icons/linkedin-logo.png"
            alt="Linkedin"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </BaseWindow>
  );
}
