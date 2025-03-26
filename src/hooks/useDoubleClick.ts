import { useState } from "react";

interface Params {
  onClick: () => any;
}

export const useDoubleClick = ({ onClick }: Params) => {
  const [lastClickTime, setLastClickTime] = useState(0);

  const onDoubleClick = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;

    if (timeDiff < 300) {
      setLastClickTime(0);
      onClick();
    } else {
      setLastClickTime(currentTime);
    }
  };

  return { onDoubleClick };
};
