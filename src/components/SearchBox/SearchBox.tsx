import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export const SearchBox = ({
  value,
  onChange,
  placeholder = "Search notes",
  autoComplete = "off",
}: SearchBoxProps) => {
  return (
    <input
      type="search"
      className={css.input}
      placeholder={placeholder}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search notes"
    />
  );
};
