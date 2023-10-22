import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, image, education, experience } = frontmatter;

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
