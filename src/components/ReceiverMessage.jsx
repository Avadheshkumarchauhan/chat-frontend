import { memo, useEffect, useRef } from "react";

const ReceiverMessage = ({ image, message }) => {
  const scroll = useRef(null);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  return (
    <div className="w-fit max-w-1/2 px-5 py-4 h-[95%] bg-gray-300 text-gray-800 text-xl rounded-tl-none rounded-2xl relative left-2 shadow-lg shadow-gray-300">
      {image && (
        <img
          src={image || null}
          className="w-38 rounded-lg bg-amber-300"
          ref={scroll}
          onLoad={() => scroll.current?.scrollIntoView({ behavior: "smooth" })}
        />
      )}
      {message && (
        <span className=" wrap-break-word " ref={scroll}>
          {message}
        </span>
      )}
    </div>
  );
};

export default memo(ReceiverMessage);
