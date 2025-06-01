export default function Search({ setFiltering, filtering }) {
  return (
    <input
      type="text"
      name="search"
      className="search"
      placeholder="Cari Nama"
      onChange={(e) => {
        setFiltering({
          ...filtering,
          nama: e.target.value,
        });
      }}
    />
  );
}
