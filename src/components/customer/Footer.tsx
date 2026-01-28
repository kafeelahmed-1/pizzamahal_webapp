import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold">Pizza Mahal</h3>
            <p className="text-orange-100 leading-relaxed">
              Authentic flavors, delivered fresh. Experience the taste of tradition with every bite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-orange-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-orange-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-orange-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors duration-300">Menu</a></li>
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors duration-300">Locations</a></li>
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-200" />
                <span className="text-orange-100">+92 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-200" />
                <span className="text-orange-100">info@pizzamahal.pk</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-orange-200 mt-1" />
                <span className="text-orange-100">123 Food Street, Rawalpindi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Opening Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-orange-200" />
                <div>
                  <p className="text-orange-100 font-medium">Mon - Thu</p>
                  <p className="text-orange-200 text-sm">11:00 AM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-orange-200" />
                <div>
                  <p className="text-orange-100 font-medium">Fri - Sun</p>
                  <p className="text-orange-200 text-sm">12:00 PM - 12:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-orange-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-orange-200 text-sm">
            © 2024 Pizza Mahal. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-orange-200 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-orange-200 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-orange-200 hover:text-white text-sm transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;