"use client";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast.");

export default function page() {
  return (
    <div>
      <button onClick={notify} className="bg-indigo-500 p-3">Make me a toast</button>
      <Toaster />
    </div>
  );
}
