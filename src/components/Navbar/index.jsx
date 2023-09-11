import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileOverlayNav from "../MobileOverlayNav";
import { Popover, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";

export default function Navbar() {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [showServicesLink, setShowServicesLink] = useState(false);

  function openMobileNav() {
    setIsMobileNavVisible(true);
  }

  function closeMobileNav() {
    setIsMobileNavVisible(false);
  }

  const styles = {
    "nav-link":
      "relative text-white desktop:text-xl text-base hover:text-primary-red",
  };
  return (
    <div className="flex items-center justify-between max-w-desktop mx-auto">
      <div>
        <Link href={"/"} className="focus:outline-none">
          <Image
            src={"/images/commons/logo-primary.png"}
            width={160}
            height={160}
            alt="Mr.RobotDev"
            className="desktop:w-32 desktop:h-32 md:w-24 md:h-24 w-16 h-16"
          />
        </Link>
      </div>
      <div className="hidden lg:block">
        <ul className="flex items-center list-none desktop:gap-16 gap-12">
          <li className={styles["nav-link"]}>
            <Link href={"/"}>Home</Link>
          </li>
          <li className={styles["nav-link"]}>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    onMouseEnter={() => setShowServicesLink(true)}
                    onMouseLeave={() => setShowServicesLink(false)}
                    className={"inline-flex items-center focus:outline-none"}
                  >
                    Services
                    <MdArrowDropDown />
                  </Popover.Button>

                  <Transition
                    onMouseEnter={() => setShowServicesLink(true)}
                    onMouseLeave={() => setShowServicesLink(false)}
                    show={showServicesLink}
                    enter="transition-all duration-200"
                    enterFrom="opacity-0 translate-y-5"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition-all duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 invisible translate-y-5"
                  >
                    <Popover.Panel
                      static
                      className="absolute top-4 right-0 z-10 font-normal text-black desktop:text-base text-xs bg-white rounded-xl desktop:w-72 w-56"
                    >
                      <div className="flex flex-col text-center">
                        <Link
                          className="py-2 hover:bg-primary-red hover:text-white rounded-t-xl"
                          href="/services/web_development"
                        >
                          Website Development
                        </Link>
                        <Link
                          className="py-2 hover:bg-primary-red hover:text-white"
                          href="/services/app_development"
                        >
                          App Development
                        </Link>
                        <Link
                          className="py-2 hover:bg-primary-red hover:text-white"
                          href="/services/custom_software"
                        >
                          Custom Software Development
                        </Link>
                        <Link
                          className="py-2 hover:bg-primary-red hover:text-white rounded-b-xl"
                          href="/services/game_development"
                        >
                          Game Development
                        </Link>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </li>
          <li className={styles["nav-link"]}>
            <Link href={"/pricing"}>App Pricing</Link>
          </li>
          <li className={styles["nav-link"]}>
            <Link href={"/blog"}>Blog </Link>
          </li>
          <li className={styles["nav-link"]}>
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
      </div>
      <div className="hidden lg:block">
        <Link
          href={"/contact"}
          className="text-white font-semibold desktop:text-xl rounded-full desktop:px-6 desktop:py-3 px-5 py-3 bg-primary-red drop-shadow-md hover:bg-white hover:text-primary-red transition duration-200"
        >
          Contact Us
        </Link>
      </div>
      <div className="lg:hidden z-20">
        <button onClick={isMobileNavVisible ? closeMobileNav : openMobileNav}>
          <Image
            src={"/images/mobile/menu-btn.svg"}
            width={29}
            height={20}
            alt="Mr.RobotDev"
          />
        </button>
      </div>
      <MobileOverlayNav
        isVisible={isMobileNavVisible}
        setIsVisible={setIsMobileNavVisible}
      />
    </div>
  );
}
