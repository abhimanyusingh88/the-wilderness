import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin(onCloseModal)
{
    const queryClient= useQueryClient();
    const { mutate:editCabin, isLoading:isEditing} = useMutation({
        mutationFn: ({newCabinData,id})=> createEditCabin(newCabinData,id),
        onSuccess: () => {
    
          toast.success("cabin successfully edited");
          queryClient.invalidateQueries({
            queryKey: ["cabin"],
          });
        //   reset();
          if (onCloseModal) onCloseModal();
          
        },
        onError: (err) => toast.error(err.message),
      });
      return [editCabin,isEditing];
}