import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, image, education, experience } = frontmatter;

  return (
    <section className="mt-16 bg-gray-100">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Doodooti is a dynamic cloud based solution that uses advanced
              analytics powered by AI to help organizations make data-driven
              decisions, optimize operations, and improve patient outcomes.
            </p>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
              alt="About Us Image"
              className="rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="section mt-8">
      <div className="container text-center">
        {image && (
          <div className="mb-4 flex justify-center">
            <Image
              src={image}
              width={300}
              height={100}
              alt={title}
              className="rounded-lg"
              priority={true}
            />
          </div>
        )}

        <div className="mb-4 flex justify-center">
          {markdownify(title, "h1", "h1 text-left lg:text-[55px] mt-12")}
        </div>
        <div className="content text-center">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default About;
