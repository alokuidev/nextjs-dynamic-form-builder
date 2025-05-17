'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { FormFieldData } from '@/app/page';
import FormField from './FormField';

interface DragDropWrapperProps {
  fields: FormFieldData[];
  onDragEnd: (result: DropResult) => void;
  onRemoveField: (id: string) => void;
  onFieldChange: (id: string, value: any) => void;
  formData: Record<string, any>;
}

export default function DragDropWrapper({ 
  fields, 
  onDragEnd, 
  onRemoveField,
  onFieldChange,
  formData 
}: DragDropWrapperProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="form-fields">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4 mt-4"
          >
            {fields.map((field, index) => (
              <Draggable 
                key={field.id} 
                draggableId={field.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                    className={`${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}`}
                  >
                    <FormField
                      field={field}
                      onRemove={() => onRemoveField(field.id)}
                      dragHandleProps={provided.dragHandleProps}
                      value={formData[field.id] || ''}
                      onChange={(value) => onFieldChange(field.id, value)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
} 