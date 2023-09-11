/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import Navbar from "@/components/Navbar";
import NewsletterCTA from "@/components/NewsletterCTA";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { baseURL } from "@/helpers/generic";

export default function BlogId() {
  const router = useRouter();
  const id = router?.query?.id;
  const isMobileScreen = useMediaQuery("(max-width: 640px");
  const [blog, setBlog] = useState({});
  async function getBlog() {
    try {
      const blog = await axios.get(`${baseURL}/blogs/${id}`);
      console.log(blog);
      setBlog(blog.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBlog();
  }, [id]);
  return (
    <>
      <div className="mx-auto desktop:px-36 lg:px-28 px-5 lg:bg-[#3C64B122] bg-black/20">
        <Navbar />
      </div>
      <main className="mx-auto  bg-no-repeat max-w-desktop font-montserrat text-white">
        <div className=" mx-auto desktop:px-36 lg:px-28 px-5 lg:py-24 py-10">
          <div className="flex md:flex-row flex-col justify-center md:justify-between items-center gap-12 mb-8">
            <h1 className="desktop:text-4xl text-3xl font-bold order-2 md:order-1">
              {blog?.name}
            </h1>
            <img
              src={blog?.logo}
              height={500}
              width={500}
              className="order-1 md:order-2"
            />
          </div>
          <div
            className="flex flex-col gap-6"
            dangerouslySetInnerHTML={{ __html: blog?.description }}
          ></div>
        </div>
        <NewsletterCTA />
      </main>
      {isMobileScreen ? <MobileFooter /> : <Footer />}
    </>
  );
}
