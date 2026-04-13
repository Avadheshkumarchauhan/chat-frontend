import { useId } from "react";
import { useState } from "react";
import { BsArrowLeft, BsPersonCircle } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getuser, saveProfile } from "../redux/Slices/authSlice";
function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageId = useId();
  const { email, userName, image, name } = useSelector(
    (state) => state?.auth?.data,
  );
  const [inputdata, setInputData] = useState({
    name: name || "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(image || null);

  const handleImage = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];

    setInputData({
      ...inputdata,
      image: uploadImage,
    });
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  };
  const handlInput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputdata,
      [name]: value,
    });
  };
  const handleSubmitData = async (e) => {
    e.preventDefault();
    if (!inputdata.name || !inputdata.image) {
      toast.error("All fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("name", inputdata.name);
    formData.append("image", inputdata.image);

    const res = await dispatch(saveProfile(formData));

    if (res?.payload?.success) {
      await dispatch(getuser());
    }
  };
  return (
    <div className=" w-full min-h-screen bg-slate-400  flex flex-col justify-center items-center gap-5 mb-0">
      <div className="fixed top-5 left-5 text-gray-700   cursor-pointer hover:text-yellow-800">
        <BsArrowLeft
          onClick={() => navigate("/")}
          className="font-bold text-3xl "
        />
      </div>
      <div className=" border-4 border-[#20c7ff] rounded-full shadow-gray-400 shadow-lg relative ">
        {previewImage ? (
          <img
            className="w-50 justify-center items-center h-50 rounded-full text-white overflow-hidden"
            src={previewImage}
          />
        ) : (
          <BsPersonCircle className=" w-50 justify-center items-center h-50  text-white overflow-hidden" />
        )}
        <label htmlFor={imageId}>
          <FaCamera className="absolute bottom-10 right-2 w-5 h-5 text-gray-500 cursor-pointer rounded-br-full hover:rounded-br-none" />
        </label>
      </div>
      <form
        noValidate
        className=" flex flex-col justify-center items-center rounded-b-lg  p-2 gap-5 shadow-lg shadow-pink-200"
        onSubmit={handleSubmitData}
      >
        <input
          type="file"
          className="hidden"
          id={imageId}
          name="image"
          accept=".jpg, .png, .jpeg, .svg"
          onChange={handleImage}
        />
        <input
          type="text"
          value={inputdata.name}
          onChange={handlInput}
          required
          name="name"
          placeholder="Enter fullName....."
          className="min-w-[90%]  outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]"
        />
        <input
          type="text"
          readOnly
          value={userName}
          className="min-w-[90%]  h-13 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px] overflow-x-scroll "
        />
        <input
          value={email}
          type="email"
          readOnly
          className="min-w-[90%] outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px] overflow-x-scroll"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#20c7ff] rounded-2xl shadow-gray-400  shadow-lg text-[20px] w-50 mt-5 font-bold hover:shadow-inner hover:cursor-pointer"
        >
          {" "}
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
