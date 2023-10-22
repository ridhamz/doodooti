import mz from "../../public/images/mz.jpg";
import Image from "next/image";
export default function Teams() {
  return (
    <>
      <div className="mx-auto max-w-screen-lg p-10">
        <div className="mb-4 text-center">
          <h3 className="text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-4xl">
            Our<span className="text-amber-500"> Team</span>
          </h3>
        </div>
        <div className="my-10 grid-cols-2 gap-6 sm:grid">
          <div className="mx-auto my-10 w-full max-w-sm lg:flex lg:max-w-full">
            <div className="flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none">
              <Image src={mz} className="h-fit" style={{ height: "100%" }} />
            </div>
            <div className="rounded-b border-b border-l border-r border-gray-400 bg-white p-4 lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
              <div className="">
                <a
                  href="#"
                  className="mb-2 text-xl font-bold text-gray-900 transition duration-500 ease-in-out hover:text-indigo-600"
                >
                  Ridha Mezrigui
                </a>
                <p className="text-sm text-gray-600">
                  Founder & Software Engineer
                </p>
                <p className="mt-4 text-base text-sm text-gray-500">
                  Technology-driven Software Engineer with 3+ years of
                  experience in translating business requirements and functional
                  specifications into code modules and software solutions with a
                  strong focus on high-quality design, and performance.
                </p>

                <div className="my-4 flex"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
