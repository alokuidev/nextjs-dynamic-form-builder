'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FormFieldData } from '@/app/page';
import FormField from './FormField';

interface Props {
  fields: FormFieldData[];
  setFields: (fields: FormFieldData[]) => void;
  onRemoveField: (id: string) => void;
  onFieldChange: (id: string, value: any) => void;
  formData: Record<string, any>;
}

export default function DragDropWrapper({
  fields,
  setFields,
  onRemoveField,
  onFieldChange,
  formData,
}: Props) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 mt-4">
          {fields.map((field) => (
            <SortableFormField
              key={field.id}
              id={field.id}
              field={field}
              formData={formData}
              onFieldChange={onFieldChange}
              onRemoveField={onRemoveField}
              setFields={setFields}
              fields={fields}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

interface SortableProps {
  id: string;
  field: FormFieldData;
  formData: Record<string, any>;
  fields: FormFieldData[];
  setFields: (fields: FormFieldData[]) => void;
  onFieldChange: (id: string, value: any) => void;
  onRemoveField: (id: string) => void;
}

function SortableFormField({
  id,
  field,
  formData,
  fields,
  setFields,
  onFieldChange,
  onRemoveField,
}: SortableProps) {
  const {
    attributes,
    listeners, // ✅ only this gets passed to icon now
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMetaChange = (update: Partial<FormFieldData>) => {
    const updated = fields.map(f =>
      f.id === field.id ? { ...f, ...update } : f
    );
    setFields(updated);
  };

  const handleOptionsChange = (options: string[]) => {
    const updated = fields.map(f =>
      f.id === field.id ? { ...f, options } : f
    );
    setFields(updated);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <FormField
        field={field}
        value={formData[field.id] || ''}
        onChange={(value) => onFieldChange(field.id, value)}
        onRemove={() => onRemoveField(field.id)}
        onFieldMetaChange={handleMetaChange}
        onOptionsChange={handleOptionsChange}
        dragHandleProps={listeners} // ✅ passed to drag icon only
      />
    </div>
  );
}
