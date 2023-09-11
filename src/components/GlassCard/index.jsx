/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function GlassCard({ image, name, desc, isSelected }) {
  const isMobileScreen = useMediaQuery("(max-width: 1023px");
  return (
    <div
      className={` flex justify-center cursor-pointer items-center py-10 rounded-md border border-zinc-600 relative transition-all duration-500 ${
        isSelected ? "bg-primary-red" : "bg-white/10"
      }`}
    >
      <div>
        <img
          src={isSelected || isMobileScreen ? image : image}
          alt="Service Image"
          width={100}
          height={100}
          className={`transition-all duration-500 mb-8 desktop:h-28 desktop:w-28 w-20 h-20 object-contain mx-auto ${
            isSelected && "-translate-y-6 scale-75"
          } `}
        />
        <h4
          className={`transition-all duration-500  desktop:text-xl font-bold text-center uppercase ${
            isSelected && "-translate-y-16 scale-75"
          }
          ${isSelected ? "text-white" : "text-primary-red"}`}
        >
          {name}
        </h4>
      </div>
      <p
        className={`transition-all duration-500 text-center text-md mx-4 text-white desktop:top-40 top-32   opacity-0 absolute ${
          isSelected && "opacity-100"
        }`}
      >
        {desc}
      </p>
    </div>
  );
}
