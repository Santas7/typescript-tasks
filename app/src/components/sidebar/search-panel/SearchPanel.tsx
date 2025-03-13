import SearchBox from "../../search-box/SearchBox";

export function SearchPanel({
    styles,
    setSearchQuery
}: {
    styles: Record<string, string>;
    setSearchQuery: (query: string) => void;
}) {
    return (
        <div className={styles.footer}>
          <div className={styles.searchBox}>
            <SearchBox onSearch={setSearchQuery} />
          </div>
        </div>
    )
}