import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { ToastContainer } from "react-toastify";
import { HiArrowRightCircle } from "react-icons/hi2";
import socket from "../../socket";
import "react-toastify/dist/ReactToastify.css";
import chatsRepository from "@/repositories/chatsRepository";
import { ChatBox } from "@/components/Chat/ChatBox";
import alert from "@/components/Notification/Alert";
import Modal from "@/components/Modal";
import { Dialog } from "@headlessui/react";
import ModalOverlay from "@/components/ModalOverlay";
import { useRouter } from "next/router";
import CombineRepository from "@/repositories/CombineRepository";
import useMediaQuery from "@/hooks/useMediaQuery";
import * as Yup from "yup";
import { Formik } from "formik";
import Spinner from "@/components/svgs/spinner";

const monteserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [botStep, setBotStep] = useState(1);
  const [staffUser, setStaffUser] = useState();
  const [isBotVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const isMobileScreen = useMediaQuery("(max-width: 640px)");
  const [currentUser, setCurrentUser] = useState();
  const [unavailableMessage, setUnavailableMessage] = useState(true);
  const [onlineStaffUsers, setOnlineStaffUsers] = useState([]);
  const [emailTranscript, setEmailTranscript] = useState(false);
  const [isCloseChatModalOpen, setIsCloseChatModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    surName: "",
    email: "",
    phoneNo: "",
    subject: "",
    message: "",
  });
  const formRef = useRef(null);
  function openCloseChatModal() {
    setIsCloseChatModalOpen(true);
  }
  function closeChatModal() {
    setIsCloseChatModalOpen(false);
    setIsVisible(false);
  }
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const contactUs = async (values) => {
    const payload = {
      fullName: `${values.firstName} ${values.surName}`,
      email: values.email,
      phoneNo: values.phoneNo,
      subject: values.subject,
      message: values.message,
      type: "Live chat",
    };
    setLoading(true);
    try {
      const data = await CombineRepository.contactUs(payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert.showErrorAlert("something went wrong");
    }
  };
  const createChatUser = async (values) => {
    // e.preventDefault();
    if (unavailableMessage) {
      contactUs(values);
      setBotStep(4);
    } else {
      const payload = {
        firstName: values.firstName,
        surName: values.surName,
        email: values.email,
        phoneNo: values.phoneNo,
      };
      try {
        const user = await chatsRepository.createChatUser(payload);
        setCurrentUser(user.result.id);
        socket.emit("new-user-add", user.result.id, staffUser.socketId);
        socket.on("get-staff", (onlineStaffUsers) => {
          setOnlineStaffUsers(onlineStaffUsers);
        });

        if (staffUser) {
          const chatpayload = {
            senderId: user.result.id,
            receiverId: staffUser.userId,
          };

          const chat = await chatsRepository.createChat(chatpayload);
          setChat(chat.result);
          sessionStorage.setItem(
            "chat",
            encodeURI(JSON.stringify(chat.result))
          );
          setBotStep(4);
        } else {
          console.log("No staff User available for chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const startChat = () => {
    setIsVisible(true);
    const alreadyChat = JSON.parse(decodeURI(sessionStorage.getItem("chat")));
    if (alreadyChat) {
      socket.emit("get-online-users");
      socket.on("online-staff-users", (onlinestaffusers) => {
        setOnlineStaffUsers(onlinestaffusers);
      });
      setChat(alreadyChat);
      setIsVisible(true);
      setBotStep(4);
    } else {
      socket.emit("get-staff-user");
      socket.once("online-staff-user", async (staffUser) => {
        if (staffUser) {
          setStaffUser(staffUser);
          try {
            const userDetail = await CombineRepository.getUserById(
              staffUser.userId
            );
            setUnavailableMessage(false);
            setChat({ receiverId: userDetail.results });
            setOnlineStaffUsers([staffUser]);
            setIsVisible(true);
            setBotStep(1);
          } catch (error) {
            alert.showErrorAlert(error);
          }
        } else {
          setChat(null);
          setIsVisible(true);
          setBotStep(1);
        }
      });
    }
  };

  // useEffect(() => {
  //   socket.emit("get-staff-user");
  //   socket.once("online-staff-user", async (staffUser) => {
  //     if (staffUser) {
  //       setStaffUser(staffUser);
  //     } else {
  //       setUnavailableMessage(true);
  //     }
  //   });
  // }, []);
  async function handleCloseChat() {
    if (chat) {
      sessionStorage.clear();
      setChat(null);
      setStaffUser(null);
      setIsVisible(false);
      setEmailTranscript(false);
      setUnavailableMessage(false);
      closeChatModal();
      console.log(emailTranscript);
      if (emailTranscript) {
        console.log("email sended");
        const payload = {
          chat,
        };
        try {
          await chatsRepository.sendChatLink(payload);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  function checkOnlineStatus(staffUser) {
    const chatmember = staffUser;
    const online = onlineStaffUsers.find((user) => user.userId == chatmember);
    return online ? true : false;
  }
  async function getChatByLink(link) {
    try {
      const chat = await chatsRepository.getChatByLink(router.query.chatlink);
      setChat(chat.result);
      setBotStep(4);
      setIsVisible(true);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserIp() {
    try {
      await CombineRepository.getUserDetails();
    } catch (error) {}
  }
  useEffect(() => {
    // getUserIp();
    if (router.query.chatlink) {
      getChatByLink();
    }
  }, [router.query]);

  let userSchema = unavailableMessage
    ? Yup.object({
        firstName: Yup.string()
          .matches(
            /^[A-Za-z\s]+$/,
            "Name should only contain alphabetic characters"
          )
          .required("First name is required"),
        surName: Yup.string()
          .matches(
            /^[A-Za-z\s]+$/,
            "Name should only contain alphabetic characters"
          )
          .required("Last name is required"),
        phoneNo: Yup.string()
          .matches(/^\d+$/, "Phone number must contain only digits")
          .required("Phone number is required"),
        subject: Yup.string().required("Subject is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required")
          .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Invalid domain in email"
          ),
        message: Yup.string().required("Message is required"),
      })
    : Yup.object({
        firstName: Yup.string()
          .matches(
            /^[A-Za-z\s]+$/,
            "Name should only contain alphabetic characters"
          )
          .required("First name is required"),
        surName: Yup.string()
          .matches(
            /^[A-Za-z\s]+$/,
            "Name should only contain alphabetic characters"
          )
          .required("Last name is required"),
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
    <main className={`${monteserrat.variable} font-montserrat`}>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        position={"top-center"}
      />
      <Component {...pageProps} />
      <button
        onClick={startChat}
        className="fixed bottom-5 right-5 p-1 bg-white rounded-full z-50 "
      >
        <Image
          src={"/images/commons/icon.png"}
          width={60}
          height={60}
          alt="ChatBot Icon "
          className="relative"
        />
        {/* <div
          className={`${
            unavailableMessage ? "bg-gray-500" : "bg-[#1fff00]"
          } rounded-full w-4 right-0 top-12 h-4 absolute`}
        /> */}
      </button>
      <div
        className={`${
          isBotVisible ? "block" : "hidden"
        } fixed md:w-[350px] w-80 z-50 rounded-lg shadow bottom-5 md:right-5 ${
          isMobileScreen && "left-1/2 transform -translate-x-1/2"
        } bg-white`}
      >
        <div className="px-4 py-2 bg-primary-red-dark rounded-t-lg flex gap-6 items-center text-sm relative">
          <div className="w-12 h-12 relative">
            <Image
              src={"/icon.png"}
              width={200}
              height={200}
              className="rounded-full object-cover w-12 h-12 "
              alt="Bot Avatar"
            />
            <span
              className={`w-3 h-3 rounded-full absolute bottom-2 -right-1 ${
                checkOnlineStatus(chat?.receiverId?.id)
                  ? " bg-green-500"
                  : "bg-gray-400"
              }`}
            ></span>
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {chat?.receiverId?.firstName}
            </h3>
            {!unavailableMessage && (
              <h6 className="text-white">
                {checkOnlineStatus(chat?.receiverId?.id) ? "Online" : "Offline"}
              </h6>
            )}
          </div>
          <button
            onClick={() => {
              chat?.senderId ? openCloseChatModal() : setIsVisible(false);
            }}
          >
            <HiXMark className="w-6 h-6 stroke-2 stroke-white fill-white absolute top-2 right-2" />
          </button>
        </div>
        {(botStep === 1 &&
          (!unavailableMessage ? (
            <div className="my-20">
              <div className="mx-auto w-56 h-56 pt-16 rounded-full bg-primary-red-dark text-white text-center">
                <h2 className="text-2xl font-bold text-center">
                  Welcome to Mr.RobotDev
                </h2>
                <button onClick={() => setBotStep(2)}>
                  <HiArrowRightCircle className="fill-white w-16 h-16" />
                </button>
              </div>
            </div>
          ) : (
            <div className=" bg-white rounded-xl text-center p-8 ">
              <p className="font-medium mb-4 text-left">
                Currently we are offline. Please{" "}
                <button
                  onClick={() => setBotStep(3)}
                  className="text-primary-red "
                >
                  leave a message
                </button>{" "}
                for us so that we can get back to you immediately. <br /> <br />
                Again Sorry for the inconvenience.
                <br />
                <br />
                Regards,
                <br />
                Mr.RobotDev.
              </p>
              <button
                onClick={closeChatModal}
                className="py-1 px-8 rounded-full bg-black text-white"
              >
                Close
              </button>
            </div>
          ))) ||
          (botStep === 2 && (
            <div className=" text-xs py-2 h-96 overflow-auto">
              <Image
                src={"/images/commons/chat-header.png"}
                width={250}
                height={250}
                className="mx-auto relative"
                alt="Bot Avatar"
              />

              <div className="bg-gray-200 rounded-lg mx-5 px-8 py-4 font-medium">
                {chat && (
                  <h4>{`Hey, My Name is ${chat?.receiverId?.firstName}`}</h4>
                )}
                <p>
                  {`Welcome to Mr.RobotDev, we are a leading and
                                    fastest growing company in the world,
                                    providing solutions that takes your
                                    businesses to the next level. I’m here to
                                    help.`}
                  <br />
                  <br />
                  I just need a few details and we’ll get going.
                  <br />
                  <br />
                  Are you ready to set?
                </p>
                <button
                  onClick={() => setBotStep(3)}
                  className="mt-6 rounded-full px-6 py-2 bg-primary-red-dark text-white block w-32 mx-auto"
                >
                  {"Let's do this"}
                </button>
              </div>
            </div>
          )) ||
          (botStep === 3 && (
            <div className="px-5 py-10 bg-gray-100 h-96 overflow-auto rounded-md">
              <Formik
                innerRef={formRef}
                initialValues={userData}
                validationSchema={userSchema}
                onSubmit={(values) => {
                  createChatUser(values);
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
                  <form onSubmit={handleSubmit}>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 font-semibold text-sm"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your First Name"
                      className=" w-full rounded-full px-4 py-2  placeholder:text-gray-500 placeholder:text-xs border border-gray-500 focus:outline-none"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="text-red-600  ml-3 text-[12px]">
                        {errors.firstName}
                      </div>
                    )}
                    <label
                      htmlFor="surName"
                      className="block mb-2 mt-4 font-semibold text-sm"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="surName"
                      name="surName"
                      placeholder="Enter your Last Name"
                      className=" w-full rounded-full px-4 py-2  placeholder:text-gray-500 placeholder:text-xs border border-gray-500 focus:outline-none"
                      value={values.surName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.surName && touched.surName && (
                      <div className="text-red-600  ml-3 text-[12px]">
                        {errors.surName}
                      </div>
                    )}
                    <label
                      htmlFor="email"
                      className="block mb-2 mt-4 font-semibold text-sm"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      className=" w-full rounded-full px-4 py-2  placeholder:text-gray-500 placeholder:text-xs border border-gray-500 focus:outline-none"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-600  ml-3 text-[12px]">
                        {errors.email}
                      </div>
                    )}
                    <label
                      htmlFor="phone"
                      className="block mb-2 mt-4 font-semibold text-sm"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phoneNo"
                      placeholder="Enter your Phone"
                      className=" w-full rounded-full px-4 py-2  placeholder:text-gray-500 placeholder:text-xs border border-gray-500 focus:outline-none"
                      value={values.phoneNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNo && touched.phoneNo && (
                      <div className="text-red-600  ml-3 text-[12px]">
                        {errors.phoneNo}
                      </div>
                    )}
                    {unavailableMessage && (
                      <>
                        {" "}
                        <label
                          htmlFor="subject"
                          className="block mb-2 mt-4 font-semibold text-sm"
                        >
                          Subject
                        </label>
                        <select
                          name="subject"
                          id="subject"
                          className=" w-full rounded-full px-4 py-2.5 text-xs border border-gray-500 focus:outline-none"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">--Select Subject--</option>
                          <option value="Technical">Technical</option>
                          <option value="Sales">Sales</option>
                          <option value="General Information">
                            General Information
                          </option>
                          <option value="Marketing Executive">
                            Marketing Executive
                          </option>
                        </select>
                        {errors.subject && touched.subject && (
                          <div className="text-red-600  ml-3 text-[12px]">
                            {errors.subject}
                          </div>
                        )}
                        <label
                          htmlFor="message"
                          className="block mb-2 mt-4 font-semibold text-sm"
                        >
                          Message
                        </label>
                        <textarea
                          type="text"
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Type your message here"
                          className=" w-full rounded-2xl px-4 py-2  placeholder:text-gray-500 placeholder:text-xs border border-gray-500 focus:outline-none"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.message && touched.message && (
                          <div className="text-red-600  ml-3 text-[12px]">
                            {errors.message}
                          </div>
                        )}
                      </>
                    )}
                    <button
                      type="submit"
                      className="rounded-full w-full block py-2 mt-4 text-sm text-white font-semibold bg-primary-red-dark"
                      disabled={loading}
                    >
                      {loading && <Spinner />}

                      {unavailableMessage ? "Submit" : "Let's begin the Chat"}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          )) ||
          (botStep === 4 && !unavailableMessage ? (
            <ChatBox chat={chat} socket={socket} />
          ) : (
            <div className=" bg-white rounded-xl text-center p-8 ">
              <p className="font-medium mb-4 text-left">
                {` Thank you for visiting our Live Chat support!
                                We're sorry that we are offline right now.`}
                <br />
                <br />
                {`We'll get back to you as soon as
                                possible. You can also reach us on Contact us
                                page from our site.`}{" "}
                <br />
                <br />
                We apologize for any inconvenience and appreciate your patience.
                Thank you for considering our software development services!
                <br />
                <br />
                Best regards,
                <br />
                <br />
                Mr.RobotDev.
              </p>
              <button
                onClick={closeChatModal}
                className="py-1 px-8 rounded-full bg-black text-white"
              >
                Close
              </button>
            </div>
          ))}
      </div>

      <Modal
        isOpen={isCloseChatModalOpen}
        openModal={openCloseChatModal}
        closeModal={closeChatModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Are you sure want to close this chat?
        </Dialog.Title>
        <div className=" mx-auto w-40 flex justify-between mt-4">
          <button
            onClick={handleCloseChat}
            className="text-white inline-block bg-[#D32A3D] font-medium px-6 py-2 rounded-full"
          >
            Yes
          </button>
          <button
            onClick={closeChatModal}
            className="text-white inline-block bg-black font-medium px-6 py-2 rounded-full"
          >
            No
          </button>
        </div>
        <div className="w-full text-center  mt-4">
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-900">
              Email transcript
            </span>
            <input
              type="checkbox"
              value={emailTranscript}
              className="sr-only peer"
              onChange={() => {
                setEmailTranscript((prev) => !prev);
              }}
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[18px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
          </label>
        </div>
      </Modal>
      <ModalOverlay isOpen={isCloseChatModalOpen} />
    </main>
  );
}
