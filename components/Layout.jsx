import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="text-black bg-light-bg w-screen h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
