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
import yaml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";
import { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

import MDX from "@mdx-js/runtime";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("yaml", yaml);

import { Maximize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';



const ImageWithFullscreen = ({ src, alt, ...props }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.25, 3)); // Max zoom 3x
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.25, 0.5)); // Min zoom 0.5x
  };

  const resetZoom = (e) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      const rect = imageRef.current.getBoundingClientRect();
      const maxPanX = (scale - 1) * rect.width / 2;
      const maxPanY = (scale - 1) * rect.height / 2;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      setPosition({
        x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="relative group"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* Regular image with hover controls */}
      <div className="relative inline-block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-1">
          <img
            src={src}
            alt={alt}
            className={`max-w-full h-auto rounded-lg ${
              !isFullscreen ? 'cursor-pointer' : ''
            }`}
            {...props}
          />
          {!isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full 
                       text-white" 
            >
              <Maximize2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={toggleFullscreen}
        >
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full 
                     text-white hover:bg-black/70"
          >
            <X size={24} />
          </button>
          
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            onMouseDown={handleMouseDown}
            className={`max-h-[90vh] max-w-[90vw] object-contain
                         animate-scaleIn cursor-grab
                         ${isDragging ? 'cursor-grabbing' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out'
            }}
          />
  
          {/* Zoom level indicator and controls */}
          <div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                       bg-black/50 text-white px-3 py-1 rounded-full
                       text-sm backdrop-blur-sm"
          >
            <center>{Math.round(scale * 100)}%</center>
            <div className="flex gap-2">
              <button
                onClick={handleZoomIn}
                disabled={scale >= 3}
                className={`p-2 bg-black/50 rounded-full text-white 
                         transition-all duration-200 ease-in-out
                         hover:bg-black/70 hover:scale-110
                         shadow-lg backdrop-blur-sm
                         ${scale >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Zoom In"
              >
                <ZoomIn size={24} />
              </button>
              
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className={`p-2 bg-black/50 rounded-full text-white 
                         transition-all duration-200 ease-in-out
                         hover:bg-black/70 hover:scale-110
                         shadow-lg backdrop-blur-sm
                         ${scale <= 0.5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Zoom Out"
              >
                <ZoomOut size={24} />
              </button>
              
              <button
                onClick={resetZoom}
                disabled={scale === 1 && position.x === 0 && position.y === 0}
                className={`p-2 bg-black/50 rounded-full text-white 
                         transition-all duration-200 ease-in-out
                         hover:bg-black/70 hover:scale-110
                         shadow-lg backdrop-blur-sm
                         ${scale === 1 && position.x === 0 && position.y === 0 
                           ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Reset Zoom"
              >
                <RotateCcw size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const components = {
  img: ImageWithFullscreen,
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
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-1">
                      <ul className=" mt-2 flex flex-wrap items-center">
                        {categories.map((tag, index) => (
                          <li
                            className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
                            key={"tag-" + index}
                          >
                            <Link
                              className="capitalize"
                              href={`/categories/${tag.toLowerCase().replace(" ", "-")}`}
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
                        className="mt-1 rounded-lg"
                      />
                      </div>
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
