# Dynamic Form Builder

A clean, modern, and interactive form builder built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
This application allows users to create, customize, and manage dynamic forms with drag-and-drop functionality — in real-time.

---

## Features

### Dynamic Form Management
- Add and configure multiple field types: text, number, date, and dropdown
- Customize field labels and mark fields as required
- Remove and reorder fields effortlessly

### Intuitive Drag-and-Drop
- Smooth reordering using drag handles
- Powered by `@dnd-kit/sortable` for modular and performant DnD behavior

### Persistent State
- All field structures and form data are stored in **localStorage**
- Automatically preserved between page reloads

### Responsive & Accessible UI
- Optimized for both mobile and desktop
- Fully keyboard-navigable and screen-reader friendly
- Tailwind-powered layout with clean animations

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
└── globals.css # Tailwind overrides and animations

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Local Setup

```bash
git clone https://github.com/your-username/form-builder.git
cd form-builder
npm install
npm run dev

Open your browser at: [http://localhost:3000]

## How to Use

### Add Fields
Use the "Add Field" button to insert a new field of type text, number, date, or dropdown.

### Edit Fields
Click on the field label to rename it, mark it as required, or (for dropdowns) add options.

### Reorder Fields
Click and drag the handle icon to reorder fields within the form.

### Submit Form
Enter data into each field and click "Submit Form".
Submitted data will appear in the console and persist across reloads.

### Reset
Use "Clear All Data" to wipe the form structure and data.

## Run with Docker (No Local Node.js Required)

### If you'd prefer not to install Node.js or dependencies manually, use Docker:

### Step 1: Build the image

docker build -t dynamic-form-builder .

### Step 2: Run the app

docker run -p 3000:3000 dynamic-form-builder

Visit: [http://localhost:3000]