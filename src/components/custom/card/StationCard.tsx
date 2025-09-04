"use client";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { Station } from "@/api/전기차충전/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import usefavoriteStore from "@/store/favoriteStore";

export default function StationCard(props: Station) {
  const isFavorited = usefavoriteStore((state) => {
    return state.favoriteStationList.some((s) => s.cpId === props.cpId);
  });
  const addFavoriteStation = usefavoriteStore(
    (state) => state.addFavoriteStation
  );
  const removeFavoriteStation = usefavoriteStore(
    (state) => state.removeFavoriteStation
  );

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavoriteStation(props);
    } else {
      addFavoriteStation(props);
    }
  };

  return (
    <Card className="w-60">
      <CardHeader>
        <CardTitle>{props.csNm}</CardTitle>
        <CardDescription>{props.addr}</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-2">
            <span>{props.cpNm}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{props.cpStat === "1" ? "사용가능" : "사용불가"}</span>
          </div>
          <Button
            variant={"ghost"}
            size="icon"
            className="ml-2"
            onClick={() => toggleFavorite()}
          >
            {isFavorited ? (
              <MdFavorite size={32} />
            ) : (
              <MdFavoriteBorder size={32} />
            )}
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
