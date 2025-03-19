import MessageContainer from "../components/message/MessageContainer.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";

const Home = () => {
  return (
    <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-transparent bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
