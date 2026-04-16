import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch} from "react-redux";
import { login } from "../redux/Slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginStatus,setLoginStatus] =useState(false)
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((show) => !show);
  };
  const loginHandleValue = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error("All fields are required ");
      return;
    }
    // const formdata = new FormData();
    // formdata.append("email", loginData.email);
    // formdata.append("password", loginData.password);
    // console.log("form data : ", formdata);

    //const res  = await dispatch(login(formdata));
    setLoginStatus(true);
    const res = await dispatch(login({ ...loginData }));
    //console.log("login data ", res);
    if (res?.payload?.success) {
      setLoginData({
        email: "",
        password: "",
      });
      
      navigate("/");
    }
    setLoginStatus(false);
  };
  return (
    <div className="w-full min-h-screen bg-slate-400  flex items-center justify-center">
      <div className="w-full max-w-125 h-150 bg-pink-50 rounded-md shadow-gray-400 shadow-lg flex flex-col gap-5 items-center">
        <div className="w-full h-50 bg-[#20c7ff] rounded-b-[30%] shadow-gray-500 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px] ">
            Welcome to <span className="text-white">Login</span>
          </h1>
        </div>
        <form
          noValidate
          className="w-full flex flex-col gap-4 items-center"
          onSubmit={loginHandleSubmit}
        >
          <input
            type="email"
            required
            value={loginData.email}
            onChange={loginHandleValue}
            name="email"
            placeholder="Enter email....."
            className="w-[90%] h-12.5 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]"
          />
          <div className="w-[90%] h-12.5  border-2 overflow-hidden border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg relative">
            <input
              type={show ? "text" : "password"}
              value={loginData.password}
              onChange={loginHandleValue}
              name="password"
              required
              placeholder="Enter password....."
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
            disabled={loginStatus}
            type="submit"
            className="px-5 py-2.5 bg-[#20c7ff] rounded-2xl shadow-gray-400  shadow-lg text-[20px] w-50 mt-5 font-bold hover:shadow-inner hover:cursor-pointer"
          >
            Login
          </button>
          <p className="text-xl font-semibold">
            {" "}
            I haven`t an Account ?{" "}
            <Link
              to="/signup"
              className="text-[#20c7ff] font-bold cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
