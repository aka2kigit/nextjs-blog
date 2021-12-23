import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="ページが見つかりません" description="404ページです。" />
      <div style={{ textAlign: "center", height: "70vh" }}>
        <h1>404：Not Found</h1>
        <p>ページが見つかりません。</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
