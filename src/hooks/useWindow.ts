import { useState } from "react";

interface Params {
  initWidth: number;
  initHeight: number;
  initTop: number;
  initLeft: number;
}

export const useWindow = ({
  initWidth,
  initHeight,
  initTop,
  initLeft,
}: Params) => {
  const [width, setWidth] = useState(initWidth);
  const [height, setHeight] = useState(initHeight);
  const [top, setTop] = useState(initTop);
  const [left, setLeft] = useState(initLeft);

  return {
    width,
    height,
    top,
    left,
    setWidth,
    setHeight,
    setTop,
    setLeft,
  };
};
