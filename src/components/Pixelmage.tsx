import Image from "next/image";
import { ComponentProps } from "react";

interface Props extends ComponentProps<typeof Image> {}

export function Pixelmage(props: Props) {
  return <Image {...props} style={{ imageRendering: "pixelated" }} />;
}
