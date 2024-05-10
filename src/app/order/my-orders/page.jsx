import Protected from "@/components/auth/Protected";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserOrders from "@/components/orders/UserOrders";

export default function page() {
  return <Protected>
    <Navbar/>
    <UserOrders />
    <Footer/>
  </Protected>;
}
