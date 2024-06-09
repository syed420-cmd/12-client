import paypalIcon from "../../assets/icons/paypal.png";
import stripeIcon from "../../assets/icons/stripe.png";
import visaIcon from "../../assets/icons/visa.png";
import mastercardIcon from "../../assets/icons/mastercard.png";
import americanExpressIcon from "../../assets/icons/american-express.png";

const iconArray = [
  mastercardIcon,
  americanExpressIcon,
  visaIcon,
  stripeIcon,
  paypalIcon,
];

const Footer = () => {
  return (
    <footer className="bg-black/90 text-white/90">
      <div className="section-wrapper py-10 flex flex-col lg:flex-row justify-between gap-10">
        <div className="lg:w-2/5 space-y-5">
          <h3>Edu Fusion</h3>
          <p>Got Question? Call us 24/7</p>
          <p className="font-semibold">(+880) 123456789</p>
          <p>
            Register now & get you 10% <br /> offer from first order!
          </p>
        </div>

        <div className="lg:w-3/5 flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-3">
            <h5>Company</h5>

            <div className="space-y-2">
              <p>About Us</p>
              <p>Career</p>
              <p>Contact Us</p>
              <p>Start Selling</p>
              <p>Order History</p>
            </div>
          </div>

          <div className="space-y-3">
            <h5>My Account</h5>

            <div className="space-y-2">
              <p>Track My Order</p>
              <p>View Cart</p>
              <p>Sign In</p>
              <p>Help</p>
              <p>Wishlist</p>
            </div>
          </div>

          <div className="space-y-3">
            <h5>Customer Service</h5>

            <div className="space-y-2">
              <p>Payment Methods</p>
              <p>Money Return Policy</p>
              <p>Product Return</p>
              <p>Contact Seller</p>
              <p>Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/80 py-5">
        <div className="section-wrapper flex flex-wrap items-center justify-between gap-5 lg:gap-10">
          <p>All Rights Reserved. © 2024 Edu Fusion</p>

          <div className="flex items-center gap-5">
            <p>Payment Method</p>

            <div className="flex items-center gap-2">
              {iconArray.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="Payment Icon"
                  className="size-8"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
