import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface ImageGridProps {
  images: string[];
  imageLoading: boolean;
}

function ImageGrid({ images, imageLoading }: ImageGridProps) {
  if (imageLoading) {
    return (
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return <p className="text-center text-gray-500 py-8">Select one or more breeds to view images</p>;
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Button variant="outline" className="p-0 w-full h-48 overflow-hidden">
              <img src={image} alt="Dog" className="w-full h-full object-cover" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Dog Image</DialogTitle>
            </DialogHeader>
            <img src={image} alt="Dog" className="w-full h-auto" />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export default React.memo(ImageGrid);