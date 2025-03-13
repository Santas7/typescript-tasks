import { TextInput } from "@mantine/core";
import { useState } from "react";
import { SearchBoxProps } from "../../types/types-interfaces";


export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <TextInput
      placeholder="Поиск..."
      value={query}
      onChange={handleChange}
    />
  );
}
