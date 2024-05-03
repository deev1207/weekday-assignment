import "./Filter.css";
import Box from "../box/Box";

export default function Filter({ handleFilter, filterData }) {
  const handleFiltersChange = (newFilters) => {
    handleFilter(newFilters);
  };
  let arr = [];
  const ignore = [
    "jdUid",
    "jdLink",
    "jobDetailsFromCompany",
    "salaryCurrencyCode",
    "maxExp",
    "maxJdSalary",
    "logoUrl",
  ];
  for (const key in filterData) {
    if (ignore.includes(key)) {
      continue;
    }
    arr.push(
      <Box
        filter_name={key}
        data={filterData[key]}
        onFiltersChange={handleFiltersChange}
        key={key}
      ></Box>
    );
  }

  return <div className="filter">{arr}</div>;
}
