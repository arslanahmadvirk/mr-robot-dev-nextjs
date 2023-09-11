import Image from "next/image";
import Link from "next/link";

export default function MobileFooter() {
  return (
    <footer className="bg-primary-red-dark/25">
      <div className="mx-auto desktop:px-32 lg:px-20 px-5 desktop:text-xl text-sm text-white">
        <Image
          src={"/images/commons/logo-primary.png"}
          alt="Team Image"
          height={"260"}
          width={410}
          className="w-20 h-20 object-cover"
        />
        <div className="flex ml-3 justify-between">
          <div>
            <h1 className="font-bold text-lg mb-6">Links</h1>
            <ul className="list-disc list-inside">
              <li className="mb-2">
                <Link href={"/"} className="hover:text-primary-red">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href={"/services"} className="hover:text-primary-red">
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link href={"/pricing"} className="hover:text-primary-red">
                  App Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link href={"/blog"} className="hover:text-primary-red">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href={"/about"} className="hover:text-primary-red">
                  About us
                </Link>
              </li>
              <li className="mb-2">
                <Link href={"/contact"} className="hover:text-primary-red">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-lg mb-6">Services</h1>
            <ul className="list-disc list-inside">
              <li className="mb-2">
                <Link
                  href={"/services/web_development"}
                  className="hover:text-primary-red"
                >
                  Web Development
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href={"/services/app_development"}
                  className="hover:text-primary-red"
                >
                  App Development
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href={"/services/custom_software"}
                  className="hover:text-primary-red"
                >
                  Custom Software
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href={"/services/game_development"}
                  className="hover:text-primary-red"
                >
                  Game Development
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center text-center gap-10 mt-10">
          <div className="flex flex-col gap-3 ml-3">
            <p>Address: Midrand, South Africa</p>
            {/* <p>Phone:+27 79 957 7606</p> */}
            {/* <p>Email: sales@mrrobotdev.com</p> */}
            <div className="flex flex-row mx-auto mt-4 gap-5 mb-5">
              <a
                href="https://www.facebook.com/profile.php?id=100092171062219"
                target="_blank"
              >
                <Image
                  src={"/images/mobile/facebook.svg"}
                  width={64}
                  height={64}
                  className="w-10 h-10 mb-4"
                  alt="facebook link"
                />
              </a>
              {/* <Link href={"/"}>
                <Image
                  src={"/images/mobile/linkedin.svg"}
                  width={64}
                  height={64}
                  className="w-10 h-10 mb-4"
                  alt="facebook link"
                />
              </Link> */}
            </div>
            <div className="pb-5">
              <p className="text-center text-xs">
                © 2023, Mr.RobotDev PTY LTD, All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-transparent border-t border-gray-400" />
      <div className="flex justify-between text-white py-3 px-5 text-xs">
        <Link href={"/"}>Privacy Policy</Link>
        <Link href={"/"}>Terms & Conditions</Link>
      </div>
    </footer>
  );
}
