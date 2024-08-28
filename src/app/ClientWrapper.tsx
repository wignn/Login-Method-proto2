"use client";


import { SessionProvider } from "next-auth/react";

import Background from "./components/bg";
import Navbar from "./components/NavbarComponents";


const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
        <SessionProvider>
          <Navbar/>
      <Background/>
      {children}
     </SessionProvider>
  );
};

export default ClientWrapper;
