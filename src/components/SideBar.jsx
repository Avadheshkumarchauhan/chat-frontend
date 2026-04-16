import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
import {
  clearUsers,
  otherUsers,
  searchUser,
  selectUser,
  setSearchUser,
} from "../redux/Slices/userSlice";
import { BiLogOutCircle } from "react-icons/bi";
import { logout } from "../redux/Slices/authSlice";
import ImageList from "./ImageList";
import { useNavigate } from "react-router-dom";

const SideBar = ({ selectus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state?.auth);
  const { users, onLineUsers, searchUsers } = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const [searchs, setSearch] = useState(false);
  const [logOutStatus,setLogOutStatus] =useState(false)

  useEffect(() => {
    dispatch(otherUsers());
  }, [dispatch]);

  const handleLogOut = async () => {
    setLogOutStatus(true)
    const res = await dispatch(logout());
    if (res?.payload?.success) {
      await dispatch(selectUser(null));
      await dispatch(clearUsers([]));
    }
    setLogOutStatus(false)
  };
  useEffect(() => {
    if (input) {
      dispatch(searchUser(input));
    }
    if (input.length == 0) {
      dispatch(setSearchUser(null));
    }
  }, [input, dispatch]);

  return (
    <div
      className={`lg:w-[30%] w-full h-full  lg:block flex flex-col ${!selectus?.userName ? "block" : "hidden"}`}
    >
       {!logOutStatus && 
      <div
        className="w-12 flex justify-center items-center h-12 rounded-full text-gray-900  overflow-hidden  shadow-gray-500 shadow-lg bg-red-400 cursor-pointer mt-2 bottom-2 z-100 left-2 fixed "
        onClick={handleLogOut}
      >
       <BiLogOutCircle className="w-6 h-6 text-xl font-bold cursor-pointer" />
      </div>
      }
      <div className="w-full h-60 bg-[#eca1d9] rounded-b-[30%] shadow-gray-500 shadow-lg flex flex-col justify-center px-5 ">
        <h1 className="text-green-800 font-bold text-3xl">Chatty</h1>
        <div className="w-full flex justify-center items-center gap-10">
          <h1 className="font-bold text-xl text-gray-700">
            {" "}
            Hii, {data.name || data.userName}
          </h1>
          <div
            className="w-13 lg:w-22 lg:h-22 flex justify-center items-center h-13 rounded-full text-white   overflow-hidden  shadow-gray-500 shadow-lg cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            {data?.image ? (
              <img
                className="h-full w-full "
                src={data.image}
                alt="Image missing "
                title="Profile Image"
              />
            ) : (
              <BsPersonCircle className=" w-50 justify-center items-center h-50  text-white overflow-hidden bg-gray-500" />
            )}
          </div>
        </div>
        <div className="w-full  flex items-center  gap-5 overflow-y-auto py-4">
          {!searchs ? (
            <div
              className="w-12 flex justify-center left-0 items-center h-12 rounded-full text-gray-600  overflow-hidden  shadow-gray-500 shadow-lg bg-white cursor-pointer"
              onClick={() => setSearch((searchs) => !searchs)}
            >
              <IoIosSearch className="w-6 h-6" />
            </div>
          ) : (
            <form className="w-full flex justify-center items-center h-10 mt-2 rounded-full text-gray-800  overflow-hidden  shadow-gray-500 shadow-lg bg-white cursor-pointer px-5 ">
              <IoIosSearch className="w-6 h-6 text-xl" />
              <input
                type="text"
                className="w-full h-full px-2 text-xl  outline-0 border-0"
                placeholder="Search users......"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <RxCross2
                className="w-6 h-c cursor-pointer text-2xl font-bold"
                onClick={() => {setSearch((searchs) => !searchs)
                  setInput("");
                }}
              />
            </form>
          )}
          {!searchs &&
            users?.map(
              (user) =>
                onLineUsers?.includes(user._id) && (
                  <div
                    key={user?._id}
                    className="relative cursor-pointer "
                    onClick={async () => {
                      await dispatch(selectUser(user))
                     
                    
                    }}
                  >
                    <span className="w-3 h-3 rounded-full bg-green-400 absolute bottom-0 p-1 right-3 z-100"></span>
                    <ImageList user={user} />
                  </div>
                ),
            )}
        </div>
      </div>
      <div className="w-full flex flex-col overflow-auto h-[60vh] gap-5 items-center shadow-lg shadow-gray-700 mt-2">
        {searchUsers
          ? /**
             * This searching list data
             */
            searchUsers.map(
              (user) =>
                user._id !== data._id && (
                  <div
                    key={user?._id}
                    className="w-[95%] h-15 flex justify-start items-center gap-5 shadow-gray-500 shadow-lg bg-gray-200 rounded-full  hover:bg-blue-300 cursor-pointer ease-in-out  transition-all duration-300 relative"
                    onClick={async () => {
                      await dispatch(selectUser(user));
                      dispatch(setSearchUser(null));
                      setInput("");
                      setSearch(false);
                      
                    }}
                  >
                    {onLineUsers?.includes(user._id) && (
                      <span className="w-3 h-3 rounded-full bg-green-400 absolute bottom-1 p-1 left-4 z-100"></span>
                    )}
                    <ImageList user={user} />
                    <h1 className="font-semibold text-gray-900 text-xl">
                      {user.name || user.userName}
                    </h1>
                  </div>
                ),
            )
          : /**
             * This not searching list data
             */
            users?.map((user) => (
              <div
                key={user?._id}
                className="w-[95%] h-15 flex justify-start items-center gap-5 shadow-gray-500 shadow-lg bg-gray-200 rounded-full  hover:bg-blue-300 cursor-pointer ease-in-out  transition-all duration-300 relative"
                onClick={async () => {
                  await dispatch(selectUser(user))
                 
                }}
              >
                {onLineUsers?.includes(user._id) && (
                  <span className="w-3 h-3 rounded-full bg-green-400 absolute bottom-1 p-1 left-7 z-25"></span>
                )}
                <ImageList user={user} />
                <h1 className="font-semibold text-gray-900 text-xl">
                  {user.name || user.userName}
                </h1>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SideBar;
