import { useEffect, useState } from "react";
import { START_BAR_HEIGHT } from "@rees/constants";

interface Params {
  initWidth: number;
  initHeight: number;
  initTop: number;
  initLeft: number;
}

const MOBILE_BREAKPOINT = 768;

export const useWindow = ({
  initWidth,
  initHeight,
  initTop,
  initLeft,
}: Params) => {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT;

  const [width, setWidth] = useState(
    isMobile ? window.innerWidth * 0.9 : initWidth
  );
  const [height, setHeight] = useState(
    isMobile ? window.innerHeight * 0.85 : initHeight
  );
  const [top, setTop] = useState(
    isMobile ? window.innerHeight * 0.1 - START_BAR_HEIGHT : initTop
  );
  const [left, setLeft] = useState(
    isMobile ? window.innerWidth * 0.05 : initLeft
  );

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
