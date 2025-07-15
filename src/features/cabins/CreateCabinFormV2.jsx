import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow"; // ✅ Your custom component
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    // console.log(data);
    mutate({...data,image:data.image[0]});
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
          disabled={isLoading} // ✅ disable while uploading
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" htmlForId="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading} // ✅ disable while uploading
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
          disabled={isLoading} // ✅ disable while uploading
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
          disabled={isLoading} // ✅ disable while uploading
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
          disabled={isLoading} // ✅ disable while uploading
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" htmlForId="image" error={null}>
        <FileInput id="image" accept="image/*"  disabled={isLoading} {...register("image", { required: "This field is required" })} />
        {/* ⛔ You still need to handle file upload here if required */}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? "Uploading..." : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
