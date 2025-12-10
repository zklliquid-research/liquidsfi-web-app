import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Header from "../components/Header";
import sidebarLinks from "../constant/sidebarLinks.jsx";
import { SidebarContext } from "../context/SidebarContext";
import { WagmiContext } from "../context/WagmiContext";
import SuccessModal from "../components/SuccessModal";
import WalletKitModal from "../utils/wallet-kit/WalletKitModal";
import WalletsModal from "../components/WalletsModal";

function DashboardLayout() {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  return (
    <div className="flex bg-black min-h-app ">
      <WalletsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <WalletKitModal />
      <SuccessModal />
      {/* <SuccessModal onClose={handleCloseModal} hashUrl={hashUrl} /> */}
      <Sidebar currentPageLinks={sidebarLinks} />
      <Header />

      <div className="px-4 py-6 xl:px-8 mt-16  md:pl-24 xl:pl-72 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
