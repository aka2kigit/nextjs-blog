import { useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../../components/Seo";
import { client } from "../../libs/client";
import useSWR from "swr";
import BreadCrumbs from "../../components/BreadCrumbs";
import cheerio from "cheerio";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `https://aka2ki.microcms.io/api/v1/blog/`;
const key = {
  headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
};

const SingleBlog = ({ blog }) => {
  const { data, mutate } = useSWR(apiUrl, key, fetcher, {
    fallbackData: blog,
  });
  useEffect(() => {
    mutate();
  }, []);

  const router = useRouter();

  if (router.isFallback || !blog) {
    return <div>Loading...</div>;
  }

  ////////////////////////////////////
  const $ = cheerio.load(blog.body);
  const toc = $("h1, h2, h3")
    .toArray()
    .map((data) => ({
      text: data.children[0].data,
      id: data.attribs.id,
      name: data.name,
    }));

  return (
    <>
      <BreadCrumbs
        lists={[
          {
            string: "トップページ",
            path: "/",
          },
          {
            string: blog.title,
          },
        ]}
      />
      <div className="text-center mt-2 text-gray-600">
        {toc.length ? (
          <div id="">
            <h4 className="text-lg">------目次------</h4>
            <ul id="">
              {toc.map((toc, index) => {
                return (
                  <li className={"list " + toc.name} key={toc.id}>
                    <a href={"#" + toc.id}>{toc.text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="min-h-screen">
        <SEO title={blog.title} description={blog.excerpt} />

        <div className="md:ml-36 md:mr-36 mb-8">
          <h1 className="text-center mt-6 mb-6 underline">{blog.title}</h1>
          <div
            className="mx-8 mt-4"
            dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  // console.log(data.contents);
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  return { paths, fallback: true };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
    revalidate: 2,
  };
};
