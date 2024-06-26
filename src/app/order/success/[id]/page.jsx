import Protected from "@/components/auth/Protected";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OrderSuccess from "@/components/orders/OrderSuccess";

export default function page() {
  return (
    <Protected>
      <Navbar />
      <OrderSuccess />
      <Footer />
    </Protected>
  );
}
