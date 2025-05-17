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

  // Sync local state to parent
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
    'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200';

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
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-field">
      <div className="form-field-header">
        <div className="flex items-center space-x-3 flex-1">
          <div
            {...dragHandleProps}
            className="cursor-move p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title="Drag to reorder"
          >
            ☰
          </div>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="form-field-label"
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="btn-icon"
          aria-label="Remove field"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all duration-200"
          />
          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
            Required
          </span>
        </label>
      </div>

      {field.type === 'dropdown' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="form-field-input"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newOptions = options.filter((_, i) => i !== index);
                    setOptions(newOptions);
                  }}
                  className="btn btn-danger btn-outline p-2"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOptions([...options, 'New Option'])}
            className="btn btn-primary mt-2"
          >
            ➕ Add Option
          </button>
        </div>
      )}

      {renderFieldInput()}
    </div>
  );
}
