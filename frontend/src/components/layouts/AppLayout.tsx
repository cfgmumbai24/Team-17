// AppLayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideNav } from "../../pages/Sidebar/index";
import { useUser } from "@clerk/clerk-react";

export function AppLayout() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <div className="flex flex-row flex-grow"> */}
        {/* {isSignedIn && <SideNav />} */}
        <div className="flex flex-col flex-grow">
          <div className="container px-4 md:px-8 flex-grow flex flex-col ml-64">
            <Outlet />
          </div>
        </div>
      {/* </div> */}
      
    </div>
  );
}
