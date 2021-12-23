//components/Pagination.js
import Link from "next/link";

const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  // 配列を作成し、return内でstartとendを与えmapで展開している。
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="flex justify-center items-center mb-3">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={`/blog/page/${number}`}>
            <a className="text-2xl text-white bg-gray-600 px-1 py-1 mx-0 rounded-full h-12 w-12 flex items-center justify-center border-2">
              {number}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
