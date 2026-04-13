import React, { useEffect, useRef } from "react";

const SenderMessage = ({ message, image }) => {
  const scroll = useRef(null);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);
  return (
    <div className="w-fit max-w-1/2 px-5 py-2 h-[95%] bg-blue-200 text-black text-xl rounded-tr-none rounded-2xl relative right-2 ml-auto shadow-lg shadow-gray-300">
      {image && (
        <img
          src={image || null}
          className="w-38 rounded-lg bg-amber-300"
          ref={scroll}
          onLoad={() => scroll.current?.scrollIntoView({ behavior: "smooth" })}
        />
      )}
      {message && (
        <span ref={scroll} className=" wrap-break-word ">
          {message}
        </span>
      )}
    </div>
  );
};

export default React.memo(SenderMessage);
