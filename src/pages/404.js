/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
export default function Custom404() {
  return (
    <div className="md:px-40 px-10">
      <div className="flex md:flex-row flex-col gap-y-10 justify-center items-center container my-20">
        <div className="text-white basis-1/2">
          <h1 className="text-primary-red">Oops!</h1>
          <p className="mt-5 mb-3">{`You've drifted into the vast expanse of the digital galaxy, where links go on cosmic adventures. Fear not, our virtual space crew is on a rescue mission to navigate you back to Earth, err, our homepage.`}</p>
          <Link href={"/"} passHref>
            <button className="bg-primary-red rounded-2xl px-5 py-2">
              Go to Home
            </button>
          </Link>
        </div>
        <div className="basis-2/2">
          <img src="/images/404error.png" alt="" className="" />
        </div>
      </div>
    </div>
  );
}
