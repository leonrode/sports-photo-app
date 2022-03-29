import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-light-bg w-screen h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
