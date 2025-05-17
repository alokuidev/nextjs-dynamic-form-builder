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
    setFields(fields.filter(field => field.id !== id));
    const newFormData = { ...formData };
    delete newFormData[id];
    setFormData(newFormData);
  };

  const handleFieldChange = (id: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const handleClearData = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to clear all form data?')) {
      setFields([]);
      setFormData({});
      localStorage.removeItem(`${STORAGE_KEY}-fields`);
      localStorage.removeItem(`${STORAGE_KEY}-formData`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="form-builder-container">
          <div className="form-builder-header">
            <div>
              <h1 className="form-builder-title">
                Dynamic Form Builder
              </h1>
              <p className="form-builder-subtitle">
                Create and customize your form with drag-and-drop ease
              </p>
            </div>
            {fields.length > 0 && (
              <button
                type="button"
                onClick={handleClearData}
                className="btn btn-danger btn-outline"
              >
                Clear All Data
              </button>
            )}
          </div>

          <AddFieldButton onAddField={handleAddField} />
        </div>

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
                className="btn btn-primary px-8 py-3"
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
