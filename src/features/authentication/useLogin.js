import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login  as loginApi} from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin()
{
    const navigate= useNavigate();
    const queryclient=  useQueryClient();
   const {mutate:login,isLoading}= useMutation({
        mutationFn:({email,password})=>loginApi({email,password}),
        onSuccess:(user)=>{
            console.log(user)
            // manually set data in the cache so while login it not load for long, only getuser if coming back to page
              queryclient.setQueryData(["user"],user.user);
             navigate("/dashboard");
        },
        onError:(err)=>{
            console.log("ERROR",err)
            toast.error("provided email or password are incorrect")
        }
    })
    return {login,isLoading};
}