"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4">
      <Link href="/">로고</Link>
      <Link href="/login">알림</Link>
      <Link href="/search">검색</Link>
      <Link href="/login">로그인</Link>
      <Link href="/register">회원가입</Link>
    </div>
  );
}
