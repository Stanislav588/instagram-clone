import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

function useUpdateProfileImg() {
  const [updateImg, setUpdateImg] = useState(null);

  const maxAllowSizeOfImg = 2 * 1024 * 1024;

  function handleUpdateImg(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxAllowSizeOfImg) {
        enqueueSnackbar("Size of image should be less than 2MB", {
          variant: "warning",
        });
        setUpdateImg(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      enqueueSnackbar("Wrong path to image,choose the correct", {
        variant: "warning",
      });
    }
  }

  return { handleUpdateImg, updateImg, setUpdateImg };
}

export default useUpdateProfileImg;
