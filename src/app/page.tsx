'use client';

import { useState, useEffect } from 'react';
import AddFieldButton from '@/components/AddFieldButton';
import DragDropWrapper from '@/components/DragDropWrapper';

export type FieldType = 'text' | 'number' | 'birth-date' | 'dropdown';

export interface FormFieldData {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
}

const STORAGE_KEY = 'form-builder-data';

export default function Home() {
  const [fields, setFields] = useState<FormFieldData[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    const savedFields = localStorage.getItem(`${STORAGE_KEY}-fields`);
    const savedFormData = localStorage.getItem(`${STORAGE_KEY}-formData`);
    if (savedFields) setFields(JSON.parse(savedFields));
    if (savedFormData) setFormData(JSON.parse(savedFormData));
  }, []);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-fields`, JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-formData`, JSON.stringify(formData));
  }, [formData]);

  const handleAddField = (type: FieldType) => {
    const newField: FormFieldData = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      ...(type === 'dropdown' && { options: ['Option 1', 'Option 2'] }),
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
    const updated = { ...formData };
    delete updated[id];
    setFormData(updated);
  };

  const handleFieldChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const handleClearData = () => {
    if (window.confirm('Clear all fields and data?')) {
      setFields([]);
      setFormData({});
      localStorage.removeItem(`${STORAGE_KEY}-fields`);
      localStorage.removeItem(`${STORAGE_KEY}-formData`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700">
            Dynamic Form Builder
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Easily add, remove and rearrange your form fields — all in real-time.
          </p>
        </div>

        {/* Builder Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Manage Form Fields</h2>
              <p className="text-sm text-gray-500">Customize your form layout below.</p>
            </div>
            {fields.length > 0 && (
              <button
                onClick={handleClearData}
                className="text-sm text-red-600 hover:text-red-800 border border-red-500 px-4 py-2 rounded transition"
              >
                Clear All
              </button>
            )}
          </div>

          <AddFieldButton onAddField={handleAddField} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <DragDropWrapper
            fields={fields}
            setFields={setFields}
            onRemoveField={handleRemoveField}
            onFieldChange={handleFieldChange}
            formData={formData}
          />

          {fields.length > 0 && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
              >
                Submit Form
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
