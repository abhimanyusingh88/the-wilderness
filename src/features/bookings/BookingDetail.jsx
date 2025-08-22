import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
// import { deleteBooking } from "../../services/apiBookings";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {deleteBooking,isDeleting}= useDeleteBooking();
  const {checkout,isCheckingOut}= useCheckout();
  const navigate= useNavigate();
  const { booking, isLoading, error } = useBooking(); // ✅ FIXED: Correct destructuring

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading booking: {error.message}</p>; // Optional: error fallback

  // ✅ Move this after loading
  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
         {
                    status==="unconfirmed" &&
                  <Button  onClick={()=>navigate(`/checkin/${id}`)}>
                  Check In
                  </Button>
        }
        {/* // for checkout */}

        {
          status==="checked-in" &&<Button disabled={isCheckingOut} icon={<HiArrowUpOnSquare/>} onClick={()=>{checkout(id)}}  >
                  Check Out
                  </Button>
        }
        <Modal>
            <Modal.Open opens="delete">
            <Button variation="danger">Delete Boooking</Button>
            </Modal.Open>
       
              <Modal.Window name="delete">
                <ConfirmDelete resourceName="booking" onConfirm={()=>{deleteBooking(id,{
                  onSettled: ()=> navigate(-1),
                })}} disabled={isDeleting}/>
              </Modal.Window>
       </Modal>



        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
