import PropTypes from "prop-types";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// Container for image + overlay
const ImgContainer = styled.div`
  position: relative;
  width: 8rem; /* slightly bigger image */
  aspect-ratio: 3 / 2;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px; /* rounded corners */
`;

// Cabin image with subtle zoom on hover
const Img = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;

  ${ImgContainer}:hover & {
    transform: scale(1.08); /* slightly bigger zoom */
  }
`;

// Overlay covering entire container with smaller text
const Overlay = styled.div`
  position: absolute;
  inset: 0; /* covers full container */
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem; /* smaller text */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 8px;

  ${ImgContainer}:hover & {
    opacity: 1;
  }
`;

const FullImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
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
  const [mutate, isDeleting] = useDeleteCabin();
  const [createCabin] = useCreateCabin();

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  // Duplicate cabin handler
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Modal>
        {/* Image with full overlay and smaller text */}
        <Modal.Open opens="image">
          <ImgContainer>
            <Img src={image} alt={name} />
            <Overlay>Click to view</Overlay>
          </ImgContainer>
        </Modal.Open>

        {/* Full image modal */}
        <Modal.Window name="image">
          <FullImg src={image} alt={name} />
        </Modal.Window>
      </Modal>

      <Cabin>{name}</Cabin>
      <div>Fits upto {maxCapacity} members</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* Edit Cabin */}
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* Delete Cabin */}
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => mutate(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
