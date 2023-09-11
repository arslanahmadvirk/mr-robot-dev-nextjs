/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import GlassCard from "@/components/GlassCard";
import MobileFooter from "@/components/MobileFooter";
import Navbar from "@/components/Navbar";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "@/helpers/generic";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import * as Yup from "yup";
import { Formik } from "formik";
import Head from "next/head";
import Spinner from "@/components/svgs/spinner";
import { useRouter } from "next/router";
import { clientURL } from "@/repositories/genericRepository";

export default function AppPricing() {
  const isMobileScreen = useMediaQuery("(max-width: 640px");
  const [selectedService, setSelectedService] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedFunctionalities, setSelectedFunctionalities] = useState([]);
  const [functionalities, setFunctionalities] = useState([]);
  const [services, setServices] = useState([]);
  const [device, setDevice] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const myDivRef = useRef(null);
  const myFormRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactData, setContactData] = useState();
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const canonicalUrl = `${clientURL}${router.asPath}`;

  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
  });

  function closeModal() {
    setIsOpen(false);
    setIsSubmitted(false);
    setUserAnswer("");
    generateNewQuestion();
  }

  function openModal(values) {
    setContactData(values);
    setIsOpen(true);
  }

  const getPricingItems = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/pricingitems`);
      console.log(data);
      if (data?.Service) {
        setServices(data?.Service);
      }
      if (data?.Device) {
        setDevice(data?.Device);
      }

      if (data?.Functionality) {
        setFunctionalities(data?.Functionality);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    getPricingItems();
  }, []);

  function handleServices(event) {
    const { value } = event.target;
    const { price } = event.target.dataset;
    setSelectedService({
      name: value,
      price: price,
    });
  }
  const handleFeatures = (event) => {
    const { value, checked } = event.target;
    const { price } = event.target.dataset;
    if (Object.keys(selectedService).length == 0) {
      navigateToDiv();
      return;
    }

    if (checked) {
      setSelectedFeatures((prevSelectedFeatures) => [
        ...prevSelectedFeatures,
        { name: value, price: price },
      ]);
    } else {
      setSelectedFeatures((prevSelectedFeatures) =>
        prevSelectedFeatures.filter((item) => item.name !== value)
      );
    }
  };
  const handleFunctionalities = (event) => {
    const { value, checked } = event.target;
    const { price } = event.target.dataset;
    if (Object.keys(selectedService).length == 0) {
      navigateToDiv();
      return;
    }

    if (checked) {
      setSelectedFunctionalities((prevSelectedFunctionalities) => [
        ...prevSelectedFunctionalities,
        { name: value, price: price },
      ]);
    } else {
      setSelectedFunctionalities((prevSelectedFunctionalities) =>
        prevSelectedFunctionalities.filter((item) => item.name !== value)
      );
    }
  };
  const isFeatureSelected = (value) => {
    return selectedFeatures.filter((item) => item.name === value).length === 1;
  };
  const isFunctionalitySelected = (value) => {
    return (
      selectedFunctionalities.filter((item) => item.name === value).length === 1
    );
  };

  const totalPrice = [
    selectedService,
    ...selectedFeatures,
    ...selectedFunctionalities,
  ].reduce((total, item) => {
    return total + +item.price;
  }, 0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if ((isMobileScreen && window.scrollY >= 100) || window.scrollY >= 800) {
  //       setRevealed(true);
  //     } else setRevealed(false);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  // }, [isMobileScreen]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate the position where you want to hide the component from the top (e.g., 100 pixels from the top)
      const hideTopPosition = 700;

      // Calculate the position where you want to hide the component from the bottom (e.g., 20 pixels from the bottom)
      const hideBottomPosition = documentHeight - windowHeight - 600;

      if (
        scrollPosition <= hideTopPosition ||
        scrollPosition >= hideBottomPosition
      ) {
        setRevealed(false);
      } else {
        setRevealed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileScreen]);

  const navigateToDiv = () => {
    if (!toast.isActive("my-toast-id5")) {
      toast.error("Please select build first!!", {
        toastId: "my-toast-id5",
      });
      if (myDivRef.current) {
        myDivRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const navigateToForm = () => {
    if (myFormRef.current) {
      myFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const payload = {
      fullName: contactData.fullName,
      email: contactData.email,
      phoneNo: contactData.phoneNo,
      type: "App pricing",
      appPricing: {
        service: [selectedService],
        functionalities: [...selectedFunctionalities],
        devices: [...selectedFeatures],
        totalPrice: Number(totalPrice.toFixed(2)),
      },
    };
    try {
      const response = await axios.post(`${baseURL}/contactus`, payload);
      toast.success("Information Submitted Successfully", {});
      closeModal();
      setData({
        fullName: "",
        email: "",
        phoneNo: "",
      });
      setSelectedService({});
      setSelectedFeatures([]);
      setSelectedFunctionalities([]);
      formRef.current.resetForm();
    } catch (e) {
      toast.error("Something went wrong!!", {});
      console.log("Error Post", e);
      closeModal();
    }
  };

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
      handlesubmit(e);
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

  let userSchema = Yup.object({
    fullName: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        "Name should only contain alphabetic characters"
      )
      .required("Name is required"),
    phoneNo: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid domain in email"
      ),
  });

  return (
    <>
      <Head>
        <title>Pricing | Mr.RobotDev</title>
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      <div className="mx-auto desktop:px-32 lg:px-20 px-5 lg:bg-[#3C64B122] bg-black/20">
        <Navbar />
      </div>
      <main className="mx-auto bg-no-repeat max-w-desktop font-montserrat text-white">
        <div className=" mx-auto desktop:px-36 lg:px-28 px-5 lg:py-24 py-10">
          <h1 className="text-center font-bold lg:text-6xl text-3xl">
            <span>
              <Image
                src={"/images/commons/bars.svg"}
                height={50}
                width={50}
                alt="Mr.RobotDev"
                className="hidden lg:inline"
              />
            </span>
            <span className="text-primary-red">App </span>
            Pricing
          </h1>
          <p className="desktop:max-w-3xl max-w-2xl text-center my-6 mx-auto">
            {` To assist in estimating the costs associated especially with app
          development, we've developed this pricing form. Play around with it,
          and if you need some help, feel free to contact us anytime.`}
          </p>
        </div>
        <div
          className=" mx-auto desktop:px-36 lg:px-10 px-5 lg:py-24 py-10"
          id="myDiv"
          ref={myDivRef}
        >
          <div className="flex justify-between items-center mb-16">
            <h1 className="desktop:text-4xl text-2xl lg:text-left text-center font-semibold">
              <span className="text-primary-red">What</span> Do You Want To
              Build ?
            </h1>
            <h1 className="text-[90px] hidden md:block absolute right-0 font-montserrat font-bold text-gray-400 opacity-10">
              BUILD
            </h1>
          </div>
          <div className="flex gap-20 justify-between">
            <div className="lg:w-3/5 sm:w-4/5 w-full mx-auto grid sm:grid-cols-2 grid-cols-1 gap-10 justify-between self-start">
              {services?.length < 1 && (
                <>
                  <h1 className="desktop:text-2xl text-md lg:text-left text-center font-semibold">
                    There are no items to show.{" "}
                    <Link href={"/contact"}>
                      <span className="text-primary-red">Contact Us</span>
                    </Link>
                  </h1>
                </>
              )}
              {services?.map((item, index) => (
                <>
                  <label htmlFor={item?.name}>
                    <GlassCard
                      key={index}
                      isSelected={
                        selectedService.name === item.name ? true : false
                      }
                      image={item?.logo}
                      name={item?.name}
                      desc={item?.description}
                    />
                  </label>
                  <input
                    type="radio"
                    name="service"
                    id={item?.name}
                    value={item?.name}
                    className="hidden"
                    data-price={item?.price}
                    onChange={handleServices}
                  />
                </>
              ))}
            </div>
            <div
              id="CTA"
              className="lg:w-2/5 md:block hidden bg-[#D32A3D] px-10 py-10 lg:rounded-2xl rounded-xl h-full"
            >
              <div className="flex justify-between text-sm mb-8">
                <div>
                  <h3 className="mb-4 font-semibold desktop:text-lg text-base">
                    Your Selection
                  </h3>
                  <h4 className="font-semibold text-center border-b pb-2 mb-4 border-dashed">
                    {selectedService.name}
                  </h4>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFeatures.map((feature, index) => (
                      <li key={index}>{feature.name}</li>
                    ))}
                  </ul>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFunctionalities.map((functionality, index) => (
                      <li key={index}>{functionality.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold desktop:text-lg text-base">
                    Estimated Cost
                  </h3>
                  <span className="text-xs">(Subject to Final Scope)</span>
                  <h4 className="font-semibold text-center border-b pb-2 mb-4 border-dashed">
                    {selectedService.price}
                  </h4>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFeatures.map((feature, index) => (
                      <li key={index}>{feature.price}</li>
                    ))}
                  </ul>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFunctionalities.map((functionality, index) => (
                      <li key={index}>{functionality.price}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h1 className="text-4xl text-center font-bold text-white font-montserrat">
                R {isNaN(totalPrice) ? 0 : totalPrice?.toFixed(2)}
              </h1>

              <Formik
                innerRef={formRef}
                initialValues={data}
                validationSchema={userSchema}
                onSubmit={(values) => {
                  openModal(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form
                    className=" flex flex-col gap-4 mt-5"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      name="fullName"
                      className="bg-white italic px-4 py-2 w-full rounded-full focus:outline-none text-gray-700"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.fullName && touched.fullName && (
                      <div className="text-white  ml-3 text-[15px]">
                        {errors.fullName}
                      </div>
                    )}
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="bg-white px-4 py-2 italic w-full rounded-full focus:outline-none text-gray-700"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.email && touched.email && (
                      <div className="text-white  ml-3 text-[15px]">
                        {errors.email}
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Phone No"
                      name="phoneNo"
                      className="bg-white px-4 py-2 italic w-full rounded-full focus:outline-none text-gray-700"
                      value={values.phoneNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.phoneNo && touched.phoneNo && (
                      <div className="text-white  ml-3 text-[15px]">
                        {errors.phoneNo}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="bg-[#262626] font-montserrat w-full p-3 rounded-full "
                    >
                      Get back to me
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="  mx-auto desktop:px-36 lg:px-10 px-5 lg:py-24 py-10">
          <div className="flex items-center justify-between mb-16">
            <h1 className="desktop:text-4xl text-2xl lg:text-left text-center font-semibold ">
              <span className="text-primary-red">What</span> Device Features
              Does It Need?
            </h1>
            <h1 className="text-[90px] hidden md:block absolute right-0 font-montserrat font-bold text-gray-400 opacity-10">
              FEATURES
            </h1>
          </div>
          <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 justify-between">
            {device?.length < 1 && (
              <>
                <h1 className="desktop:text-2xl text-md lg:text-left text-center font-semibold">
                  There are no items to show.{" "}
                  <Link href={"/contact"}>
                    <span className="text-primary-red">Contact Us</span>
                  </Link>
                </h1>
              </>
            )}
            {device?.map((feature, index) => (
              <>
                <label htmlFor={feature?.name}>
                  <GlassCard
                    key={index}
                    isSelected={isFeatureSelected(feature?.name)}
                    image={feature?.logo}
                    name={feature?.name}
                    desc={feature?.description}
                  />
                </label>
                <input
                  type="checkbox"
                  name={feature.name}
                  id={feature.name}
                  value={feature.name}
                  onChange={handleFeatures}
                  data-price={feature.price}
                  className="hidden"
                />
              </>
            ))}
          </div>
        </div>
        <div className="  mx-auto desktop:px-36 lg:px-10 px-5 lg:py-24 py-10">
          <div className="flex items-center justify-between mb-16">
            <h1 className="desktop:text-4xl text-2xl lg:text-left text-center font-semibold ">
              <span className="text-primary-red">What</span> Functionality
              Should It Have?
            </h1>
            <h1 className="text-[90px] hidden md:block absolute right-0 font-montserrat font-bold text-gray-400 opacity-10">
              FUNCTIONALITY
            </h1>
          </div>
          <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 xl:gap-10 gap-5 justify-between">
            {functionalities?.length < 1 && (
              <>
                <h1 className="desktop:text-2xl text-md lg:text-left text-center font-semibold">
                  There are no items to show.{" "}
                  <Link href={"/contact"}>
                    <span className="text-primary-red">Contact Us</span>
                  </Link>
                </h1>
              </>
            )}
            {functionalities?.map((functionality, index) => (
              <>
                <label htmlFor={functionality?.name}>
                  <GlassCard
                    key={index}
                    isSelected={isFunctionalitySelected(functionality?.name)}
                    desc={functionality?.description}
                    image={functionality?.logo}
                    name={functionality?.name}
                  />
                </label>
                <input
                  type="checkbox"
                  name={functionality?.name}
                  id={functionality?.name}
                  value={functionality?.name}
                  data-price={functionality?.price}
                  onChange={handleFunctionalities}
                  className="hidden"
                />
              </>
            ))}
          </div>
        </div>
        {isMobileScreen && (
          <>
            <div
              className="bg-[#D32A3D] px-5 py-10 rounded-3xl mx-4 mb-12"
              id="formRef"
              ref={myFormRef}
            >
              <div className="flex justify-between gap-4 text-sm">
                <div>
                  <h3 className="mb-4 font-semibold desktop:text-lg text-base">
                    Your Selection
                  </h3>
                  <h4 className="font-semibold text-center border-b pb-2 mb-4 border-dashed">
                    {selectedService.name}
                  </h4>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFeatures.map((feature, index) => (
                      <li key={index}>{feature.name}</li>
                    ))}
                  </ul>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFunctionalities.map((functionality, index) => (
                      <li key={index}>{functionality.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold desktop:text-lg text-base">
                    Estimated Cost
                  </h3>
                  <span className="text-xs">(Subject to Final Scope)</span>
                  <h4 className="font-semibold text-center border-b pb-2 mb-4 border-dashed">
                    {selectedService.price}
                  </h4>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFeatures.map((feature, index) => (
                      <li key={index}>{feature.price}</li>
                    ))}
                  </ul>
                  <ul className="list-disc max-h-16 list-inside pb-2 mb-4 border-b border-dashed overflow-y-auto ">
                    {selectedFunctionalities.map((functionality, index) => (
                      <li key={index}>{functionality.price}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h1 className="text-[50px] text-center font-bold text-white font-montserrat">
                R {isNaN(totalPrice) ? 0 : totalPrice?.toFixed(2)}
              </h1>
              <Formik
                innerRef={formRef}
                initialValues={data}
                validationSchema={userSchema}
                onSubmit={(values) => {
                  openModal(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form
                    className=" flex flex-col gap-4 mt-5"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      name="fullName"
                      className="bg-white italic px-4 py-2 w-full rounded-full focus:outline-none text-gray-700"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.fullName && touched.fullName && (
                      <div className="text-white  ml-3 text-[15px]">
                        {errors.fullName}
                      </div>
                    )}
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="bg-white px-4 py-2 italic w-full rounded-full focus:outline-none text-gray-700"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.email && touched.email && (
                      <div className="text-white  ml-3 text-[15px]">
                        {errors.email}
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="Phone No"
                      name="phoneNo"
                      className="bg-white px-4 py-2 italic w-full rounded-full focus:outline-none text-gray-700"
                      value={values.phoneNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.phoneNo && touched.phoneNo && (
                      <div className="text-white  ml-3 text-[15px]">
                        {errors.phoneNo}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="bg-[#262626] font-montserrat w-full p-3 rounded-full "
                    >
                      Get back to me
                    </button>
                  </form>
                )}
              </Formik>
              {/* <div className="px-0 space-y-4 mt-5">
              <input
                type="text"
                placeholder="Name"
                className="bg-white italic p-3 w-full rounded-full focus:outline-none text-gray-700"
              />
              <input
                type="text"
                placeholder="Email"
                className="bg-white p-3 italic w-full rounded-full focus:outline-none text-gray-700"
              />

              <button className="bg-[#262626] font-montserrat w-full p-3 rounded-full text-[18px]">
                Get back to me
              </button>
            </div> */}
            </div>
          </>
        )}

        {revealed ? (
          <div className="sticky bottom-0 w-full py-4 md:px-20 px-5 bg-primary-red text-white text-center text-2xl font-bold z-10">
            <span>R {isNaN(totalPrice) ? 0 : totalPrice?.toFixed(2)}</span>
            <Link
              className=" hidden md:inline-block md:ml-60 sm:ml-10 ml-5 font-semibold border px-4 py-2 rounded-full border-white desktop:text-lg md:text-base text-sm"
              href={"/pricing#CTA"}
            >
              Get a Quote
            </Link>
            <button
              className="inline-block md:hidden md:ml-60 sm:ml-10 ml-5 font-semibold border px-4 py-2 rounded-full border-white desktop:text-lg md:text-base text-sm"
              onClick={() => navigateToForm()}
            >
              Get a Quote
            </button>
          </div>
        ) : (
          ""
        )}
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
      </main>
      {isMobileScreen ? <MobileFooter /> : <Footer />}
    </>
  );
}
