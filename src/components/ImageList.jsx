import { BsPersonCircle } from "react-icons/bs";

function ImageList({ user }) {
  return (
    <div className="w-13  flex justify-center items-center h-13 rounded-full text-white   overflow-hidden  shadow-gray-500 shadow-lg">
      {user?.image ? (
        <img className="h-full w-full" src={user?.image || null} />
      ) : (
        <BsPersonCircle className=" w-13 justify-center items-center h-12 rounded-full bg-white  text-gray-500 overflow-hidden" />
      )}
    </div>
  );
}

export default ImageList;
