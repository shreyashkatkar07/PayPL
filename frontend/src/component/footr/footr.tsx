import fb from "../../assets/fb.png"
import ig from "../../assets/ig.png"
import x from "../../assets/x.png"
import wa from "../../assets/wa.png"
import gh from "../../assets/gh.png"


export default function Footr(){


  return (
    <footer className="bg-gradient-to-r from-blue-900 via-gray-900 to-blue-900 text-white pt-10 pb-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0">
        {/* Social Media */}
        <div className="flex flex-col items-start mb-8 md:mb-0">
          <h2 className="text-xl font-bold mb-4 tracking-wide">Connect With Us</h2>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook"><img src={fb} alt="Facebook" className="w-10 h-10 hover:scale-110 transition" /></a>
            <a href="#" aria-label="Instagram"><img src={ig} alt="Instagram" className="w-10 h-10 hover:scale-110 transition" /></a>
            <a href="#" aria-label="Twitter"><img src={x} alt="Twitter" className="w-10 h-10 hover:scale-110 transition" /></a>
            <a href="#" aria-label="WhatsApp"><img src={wa} alt="WhatsApp" className="w-10 h-10 hover:scale-110 transition" /></a>
            <a href="https://github.com/shreyashkatkar07/PayPL" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={gh} alt="GitHub" className="w-10 h-10 hover:scale-110 transition" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start mb-8 md:mb-0">
          <h2 className="text-xl font-bold mb-4 tracking-wide">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Services</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-bold mb-4 tracking-wide">Contact</h2>
          <p className="mb-2">Solapur, Maharashtra, India</p>
          <p className="mb-2">Email: <a href="mailto:info@paypl.com" className="hover:text-blue-400 transition">info@paypl.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-blue-400 transition">+123 456 7890</a></p>
        </div>
      </div>
      <div className="flex flex-col border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        
                <a href="https://github.com/shreyashkatkar07/PayPL" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex justify-center items-center gap-2 mb-2 hover:text-blue-400 transition">
                  <img src={gh} alt="GitHub" className="w-7 h-7 hover:scale-110 transition" />
                  GitHub Repo
                </a>
        &copy; {new Date().getFullYear()} PayPL. All rights reserved.
      </div>
    </footer>
  );
}