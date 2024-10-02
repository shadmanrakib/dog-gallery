import { useState, useEffect, useCallback } from "react";
import { fetchBreedsAPI } from "@/lib/api";
import { Breed } from "@/lib/types";

export const useDogBreeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBreeds = useCallback(async () => {
    setLoading(true);
    try {
      const breedList = await fetchBreedsAPI();
      setBreeds(breedList);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  return { breeds, loading };
};
