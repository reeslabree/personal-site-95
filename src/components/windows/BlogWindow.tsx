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

export function BlogWindow(props: Props) {
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
      title="Connect"
      iconPath="/icons/connect.png"
      minWidth={WIDTH}
      minHeight={HEIGHT}
    >
      <div className="w-full h-full flex flex-col items-start justify-start gap-4">
        <h2 className="text-black text-xl font-bold">Blog</h2>
      </div>
    </BaseWindow>
  );
}
