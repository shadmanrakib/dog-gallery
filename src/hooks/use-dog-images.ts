import { useCallback, useState } from "react";
import { fetchImagesAPI } from "@/lib/api";

export const useDogImages = (numPhotosPerBreed: number) => {
  const [images, setImages] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(false);

  const fetchImages = useCallback(async (selected: string[]) => {
    setImageLoading(true);

    try {
      const imageList = await fetchImagesAPI(selected, numPhotosPerBreed);
      setImages(imageList);
    } catch (error) {
      console.error("Error fetching images:", error);
    }

    setImageLoading(false);
  }, [numPhotosPerBreed]);

  return { images, imageLoading, fetchImages };
};
