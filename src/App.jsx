import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { useSelector } from "react-redux";
import Profile from "./Pages/Profile";
import { BackUrl } from "./helper/AxiosInst";

function App() {
  const { isLoggedIn } = useSelector((state) => state?.auth);

  // useEffect(()=>{
  //  if(data){
  //     const socketio = io(BackUrl,{
  //       query:{
  //         userId :data?._id
  //       }
  //     });
  //     // socketio.on("hello",(d)=>console.log("socket data : ",d))
  //     console.log("Socket Fro 1 : ",socketio);
  //     dispatch(setSocket(socketio));
  //     console.log("Socket Fro 2 : ",socketio);
  //     socketio.on("getOnlineUsers",(user)=>{
  //       dispatch(setOnlineUsers(user));

  //     })
  //     return ()=>socketio.close()

  //  }else{
  //   if(socket){
  //     socket?.close();
  //     dispatch(setSocket(null))
  //   }
  //  }

  // },[data])

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!isLoggedIn ? <SignUp /> : <Navigate to="/profile" />}
      />
      <Route
        path="/profile"
        element={isLoggedIn ? <Profile /> : <Navigate to="/signup" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
