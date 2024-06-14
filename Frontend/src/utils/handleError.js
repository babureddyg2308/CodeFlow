import { toast } from "sonner";

export const handleError = (error) => {
  console.log(error.data.message);
  toast("Error: " + error.data.message);
};
