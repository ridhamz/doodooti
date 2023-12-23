import icon1 from "../../public/images/icon1.png";
import icon2 from "../../public/images/icon2.png";
import icon3 from "../../public/images/icon3.png";
import Image from "next/image";
export default function About() {
  return (
    <>
      <div className="">
        <h1 className="mt-6 text-center">Who We Are</h1>
      </div>

      <p className="mt-4 text-center text-lg text-gray-600">
        doodooti is a cloud based solution that uses advanced analytics powered
        by AI and AWS technologies to help organizations make data-driven
        decisions, optimize operations, and improve patient outcomes.
      </p>
    </>
  );
}
