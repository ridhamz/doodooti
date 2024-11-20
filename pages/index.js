import config from '@config/config.json';
import Base from '@layouts/Baseof';
import Contact from '@layouts/Contact';
import About from '@layouts/components/About';
import ImageFallback from '@layouts/components/ImageFallback';
import NewsletterSignup from '@layouts/components/NewsLetter';
import Pagination from '@layouts/components/Pagination';
import Services from '@layouts/components/Services';
import Teams from '@layouts/components/Teams';
import Post from '@layouts/partials/Post';
import Sidebar from '@layouts/partials/Sidebar';
import { getListPage, getSinglePage } from '@lib/contentParser';
import { getTaxonomy } from '@lib/taxonomyParser';
import dateFormat from '@lib/utils/dateFormat';
import { sortByDate } from '@lib/utils/sortFunctions';
import { markdownify } from '@lib/utils/textConverter';
import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { FaRegCalendar } from 'react-icons/fa';
const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  useEffect(() => {
    localStorage.clear(); // Clear all localStorage data
  }, []);

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={'/images/banner-bg-shape.svg'}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container mt-5">
          <div className="row mt-10 flex-wrap-reverse items-center justify-center lg:flex-row ">
            <div
              className={
                banner.image_enable
                  ? 'mt-1 text-center lg:col-6 lg:mt-0 lg:text-left'
                  : 'mt-12 text-center lg:col-12 lg:mt-0 lg:text-left'
              }
            >
              <div className="banner-title">
                {/* {markdownify(banner.title, "h2", "mt-0")} */}
                {markdownify(banner.title_small, 'h3')}
              </div>
              {/* {markdownify(banner.content, "p", "mt-1")} */}
              <div className="mt-1">
                Hi there! 🖖 My name is <b>Ridha</b>
                <p>A <b>Senior Software Engineer</b> with a passion for crafting solutions 
                and exploring the limitless potential of  <b>AWS</b></p>
              </div>
            </div>
            {banner.image_enable && (
              <div className="col-12 lg:col-6">
                <ImageFallback
                  className="mx-auto rounded object-contain"
                  src={banner.image}
                  width={548}
                  height={400}
                  priority={true}
                  alt="Banner Image"
                  // style={{
                  //   borderRadius: "20px", // Adjust the radius as needed
                  //   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Optional for a subtle shadow
                  // }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <img
            className="mx-auto rounded object-contain"
            src={banner.aws_cert}
            priority={true}
            alt="cover"
          />
        </div>
        <div className="col-12">
          <img
            className="mx-auto rounded object-contain"
            src={banner.cover}
            priority={true}
            alt="cover"
          />
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-1 lg:col-12 lg:mb-0">
              {/* <About />
              <Services /> */}
              {/* <Teams /> */}
              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section mt-0 pt-0">
                  {markdownify(
                    recent_posts.title,
                    'h2',
                    'text-center p-1 mb-6'
                  )}
                  {/* <center className="mb-3">
                    {' '}
                    <small>( Hey doodooti 👋 )</small>
                  </center> */}
                  <div className="">
                    <div className="row">
                      {sortPostByDate.slice(0, 6).map((post) => (
                        <div className="mb-8 md:col-4" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}

                      <div className="grid place-items-center  ">
                        <Link
                          href={`/posts`}
                          className="dark:primary ml-4 flex items-center rounded-full px-2 py-1 text-3xl font-bold leading-none text-primary"
                        >
                          <>
                            <span className="mr-3 text-lg">View all posts</span>
                            <BsArrowRightShort />
                          </>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <Contact /> */}
            </div>
            {/* <NewsletterSignup/> */}
            {/* sidebar 
            <Sidebar
              className={"lg:mt-[9.5rem]"}
              posts={posts}
              categories={categories}
                      /> */}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage('content/_index.mdx');
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, 'categories');

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
