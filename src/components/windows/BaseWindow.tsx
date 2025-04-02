import Image from "next/image";
import { Button } from "../Button";
import { MOUSE_MOVE, MOUSE_RELEASE, START_BAR_HEIGHT } from "@rees/constants";
import { useRef, useEffect, useState } from "react";
import Scrollbar from "../Scrollbar";
import { cn } from "@rees/utils";

export interface BaseWindowProps {
  width: number;
  minWidth: number;
  height: number;
  minHeight: number;
  top: number;
  left: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setTop: (top: number) => void;
  setLeft: (left: number) => void;
  children: React.ReactNode;
  title: string;
  iconPath: string;
  onMinimize: () => void;
  onClose: () => void;
  allowResize?: boolean;
  onFocus: () => void;
  isFocused: boolean;
  triggerResize?: any[];
}

export function BaseWindow({
  width,
  height,
  minWidth,
  minHeight,
  top,
  left,
  setWidth,
  setHeight,
  setTop,
  setLeft,
  children,
  title,
  iconPath,
  onMinimize,
  onClose,
  allowResize = false,
  onFocus,
  isFocused,
  triggerResize,
}: BaseWindowProps) {
  const previousSize = useRef<{
    width: number;
    height: number;
    top: number;
    left: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [shouldDisplayScroll, setShouldDisplayScroll] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        setShouldDisplayScroll(container.scrollHeight > container.clientHeight);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef.current, ...(triggerResize || [])]);

  const onMaximize = () => {
    const MARGIN_PERCENT = 0.1;

    if (previousSize.current === null) {
      previousSize.current = { width, height, top, left };

      const maxWidth = window.innerWidth * (1 - MARGIN_PERCENT * 2);
      const maxHeight =
        (window.innerHeight - START_BAR_HEIGHT) * (1 - MARGIN_PERCENT * 2);
      const marginX = window.innerWidth * MARGIN_PERCENT;
      const marginY = (window.innerHeight - START_BAR_HEIGHT) * MARGIN_PERCENT;

      setWidth(maxWidth);
      setHeight(maxHeight);
      setTop(marginY);
      setLeft(marginX);
    } else {
      setWidth(previousSize.current.width);
      setHeight(previousSize.current.height);
      setTop(previousSize.current.top);
      setLeft(previousSize.current.left);
      previousSize.current = null;
    }
  };

  const handleMouseDownMove = (e: React.MouseEvent) => {
    e.preventDefault();

    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = top;
    const startLeft = left;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const deltaX = e.clientX - startX;

      const newTop = startTop + deltaY;
      const newLeft = startLeft + deltaX;

      const maxTop = window.innerHeight - height - START_BAR_HEIGHT;
      const maxLeft = window.innerWidth - width;

      setTop(Math.min(Math.max(0, newTop), maxTop));
      setLeft(Math.min(Math.max(0, newLeft), maxLeft));
    };

    const handleMouseUp = () => {
      document.removeEventListener(MOUSE_MOVE, handleMouseMove);
      document.removeEventListener(MOUSE_RELEASE, handleMouseUp);
    };

    document.addEventListener(MOUSE_MOVE, handleMouseMove);
    document.addEventListener(MOUSE_RELEASE, handleMouseUp);
  };

  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.preventDefault();

    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = startY - e.clientY;

      const newWidth = startWidth + deltaX;
      const newHeight = startHeight - deltaY;

      const MAX_WIDTH = window.innerWidth - left;
      const MAX_HEIGHT = window.innerHeight - top - START_BAR_HEIGHT;

      setWidth(Math.min(Math.max(minWidth, newWidth), MAX_WIDTH));
      setHeight(Math.min(Math.max(minHeight, newHeight), MAX_HEIGHT));
    };

    const handleMouseUp = () => {
      document.removeEventListener(MOUSE_MOVE, handleMouseMove);
      document.removeEventListener(MOUSE_RELEASE, handleMouseUp);
    };

    document.addEventListener(MOUSE_MOVE, handleMouseMove);
    document.addEventListener(MOUSE_RELEASE, handleMouseUp);
  };

  return (
    <div
      className={cn("absolute bg-dialogue", isFocused ? "z-10" : "z-0")}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
      onClick={onFocus}
    >
      <div className="w-full h-full border-[1px] border-t-dialogue border-l-dialogue border-b-black border-r-black">
        <div className="w-full h-full border-[1px] border-t-white border-l-white border-b-dark-gray border-r-dark-gray">
          <div className="w-full h-full border-[1px] border-dialogue">
            <div className="w-full h-full flex flex-col p-1">
              <div
                className="w-full flex bg-deep-blue items-center gap-1 pr-1 cursor-move"
                onMouseDown={handleMouseDownMove}
              >
                <Image
                  src={iconPath}
                  alt={title}
                  width={24}
                  height={24}
                  className="p-1"
                />
                <h1 className="text-lg font-bold text-white">{title}</h1>
                <div className="ml-auto flex gap-1">
                  <Button className="bg-dialogue" onClick={onMinimize}>
                    <Image
                      src="/icons/minimize.png"
                      alt="minimize"
                      width={16}
                      height={16}
                    />
                  </Button>
                  {!isMobile && (
                    <Button className="bg-dialogue" onClick={onMaximize}>
                      <Image
                        src="/icons/maximize.png"
                        alt="maximize"
                        width={16}
                        height={16}
                      />
                    </Button>
                  )}
                  <Button className="bg-dialogue" onClick={onClose}>
                    <Image
                      src="/icons/close.png"
                      alt="close"
                      width={16}
                      height={16}
                    />
                  </Button>
                </div>
              </div>
              <div className="w-full flex gap-1 h-[calc(100%-28px)]">
                <div
                  ref={containerRef}
                  className="w-full h-full text-black py-2 overflow-y-auto"
                >
                  <div ref={contentRef} className="h-full">
                    {children}
                  </div>
                </div>
                <div className="w-fit h-full flex flex-col gap-1">
                  {allowResize && (
                    <>
                      {shouldDisplayScroll ? (
                        <Scrollbar
                          containerRef={containerRef}
                          contentRef={contentRef}
                        />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                      <Image
                        src="/icons/corner-drag.png"
                        alt="drag to resize"
                        width={16}
                        height={16}
                        className="cursor-se-resize"
                        onMouseDown={handleMouseDownResize}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
