import { BsArrowLeft, BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setOnlineUsers } from "../redux/Slices/userSlice";
import { BsEmojiSurprise } from "react-icons/bs";
import { FaFileImage } from "react-icons/fa6";
import { TbSend } from "react-icons/tb";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  getMessage,
  sendMessage,
  setMessage,
} from "../redux/Slices/messageSlice";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { BackUrl } from "../helper/AxiosInst";
import { io } from "socket.io-client";

const MessageArea = ({ data }) => {
  const dispatch = useDispatch();
  const imageId = useId();
  const { message } = useSelector((state) => state?.message);

  const authData = useSelector((state) => state?.auth?.data);

  const [showPicker, setShowPicker] = useState(false);
  const [inputData, setInputData] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const socketRef = useRef(null);
  const [sendStatus,setSendStatus] =useState(false)

  const handleImage = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    setBackendImage(uploadImage);
    setInputImage(URL.createObjectURL(uploadImage));
    //  if (uploadImage) {
    //       const fileReader = new FileReader();
    //       fileReader.readAsDataURL(uploadImage);
    //       fileReader.addEventListener("load", function () {
    //         setInputImage(this.result);
    //       });
    //     }
  };

  useEffect(() => {
    if (!data?._id) return;
    dispatch(getMessage(data._id));
  }, [data, dispatch]);

  useEffect(() => {
    if (authData) {
      socketRef.current = io(BackUrl, {
        query: {
          userId: authData?._id,
        },
      });

      //console.log("Socket From:", socketRef.current);
      // socketRef.current?.on("hello",(d)=>console.log("socket data : ",d))
      socketRef.current?.on("getOnlineUsers", (users) => {
        //console.log("socket message:", users);

        // ✅ sirf data Redux me bhejo
        dispatch(setOnlineUsers(users));
      });

      return () => {
        socketRef.current?.disconnect();
      };
    } else {
      if (socketRef.current) {
        socketRef.current?.disconnect();
      }
    }
  }, [authData, dispatch]);

  const emojiClick = (emojiData) => {
    setInputData((prevData) => prevData + " " + emojiData.emoji);
  };
  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const onSubmitMessageHandle = async (e) => {
    e.preventDefault();
    if (inputData.trim() === "" && !backendImage) {
      return;
    }
    const formData = new FormData();

    if (inputData) {
      formData.append("message", inputData);
    }
    if (backendImage) {
      formData.append("image", backendImage);
    }
    setSendStatus(true)

    const res = await dispatch(sendMessage([data?._id, formData]));    

    if (res?.payload?.success) {
      setInputData("");
      setInputImage("");
      setBackendImage("");
      setSendStatus(false)
      dispatch(setMessage([...message, res?.payload?.data]));
    }
    setSendStatus(false)
  };
  useEffect(() => {
        // console.log("before : ",socketRef.current);

    socketRef.current?.on("newMessage", (mess) => {
      //console.log("newMessage : ",mess);

      
      if(mess?.sender ===data?._id  ){
                          
        dispatch(setMessage([...message, mess]));
        }
        else{
          dispatch(setMessage([...message]))
        }
    });
    ///socketRef.current?.off("newMessage"); //not allow
  }, [message, setMessage]);

  return (
    <div
      className={`lg:w-[70%] w-full relative  lg:flex h-full ${data?.userName ? "flex" : "hidden"}  border-l-2 border-gray-300 bottom-0`}
    >
      {data && (
        <div className="w-full h-screen flex flex-col">
          <div className="w-full h-25 bg-[#4c9fbb] rounded-b-[30px] shadow-gray-500 shadow-lg flex items-center px-5 gap-5 ">
            <div className="top-5 left-5 text-gray-700 cursor-pointer hover:text-white">
              <BsArrowLeft
                className="font-semibold text-xl w-10 h-10 "
                onClick={() => dispatch(selectUser(null))}
              />
            </div>
            <div className="w-15 flex justify-center items-center h-15 rounded-full text-white   overflow-hidden  shadow-gray-500 shadow-lg">
              {data?.image ? (
                <img className="h-full w-full" src={data?.image || null} />
              ) : (
                <BsPersonCircle className=" w-13 justify-center items-center h-12 rounded-full bg-white  text-gray-500 overflow-hidden" />
              )}
            </div>
            <h1 className=" text-xl font-semibold text-white">
              {" "}
              {data?.name || data?.userName || "User"}
            </h1>
          </div>
          <div className="w-full h-[95%] flex flex-col pt-7 overflow-auto gap-2 ">
            {showPicker && (
              <div className="absolute bottom-30 left-20 text-xl text-amber-100 z-30">
                <EmojiPicker
                  width={250}
                  height={350}
                  onEmojiClick={emojiClick}
                />
              </div>
            )}

            {message &&
              message?.map((msg, idx) =>
                msg.sender == authData._id ? (
                  <div key={idx}>
                    <SenderMessage image={msg?.image} message={msg?.message} />
                  </div>
                ) : (
                  <div key={idx}>
                    <ReceiverMessage
                      image={msg?.image}
                      message={msg?.message}
                    />
                  </div>
                )
              )}
          </div>
          <div className=" w-full lg:w-[75%] h-25  bottom-1 flex items-center justify-center ">
            {inputImage && (
              <img
                src={inputImage || null}
                className="w-70 h-70 absolute bottom-25 right-5% rounded-lg z-25"
              />
            )}

            <form
              noValidate
              onSubmit={onSubmitMessageHandle}
              className="w-[95%] lg:w-[70%] h-15  bg-[#73b7e7] rounded-full shadow-lg shadow-gray-400 flex items-center gap-5 px-5"
            >
              <div onClick={() => setShowPicker((prev) => !prev)}>
                <BsEmojiSurprise
                  className="w-6 h-6 text-white cursor-pointer"
                  title="Emoji"
                />
              </div>
              <textarea
                className="w-full h-15  px-2 pt-4 outline-none border-0  text-black bg-transparent placeholder-white placeholder"
                placeholder="Type a  message"
                onChange={handleInput}
                value={inputData}
              />
              <div>
                <label htmlFor={imageId}>
                  {" "}
                  <FaFileImage
                    className="w-6 h-6 text-white cursor-pointer"
                    title="File"
                  />
                </label>
                <input
                  type="file"
                  hidden
                  id={imageId}
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
              {!(inputData.trim() === "" && !backendImage) && (
                <button type="submit " disabled={sendStatus}>
                  <TbSend
                    className="w-6 h-6 text-white cursor-pointer "
                    title="send"
                  />
                </button>
              )}
            </form>
          </div>
        </div>
      )}
      {!data?.userName && (
        <div className="flex w-full h-full justify-center items-center   flex-col p-5 gap-2">
          <h1 className="text-4xl font-bold text-gray-300">Welcome to Chat</h1>
          <span className="text-orange-200 font-stretch-50%  font-semibold text-2xl">
            {" "}
            select user chatting.......
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
