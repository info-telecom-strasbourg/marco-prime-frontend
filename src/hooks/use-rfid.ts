import { useEffect, useRef, useState } from "preact/hooks";

export function useRfid() {
  const [value, setValue] = useState<string | undefined>(undefined);
  const bufferRef = useRef("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (bufferRef.current.length > 0) {
          setValue(bufferRef.current);
          bufferRef.current = "";
        }
        return;
      }

      if (event.key.length === 1) {
        bufferRef.current += event.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    value,
    clear: () => setValue(undefined),
  };
}
