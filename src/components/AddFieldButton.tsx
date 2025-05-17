'use client';

import { useState } from 'react';
import type { FieldType } from '@/app/page';

interface AddFieldButtonProps {
  onAddField: (type: FieldType) => void;
}

export default function AddFieldButton({ onAddField }: AddFieldButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const fieldTypes: { type: FieldType; label: string }[] = [
    { type: 'text', label: 'Text Field' },
    { type: 'number', label: 'Number Field' },
    { type: 'birth-date', label: 'Date Field' },
    { type: 'dropdown', label: 'Dropdown Field' },
  ];

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-200"
      >
        Add Field
      </button>

      {isOpen && (
        <div className="absolute mt-2 z-20 w-full sm:w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fade-in">
          <ul className="py-2 text-sm text-gray-700 divide-y divide-gray-100">
            {fieldTypes.map(({ type, label }) => (
              <li key={type}>
                <button
                  type="button"
                  onClick={() => {
                    onAddField(type);
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-50 text-left"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
