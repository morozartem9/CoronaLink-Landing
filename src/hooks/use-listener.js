import React from "react";

const useListener = (target, type, listener, ...dependencies) => {
  React.useEffect(
    () => {
      target.addEventListener(type, listener);
      return () => target.removeEventListener(type, listener);
    },
    dependencies,
  );
};

export { useListener };
