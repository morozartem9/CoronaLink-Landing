import React from "react";

const useOnClickOutside = (handler) => {
  const ref = React.useRef(null);

  React.useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler],
  );

  return [ref];
};

export { useOnClickOutside };
