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
        <title>App Development | Mr.RobotDev</title>
        <link rel="canonical" href={canonicalUrl} key="canonical" />
      </Head>
      <div className="mx-auto desktop:px-36 lg:px-28 px-5 lg:bg-[#3C64B122] bg-black/20">
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
            Mobile App
            <span className="text-primary-red"> Development </span>
          </h1>
          <p className="max-w-4xl desktop:text-xl text-lg text-center my-6 mx-auto">
            {`We build mobile apps that can take your business to the next level.`}
          </p>
        </div>
        <div className=" mx-auto desktop:px-36 lg:px-28 px-5 lg:py-24 py-10 flex flex-col gap-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div className="basis-1/2 md:text-left text-center order-2 md:order-1">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> Mobile </span>
                App
              </h1>
              <p className="md:text-justify text-center desktop:text-xl md:mx-0 mx-auto">
                {`At Mr.RobotDev, we specialize in providing exceptional mobile app development services. Our process begins with a thorough understanding of your goals and requirements, allowing us to create a customized solution that meets your needs. We work closely with you throughout the entire process to ensure the finished product exceeds your expectations. `}
              </p>
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <Image
                src={"/images/commons/app-development-1.png"}
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
                src={"/images/commons/app-development-2.png"}
                width={700}
                height={400}
                alt="Team Image"
                className="desktop:w-[600px] w-[500px] mx-auto"
              />
            </div>
            <div className="basis-1/2 md:text-left text-center">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> State </span>
                of the art Mobile Apps
              </h1>
              <p className="md:text-justify text-center desktop:text-xl md:mx-0 mx-auto">
                We provide state-of-the-art mobile applications solution that
                are designed to be user-friendly, visually appealing, and highly
                functional. Our applications are built using the latest
                technologies and frameworks, ensuring that they are fast,
                responsive, and secure. We also make use of advanced analytics
                and tracking tools to continually improve the user experience
                and increase engagement.
                <br />
                <br />
                As mobile technology continues to evolve at a rapid pace, we can
                anticipate that these apps will become even more sophisticated,
                leveraging emerging technologies like virtual and augmented
                reality, 5G connectivity, and blockchain to deliver truly
                innovative solutions.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div className="basis-1/2 md:text-left text-center order-2 md:order-2">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> Custom </span>
                Integrations
              </h1>
              <p className="md:text-justify text-center  desktop:text-xl md:mx-0 mx-auto">
                At our company, we pride ourselves on our ability to provide
                top-notch custom integration mobile apps that effortlessly mesh
                with your current systems and platforms. Our professionals works
                in close collaboration with your specific requirements to create
                mobile apps that seamlessly communicate and interact with your
                existing software and hardware, optimizing your processes and
                boosting productivity.
                <br />
                <br />
                {`We understand that every business is unique, and that's why we
              offer customized solutions for integrating with various enterprise
              resource planning systems, customer relationship management
              platforms, and other software.`}
              </p>
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <Image
                src={"/images/commons/app-development-3.png"}
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
                src={"/images/commons/app-development-4.png"}
                width={700}
                height={400}
                alt="Team Image"
                className="desktop:w-[600px] w-[500px] mx-auto"
              />
            </div>
            <div className="basis-1/2 md:text-left text-center">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> Android </span>& IOS Apps
              </h1>
              <p className="md:text-justify text-center  desktop:text-xl md:mx-0 mx-auto">
                Our development team creates high-quality applications for both
                Android and iOS platforms, utilizing the latest technology and
                design trends to produce user-friendly experiences that meet the
                needs of modern consumers. From brainstorming and planning to
                development and deployment, we work tirelessly to ensure that
                our apps are innovative, intuitive, and engaging.
              </p>
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
