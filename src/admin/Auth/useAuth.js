import { useMutation } from "@tanstack/react-query";
import { login } from "./Auth";

export function useAuth() {
  const { mutate: loginApi, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
  });

  return { loginApi, isLoading };
}
