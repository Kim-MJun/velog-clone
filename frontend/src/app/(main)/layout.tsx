import Home from "./page";
import Link from "next/link";

export default function layout() {
  return (
    <>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/trending">트렌딩</Link>
        </li>
        <li>
          <Link href="/">추천</Link>
        </li>
        <li>
          <Link href="/recent">최신</Link>
        </li>
        <li>
          <Link href="/">피드</Link>
        </li>
      </ul>
      <Home />
    </>
  );
}
