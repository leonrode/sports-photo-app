import Layout from "../components/Layout";

import AdminLogin from "../components/AdminLogin";
import AdminUpload from "../components/AdminUpload";
import { useState } from "react";
const Admin = () => {
  const [authorized, setAuthorized] = useState(false);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {authorized ? (
          <AdminUpload />
        ) : (
          <AdminLogin onSuccessfulAuthorization={() => setAuthorized(true)} />
        )}
      </div>
    </Layout>
  );
};

export default Admin;
