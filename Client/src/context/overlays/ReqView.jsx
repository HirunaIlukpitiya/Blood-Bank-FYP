import React from "react";
import { useOverlay } from "../overlayContext";

function ReqView(props) {
  const { isReqViewVisible } = useOverlay();
  const handleConfirm = props.confirmFunction;
  const handleCancel = props.cancelFunction;

  if (!isReqViewVisible) return null;

  return (
    <>
      <div className="text-Ash font-poppins z-50 fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="bg-white rounded-2xl w-[80%] p-5">
          <div className="grid grid-cols-2">
            <span>Date & Time : </span>
            <span>{"A"}</span>
            <span>Location : </span>
            <span>{"B"}</span>
            <span>Blood Type : </span>
            <span>{"C"}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="Message" className="">
              Message :{" "}
            </label>
            <textarea
              type="text"
              name="Message"
              className="h-20 border-2 rounded-xl px-3"
              disabled
              value={"D"}
            />
          </div>
          <div className="flex justify-between px-10 py-5">
            <button
              className="bg-bloodred1 border-2 w-[40%] py-1 text-white rounded-lg"
              onClick={handleConfirm}
            >
              Accept
            </button>
            <button
              className="bg-white border-2 w-[40%] py-1 rounded-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReqView;
