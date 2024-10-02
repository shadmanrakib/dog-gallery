import { Skeleton } from "@/components/ui/skeleton";
import MultipleSelector from "@/components/ui/multiple-selector";
import { BreedOption } from "@/lib/types";
import React from "react";

interface BreedSelectorProps {
  options: BreedOption[];
  selected: BreedOption[];
  onChange: (value: BreedOption[]) => void;
  loading: boolean;
}

function BreedSelector({
  options,
  selected,
  onChange,
  loading,
}: BreedSelectorProps) {
  return (
    <MultipleSelector
      value={selected}
      options={options}
      onChange={onChange}
      placeholder="Select dog breeds..."
      loadingIndicator={loading && <Skeleton />}
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          No results found.
        </p>
      }
    />
  );
}

export default React.memo(BreedSelector);
