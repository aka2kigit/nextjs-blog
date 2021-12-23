import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsMailbox } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-400">
        <div className="flex items-center justify-center text-center pt-16 pb-8">
          <p className="my-0 mx-12 hover:opacity-80">
            <Link href="/">
              <AiOutlineHome size="3rem" color="white" />
            </Link>
          </p>

          <p className="my-0 mx-12 hover:opacity-80">
            <Link href="contact">
              <BsMailbox size="3rem" color="white" />
            </Link>
          </p>
          <p className="my-0 mx-12 hover:opacity-80">
            <Link href="/blog">
              <MdOutlineArticle size="3rem" color="white" />
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center text-center">
          <Link href="/privacyPolicy">
            <a className="my-0 mx-12 hover:opacity-80 text-white">
              プライバシーポリシー
            </a>
          </Link>
          <Link href="/sitePolicy">
            <a className="my-0 mx-12 hover:opacity-80 text-white">
              サイトポリシー
            </a>
          </Link>
          {/* <Link href="/contact">
            <a className="my-0 mx-12 text-white hover:op hover:opacity-80">
              Contact
            </a>
          </Link> */}
        </div>
        <hr className="my-8 border-x-2 mx-48" />
        <div className="flex items-center justify-center text-center">
          <p className="text-xl text-white">
            ©{new Date().getFullYear()}Site Name
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
