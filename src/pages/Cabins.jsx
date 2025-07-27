// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/Addcabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
// import Button from "../ui/Button";
// import { useState } from "react";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  // const [showForm,setShowForm]=useState(false);
  // console.log(showForm);
//   useEffect(function()
// {
//   getCabins().then((data)=>console.log(data));
// },[])
  return (
    <div>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations/>
      

    </Row>
    <Row>
      <CabinTable/>
      <AddCabin/>
      
    </Row>
    </div>
  );
}

export default Cabins;
