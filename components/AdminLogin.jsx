import { adminLogin } from "../_api/api";

import { useState, useRef } from "react";
const AdminLogin = ({ onSuccessfulAuthorization }) => {
  const codeRef = useRef(null);
  const [failedAuth, setFailedAuth] = useState(false);
  return (
    <>
      <h1 className="mt-24 text-2xl md:text-4xl">Admin page</h1>
      <p className="mt-4">
        If you&apos;re not Elliott, you probably shouldn&lapos;t be here
      </p>
      <input
        ref={codeRef}
        className={`bg-light-bg p-2 border-b-2 ${
          failedAuth ? "border-b-red-500" : "border-b-black"
        } outline-none mt-8`}
        type="password"
        placeholder="access code"
      />
      <div
        onClick={async () => {
          const result = await adminLogin(codeRef.current.value);

          if (result) {
            onSuccessfulAuthorization();
          } else {
            setFailedAuth(true);
          }
        }}
        className="mt-8 cursor-pointer bg-white rounded-lg px-4 py-2 border-2 border-black"
      >
        enter
      </div>
    </>
  );
};

export default AdminLogin;
