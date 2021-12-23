import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import SEO from "../../components/Seo";
import { client } from "../../libs/client";
import useSWR from "swr";
import BreadCrumbs from "../../components/BreadCrumbs";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `https://aka2ki.microcms.io/api/v1/blog/`;

const SingleBlog = ({ blog }) => {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: blog,
  });
  useEffect(() => {
    mutate();
  }, []);

  const router = useRouter();

  if (router.isFallback || !blog) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <SEO title={blog.title} description={blog.excerpt} />
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
      <div className="h-screen">
        <h1 className="text-center mt-6">{blog.title}</h1>
        <div
          className="mx-8 mt-4"
          dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        ></div>
      </div>
    </Layout>
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
