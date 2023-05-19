import { IPhotos } from "@/containers/Photos/photos.types";

export type Action = {
  type: "SET_PHOTOS" | "SET_FAVORITES";
  payload: any;
};
export type Dispatch = (action: Action) => void;
export type State = {
  photos?: any;
  favorites?: any;
};
export type AppProviderProps = { children: React.ReactNode };
