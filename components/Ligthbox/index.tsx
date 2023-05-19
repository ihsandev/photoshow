import Image from "next/image";
import { MdClose } from "react-icons/md";

interface ILightbox {
  photo: string;
  show: boolean;
  onClose?: () => void;
}

export default function Lightbox({ photo, show, onClose }: ILightbox) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-10 ${
        show ? "visible" : "hidden"
      } flex items-center justify-center`}
    >
      {show && (
        <Image
          alt={photo || "lightbox"}
          width={1000}
          height={1000}
          src={photo || ""}
          className="h-full w-auto z-30"
          loading="eager"
        />
      )}
      <span
        className="text-white absolute top-6 right-6 cursor-pointer z-30"
        onClick={onClose}
      >
        <MdClose size="2rem" />
      </span>
    </div>
  );
}
