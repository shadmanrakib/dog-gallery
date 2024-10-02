"use client";

import { useState, useMemo, useEffect } from "react";
import { useDogBreeds } from "@/hooks/use-dog-breeds";
import { useDogImages } from "@/hooks/use-dog-images";
import BreedSelector from "@/components/gallery/breed-selector";
import ImageGrid from "@/components/gallery/image-grid";
import { Card, CardContent } from "@/components/ui/card";
import { BreedOption } from "@/lib/types";

export default function DogBreedGallery() {
  const { breeds, loading } = useDogBreeds();
  const { images, imageLoading, fetchImages } = useDogImages(3);

  const [selected, setSelected] = useState<BreedOption[]>([]);

  const options = useMemo(
    () =>
      breeds.map((value) => ({
        // format: BREED/SUBBREED or BREED
        value: value.subBreed
          ? `${value.breed}/${value.subBreed}`
          : value.breed,
        // format: BREED - SUBBREED or BREED
        label: value.subBreed
          ? `${value.breed} - ${value.subBreed}`
          : value.breed,
        ...value,
      })),
    [breeds]
  );

  // Fetch images when selection changes
  useEffect(() => {
    if (selected.length > 0) {
      const breedNames = selected.map((s) => s.breed);
      fetchImages(breedNames);
    }
  }, [selected, fetchImages]);

  return (
    <div className="flex flex-col h-screen container mx-auto">
      <h1 className="text-3xl font-bold py-6">Dog Breed Gallery</h1>

      <BreedSelector
        options={options}
        selected={selected}
        onChange={setSelected}
        loading={loading}
      />

      <Card className="md:col-span-2 mt-4">
        <CardContent className="p-4">
          <ImageGrid images={images} imageLoading={imageLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
