import PhotosContainer from "@/containers/Photos";
import Layouts from "@/layouts";

export default function Favorite() {
  return (
    <Layouts>
      <PhotosContainer type="favorite" />
    </Layouts>
  );
}
