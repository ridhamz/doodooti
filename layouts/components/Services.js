import icon1 from "../../public/images/icon1.png";
import icon2 from "../../public/images/icon2.png";
import icon3 from "../../public/images/icon3.png";
import Image from "next/image";
export default function Services() {
  return (
    <>
      <div className="">
        <h1 className="mt-6 text-center">Services</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-8">
          <div className="flex items-center justify-center rounded-full ">
            <div className="h-16 w-16">
              <Image src={icon1} />
            </div>
          </div>
          <h3 className="mb-3 mt-6 text-center font-medium uppercase text-amber-500">
            One to one sessions
          </h3>
          <p className="mb-3 text-center text-sm font-light text-gray-500">
            Our one-to-one IT sessions are uniquely crafted to cater to
            individuals seeking project guidance, interview preparation, or a
            deep dive into new technologies in order to expand knowledge, we are
            here to provide specialized support.
          </p>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center rounded-full ">
            <div className="h-16 w-16">
              <Image src={icon2} />
            </div>
          </div>
          <h2 className="mb-3 mt-6 text-center text-center font-medium uppercase text-amber-500">
            Development
          </h2>
          <p className="mb-3 text-center text-sm font-light text-gray-500">
            Our IT development services are all about turning your tech ideas
            into reality. Whether you require web or cloud based app, we are
            ready to transform your digital vision into a fully functional
            product.
          </p>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center rounded-full ">
            <div className="h-16 w-16">
              <Image src={icon3} />
            </div>
          </div>
          <h3 className="mb-3 mt-6 text-center font-medium uppercase text-amber-500">
            Consulting
          </h3>
          <p className="mb-3 text-center text-sm font-light text-gray-500">
            Our IT consulting services are geared towards propelling your
            technology-focused business forward. With a deep understanding of IT
            trends and strategies.
          </p>
        </div>
      </div>
    </>
  );
}
