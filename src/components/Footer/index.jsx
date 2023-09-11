/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { MdMail, MdPhone } from "react-icons/md";
import { IoPaperPlane } from "react-icons/io5";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CombineRepository from "@/repositories/CombineRepository";
import alert from "../Notification/Alert";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { baseURL } from "@/helpers/generic";
import axios from "axios";
import Spinner from "../svgs/spinner";
export default function Footer() {
  const styles = {
    footer_links_li: "relative mb-4 footer-link",
  };
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function closeModal() {
    setIsOpen(false);
    setIsSubmitted(false);
    setIsBot(false);
    setUserAnswer("");
    generateNewQuestion();
  }

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function closeSuccessModal() {
    setConfirmation(false);
    setIsBot(false);
    setIsSubmitted(false);
  }
  function openSuccessModal() {
    setConfirmation(true);
  }

  async function subscribeNewsLetter(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      try {
        const data = await CombineRepository.subscribeNewsLetter({
          email: email,
        });
        // alert.showSuccessAlert(
        //   "You have successfully subscribed to our NewsLetter"
        // );
        setIsBot(false);
        setIsSubmitted(false);
        setEmail("");
        closeModal();
        openSuccessModal();
        setIsError(false);
      } catch (error) {
        closeModal();
        setIsBot(false);
        setIsSubmitted(false);
        openSuccessModal();
        setIsError(true);
        setErrorMessage("Something went wrong!!!");
        // alert.showErrorAlert(error);
      }
    } else {
      closeModal();
      setIsBot(false);
      setIsSubmitted(false);
      setIsError(true);
      setErrorMessage("Please enter your valid Email Address");
      openSuccessModal();
    }
  }

  const [secondNumber, setSecondNumber] = useState(
    Math.floor(Math.random() * 10) + 1
  );

  const [firstNumber, setFirstNumber] = useState(() => {
    const minFirstNumber = secondNumber + 1;
    return (
      minFirstNumber + Math.floor(Math.random() * (10 - minFirstNumber + 1))
    );
  });

  const [operator, setOperator] = useState(
    ["+", "-", "*"][Math.floor(Math.random() * 3)]
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [isBot, setIsBot] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (!isSubmitted) {
      setStartTime(Date.now());
    }
  }, [isSubmitted]);

  const generateNewQuestion = () => {
    const newSecondNumber = Math.floor(Math.random() * 20) + 1;
    const maxFirstNumber = 20 - newSecondNumber;
    const newFirstNumber =
      newSecondNumber + Math.floor(Math.random() * maxFirstNumber);
    setFirstNumber(newFirstNumber);
    setSecondNumber(newSecondNumber);
    setOperator(["+", "-", "*"][Math.floor(Math.random() * 3)]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const expectedAnswer = eval(`${firstNumber} ${operator} ${secondNumber}`);
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds

    if (userAnswer === expectedAnswer.toString() && elapsedTime > 4) {
      console.log("Human");
      setIsBot(false);
      subscribeNewsLetter(e);
      submitCaptcha("Human", "Success");
    } else {
      console.log("Bot");
      setIsBot(true);
      submitCaptcha("Bot", "Failed");
    }

    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };
  const handleTryAgain = () => {
    setIsSubmitted(false);
    setUserAnswer("");
    generateNewQuestion();
  };

  const submitCaptcha = async (classfication, result) => {
    let payload = {
      userClassification: classfication,
      result: result,
    };
    try {
      const response = await axios.post(`${baseURL}/captchas`, payload);
    } catch (e) {}
  };

  return (
    <footer className="bg-primary-red-dark/25 ">
      <div className="mx-auto max-w-desktop desktop:px-36 lg:px-28 px-5 border-b desktop:text-xl text-sm text-white">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 pt-20 pb-10">
          <div>
            <div className="flex flex-col items-start">
              <Image
                src={"/images/commons/logo-secondary.png"}
                alt="Team Image"
                height={"260"}
                width={410}
                className="w-96 h-20 object-cover desktop:-ml-11 -ml-9"
              />
              <h6 className=" desktop:text-base">Midrand, South Africa</h6>
            </div>
          </div>
          <div>
            <h5 className="desktop:text-xl text-lg mb-4 font-semibold">
              Pages
            </h5>
            <ul className="list-none">
              <li className={styles.footer_links_li}>
                <Link href={"/"}>Home</Link>
              </li>
              <li className={styles.footer_links_li}>
                <Link href={"pricing"}>App Pricing</Link>
              </li>
              <li className={styles.footer_links_li}>
                <Link href={"blog"}>Blogs</Link>
              </li>
              <li className={styles.footer_links_li}>
                <Link href={"about"}>About us</Link>
              </li>
              <li className={styles.footer_links_li}>
                <Link href={"contact"}>Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="desktop:text-xl text-lg mb-4 font-semibold">
              Services
            </h5>
            <ul className="list-none">
              <li className={styles.footer_links_li}>
                <Link href={"/services/web_development"}>Web Development</Link>
              </li>
              <li className={styles.footer_links_li}>
                <Link href={"/services/app_development"}>App Development</Link>
              </li>
              <li className={styles.footer_links_li}>
                <Link href={"/services/custom_software"}>Custom Software</Link>
              </li>
              <li className={styles.footer_links_li}>
                <Link href={"/services/game_development"}>
                  Game Development
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="desktop:text-xl text-lg mb-4 font-semibold">
              Social Media
            </h5>
            <ul className="list-none">
              <li className={styles.footer_links_li}>
                <a
                  href="https://www.facebook.com/profile.php?id=100092171062219"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              {/* <li className={styles.footer_links_li}>
                <Link href={"/"}>LinkedIn</Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h5 className="desktop:text-xl text-lg mb-0 font-semibold">
              Contact Us
            </h5>
            <ul className="list-none">
              <li
                className={styles.footer_links_li + " flex items-center gap-2"}
              >
                {/* <MdMail className="w-5 h-5" />
                <Link href={"mailto:sales@mrrobotdev.com"}>
                  sales@mrrobotdev.com
                </Link> */}
              </li>
              {/* <li className={styles.footer_links_li + " inline-flex gap-2"}>
                <MdPhone className="w-5 h-5" />
                <Link href={"tel:+27799577606"}>+27 79 957 7606</Link>
              </li> */}
              <li className={" mt-0 mb-4"}>
                <h5 className="desktop:text-xl font-semibold">
                  Subscribe to our Newsletter
                </h5>
              </li>
              <li className="relative mb-4">
                <form onSubmit={(e) => openModal(e)}>
                  <input
                    type="email"
                    className="md:py-1 desktop:py-2 text-[15px] px-4 pr-12 rounded-full w-full text-black"
                    placeholder="Your email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-primary-red desktop:px-4 desktop:py-2 px-2 py-1 rounded-r-full absolute right-0 h-full "
                  >
                    <IoPaperPlane className="w-6 h-6 " />
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl  overflow-hidden rounded-2xl bg-black px-6 text-left">
                  <div className="mt-2">
                    <div className="flex justify-between items-center">
                      <div className="text-white mb-12">
                        <div>
                          <img src="/desktop/captchaLogo.png" alt="" />
                        </div>
                        <h1 className="font-montserrat font-semibold mb-5 text-[18px]">
                          Verify your human identity to proceed securely.
                        </h1>
                        <span className="font-light font-montserrat text-[15px]">
                          Help us combat spam and maintain platform integrity.
                        </span>
                        <p className="mt-5 font-extralight font-montserrat text-[13px]">
                          Please Solve the Math problem below:
                        </p>
                        <div>
                          {isSubmitted && !isBot ? (
                            <>
                              <img
                                src="/desktop/verified.png"
                                alt=""
                                className="mt-2"
                              />
                              <div className="flex items-center mt-2 gap-2">
                                <span>Please wait</span>
                                <Spinner />
                              </div>
                            </>
                          ) : (
                            <>
                              <form onSubmit={handleSubmit}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`${
                                      isSubmitted && isBot
                                        ? "border-primary-red border-4"
                                        : "border-none"
                                    } flex bg-white items-center p-1.5 rounded-2xl w-[170px] mt-2`}
                                  >
                                    <p className="text-black font-bold ml-1">{`${firstNumber} ${operator} ${secondNumber} =`}</p>
                                    <input
                                      type="text"
                                      value={userAnswer}
                                      onChange={handleChange}
                                      className="text-black w-[70px] p-1.5 font-bold focus:outline-none"
                                    />
                                  </div>
                                  <HiOutlineRefresh
                                    className="w-7 h-7 cursor-pointer"
                                    onClick={handleTryAgain}
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                  {isSubmitted && isBot && (
                                    <>
                                      <span className="text-primary-red text-[14px] mt-1">
                                        Verification failed, try again
                                      </span>
                                    </>
                                  )}

                                  <button
                                    type="submit"
                                    className="bg-primary-red text-white rounded-2xl px-3.5 py-1 mt-2"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <img
                          src="/desktop/captcha.png"
                          alt=""
                          className="w-[250px] h-[250px]"
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={confirmation} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSuccessModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white md:p-12 p-6 text-left">
                  <img
                    src={`/images/commons/${
                      isError ? "error-message.svg" : "success-message.svg"
                    }`}
                    height={100}
                    width={100}
                    className="mx-auto mb-4"
                    alt="Success Message"
                  />
                  <button
                    onClick={closeSuccessModal}
                    className="absolute right-4 top-4"
                  >
                    <HiXMark className="w-6 h-6 stroke-1" />
                  </button>
                  <h1 className="text-center font-bold text-2xl text-gray-800 mb-5">
                    {isError ? "Oops! Sorry" : "Awesome"}
                  </h1>
                  <p className="text-center font-medium">
                    {isError
                      ? `${errorMessage}`
                      : `  Thank you for Subscribing to our Newsletter. Please check
                    your Email to get more details.`}
                  </p>
                  <div className="text-center mt-6">
                    <button
                      onClick={closeSuccessModal}
                      className=" py-2 rounded-full bg-black text-white font-medium px-8"
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className=" mx-auto max-w-desktop desktop:px-32 lg:px-20 px-5 flex justify-between items-center desktop:text-xl text-sm text-white">
        <ul className="list-none flex py-8 gap-8 ">
          <li className="hover:text-underline">
            <Link href={"/"}>Cookies Policy</Link>
          </li>

          <li className="hover:text-underline">
            <Link href={"/"}>Privacy Policy</Link>
          </li>

          <li className="hover:text-underline">
            <Link href={"/"}>Terms & Condition</Link>
          </li>
        </ul>
        <span>© 2023, Mr.RobotDev PTY LTD, All Rights Reserved</span>
      </div>
    </footer>
  );
}
