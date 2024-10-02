export interface Breed {
  breed: string;
  subBreed: string | undefined;
}

export interface BreedOption extends Breed {
  value: string;
  label: string;
}