import { useEffect, useLayoutEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true);

  function handelResize() {
    const width = window.innerWidth;
    if (width < 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  useLayoutEffect(() => {
    handelResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handelResize);

    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, []);

  return { isMobile };
};

export default useIsMobile;
