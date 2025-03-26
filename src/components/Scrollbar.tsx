import { useEffect, useState } from "react";

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const THUMB_HEIGHT = 48;

export function Scrollbar({ containerRef, contentRef }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateScrollPosition = () => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current;
      const scrollPercentage =
        (container.scrollTop /
          (container.scrollHeight - container.clientHeight)) *
        100;
      setScrollPosition(scrollPercentage);
    }
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const startY = e.clientY;
    const startScroll = containerRef.current?.scrollTop || 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !contentRef.current) return;

      const deltaY = e.clientY - startY;
      const scrollableHeight =
        containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const scrollMove =
        (deltaY / (containerRef.current.clientHeight - THUMB_HEIGHT)) *
        scrollableHeight;

      containerRef.current.scrollTop = startScroll + scrollMove;
      updateScrollPosition();
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const computeThumbTop = () => {
    if (!containerRef.current || !contentRef.current) return 0;

    const containerHeight = containerRef.current.clientHeight;
    const scrollableHeight =
      containerRef.current.scrollHeight - containerHeight;
    const currentScroll = containerRef.current.scrollTop;

    const thumbTrackHeight = containerHeight - 1.5 * THUMB_HEIGHT;
    const scrollPercentage = currentScroll / scrollableHeight;
    const thumbTop = scrollPercentage * thumbTrackHeight;

    return Math.min(Math.max(thumbTop, 0), thumbTrackHeight);
  };

  useEffect(() => {
    const handleScroll = () => {
      updateScrollPosition();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef, contentRef]);

  return (
    <div className="w-[16px] h-full flex flex-col bg-dialogue border-[1px] border-dark-gray mt-1 -mb-1">
      <div
        className="flex-1 relative border-t-dark-gray border-l-dark-gray 
        border-b-white border-r-white border-[1px]"
      >
        <div
          className="absolute w-full cursor-pointer bg-dialogue 
            border-t-white border-l-white border-b-black border-r-black 
            border-[1px]"
          style={{
            height: `${THUMB_HEIGHT}px`,
            top: `${computeThumbTop()}px`,
          }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  );
}

export default Scrollbar;
