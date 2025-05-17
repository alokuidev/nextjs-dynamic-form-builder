'use client';

import { useState } from 'react';
import type { FieldType } from '@/app/page';

interface AddFieldButtonProps {
  onAddField: (type: FieldType) => void;
}

export default function AddFieldButton({ onAddField }: AddFieldButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const fieldTypes: { type: FieldType; label: string; icon: string }[] = [
    { type: 'text', label: 'Text Field', icon: 'Aa' },
    { type: 'number', label: 'Number Field', icon: '123' },
    { type: 'birth-date', label: 'Date Field', icon: '📅' },
    { type: 'dropdown', label: 'Dropdown Field', icon: '▼' },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Field</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10">
          <div className="p-2">
            {fieldTypes.map(({ type, label, icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  onAddField(type);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center space-x-3 group"
              >
                <span className="text-xl">{icon}</span>
                <span className="text-gray-700 group-hover:text-gray-900">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 