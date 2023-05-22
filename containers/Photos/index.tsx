import PhotoCard from "@/components/PhotoCard";
import Skeleton from "@/components/Skeleton";
import useAppContext from "@/contexts/AppContext";
import { addToLocalStorage, getFromLocalStorage } from "@/utils/storage";
import { unsplashAPI } from "@/utils/unsplash-api";
import { useEffect, useState } from "react";
import { IPhotos } from "./photos.types";
import Lightbox from "@/components/Ligthbox";

interface IPhotoContainer {
  type?: string;
}

export default function PhotosContainer({ type }: IPhotoContainer) {
  const { dispatch, state } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [indexSelected, setIndexSelected] = useState(0);
  const [isShowImage, setIsShowImage] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const isFavoritePage = type === "favorite";
  const newPhotos: any = isFavoritePage ? state.favorites : state.photos;

  useEffect(() => {
    if (!isFavoritePage) {
      getPhotosList();
    }
  }, [keyword, page]);

  useEffect(() => {
    getFavoritesList();
  }, []);

  const getFavoritesList = () => {
    const storage = getFromLocalStorage("favorites");
    if (storage) {
      dispatch({ type: "SET_FAVORITES", payload: storage });
    }
  };

  const getResults = (res: any) => {
    if (res.type === "success") {
      const newData = res.response.results.map((item: any) => ({
        id: item?.id || "",
        thumb: item?.urls?.thumb || "",
        full_image: item?.urls?.regular || "",
        author: item?.user?.name || "",
        title: item?.alt_description || "",
      }));
      dispatch({
        type: "SET_PHOTOS",
        payload:
          state.photos.length > 0 && !keyword
            ? [...state.photos, ...newData]
            : newData,
      });
    }
  };

  const fetchSearchPhotos = () => {
    unsplashAPI.search
      .getPhotos({
        query: keyword,
        page,
        perPage,
      })
      .then((res) => getResults(res))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPhotosList = () => {
    unsplashAPI.photos
      .list({
        page,
        perPage,
      })
      .then((res) => getResults(res))
      .finally(() => {
        setLoading(false);
      });
  };

  const getPhotosList = () => {
    setLoading(true);
    if (keyword) {
      fetchSearchPhotos();
    } else {
      fetchPhotosList();
    }
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setKeyword(value);
    setPage(1);
  };

  const handleFavorite = (photo: IPhotos) => {
    const storage = getFromLocalStorage("favorites");
    const newData = storage ? [...storage] : [];
    newData.push({
      id: photo.id,
      thumb: photo.thumb,
      full_image: photo.full_image,
      author: photo.author,
      title: photo.title,
    });
    dispatch({ type: "SET_FAVORITES", payload: newData });
    addToLocalStorage("favorites", newData);
  };

  const getIsFavorited = (id: string) => {
    const storage: IPhotos[] = getFromLocalStorage("favorites");
    let isFavorited: boolean = false;
    if (storage) {
      isFavorited = storage.some((photo) => photo.id === id);
    }
    return isFavorited;
  };

  const handleDeleteFavorite = (id: string) => {
    const storage = getFromLocalStorage("favorites");
    const newData = [...storage].filter((photo: IPhotos) => photo.id !== id);
    dispatch({ type: "SET_FAVORITES", payload: newData });
    addToLocalStorage("favorites", newData);
  };

  const handleClickPhoto = (idx: number) => {
    setIndexSelected(idx);
    setIsShowImage(true);
  };

  const Loading = (
    <div className={`flex flex-wrap gap-6 mt-4 w-full`}>
      {[...new Array(5)].map((_, i) => (
        <Skeleton key={i} className="w-full md:w-[18.7%] h-[380px]" />
      ))}
    </div>
  );

  return (
    <section className="container mx-auto mt-3 mb-8 px-2 md:px-0">
      {!isFavoritePage && (
        <div className="mb-6">
          <input
            placeholder="Cari Photo.."
            onChange={handleSearch}
            className="w-full text-xl outline-none px-2 py-4 border-b-stone-200 border-b-2"
          />
        </div>
      )}
      {newPhotos?.length > 0 ? (
        <div className={`flex flex-wrap gap-6`}>
          <>
            {newPhotos?.map((photo: IPhotos, i: number) => (
              <PhotoCard
                key={i}
                title={photo.title}
                photo={photo?.thumb}
                author={photo?.author}
                onFavorite={() => handleFavorite(photo)}
                onUnFavorited={() => handleDeleteFavorite(photo.id)}
                isFavorited={getIsFavorited(photo.id)}
                isFavoritePage={isFavoritePage}
                onClick={() => handleClickPhoto(i)}
                isLast={i === newPhotos?.length - 1}
                newLimit={() => setPage(page + 1)}
              />
            ))}
          </>
        </div>
      ) : (
        <>
          {loading ? (
            Loading
          ) : (
            <div className="flex justify-center">
              <h1 className="text-2xl text-slate-500">Data Not Found</h1>
            </div>
          )}
        </>
      )}
      {loading && Loading}
      <Lightbox
        photo={newPhotos[indexSelected]?.full_image}
        show={isShowImage}
        onClose={() => setIsShowImage(false)}
      />
    </section>
  );
}
