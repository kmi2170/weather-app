import { useEffect } from "react";

type UseKeysToOpenModalParams = {
  isMobile: boolean;
  handleOpen: () => void;
};

const useKeysToOpenModal = ({
  isMobile,
  handleOpen,
}: UseKeysToOpenModalParams) => {
  useEffect(() => {
    let keyPressed = {};

    function handleKeyPress(e: KeyboardEvent) {
      if (isMobile) {
        return;
      }

      keyPressed[e.key] = true;

      if (keyPressed["Control"] && keyPressed["k"]) {
        e.preventDefault();
        handleOpen();
      }
    }

    function deleteKeyPressed(e: KeyboardEvent) {
      delete keyPressed[e.key];
    }

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", deleteKeyPressed);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", deleteKeyPressed);
    };
  }, [isMobile]);
};

export default useKeysToOpenModal;
