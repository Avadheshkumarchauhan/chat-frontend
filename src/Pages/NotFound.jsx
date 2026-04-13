import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#737583] justify-center gap-10 items-center shadow-2xl">
      <h1 className="text-white text-9xl font-bold  shadow-2xs flex relative">
        {" "}
        404
      </h1>
      <p className="text-gray-900 font-semibold text-4xl px-2 absolute rotate-12 ">
        Page not found ......
      </p>

      <button className="bg-pink-400 shadow-2xl font-semibold text-xl px-4 hover:cursor-pointer text-white rounded-md hover:bg-amber-300 hover:text-black ease-in-out duration-300 hover:shadow-lime-100">
        <a className=" focus:ring ">
          <span className=" relative block  px-8" onClick={() => navigate(-1)}>
            Go Back
          </span>
        </a>
      </button>
    </div>
  );
}

export default NotFound;
