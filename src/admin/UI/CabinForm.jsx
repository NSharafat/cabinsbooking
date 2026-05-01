import React from "react";
import { useForm } from "react-hook-form";
import FormRow from "./FormRow";
import Button from "./Button";
import { addCabin } from "../API/CRUD";
import toast from "react-hot-toast";
import { Error, H4, Input } from "./FormElements";
import { useAddCabin } from "../API/useCabins";
import { useQueryClient } from "@tanstack/react-query";

function CabinForm({
  onCancel,
  cabinToEdit = {},
  isEditSession,
  setCabinToEdit,
  setIsOpen,
  setisEditSession,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: cabinToEdit,
  });

  const { addCabinApi, isPending } = useAddCabin();
  const queryClient = useQueryClient();

  async function saveCabin(data) {
    const msg = isEditSession ? "Saving changes..." : "Adding cabin...";
    const toastId = toast.loading(msg);
    if (isEditSession) {
      addCabinApi(data, {
        onSuccess: () => {
          setisEditSession(false);
          setIsOpen(false);
          toast.success("Changes saved succesfully!", { id: toastId });
          reset();
          setCabinToEdit({});
        },
        onError: () => {
          toast.error("An error occured", { id: toastId });
        },
      });
    } else {
      const res = await addCabin(data);
      setCabinToEdit({});
      if (res == true) {
        setIsOpen(false);
        toast.success("New cabin added succesfully!", { id: toastId });
        reset();
      } else {
        toast.error("An error occured", { id: toastId });
      }
    }
  }
  return (
    <>
      <H4>Add new cabin</H4>
      <hr />
      <form onSubmit={handleSubmit(saveCabin)}>
        <FormRow label={"Cabin Name"}>
          <Input
            type="text"
            {...register("cabinName", {
              required: "Cabin name is required",
              min: {
                value: 3,
                message: "Cabin name must be at least 3 characters",
              },
            })}
          />
          <Error>{errors.cabinName?.message} </Error>
        </FormRow>
        <FormRow label={"Capacity"}>
          <Input
            type="number"
            {...register("capacity", {
              required: "Capacity is required",
              min: {
                value: 1,
                message: "Cabin Capacity must be at least 1",
              },
            })}
          />
          <Error>{errors.capacity?.message} </Error>
        </FormRow>
        <FormRow label={"Price"}>
          <Input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 100,
                message: "Price must be greater than $100",
              },
            })}
          />
          <Error>{errors.price?.message} </Error>
        </FormRow>
        <FormRow label="">
          <Button type="reset" onclick={onCancel} variation={"secondary"}>
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="submit" disabled={isSubmitting} variation={"primary"}>
            {isSubmitting
              ? "Saving..."
              : isEditSession
                ? "Update Cabin"
                : "Add Cabin"}
          </Button>
        </FormRow>
      </form>
    </>
  );
}

export default CabinForm;
