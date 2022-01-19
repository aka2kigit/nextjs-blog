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
  // const $ = cheerio.load(blog.content.map);
  // const toc = $("h1, h2, h3")
  //   .toArray()
  //   .map((data) => ({
  //     text: data.children[0].data,
  //     id: data.attribs.id,
  //     name: data.name,
  //   }));

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
      {/* <div className="text-center mt-2 text-gray-600">
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
      </div> */}
      <div className="min-h-screen">
        <SEO title={blog.title} description={blog.excerpt} />

        <div className="md:ml-36 md:mr-36 mb-8 ml-4 mr-4">
          {/* <h1 className="text-center mt-6 mb-6 underline">{blog.title}</h1>
          {blog.content.map((feature, index) => (
            <li key={index} className="list-none">
              <div
                dangerouslySetInnerHTML={{ __html: `${feature.body}` }}
              ></div>
            </li>
          ))} */}
          <div>
            <h1 className="text-center mt-6 mb-6 underline">{blog.title}</h1>
            {blog.content.map((customField) => {
              switch (customField.fieldId) {
                case "contents":
                  return (
                    <div
                      className="mb-4"
                      key={customField.fieldId}
                      dangerouslySetInnerHTML={{
                        __html: customField.body,
                      }}
                    />
                  );
                case "balloon":
                  const image = customField.image;
                  return (
                    <div
                      key={customField.fieldId}
                      className={customField.direction}
                    >
                      <figure className="relative">
                        <img
                          className="rounded-full border-2"
                          src={image.url}
                          alt=""
                          width={image.width}
                          height={image.height}
                        />
                        <figcaption className="text-center text-sm">
                          {customField.name}
                        </figcaption>
                      </figure>
                      <p className="mx-5 px-6 relative bg-pink-50 border border-gray-300 p-4 rounded-xl">
                        {customField.text}
                      </p>
                    </div>
                  );
              }
            })}
          </div>
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
  // const post = await client.get({
  //   endpoint: "blog",
  //   queries: {
  //     fields: "body",
  //   },
  // });

  return {
    props: {
      blog: data,
    },
    revalidate: 2,
  };
};
