import { cn } from "@rees/utils";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  isDisabled?: boolean;
}

export function Button({ children, onClick, className, isDisabled }: Props) {
  return (
    <button
      className={cn(
        "border-black cursor-pointer flex items-start justify-start",
        isDisabled ? "border-t border-l " : "border-b border-r"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "border-white",
          !isDisabled ? "border-t border-l" : "border-b border-r"
        )}
      >
        <div
          className={cn(
            " border-[#898989]",
            isDisabled ? "border-t border-l" : "border-b border-r"
          )}
        >
          <div
            className={cn(
              "text-black font-bold",
              className || "",
              "flex items-center justify-center align-middle h-full"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </button>
  );
}
