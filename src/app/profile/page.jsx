import Protected from "@/components/auth/Protected";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";

export default function page() {
  return (
    <Protected>
      <Navbar />
      <Profile />
    </Protected>
  );
}
