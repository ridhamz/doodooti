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
import CodeBlock from "./CodeBlock";

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
            <div className="lg:col-8  ">
              <article>
                <div className="relative">
                  {image && (
                    <Image
                      src={image}
                      height="500"
                      width="1000"
                      alt={title}
                      className="rounded-lg"
                    />
                  )}
                  <ul className="absolute left-2 top-3 flex flex-wrap items-center">
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
                </div>
                {config.settings.InnerPaginationOptions.enableTop && (
                  <div className="mt-4">
                    <InnerPagination posts={posts} date={date} />
                  </div>
                )}
                {markdownify(title, "h3", "lg:text-[42px] mt-4")}
                <ul className="flex items-center space-x-4">
                  <li className="inline-flex items-center font-secondary text-xs leading-3">
                    <FaRegCalendar className="mr-1.5" />
                    {dateFormat(date)}
                  </li>
                </ul>
                <div className="contentd">
                  {/*  <ReactMarkdown
                    components={{
                      code({ inline, className, ...props }) {
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
                      pre: (pre) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                        const codeChunk =
                          pre.node.children[0].children[0].value;

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const [copyTip, setCopyTip] = useState("Copy code");

                        const language =
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
                          pre.children[0]?.props.className.replace(
                            /language-/g,
                            ""
                          );

                        return (
                          <div className="relative overflow-x-hidden">
                            <button
                              style={{
                                right: 0,
                              }}
                              className="tooltip tooltip-left absolute z-40 mr-2 mt-5"
                              data-tip={copyTip}
                            >
                              <CopyToClipboard
                                text={codeChunk}
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onCopy={async () => {
                                  setCopyTip("Copied");
                                  await new Promise((resolve) =>
                                    setTimeout(resolve, 500)
                                  );
                                  setCopyTip(`Copy code`);
                                }}
                              >
                                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer hover:text-blue-600" />
                              </CopyToClipboard>
                            </button>
                            <span
                              style={{
                                bottom: 0,
                                right: 0,
                              }}
                              className="bg-base-content/40 text-base-300 absolute z-40 mb-5 mr-1 rounded-lg p-1 text-xs uppercase backdrop-blur-sm"
                            >
                              {language}
                            </span>
                            <pre {...pre}></pre>
                          </div>
                        );
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>*/}
                  <MDX components={components}>{post.content}</MDX>
                </div>
                {config.settings.InnerPaginationOptions.enableBottom && (
                  <InnerPagination posts={posts} date={date} />
                )}
              </article>
              {/* <div className="mt-16">
                {disqus.enable && (
                  <DiscussionEmbed
                    key={theme}
                    shortname={disqus.shortname}
                    config={disqusConfig}
                  />
                )}
              </div> */}
            </div>
            {/* <Sidebar
              posts={posts.filter((post) => post.slug !== slug)}
              categories={allCategories}
            /> */}
          </div>
        </div>

        {/* Related posts */}
        <div className="container mt-2">
          <h2 className="section-title">Related Posts</h2>
          <div className="row mt-16">
            {relatedPosts.slice(0, 3).map((post, index) => (
              <div key={"post-" + index} className="mb-12 lg:col-4">
                <Post post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
