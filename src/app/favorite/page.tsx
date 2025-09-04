"use client";

import 한국전력공사API from "@/api/전기차충전/한국전력공사API";
import StationCard from "@/components/custom/card/StationCard";
import { Input } from "@/components/ui/input";
import usefavoriteStore from "@/store/favoriteStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
export default function StationPage() {
  const [address, setAddress] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <div>
        <Input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="주소를 입력하세요"
        />
      </div>
      <div>
        <즐겨찾기리스트컴포넌트 />
        <Suspense fallback={<div>로딩중...</div>}>
          <충전소리스트컴포넌트 address={address} />
        </Suspense>
      </div>
    </main>
  );
}

const 충전소리스트컴포넌트 = ({ address }: { address: string }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["getEvSearchList", address],
    queryFn: () =>
      한국전력공사API.getEvSearchList({
        page: 1,
        perPage: 10,
        addr: address,
      }),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 2,
  });

  return (
    <>
      <h2>검색결과</h2>
      <div className="flex w-full gap-1 flex-wrap">
        {data.map((station) => {
          return <StationCard key={station.cpId} {...station} />;
        })}
      </div>
    </>
  );
};

const 즐겨찾기리스트컴포넌트 = () => {
  const favoriteStationList = usefavoriteStore(
    (state) => state.favoriteStationList
  );
  return (
    <>
      <h2>즐겨찾기</h2>
      <div className="flex w-full gap-1 flex-wrap ">
        {favoriteStationList.map((station) => {
          return <StationCard key={station.cpId} {...station} />;
        })}
      </div>
    </>
  );
};
