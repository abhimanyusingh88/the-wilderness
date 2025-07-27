// import { TbTableOptions } from "react-icons/tb";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "all" },
          { value: "no-discount", label: "no discount" },
          { value: "with-discount", label: "with discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (a-z)" },
          { value: "name-desc", label: "sort by name (z-a)" },
          { value: "regularPrice-asc", label: "sort by price (low first)" },
          { value: "regularPrice-desc", label: "sort by price (high first)" },
          { value: "maxCapacity-asc", label: "sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
