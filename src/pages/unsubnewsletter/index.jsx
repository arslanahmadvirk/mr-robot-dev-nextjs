import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { baseURL } from "@/helpers/generic";
import axios from "axios";
import CombineRepository from "@/repositories/CombineRepository";
import { toast } from "react-toastify";
import Head from "next/head";

export default function UnsubNewsLetter() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    status: "unsubscribed",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
    setErrorMessage("");
  };

  const handleCancel = function () {
    router.push("/");
  };
  const handleRedirect = function () {
    router.push("/");
  };

  const handleLogin = function () {
    // console.log("Login User");
    router.push("/");
  };

  async function subscribeNewsLetter() {
    console.log("Email", data.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(data.email)) {
      let payload = {
        email: data?.email,
      };
      try {
        const data1 = await CombineRepository.subscribeNewsLetter(payload);
        setStep(2);
        setData({ email: "", status: "unsubscribe" });
      } catch (error) {
        console.log(error);
        toast.error("And error occured", {});
        // alert.showErrorAlert(error);
      }
    } else {
      setErrorMessage("Please enter your valid Email Address!!");
    }
  }
  const unsubNewsletter = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(data.email)) {
      try {
        const response = await axios.post(
          `${baseURL}/users/newsletterusers/unsub`,
          data
        );
        setStep(1);
        setData({ email: "", status: "unsubscribe" });
      } catch (e) {
        toast.error("And error occured", {});
      }
    } else {
      setErrorMessage("Please enter your valid Email Address!!");
    }
  };
  return (
    <>
      <Head>
        <title>Unsubscribe Newsletter | Mr.RobotDev</title>
      </Head>
      <main className="mx-auto  max-w-desktop font-montserrat">
        <div className="bg-redish w-screen h-screen  relative">
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-2xl w-full rounded-xl p-8 bg-white">
            <Image
              src={`/images/commons/${
                step === 2 ? "newsletter-sent" : "newsletter-sad"
              }.svg`}
              width={173}
              height={156}
              alt="newsletter image"
              className="w-24 h-24 mx-auto my-4"
            />
            <h1 className="font-bold text-3xl text-center">
              {(step === 0 && "Are you sure about unsubscribing?") ||
                (step === 1 && "Sorry to see you go!") ||
                (step === 2 && "Thank you for subscribing to our newsletter")}
            </h1>
            <p className="font-medium text-center px-10 py-4">
              {(step === 0 &&
                "if you unsubscribe now, you will miss our latest blogs and updates.") ||
                (step === 1 &&
                  "You have successfully unsubscribed to our newsletter! We hope to see you soon. ") ||
                (step === 2 &&
                  "We appreciate your interest and look forward to keeping you informed with the latest updates, insights, and trends in the software development industry.  Welcome to our community!")}
            </p>
            {(step === 0 || step === 1) && (
              <div className="px-7 mt-2 mb-6">
                <label
                  htmlFor="Email"
                  className="font-montserrat text-sm mb-2 md:hidden pl-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className={
                    "rounded-full bg-white  border border-gray-600 focus:outline-none w-full px-4 py-3 placeholder:text-gray-500  text-black"
                  }
                  placeholder={`${
                    step == 1
                      ? "Enter Email to Resubscribe"
                      : "Enter Email to Unsubscribe"
                  }`}
                  onChange={(e) => handleData("email", e.target.value)}
                  value={data.email}
                  required
                />
                {errorMessage !== "" && (
                  <p className="text-center font-medium text-primary-red mt-1">
                    {errorMessage}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-center text-center gap-6 my-4 text-medium">
              <button
                onClick={
                  (step === 0 && handleCancel) || (step === 1 && handleRedirect)
                }
                className={`${
                  (step === 0 && "bg-primary-red hover:bg-primary-red-dark") ||
                  (step === 1 && "bg-black") ||
                  (step === 2 && "hidden")
                }  transition py-2 w-40 rounded-full text-white`}
              >
                {step === 0 ? "Cancel" : step === 1 ? "Back to Home" : ""}
              </button>

              <button
                onClick={
                  (step === 0 && unsubNewsletter) ||
                  (step === 1 && subscribeNewsLetter) ||
                  (step === 2 && handleLogin)
                }
                className={`py-2 w-40 rounded-full ${
                  step === 0
                    ? "border border-gray-900 text-black"
                    : "bg-primary-red hover:bg-primary-red-dark text-white"
                }  transition hover:bg-[#232323] hover:text-white`}
              >
                {(step === 0 && "Unsubscribe") ||
                  (step === 1 && "Resubscribe") ||
                  (step === 2 && "Back to Home")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
