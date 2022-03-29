import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="text-black bg-light-bg w-screen h-screen overflow-y-scroll overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
