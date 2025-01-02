import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-6">
          <p className="text-xl font-semibold">
            For better experience, download the Swiggy app now
          </p>
          <div className="flex space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-40"
            />
            <img
              src="https://w7.pngwing.com/pngs/314/368/png-transparent-itunes-app-store-apple-logo-apple-text-rectangle-logo.png   "
              alt="App Store"
              className="w-40"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb9tbetGkd0-WiWKXHyMHq2D4pGBAKxTvY2g&s"
              alt="Swiggy Logo"
              className="h-10"
            />
            <p className="mt-2 text-gray-500">&copy; 2024 Swiggy Limited</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">Company</h4>
            <ul className="mt-2 space-y-2">
              <li>About Us</li>
              <li>Swiggy Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Swiggy Genie</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">Contact us</h4>
            <ul className="mt-2 space-y-2">
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">Available in:</h4>
            <ul className="mt-2 space-y-2">
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">Life at Swiggy</h4>
            <ul className="mt-2 space-y-2">
              <li>Explore with Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700">Legal</h4>
            <ul className="mt-2 space-y-2">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
              <li>Investor Relations</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold text-gray-700">Social Links</h4>
          <div className="flex space-x-4 mt-4">
            <a href="#">
              <i className="fab fa-linkedin text-2xl text-gray-600"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram text-2xl text-gray-600"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook text-2xl text-gray-600"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest text-2xl text-gray-600"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter text-2xl text-gray-600"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
