import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";
import {} from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { selectData } = useSelector((state) => state?.user);
  return (
    <div className=" flex w-full h-screen bg-slate-600 overflow-hidden">
      <SideBar selectus={selectData} />
      <MessageArea data={selectData} />
    </div>
  );
};

export default Home;
