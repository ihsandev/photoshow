import Image from "next/image";
import { useEffect, useRef } from "react";
import { MdFavorite, MdDelete, MdOutlineFavoriteBorder } from "react-icons/md";

interface IPhoto {
  title: string;
  photo: string;
  author?: string;
  onFavorite?: (photo: any) => void;
  onUnFavorited?: (id: any) => void;
  isFavorited?: boolean;
  isFavoritePage?: boolean;
  onClick?: () => void;
  isLast?: boolean;
  newLimit?: any;
}

export default function PhotoCard({
  title,
  photo,
  author,
  onFavorite,
  onUnFavorited,
  isFavorited,
  isFavoritePage,
  onClick,
  isLast,
  newLimit,
}: IPhoto) {
  const photoCardRef = useRef(null);
  useEffect(() => {
    if (!photoCardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(photoCardRef.current);
  }, [isLast]);

  return (
    <div className="w-full sm:w-auto">
      <div
        className="h-60 md:w-72 overflow-hidden rounded-md cursor-zoom-in relative"
        ref={photoCardRef}
        onClick={onClick}
      >
        <Image
          src={photo}
          alt={title}
          width={800}
          height={800}
          className="h-60 w-full"
        />
      </div>
      <div className="flex justify-between">
        <div className="w-60">
          <h4 className="font-semibold">{title}</h4>
          <h3 className="mt-4 text-sm">{author && `~ ${author} ~`}</h3>
        </div>
        {!isFavoritePage &&
          (isFavorited ? (
            <MdFavorite
              onClick={onUnFavorited}
              size="2rem"
              className="text-red-500 cursor-pointer"
            />
          ) : (
            <MdOutlineFavoriteBorder
              size="2rem"
              className="hover:text-red-500 cursor-pointer"
              onClick={onFavorite}
            />
          ))}
        {isFavoritePage && (
          <div
            className={`mt-6 cursor-pointer hover:text-red-500 z-20`}
            onClick={onUnFavorited}
          >
            <MdDelete size="2rem" />
          </div>
        )}
      </div>
    </div>
  );
}
