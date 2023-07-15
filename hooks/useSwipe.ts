import { useState, useEffect } from "react";

function useSwipe(onSwipe: any) {
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  useEffect(() => {
    const handleTouchStart = (e: any) => {
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: any) => {
      if (!startX || !startY) {
        return;
      }

      const xDiff = startX - e.touches[0].clientX;
      const yDiff = startY - e.touches[0].clientY;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          onSwipe("left");
        } else {
          onSwipe("right");
        }
      } else {
        if (yDiff > 0) {
          onSwipe("up");
        } else {
          onSwipe("down");
        }
      }

      setStartX(null);
      setStartY(null);
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [startX, startY, onSwipe]);

  return null;
}

export default useSwipe;
