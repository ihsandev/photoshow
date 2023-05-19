import Image from "next/image";
import { useEffect, useRef } from "react";
import { MdFavorite, MdDelete } from "react-icons/md";

interface IPhoto {
  title: string;
  photo: string;
  author?: string;
  onFavorite?: (photo: any) => void;
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
    <div
      onClick={onClick}
      className="h-auto md:w-72 w-full overflow-hidden rounded-md cursor-zoom-in relative"
      ref={photoCardRef}
    >
      <Image
        src={photo}
        alt={title}
        width={800}
        height={800}
        className="h-full w-full"
      />
      <div className="absolute z-10 top-0 text-center hover:bg-[rgba(0,0,0,0.5)] h-full w-full flex flex-col justify-center items-center px-4 box-border text-transparent hover:text-white">
        <h4 className="font-semibold">"{title}"</h4>
        <h3 className="mt-4 text-sm">{author && `~ ${author} ~`}</h3>
        {!isFavoritePage && !isFavorited && (
          <div
            className={`mt-6 cursor-pointer hover:text-red-500`}
            onClick={onFavorite}
          >
            <MdFavorite size="3rem" />
          </div>
        )}
        {isFavoritePage && (
          <div
            className={`mt-6 cursor-pointer hover:text-red-500`}
            onClick={onFavorite}
          >
            <MdDelete size="3rem" />
          </div>
        )}
      </div>
    </div>
  );
}
