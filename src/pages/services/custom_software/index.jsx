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
        <title>Custom Software | Mr.RobotDev</title>
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
            Custom Software
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
                <span className="text-primary-red"> Custom </span>
                Software
              </h1>
              <p className="md:text-justify text-center desktop:text-xl md:mx-0 mx-auto">
                Mr.RobotDev provides a full-spectrum custom software development
                service designed to meet the unique needs of businesses. From
                idea to launch, we provide a seamless development experience,
                ensuring that your software meets the highest standards of
                quality and performance.
              </p>
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <Image
                src={"/images/commons/custom-software-1.png"}
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
                src={"/images/commons/custom-software-2.png"}
                width={700}
                height={400}
                alt="Team Image"
                className="desktop:w-[600px] w-[500px] mx-auto"
              />
            </div>
            <div className="basis-1/2 md:text-left text-center">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> World </span>
                class level
                <span className="text-primary-red"> software </span>
                development
              </h1>
              <p className="md:text-justify text-center  desktop:text-xl md:mx-0 mx-auto">
                We specializes in developing custom software applications that
                are at the forefront of modern technology. Our applications are
                designed to be user-friendly, visually stunning, and highly
                functional, providing a seamless experience for both you and
                your users. Utilizing the latest technologies and frameworks,
                our software is built with speed, functionality, and security in
                mind.
                <br />
                <br />
                {`We take pride in our ability to work closely with clients to
              understand their unique needs and deliver tailored solutions that
              meet or surpass their expectations. Whether you're interested in
              creating a brand new application or updating an existing one,
              we've got you covered.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div className="basis-1/2 md:text-left text-center order-2 md:order-2">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> Quality </span>
                End Product
              </h1>
              <p className="md:text-justify text-center desktop:text-xl md:mx-0 mx-auto">
                we are dedicated to delivering high-quality end products to our
                customers. Our ultimate aim is to provide our customers with
                products that they will take pleasure in owning and that will
                endure over time. We take great pride in ensuring that each end
                product that we produce meets our exacting quality standards. We
                spare no effort in our pursuit of excellence and will always go
                the extra mile to ensure that our customers receive the quality
                of product they deserve.
              </p>
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <Image
                src={"/images/commons/custom-software-3.png"}
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
                src={"/images/commons/custom-software-4.png"}
                width={700}
                height={400}
                alt="Team Image"
                className="desktop:w-[600px] w-[500px] mx-auto"
              />
            </div>
            <div className="basis-1/2 md:text-left text-center">
              <h1 className="desktop:text-5xl lg:text-3xl text-xl font-bold mb-6 md:text-left text-center">
                <span className="text-primary-red"> Agile </span> Development
              </h1>
              <p className="md:text-justify text-center  desktop:text-xl md:mx-0 mx-auto">
                Our company adheres to the Agile development methodology, which
                is based on collaboration, flexibility, and continuous
                improvement. Our teams work in short sprints to provide
                incremental updates and gather feedback from stakeholders during
                the development process. This enables us to respond quickly to
                changes in requirements and prioritize features that offer the
                greatest benefit to our customers.
                <br />
                <br />
                {` Adopting Agile development enables us to deliver top-quality
              products that meet our customers' ever-evolving demands. Our Agile
              approach helps us to stay responsive and provide value to our
              customers in a timely and effective manner. This allows us to
              consistently provide our customers with the highest level of
              service and quality.`}
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
