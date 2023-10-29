import nextMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx", "md"],
  experimental: {
    appDir: false,
  },
};

const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFootnotes, remarkMath],
    rehypePlugins: [
      rehypeHighlight(),
      rehypeSlug(),
      rehypeAutolinkHeadings(),
      rehypeKatex(),
      rehypeCitation(),
      rehypePrismPlus(),
      rehypePresetMinify,
    ],
  },
});

export default withMDX(nextConfig);
