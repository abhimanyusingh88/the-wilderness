import { useForm } from "react-hook-form";

// import toast from "react-hot-toast";
// import styled from "styled-components";

import PropTypes from "prop-types"; // ✅ For prop type validation
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow"; // ✅ Your custom component
// import { createEditCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit={},onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit ?? {}; // ✅ Safe destructuring
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
  
    
    formState: { errors },
    getValues,
    reset
  } = useForm({
    // default values will be there if we want to edit the cabin else no need
    defaultValues: isEditSession ? editValues : {},
  });
   const [createCabin,isCreating]= useCreateCabin(reset);
   const [editCabin,isEditing]= useEditCabin(onCloseModal);
  
  
  const working= isCreating|| isEditing;

  function onSubmit(data) {
    const image= typeof data.image==="string"?data.image:data.image[0];
    if(isEditSession) editCabin({newCabinData:{...data,image:image},id:editId});
    else
    // console.log(data);
    createCabin(
  { ...data, image: data.image[0] },
  {
    onSuccess: () => {
      reset(); // reset the form on success
    }
  }
);

  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" htmlForId="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={working} // ✅ disable while uploading
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" htmlForId="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={working} // ✅ disable while uploading
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" htmlForId="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={working} // ✅ disable while uploading
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" htmlForId="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={working} // ✅ disable while uploading
          {...register("discount", {
            validate: (value) => {
              const regularPrice = getValues("regularPrice");
              if (Number(value) > Number(regularPrice)) {
                return "Discount must be lesser or equal to regular price";
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow label="Description for website" htmlForId="description" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={working} // ✅ disable while uploading
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" htmlForId="image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={working}
          {...register("image", {
            required: isEditSession? false : "This field is required",
          })}
        />
        {/* ⛔ You still need to handle file upload here if required */}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={working}>
          Cancel
        </Button>
        <Button disabled={working}>
          {isEditSession? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

// ✅ Prop type validation
CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  onCloseModal: PropTypes.func, // ✅ new prop
};

export default CreateCabinForm;
