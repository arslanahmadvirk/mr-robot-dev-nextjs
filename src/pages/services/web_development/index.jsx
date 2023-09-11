import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import Navbar from "@/components/Navbar";
import useMediaQuery from "@/hooks/useMediaQuery";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { clientURL } from "@/repositories/genericRepository";

export default function WebDevelopment() {
  const isMobileScreen = useMediaQuery("(max-width: 640px");
  const router = useRouter();
  const canonicalUrl = `${clientURL}${router.asPath}`;
  return (
    <>
      <Head>
        <title>Web Development | Mr.RobotDev</title>
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      <div className="mx-auto desktop:px-36 lg:px-28 px-5 lg:bg-[#3C64B122] bg-black/20">
        <Navbar />
      </div>
      <main className="mx-auto max-w-desktop font-montserrat text-white">
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
            Website
            <span className="text-primary-red"> Development </span>
          </h1>
          <p className="max-w-4xl desktop:text-xl text-lg text-center my-6 mx-auto">
            {`we transform your business concepts into visually impressive web applications 
that enhance your productivity and efficiency.`}
          </p>
        </div>
        <div className=" mx-auto desktop:px-36 lg:px-28 px-5 lg:py-24 py-10 flex flex-col gap-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div className="basis-1/2 md:text-left text-center order-2 md:order-1">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> Custom </span>
                Website
              </h1>
              <p className="md:text-justify text-center  desktop:text-xl md:mx-0 mx-auto">
                {`We specialize in custom web development services that are tailored to meet the unique needs of businesses. Our focus is on creating high-performance, visually appealing, and user-friendly websites that drive business success. Trust us to deliver a web solution that meets your needs and those of your customers.`}
              </p>
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <Image
                src={"/images/commons/web-development-1.png"}
                width={700}
                height={400}
                alt="Team Image"
                className="desktop:w-[600px] w-[500px] mx-auto"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div className="basis-1/2">
              <Image
                src={"/images/commons/web-development-2.png"}
                width={700}
                height={400}
                alt="Team Image"
                className="desktop:w-[600px] w-[500px] mx-auto"
              />
            </div>
            <div className="basis-1/2 md:text-left text-center">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> We </span>
                take web development to the
                <span className="text-primary-red"> next </span> level
              </h1>
              <p className="md:text-justify text-center desktop:text-xl md:mx-0 mx-auto">
                {`Our approach to web development starts with a dedicated effort to understand your business and its unique requirements. We invest time in learning about your brand, target audience, and website objectives. This knowledge is then leveraged to develop a customized web development plan that is designed specifically to meet your needs. Our professionals will then collaborate with you to create a visually engaging, easy-to-use, and search engine-optimized website.`}
                <br />
                <br />
                {`We adopt the latest technologies and industry-leading best practices to ensure that your website is both swift and secure. Our web development services encompass continuous maintenance, regular updates, and technical support to ensure that your website remains up-to-date and operates at its best.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div className="basis-1/2 md:text-left text-center order-2 md:order-1">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> Modern </span>
                responsive design
              </h1>
              <p className="md:text-justify text-center desktop:text-xl md:mx-0 mx-auto">
                {`Having a modern responsive design is critical for successful web development. It ensures that your website functions seamlessly on any device, be it a desktop, tablet, or smartphone. With the widespread use of mobile devices, optimizing your website for all screen sizes is crucial.`}
                <br />
                <br />
                {` Responsive design improves the user experience, search engine visibility, and conversion rates. Our expert web development team is experienced in creating visually appealing, easy-to-navigate, and modern responsive designs that cater to all users, irrespective of the device they use.`}
              </p>
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <Image
                src={"/images/commons/web-development-3.png"}
                width={700}
                height={400}
                alt="Team Image"
                className="desktop:w-[600px] w-[500px] mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="py-20 px-5 text-center">
          <h1 className="font-bold text-2xl mb-4">
            Ready to try different work experience now?
          </h1>
          <p className="mb-8 text-sm">
            Get the best working experience that you never feel before
          </p>
          <div>
            <Link
              href={"/contact"}
              className="text-white font-semibold desktop:text-2xl text-lg rounded-full desktop:px-6 desktop:py-4 px-4 py-3 bg-primary-red drop-shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      {isMobileScreen ? <MobileFooter /> : <Footer />}
    </>
  );
}
