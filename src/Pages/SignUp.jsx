import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../helper/regexMatcher";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/Slices/authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((show) => !show);
  };
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.userName || !data.email || !data.password) {
      toast.error("please fill all field are required");
      return;
    }
    if (data.password.length < 5) {
      toast.error("User name at least 5 character");
      return;
    }
    if (!isEmail(data.email)) {
      toast.error("Invalid email id or examle@gmail.com type ");
      return;
    }
    if (!isValidPassword(data.password)) {
      toast.error(
        "password should be 6-16chararers long with atleast a number and special charater like :  Example#231896 ",
      );

      return;
    }
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const res = await dispatch(signUp({ ...data }));

    if (res?.payload?.success) {
      setData({
        userName: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-400  flex items-center justify-center">
      <div className="w-full max-w-125 h-150 bg-pink-50 rounded-md shadow-gray-400 shadow-lg flex flex-col gap-2.5">
        <div className="w-full h-50 bg-[#20c7ff] rounded-b-[30%] shadow-gray-500 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px] ">
            Welcome to <span className="text-white">SignUp</span>
          </h1>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 items-center"
        >
          <input
            type="text"
            value={data.userName}
            required
            onChange={handleInput}
            name="userName"
            placeholder="Enter user name....."
            className="w-[90%] h-12.5 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]"
          />
          <input
            type="email"
            name="email"
            required
            onChange={handleInput}
            value={data.email}
            placeholder="Enter email....."
            className="w-[90%] h-12.5 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]"
          />
          <div className="w-[90%] h-12.5  border-2 overflow-hidden border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg relative">
            <input
              type={show ? "text" : "password"}
              required
              onChange={handleInput}
              name="password"
              value={data.password}
              placeholder="password tpye Example@2135"
              className="w-full h-full text-gray-700 text-[19px] outline-none"
            />
            <span
              onClick={handleShow}
              className="absolute top-2.5 right-4 text[19px] text-[#20c7ff] font-semibold cursor-pointer"
            >
              {show ? "hidden" : "show"}
            </span>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#20c7ff] rounded-2xl shadow-gray-400  shadow-lg text-[20px] w-50 mt-5 font-bold hover:shadow-inner hover:cursor-pointer"
          >
            Sign up
          </button>
          <p className="text-xl font-semibold">
            {" "}
            Already have an Account ?{" "}
            <Link
              to="/login"
              className="text-[#20c7ff] font-bold cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
