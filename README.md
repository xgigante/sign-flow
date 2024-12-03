# Sign Flow Application

This is an example application built with React and TypeScript that enables the management of documents and digital signature requests. The application uses TailwindCSS for the design and is fully responsive. Additionally, some tests have been implemented to ensure functionality.

## Installation

To install and run the application, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/xgigante/sign-flow.git
   cd sign-flow
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the application:

   ```sh
   npm start
   ```

The application will run at `http://localhost:3000`.

## Application Overview

### Document Upload

The application allows users to upload documents in PDF and DOCX formats. This functionality is handled by the `UploadDocument` component in [src/components/upload-document.component.tsx](src/components/upload-document.component.tsx).

### Signature Request

After uploading a document, users can enter the email addresses of the signers and send a signature request. This functionality is managed by the `SignatureRequest` component in [src/components/signature-request.component.tsx](src/components/signature-request.component.tsx).

### Tracking Status

The application displays a list of documents with their signature statuses (e.g., 'Pending', 'Signed', 'Declined'). This functionality is found in the `DocumentList` component in [src/components/document-list.component.tsx](src/components/document-list.component.tsx).

### Notification Simulation

The application simulates sending notifications to users when the document is signed or declined. This functionality is located in the file [src/services/notification.services.tsx](src/services/notification.services.tsx).

### Main Files

- [src/context/document-context.tsx](src/context/document-context.tsx): Defines the document context and manages the document state in the application.
- [src/utils/api-mock.ts](src/utils/api-mock.ts): Simulates the API operations for document management.

### Responsive Design

The application uses TailwindCSS to ensure that the design is fully responsive and looks good on mobile devices.

### Tests

Some example tests have been implemented to ensure the functionality of the application. The tests can be found in the [src/tests](src/tests) folder.

### Note

For the sake of simplicity in this example, Redux has not been added to manage the data.

## Tech Stack

- React with TypeScript
- TailwindCSS for the design
- Jest and React Testing Library for testing
