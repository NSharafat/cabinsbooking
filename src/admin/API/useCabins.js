import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCabin, GetAllCabins } from "./CRUD";

export default function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: GetAllCabins,
  });

  return { cabins, isLoading };
}

export function useAddCabin() {
  const queryClient = useQueryClient();
  const { mutate: addCabinApi, isPending } = useMutation({
    mutationFn: (cabin) => addCabin(cabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });

  return { addCabinApi, isPending };
}
