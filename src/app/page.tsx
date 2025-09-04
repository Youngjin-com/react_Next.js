import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">전기차 충전맵</h1>
      <div className="flex gap-2">
        <Link href="/station">
          <Button>충전소 검색</Button>
        </Link>
        <Link href="/favorite">
          <Button>즐겨찾기</Button>
        </Link>
      </div>
    </main>
  );
}
