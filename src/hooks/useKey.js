import { useEffect } from "react";

const useKey = (key, action) => {
  useEffect(() => {
    function callback(e) {
      if (e.code === key) {
        action();
      }
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
};

export default useKey;
