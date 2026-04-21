import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full mt-5">

      <div className="px-6 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Useful Links */}
          <div>
            <h2 className="font-bold text-black mb-4">Useful Links</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>FAQs</li>
                <li>Security</li>
                <li>Contact</li>
              </ul>

              <ul className="space-y-2">
                <li>Partner</li>
                <li>Franchise</li>
                <li>Seller</li>
                <li>Warehouse</li>
                <li>Deliver</li>
                <li>Resources</li>
              </ul>

              <ul className="space-y-2">
                <li>Recipes</li>
                <li>Bistro</li>
                <li>District</li>
                <li>Blinkit Ambulance</li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-semibold text-black">Categories</h2>
              <span className="text-green-600 text-sm cursor-pointer">
                see all
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <ul className="space-y-2">
                <li>Vegetables & Fruits</li>
                <li>Cold Drinks & Juices</li>
                <li>Bakery & Biscuits</li>
                <li>Dry Fruits, Masala & Oil</li>
                <li>Paan Corner</li>
                <li>Pharma & Wellness</li>
                <li>Personal Care</li>
              </ul>

              <ul className="space-y-2">
                <li>Dairy & Breakfast</li>
                <li>Instant & Frozen Food</li>
                <li>Sweet Tooth</li>
                <li>Sauces & Spreads</li>
                <li>Organic & Premium</li>
                <li>Cleaning Essentials</li>
                <li>Pet Care</li>
              </ul>

              <ul className="space-y-2">
                <li>Munchies</li>
                <li>Tea, Coffee & Milk Drinks</li>
                <li>Atta, Rice & Dal</li>
                <li>Chicken, Meat & Fish</li>
                <li>Baby Care</li>
                <li>Home Furnishing & Decor</li>
                <li>Beauty & Cosmetics</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-around items-center gap-6">

          <p className="text-sm">
            © Blink Commerce Private Limited, 2016-2026
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
            <div className="bg-black text-white p-2 rounded-full">
              <FaFacebookF />
            </div>
            <div className="bg-black text-white p-2 rounded-full">
              <FaXTwitter />
            </div>
            <div className="bg-black text-white p-2 rounded-full">
              <FaInstagram />
            </div>
            <div className="bg-black text-white p-2 rounded-full">
              <FaLinkedinIn />
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}