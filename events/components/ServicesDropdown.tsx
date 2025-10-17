"use client";
import { useState } from "react";

interface Service {
  name: string;
  description: string;
}

const services: Service[] = [
  { name: "Wedding Planning", description: "Full-service planning for your dream wedding." },
  { name: "Corporate Events", description: "Professional event management for business gatherings." },
  { name: "Birthday Parties", description: "Custom celebrations for all ages." },
  { name: "Anniversary Celebrations", description: "Memorable milestones with elegant setups." },
  { name: "Cultural Events", description: "Traditional and cultural event coordination." },
];

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Toggle Services Dropdown"
      >
        Services
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                  <h4 className="font-medium text-gray-800">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
