import config from "@config/config.json";
import Base from "@layouts/Baseof";
import InnerPagination from "@layouts/components/InnerPagination";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
import Post from "./partials/Post";
import Sidebar from "./partials/Sidebar";
import shortcodes from "./shortcodes/all";
const { disqus } = config;
const { meta_author } = config.metadata;
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import lua from "react-syntax-highlighter/dist/cjs/languages/prism/lua";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

import MDX from "@mdx-js/runtime";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("lua", lua);

const components = {
  Box: (props) => <div {...props} />,
  pre: (props) => <div {...props} />,
  code: ({ inline, className, ...props }) => {
    const hasLang = /language-(\w+)/.exec(className || "");
    return !inline && hasLang ? (
      <SyntaxHighlighter
        style={oneDark}
        language={hasLang[1]}
        PreTag="div"
        className="mockup-code scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded scrollbar-thin"
        showLineNumbers={true}
        useInlineStyles={true}
      >
        {String(props.children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props} />
    );
  },
};

function code({ className, ...props }) {
  return <SyntaxHighlighter PreTag="div" {...props} />;
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      {...props}
      style={{ border: "1px solid red" }}
    />
  ) : (
    <code className={className} {...props} />
  );
}

const PostSingle = ({
  frontmatter,
  content,
  mdxContent,
  slug,
  posts,
  allCategories,
  relatedPosts,
  post,
}) => {
  let { description, title, date, image, categories } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const { theme } = useTheme();
  const author = frontmatter.author ? frontmatter.author : meta_author;
  // Local copy so we don't modify global config.
  let disqusConfig = config.disqus.settings;
  disqusConfig.identifier = frontmatter.disqusId
    ? frontmatter.disqusId
    : config.settings.blog_folder + "/" + slug;

  return (
    <Base title={title} description={description}>
      <section className="section single-blog mt-6">
        <div className="container">
          <div className="row">
            <div className="lg:col-2"></div>
            <div className="lg:col-8">
              <article>
                <div className="relative">
                  {image && (
                    <div>
                      <ul className=" mt-2 flex flex-wrap items-center">
                        {categories.map((tag, index) => (
                          <li
                            className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
                            key={"tag-" + index}
                          >
                            <Link
                              className="capitalize"
                              href={`/categories/${tag.replace(" ", "-")}`}
                            >
                              {tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Image
                        src={image}
                        height="500"
                        width="1000"
                        alt={title}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
                {config.settings.InnerPaginationOptions.enableTop && (
                  <div className="mt-4">
                    <InnerPagination posts={posts} date={date} />
                  </div>
                )}
                <div>
                  <div className="p-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {markdownify(
                        title,
                        "h3",
                        "lg:text-[40px] mt-4 text-center "
                      )}{" "}
                    </h2>
                  </div>
                </div>
                <div className="content">
                  <MDX components={components}>{post.content}</MDX>
                  {/* <div className=" mt-5 w-full overflow-hidden rounded-lg border border-gray-200 bg-theme-light p-2 shadow-lg dark:bg-darkmode-theme-dark">
                  
                  </div> */}
                </div>
                {/* {config.settings.InnerPaginationOptions.enableBottom && (
                  <InnerPagination posts={posts} date={date} />
                )} */}
              </article>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
