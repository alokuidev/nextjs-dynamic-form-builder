'use client';

import { useState, useEffect } from 'react';
import type { FormFieldData } from '@/app/page';

interface FormFieldProps {
  field: FormFieldData;
  onRemove: () => void;
  value: string;
  onChange: (value: string) => void;
  onFieldMetaChange?: (update: Partial<FormFieldData>) => void;
  onOptionsChange?: (options: string[]) => void;
  dragHandleProps?: any;
}

export default function FormField({
  field,
  onRemove,
  value,
  onChange,
  onFieldMetaChange,
  onOptionsChange,
  dragHandleProps,
}: FormFieldProps) {
  const [label, setLabel] = useState(field.label);
  const [required, setRequired] = useState(field.required);
  const [options, setOptions] = useState(field.options || []);

  useEffect(() => {
    onFieldMetaChange?.({ label });
  }, [label]);

  useEffect(() => {
    onFieldMetaChange?.({ required });
  }, [required]);

  useEffect(() => {
    if (field.type === 'dropdown') {
      onOptionsChange?.(options);
    }
  }, [options]);

  const baseInputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200';

  const renderFieldInput = () => {
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClass}
            placeholder={`Enter ${field.type}`}
            required={required}
          />
        );
      case 'birth-date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClass}
            required={required}
          />
        );
      case 'dropdown':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClass}
            required={required}
          >
            <option value="">Select an option</option>
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-6 transition-all duration-300 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-3 w-full">
          <div
            {...dragHandleProps}
            className="w-4 h-4 bg-indigo-300 rounded-sm cursor-grab"
            title="Drag"
          />
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Field Label"
            className="flex-1 border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-base font-medium bg-transparent"
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Remove
        </button>
      </div>

      {/* Required */}
      <label className="inline-flex items-center gap-2 mt-4 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
          className="accent-indigo-600"
        />
        Required field
      </label>

      {/* Dropdown Option Editor */}
      {field.type === 'dropdown' && (
        <div className="space-y-3 mt-4">
          <label className="text-sm font-medium text-gray-700">Dropdown Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const updated = [...options];
                  updated[index] = e.target.value;
                  setOptions(updated);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={() => setOptions(options.filter((_, i) => i !== index))}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setOptions([...options, 'New Option'])}
            className="text-sm text-indigo-600 hover:text-indigo-800 underline"
          >
            + Add Option
          </button>
        </div>
      )}

      <div className="mt-4">{renderFieldInput()}</div>
    </div>
  );
}
