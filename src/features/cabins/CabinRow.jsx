import PropTypes from "prop-types";
import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCabin } from "../../services/apiCabins";
// import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {

  const [mutate,isDeleting]= useDeleteCabin();
  const [showForm, setShowForm] = useState(false);
  const [createCabin]=useCreateCabin();
  function handleDuplicate()
  {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,regularPrice,discount,image,
      description,
    });
  }

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image,description } = cabin;
  
   console.log(description);
  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} memebers</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ?(<Discount>{formatCurrency(discount)}</Discount>): <span>&mdash;</span>}
        <div>
          <button onClick={handleDuplicate}><HiSquare2Stack/></button>
          <button onClick={() => setShowForm((show) => !show)}><FaEdit/></button>
          <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
           <HiTrash/>
          </button>
        </div>
        {/* You can render more values like name, price, etc., here */}
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} onCloseModal={() => setShowForm(false)}   />}
    </>
  );
}

// ✅ PropTypes validation
CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // 👈 Add this line
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
     description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CabinRow;
