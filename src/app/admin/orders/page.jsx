import AdminOrders from "@/components/admin's/AdminOrders";
import Protected from "@/components/auth/Protected";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function page() {
  return (
    <Protected>
      <Navbar />
      <AdminOrders />
      <Footer/>
    </Protected>
  );
}
