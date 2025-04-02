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

const WIDTH = 475;
const HEIGHT = 225;

export function WelcomeWindow(props: Props) {
  const windowPosition = useWindow({
    initWidth: WIDTH,
    initHeight: HEIGHT,
    initTop: 250,
    initLeft: 525,
  });

  return (
    <BaseWindow
      {...props}
      {...windowPosition}
      title="Welcome"
      iconPath="/icons/welcome.png"
      minWidth={WIDTH}
      minHeight={HEIGHT}
    >
      <div className="w-full h-full flex flex-col items-start justify-start gap-4">
        <h2 className="text-black text-xl font-bold">
          Welcome to reeslabree.com
        </h2>
        <p className="text-black text-md hidden md:block">
          Double click on the desktop icons to the left to explore different
          pages.
        </p>
        <p className="text-black text-md block md:hidden">
          Click on the desktop icons to the left to explore different pages.
        </p>
        <p className="text-black text-md">
          You can close or minimize this window by clicking the buttons in the
          top right. You can reopen this window by double clicking the
          &quot;Welcome&quot; desktop icon.
        </p>
      </div>
    </BaseWindow>
  );
}
