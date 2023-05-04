import { Routes, Route } from "react-router-dom";
import ParentTable from "../components/table/parentTable/parentTable";
import ChildTable from "../components/table/childTable/childTable";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ParentTable />} />
      <Route path="child-Table/:id" element={<ChildTable />} />
    </Routes>
  );
};

export default AllRoutes;
