# Dynamic Form Builder

A modern, interactive form builder application built with Next.js that allows users to create, customize, and manage dynamic forms with drag-and-drop functionality.

## Features

- 🎯 **Dynamic Form Creation**
  - Add multiple field types (text, number, date, dropdown)
  - Customize field labels and requirements
  - Add/remove form fields dynamically

- 🎨 **Interactive UI**
  - Drag-and-drop field reordering
  - Real-time form preview
  - Modern and responsive design
  - Intuitive field configuration

- 💾 **Data Persistence**
  - Automatic local storage of form structure
  - Form data persistence between sessions
  - Clear data option for resetting forms

- 📱 **Field Types**
  - Text input
  - Number input
  - Date picker
  - Dropdown with customizable options

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd form-validation
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Adding Fields**
   - Click the "Add Field" button
   - Select the desired field type
   - Customize the field label and requirements

2. **Managing Fields**
   - Drag fields using the handle icon to reorder
   - Click "Remove" to delete a field
   - Toggle "Required" checkbox to make fields mandatory

3. **Form Data**
   - Fill out the form fields
   - Data is automatically saved to local storage
   - Use "Clear All Data" to reset the form

4. **Submitting Forms**
   - Click "Submit Form" to submit the form
   - Form data is logged to the console
   - Custom submission logic can be added in the `handleSubmit` function

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- react-beautiful-dnd (for drag-and-drop)
- Local Storage API

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main form builder page
│   └── layout.tsx        # Root layout component
├── components/
│   ├── AddFieldButton.tsx    # Field type selection button
│   ├── DragDropWrapper.tsx   # Drag-and-drop container
│   └── FormField.tsx         # Individual form field component
└── styles/
    └── globals.css       # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Drag and drop powered by [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) 