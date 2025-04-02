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

const WIDTH = 400;
const HEIGHT = 200;

export function BlogWindow(props: Props) {
  const windowPosition = useWindow({
    initWidth: WIDTH,
    initHeight: HEIGHT,
    initTop: 300,
    initLeft: 275,
  });

  return (
    <BaseWindow
      {...props}
      {...windowPosition}
      title="Blog"
      iconPath="/icons/blog.png"
      minWidth={WIDTH}
      minHeight={HEIGHT}
    >
      <div className="w-full h-full flex flex-col items-start justify-start gap-4">
        <p>
          Nothing to see here yet. I had some blogs on my old site, but I
          haven&apos;t ported them over yet. Would like to review them to see if
          they withstand the test of time.
        </p>
        <p>
          I&apos;ll try to write some more blogs in the future, but for now,
          this is just a placeholder.
        </p>
      </div>
    </BaseWindow>
  );
}
