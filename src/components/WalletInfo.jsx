import clsx from "clsx";
import { useContext } from "react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { ArrowDown2, WalletMoney } from "iconsax-react";
import WalletsModal from "./WalletsModal";
import { WagmiContext } from "../context/WagmiContext";
import { SidebarContext } from "../context/SidebarContext";

export default function WalletInfo({ width }) {
  const { disconnect, address, isConnected } = useContext(WagmiContext);
  const {
    isOpen,
    setIsOpen,

    selectedSourceChain,
    nativeBalance,
    userKey,
    network,
  } = useContext(SidebarContext);

  const showWalletInfo =
    (selectedSourceChain?.chainType === "evm" && !!address) ||
    (selectedSourceChain?.chainType === "soroban" && !!userKey);

  if (!showWalletInfo) return null;

  const selectedNetwork = !!selectedSourceChain?.testnet;
  const connectedWallet = network?.network === "TESTNET";

  const networkSame =
    selectedSourceChain?.chainType === "soroban"
      ? true || selectedNetwork === connectedWallet
      : true;

  if (
    (address && selectedSourceChain?.chainType === "evm") ||
    (userKey && selectedSourceChain?.chainType === "soroban")
  ) {
    return (
      <Menu
        as="div"
        className={clsx(
          "relative inline-block text-left",
          width === "full" && "w-full"
        )}
      >
        {({ open }) => (
          <>
            {networkSame ? (
              <Menu.Button
                className={clsx(
                  "flex gap-2 items-center p-1 pr-2.5 rounded-full text-sm font-medium border border-gray-400 transition-colors hover:bg-dark-300",
                  !networkSame && "cursor-not-allowed",
                  width === "full" && "w-full",
                  open ? "bg-dark-300" : "bg-dark-400"
                )}
              >
                <>
                  {" "}
                  <div className="p-[8px]">
                    <div
                      className={`${
                        selectedNetwork ? "bg-red-500 " : "bg-green-500 "
                      } h-4 w-4 rounded-full p-2`}
                    ></div>
                  </div>
                  <div>
                    {nativeBalance}{" "}
                    {selectedSourceChain?.nativeCurrency?.symbol}
                  </div>
                  <ArrowDown2
                    size="16"
                    color="#fff"
                    className={clsx(
                      "transition-transform will-change-transform ml-auto",
                      open && "rotate-180"
                    )}
                  />
                </>
              </Menu.Button>
            ) : (
              <div
                className={clsx(
                  "flex gap-2 px-3 items-center p-1 pr-2.5 rounded-full text-sm font-medium border border-gray-400 transition-colors hover:bg-dark-300",
                  !networkSame && "cursor-not-allowed",
                  width === "full" && "w-full",
                  open ? "bg-dark-300" : "bg-dark-400"
                )}
              >
                {" "}
                <div
                  className={`bg-red-500/20 text-red-500   rounded-full h-[30px] w-[30px] text-center items-center justify-center font-bold text-base  flex`}
                >
                  X
                </div>
                <div className="text-base pr-2 text-gray-200">
                  Wrong network. Switch in wallet
                </div>
              </div>
            )}
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2  w-full origin-top-right rounded-md bg-dark-400 border border-dark-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                <Menu.Item>
                  <div
                    className="px-1 py-2 text-sm transition-colors flex items-center gap-1 w-full text-left hover:bg-dark-300"
                    // onClick={() => disconnect()}
                  >
                    {/* <LogoutCurve size="16" color="#fff" />
                     */}
                    <div className="p-[8px]">
                      <div
                        className={`${
                          selectedNetwork ? "bg-red-500 " : "bg-green-500 "
                        } h-4 w-4 rounded-full p-2`}
                      ></div>
                    </div>
                    Testnet
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="px-2 py-2  text-sm transition-colors flex items-center    gap-2 w-full text-left hover:bg-dark-300">
                    <WalletMoney className="text-cyan-500 h-5 w-auto" />
                    <div className=" flex ">
                      {nativeBalance}{" "}
                      {selectedSourceChain?.nativeCurrency?.symbol}
                    </div>
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  }

  return (
    <>
      <button
        className={clsx(
          "flex gap-2 items-center text-black font-bold bg-teal-400 py-2.5 px-4 rounded-xl text-sm  text-center justify-center",
          width === "full" && "w-full"
        )}
        onClick={() => setIsOpen(true)}
      >
        Connect Wallet
      </button>
      <WalletsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
