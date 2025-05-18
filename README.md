# Dynamic Form Builder

A clean, modern, and interactive form builder built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
This application allows users to create, customize, and manage dynamic forms with drag-and-drop functionality — in real-time.

---

##  Features

### Dynamic Form Management
- Add and configure multiple field types: text, number, date, and dropdown
- Customize field labels and mark fields as required
- Remove and reorder fields effortlessly

### Intuitive Drag-and-Drop
- Smooth field reordering via drag handles
- Built using `@dnd-kit/sortable` for performance and modularity

### Persistent State
- All field structures and data are stored in **localStorage**
- Automatically preserved between page reloads

### Responsive, Accessible UI
- Optimized for mobile and desktop
- Fully keyboard-navigable and screen-reader friendly
- Tailwind-powered layout with animations and professional design system

---

## Tech Stack

- **Next.js 14** (App Router)
- **React + TypeScript**
- **Tailwind CSS**
- **@dnd-kit/sortable** for drag-and-drop
- **LocalStorage API** for persistence

---

## Folder Structure

src/
├── app/
│ ├── page.tsx # Main logic and layout
│ └── layout.tsx # App shell and font setup
├── components/
│ ├── AddFieldButton.tsx # Add field dropdown UI
│ ├── DragDropWrapper.tsx # Sortable field renderer
│ └── FormField.tsx # Editable form field component
└── styles/
└── globals.css # Custom utility overrides and animations


---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/form-builder.git
cd form-builder
npm install
npm run dev

Then open: [http://localhost:3000]


### HOW TO USE

Add Field
Use the "Add Field" button to insert a new text, number, date, or dropdown field.

Edit Field
Click on the label to rename, mark as required, or configure dropdown options.

Reorder Fields
Use the drag handle to reorder fields visually.

Fill and Submit
Enter data into each field and click **Submit Form**.  
Submitted data is logged to the console and automatically saved in local storage — even after page refresh.

Reset All
Use "Clear All Data" to wipe all fields and reset the form from scratch.

