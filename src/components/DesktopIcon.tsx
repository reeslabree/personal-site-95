import Image from "next/image";
import { useDoubleClick } from "@rees/hooks";

interface Props {
  imageSrc: string;
  title: string;
  onClick: () => any;
}

export function DesktopIcon({ imageSrc, title, onClick }: Props) {
  const { onDoubleClick } = useDoubleClick({ onClick });
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
      <Image
        className="cursor-pointer"
        onMouseDown={onDoubleClick}
        onTouchStart={(e) => {
          e.preventDefault();
          if (isMobile) {
            onClick();
          } else {
            onDoubleClick();
          }
        }}
        src={imageSrc}
        alt={title}
        width={48}
        height={48}
      />
      <span className="text-center">{title}</span>
    </div>
  );
}
