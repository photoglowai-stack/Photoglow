import { memo } from 'react';
import { Button } from './ui/button';
import { Heart, Mail, MessageCircle } from 'lucide-react';

// Memoized: Footer never changes, avoid re-renders
export const Footer = memo(function Footer() {
  return (
    <footer className="bg-black border-t border-purple-500/20 py-12 md:py-14 lg:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-white font-bold text-xl">PhotoGlow</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your photos with AI-powered enhancement. 
              Create stunning, professional-quality images with ease.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-pink-400">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-pink-400">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Product</h4>
            <div className="space-y-2 text-sm">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#examples" className="block text-gray-400 hover:text-white transition-colors">Examples</a>
              <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">API</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Status</a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Legal</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">GDPR</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 PhotoGlow. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-pink-500 fill-current" />
              <span>for creative excellence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});