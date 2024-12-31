import React from 'react';
import { Mail, HeadphonesIcon } from 'lucide-react';
import { layout } from '../styles/constants';

export function ContactPage() {
  return (
    <div className={`${layout.gradient} min-h-screen py-12 px-4`}>
      <div className={layout.container}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Mail className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Get in touch with our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Mail className="w-8 h-8 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Admin Contact
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                For general inquiries and administrative questions:
              </p>
              <a
                href="mailto:djarazeddine@gmail.com"
                className="text-lg font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                djarazeddine@gmail.com
              </a>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <HeadphonesIcon className="w-8 h-8 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Technical Support
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                For technical issues and support requests:
              </p>
              <a
                href="mailto:djarallah.brahim@gmail.com"
                className="text-lg font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                djarallah.brahim@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Response Time
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Administrative Inquiries
                </h3>
                <p className="text-gray-600">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Technical Support
                </h3>
                <p className="text-gray-600">
                  For urgent technical issues, we aim to respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}