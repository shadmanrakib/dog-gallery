import { Breed } from "./types";
import { BreedListResponseSchema, ImageResponseSchema } from "./validation";

// Base URL for the Dog API
const BASE_URL = "https://dog.ceo/api";

// Fetch breeds with dependency injection for the fetch function and base url
export const fetchBreedsAPI = async (
  fetchFn = fetch,
  baseURL = BASE_URL
): Promise<Breed[]> => {
  const response = await fetchFn(`${baseURL}/breeds/list/all`);
  const data = await response.json();

  // Validate response
  const result = BreedListResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid breed data format");
  }

  if (result.data.status !== "success") {
    throw new Error("API failed");
  }

  const breeds: Breed[] = [];

  // Process the message object to either add the breed or its sub-breeds
  Object.entries(result.data.message).forEach(([breed, subBreeds]) => {
    if (subBreeds.length === 0) {
      // No sub-breeds, add the breed directly
      breeds.push({
        breed,
        subBreed: undefined,
      });
    } else {
      // Has sub-breeds, add each sub-breed as `breed/sub-breed`
      subBreeds.forEach((subBreed) => {
        breeds.push({
          breed,
          subBreed,
        });
      });
    }
  });

  return breeds;
};

// Fetch images for selected breeds with dependency injection for the fetch function and base url
export const fetchImagesAPI = async (
  selected: string[],
  numPhotosPerBreed: number,
  fetchFn = fetch,
  baseURL = BASE_URL
): Promise<string[]> => {
  const imagePromises = selected.map((breed) =>
    fetchFn(
      `${baseURL}/breed/${breed}/images/random/${numPhotosPerBreed}`
    ).then((res) => res.json())
  );

  const results = await Promise.all(imagePromises);

  // Validate each image response
  results.forEach((result) => {
    const parsed = ImageResponseSchema.safeParse(result);
    if (!parsed.success) {
      throw new Error("Invalid image data format");
    }
  });

  return results.flatMap((result) => result.message);
};
