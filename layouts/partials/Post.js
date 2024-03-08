import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author
    ? post.frontmatter.author
    : meta_author;
  return (
    <div
      className="post border-black-600 h-100 rounded-md border-2 border-solid p-2"
      style={{ height: "100%" }}
    >
      <div className="">
        {post.frontmatter.image && (
          <ImageFallback
            className="rounded"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={208}
          />
        )}
        <ul className="items-center p-1">
          {post.frontmatter.categories.map((tag, index) => (
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
      {/* <div className="">
        <Link
          className="dark:primary flex justify-end rounded-full px-2 py-1 text-3xl font-bold leading-none text-primary"
          href={`/${blog_folder}/${post.slug}`}
        >
          <>
            <span className="mr-3 text-lg">Read Post</span>
          </>
        </Link>
      </div> */}
      <h3 className="h6 -0 mb-2 mt-4">
        <Link
          href={`/${blog_folder}/${post.slug}`}
          className="block hover:text-primary"
        >
          {post.frontmatter.title}
        </Link>
      </h3>
      <ul className="flex items-center space-x-4">
        <li className="inline-flex items-center font-secondary text-xs leading-3">
          <FaRegCalendar className="mr-1.5" />
          {dateFormat(post.frontmatter.date)}
        </li>
      </ul>
    </div>
  );
};

export default Post;
