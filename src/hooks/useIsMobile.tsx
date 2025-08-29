import { useEffect, useLayoutEffect, useState } from "react";

type UseMobileParams = {
  breakpoint: number;
};

const useIsMobile = ({ breakpoint }: UseMobileParams) => {
  const [isMobile, setIsMobile] = useState(true);

  function handelResize() {
    const width = window.innerWidth;
    if (width > breakpoint) {
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
