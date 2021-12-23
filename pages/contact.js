import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

const Contact = () => {
  return (
    <Layout>
      <SEO title="コンタクト" description="コンタクトページです。" />
      <div className="pt-28 pb-40">
        <div className="max-w-3xl mx-auto px-6 ">
          <h1 className="mb-2">Contact</h1>
          <p>お気軽にご連絡ください</p>
          <form action="https://formspree.io/f/xpzbzngg" method="POST">
            <label className="text-lg" htmlFor="name">
              お名前
            </label>
            <input
              className="container p-2 mb-4 box-border border-solid border-2 border-gray-600 rounded-md"
              type="text"
              name="name"
              id="name"
              required
            />
            <label className="text-lg" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="container p-2 mb-4 box-border border-solid border-2 border-gray-600 rounded-md"
              type="email"
              name="email"
              id="email"
              required
            />
            <label className="text-lg" htmlFor="textarea">
              ご用件
            </label>
            <textarea
              className="container p-2 mb-4 box-border border-solid border-2 border-gray-600 rounded-md"
              name="message"
              rows="10"
              id="textarea"
              required
            ></textarea>
            <button
              className="text-lg container border-0 text-white pt-2 pb-2 rounded-md duration-300 hover:opacity-80 hover:cursor-pointer mt-4 bg-gray-700 transition "
              type="submit"
            >
              送信
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
