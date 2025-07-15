import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting(onCloseModal)
{
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("setting successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
            //   reset();
            if (onCloseModal) onCloseModal();
        },
        onError: (err) => toast.error(err.message),
    });

    return [updateSetting, isUpdating];
}
