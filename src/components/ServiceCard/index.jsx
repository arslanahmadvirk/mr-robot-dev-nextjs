import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ServiceCard({ name, desc, image, smallScreen, path }) {
  const router = useRouter();

  const handleRoute = () => {
    router.push(path);
  };
  return (
    <div className="rounded-xl bg-white shadow-md p-4">
      <div>
        <Image
          src={`/images/commons/${image}`}
          width={419}
          height={292}
          alt={name}
          className="mx-auto object-contain w-96 h-40 mb-8"
        />
      </div>
      <h1 className="text-primary text-center desktop:text-3xl text-2xl font-bold">
        {name}
      </h1>
      <p className="m-4 desktop:text-lg text-base text-center font-medium leading-relaxed desktop:h-36 h-32 ">
        {desc}
      </p>
      <div className="text-center">
        <button
          className="desktop:py-4 desktop:px-10 py-2 px-8 bg-primary-dark hover:bg-black rounded-full text-white desktop:text-xl"
          onClick={() => handleRoute()}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
