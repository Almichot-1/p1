import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">WorkersHub</h3>
            <p className="text-gray-300">
              {t('subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/workers" className="text-gray-300 hover:text-white transition-colors">
                  {t('workers')}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactUs')}</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">{t('phone')}:</span> +966 11 123 4567
              </p>
              <p className="text-gray-300">
                <span className="font-medium">{t('email')}:</span> info@workershub.com
              </p>
              <p className="text-gray-300">
                <span className="font-medium">{t('address')}:</span> Riyadh, Saudi Arabia
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 WorkersHub. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;