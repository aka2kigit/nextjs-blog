import { useEffect } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Image from "next/image";
import SEO from "../../../components/Seo";
import Pagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import useSWR from "swr";

const PER_PAGE = 5;

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `https://aka2ki.microcms.io/api/v1/blog/`;

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
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
    <div>
      <Layout>
        <SEO title="ブログ" description="これはブログページです" />
        <div className="font-zen">
          <div>
            <Image
              src="/woman-top.jpg"
              alt="topImage"
              layout="responsive"
              width={1280}
              height={500}
              objectFit="cover"
              quality={90}
            />
          </div>
          <h1 className="text-3xl font-bold">ブログページ</h1>
          <div className="p-10  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {" "}
            {blog.map((blog) => (
              <div key={blog.id}>
                {/* ブログごとのリンクもmap関数の中に入れる(なぜなら配列だから) */}
                <Link href={`/blog/${blog.id}`}>
                  <a>
                    <div className="max-w-sm rounded mx-3 overflow-hidden shadow-lg">
                      <img
                        className="w-full"
                        src={`${blog.ogimage.url}?fit=crop&w=200&h=200`}
                        alt=""
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                          {blog.title}
                        </div>
                        <p className="text-gray-700 text-base">
                          {blog.description}
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #photography
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          #travel
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Pagination totalCount={totalCount} />
      </Layout>
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
  };

  const res = await fetch("https://aka2ki.microcms.io/api/v1/blog", key);

  const repos = await res.json();

  const pageNumbers = [];

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { paths, fallback: true };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;

  const key = {
    headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
  };

  const data = await fetch(
    `https://aka2ki.microcms.io/api/v1/blog?offset=${(id - 1) * 4}&limit=4`,
    key
  )
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
    revalidate: 2,
  };
};
