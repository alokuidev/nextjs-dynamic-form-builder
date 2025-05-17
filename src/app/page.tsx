'use client';

import { useState, useEffect } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import AddFieldButton from '@/components/AddFieldButton';
import DragDropWrapper from '@/components/DragDropWrapper';

export type FieldType = 'text' | 'number' | 'birth-date' | 'dropdown';

export interface FormFieldData {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[]; // For dropdown fields
}

const STORAGE_KEY = 'form-builder-data';

export default function Home() {
  const [fields, setFields] = useState<FormFieldData[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedFields = localStorage.getItem(`${STORAGE_KEY}-fields`);
    const savedFormData = localStorage.getItem(`${STORAGE_KEY}-formData`);
    
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Save fields to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-fields`, JSON.stringify(fields));
  }, [fields]);

  // Save form data to localStorage whenever it changes
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
    // Also remove the field's data from formData
    const newFormData = { ...formData };
    delete newFormData[id];
    setFormData(newFormData);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const handleFieldChange = (id: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you can add your form submission logic
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Dynamic Form Builder
              </h1>
              <p className="text-gray-600 mt-2">
                Create and customize your form with drag-and-drop ease
              </p>
            </div>
            {fields.length > 0 && (
              <button
                type="button"
                onClick={handleClearData}
                className="px-4 py-2 text-red-600 hover:text-red-700 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
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
            onDragEnd={handleDragEnd}
            onRemoveField={handleRemoveField}
            onFieldChange={handleFieldChange}
            formData={formData}
          />
          
          {fields.length > 0 && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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