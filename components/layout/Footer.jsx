import Logo from "../common/Logo";
import FooterNavLinks from "../common/FooterNavLinks";

const quickLinks = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "/products" },
  { title: "New Arrivals", path: "/products" },
];

const company = [
  { title: "About Us", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Terms & Conditions", path: "/terms" },
  { title: "Privacy Policy", path: "/privacy" },
];

const customerService = [
  { title: "Order Status", path: "/order-status" },
  { title: "Shipping & Returns", path: "/shipping-returns" },
  { title: "FAQ", path: "/faq" },
];

function Footer() {
  return (
    <div className="flex flex-col gap-7 items-center justify-center md:flex-row md:gap-20">
      <Logo className=" w-24" />

      <div className="flex flex-col gap-5 text-center md:flex-row md:text-left md:gap-20">
        <FooterNavLinks navTitle={"Quick Links"} navLinks={quickLinks} />
        <FooterNavLinks navTitle={"Company"} navLinks={company} />
        <FooterNavLinks
          navTitle={"Customer Service"}
          navLinks={customerService}
        />
      </div>
    </div>
  );
}

export default Footer;
