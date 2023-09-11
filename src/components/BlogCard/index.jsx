/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function BlogCard({ image, title, desc, id }) {
  return (
    <div className=" justify-between rounded-xl bg-[#2f2f2f] p-4 h-[500px]">
      <img
        src={image}
        width={300}
        height={300}
        alt="Blog hero img"
        className="mx-auto h-48 p-4 mb-4 object-contain"
      />

      <h1 className="text-center text-lg font-bold line-clamp-2 mb-4">
        {title}
      </h1>

      <div
        className=" text-sm text-center line-clamp-5"
        dangerouslySetInnerHTML={{ __html: desc }}
      >
        {/* {desc.substring(0, 150) + "..."} */}
      </div>
      <div className="text-center mb-6 mt-12">
        <Link
          href={{
            pathname: "/blog/viewBlog",
            query: { id: id },
          }}
          className="px-8 py-3 rounded-full bg-primary-red text-white font-medium"
        >
          Read More
          <FaArrowRight className=" ml-4 w-4 h-4 fill-white inline " />
        </Link>
      </div>
    </div>
  );
}
