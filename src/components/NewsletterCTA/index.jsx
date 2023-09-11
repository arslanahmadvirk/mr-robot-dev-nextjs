/* eslint-disable @next/next/no-img-element */
import CombineRepository from "@/repositories/CombineRepository";
import { useState, useEffect } from "react";
import alert from "../Notification/Alert";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { baseURL } from "@/helpers/generic";
import axios from "axios";
import { HiXMark } from "react-icons/hi2";
import ModalOverlay from "../ModalOverlay";
import Spinner from "../svgs/spinner";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="md:mt-10 mt-0 mx-auto desktop:px-32 lg:px-20 px-5 py-24">
      <h1 className="text-center desktop:text-6xl lg:text-4xl text-xl font-bold text-white mb-10">
        <span>Subscribe to </span>
        <span className="text-primary-red">Our</span> Newsletter
      </h1>
      <div className="text-center">
        <form onSubmit={(e) => openModal(e)}>
          <span className="relative">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black desktop:py-3 px-4 pr-24 py-2 rounded-full bg-white lg:w-[450px] md:w-[400px] w-full placeholder:text-sm placeholder:text-black drop-shadow-md"
              placeholder="Your Email..."
            />

            <button
              type="submit"
              className="px-4 desktop:py-3 py-2 rounded-full text-white bg-primary-red absolute right-0 hover:bg-primary-red-dark "
            >
              Submit
            </button>
          </span>
        </form>
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
                <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-2xl bg-black px-6 text-left">
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
      {/* <ModalOverlay isOpen={isOpen || confirmation} /> */}
    </div>
  );
}
