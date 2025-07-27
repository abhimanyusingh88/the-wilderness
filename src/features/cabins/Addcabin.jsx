// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>

      {/* ✅ FIXED: Wondow → Window */}
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* can have multiple modal windows inside same component just have to tell what it should do */}
      {/* <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CreateCabinForm />
      </Modal.Window> */}
    </Modal>
    </div>
  );
}

// function AddCabin()
// {
//     const [openModal,isOpenModal]=useState(false);
//     return (<div><Button onClick={()=>isOpenModal((show)=>!show)}>{ !openModal?"Add New Cabin" : "close form"}</Button>
//           {openModal && 
//           <Modal onClose={()=>isOpenModal(false)}>
//             <CreateCabinForm onClosingModal={()=>isOpenModal(false)}/>
//             </Modal>}</div>)
// }

export default AddCabin;
