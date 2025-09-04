import { Station } from "@/api/전기차충전/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  favoriteStationList: Station[];
};

type Actions = {
  addFavoriteStation: (station: Station) => void;
  removeFavoriteStation: (station: Station) => void;
  reset: () => void;
};

const initialState: State = {
  favoriteStationList: [],
};

const usefavoriteStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      addFavoriteStation: (station: Station) => {
        set((state) => ({
          favoriteStationList: [...state.favoriteStationList, station],
        }));
      },
      removeFavoriteStation: (station: Station) => {
        set((state) => ({
          favoriteStationList: state.favoriteStationList.filter(
            (s) => s.cpId !== station.cpId
          ),
        }));
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "favoriteStore-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usefavoriteStore;
