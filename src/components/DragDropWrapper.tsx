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
  onRemoveField: (id: string) => void;
  onFieldChange: (id: string, value: any) => void;
  formData: Record<string, any>;
  setFields: (fields: FormFieldData[]) => void;
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
          {fields.map(field => (
            <SortableFormField
              key={field.id}
              id={field.id}
              field={field}
              value={formData[field.id] || ''}
              onRemove={() => onRemoveField(field.id)}
              onChange={(value) => onFieldChange(field.id, value)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableFormField({ id, field, onRemove, onChange, value }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FormField field={field} onRemove={onRemove} onChange={onChange} value={value} />
    </div>
  );
}
