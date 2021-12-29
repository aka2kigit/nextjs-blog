import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header>
        <div className="sticky top-0 w-full z-10 bg-white">
          <div className="container flex flex-row items-center h-16">
            <Link href="/">
              <a className="font-medium ml-2 mt-1">
                <Image src="/icon.png" alt="logo" width={50} height={50} />
              </a>
            </Link>
            <ul>
              <li className="inline-block mt-0 mb-0 mr-0 ml-32">
                <Link href="/">
                  <a className="text-2xl font-bold">Blog</a>
                </Link>
              </li>
              <li className="inline-block mt-0 mb-0 mr-0 ml-32">
                <Link href="/contact">
                  <a className="text-2xl font-bold">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
