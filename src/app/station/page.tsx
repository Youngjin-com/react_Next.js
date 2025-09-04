"use client";

import 한국전력공사API from "@/api/전기차충전/한국전력공사API";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
export default function StationPage() {
  const [address, setAddress] = useState<string>("");
  const [충전가능여부, set충전가능여부] = useState<string>("");
  const [급속여부, set급속여부] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex gap-1 ">
        <Input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="주소를 입력하세요"
        />
        <Select
          value={급속여부}
          onValueChange={(value) => {
            set급속여부(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="급속여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="완속">완속</SelectItem>
            <SelectItem value="급속">급속</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={충전가능여부}
          onValueChange={(value) => {
            set충전가능여부(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="충전여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="충전가능">충전가능</SelectItem>
            <SelectItem value="충전불가">충전불가</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Suspense fallback={<div>로딩중...</div>}>
          <충전소리스트컴포넌트
            address={address}
            충전가능여부={충전가능여부}
            급속여부={급속여부}
          />
        </Suspense>
      </div>
    </main>
  );
}

const 충전소리스트컴포넌트 = ({
  address,
  충전가능여부,
  급속여부,
}: {
  address: string;
  충전가능여부: string;
  급속여부: string;
}) => {
  const { data } = useSuspenseQuery({
    queryKey: ["getEvSearchList", address],
    queryFn: () =>
      한국전력공사API.getEvSearchList({
        page: 1,
        perPage: 5,
        addr: address,
      }),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 2,
  });

  const filteredData = data?.filter((station) => {
    if (충전가능여부) {
      return 충전가능여부 === "충전가능"
        ? station.cpStat === "1"
        : station.cpStat !== "1";
    }
    if (급속여부) {
      return 급속여부 === "급속"
        ? station.chargeTp === "2"
        : station.chargeTp !== "2";
    }
    return true;
  });

  return (
    <Table className="max-w-screen-md">
      <TableHeader>
        <TableRow>
          <TableHead>번호</TableHead>
          <TableHead>주소</TableHead>
          <TableHead>장소명</TableHead>
          <TableHead>충전기</TableHead>
          <TableHead>충전여부</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData?.map((station, index: number) => {
          return (
            <TableRow key={station.cpId + station.csId + index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{station.addr}</TableCell>
              <TableCell>{station.csNm}</TableCell>
              <TableCell>{station.cpNm}</TableCell>
              <TableCell>{station.cpStat}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
