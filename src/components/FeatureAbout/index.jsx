import Image from "next/image";
import React from "react";
export function FeatureAbout({ image, title, desc }) {
  return (
    <div>
      <div className="mb-8">
        <Image
          src={`/images/commons/${image}.svg`}
          width={42}
          height={40}
          alt="Hero Image"
          className=" mx-auto"
        />
      </div>
      <h1 className="text-center font-semibold desktop:text-3xl text-xl mb-4">
        {title}
      </h1>
      <p className="text-center xl:w-4/5 mx-auto leading-7 text-[15px] font-montserrat">
        {desc}
      </p>
    </div>
  );
}
