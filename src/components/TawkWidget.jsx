import { useEffect, useRef } from "react";

const TawkWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/68865605c3d8b519284ebfc4/1j16c01l6";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="hidden" />;
};

export default TawkWidget;
