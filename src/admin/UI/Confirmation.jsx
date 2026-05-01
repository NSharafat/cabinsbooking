import toast from "react-hot-toast";
import Button from "./Button";
import { deleteCabin } from "../API/CRUD";

async function handleDelete(id) {
  const toastId = toast.loading("Deleting Cabin...");
  await deleteCabin(id);
  toast.success("Cabin removed!", { id: toastId });
}
const showConfirmation = () => {
  toast(
    (t) => (
      <div
        style={{ width: "100%", height: "100%", zIndex: "99999" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <span>Are you sure you want to save these changes?</span>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <Button
              onclick={() => {
                toast.dismiss(t.id);
                handleDelete(2);
              }}
            >
              Yes
            </Button>
            <Button onclick={() => toast.dismiss(t.id)}>No</Button>
          </div>
        </div>
      </div>
    ),
    {
      id: "confirm-toast",
      duration: Infinity,
      dismissable: false,
    },
  );
};
export default showConfirmation;
