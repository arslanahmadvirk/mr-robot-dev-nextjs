import { Popover } from "@headlessui/react";
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";

export default function MobileOverlayNav({ isVisible, setIsVisible }) {
  const styles = {
    "nav-link": "text-xl mb-8 font-semibold tracking-wider",
  };
  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen z-10 flex justify-center text-white lg:hidden bg-red-800 transition-[opacity] duration-200 ${
        isVisible ? "opacity-full visible" : "opacity-0 invisible"
      }`}
    >
      <ul className="list-none text-center mt-20">
        <li className={styles["nav-link"]}>
          <Link href="/" onClick={() => setIsVisible(false)}>
            Home
          </Link>
        </li>
        <li className={styles["nav-link"]}>
          <Popover className="relative">
            <Popover.Button className={"inline-flex items-center"}>
              Services
              <MdArrowDropDown />
            </Popover.Button>

            <Popover.Panel className="font-normal text-xs mt-4 w-56">
              <div className="flex flex-col text-center">
                <Link className="py-2" href="/services/web_development">
                  Website Development
                </Link>
                <Link className="py-2" href="/services/app_development">
                  App Development
                </Link>
                <Link className="py-2" href="/services/custom_software">
                  Custom Software Development
                </Link>
                <Link className="py-2 " href="/services/game_development">
                  Game Development
                </Link>
              </div>
            </Popover.Panel>
          </Popover>
        </li>
        <li className={styles["nav-link"]}>
          <Link href="/pricing" onClick={() => setIsVisible(false)}>
            App Pricing
          </Link>
        </li>
        <li className={styles["nav-link"]}>
          <Link href="/blog" onClick={() => setIsVisible(false)}>
            Blog
          </Link>
        </li>
        <li className={styles["nav-link"]}>
          <Link href="/about" onClick={() => setIsVisible(false)}>
            About
          </Link>
        </li>
        <li className={styles["nav-link"]}>
          <Link href="/contact" onClick={() => setIsVisible(false)}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
