# 🌸 Bilma Scent — Elegant Perfume E-Commerce Platform

Bilma Scent is a modern, visually refined online perfume store built with **React.js** and **Tailwind CSS**. The platform delivers a seamless fragrance shopping experience with smooth animations, responsive layouts, and a clean, designer-inspired UI.

---

## ✨ Features

- **Animated Hero & Product Sections:** Engaging, interactive landing and product displays.
- **Elegant Product Cards:** Featured perfume deals with rich visuals and details.
- **Full Shopping Cart & Checkout:** Add, remove, and purchase products with real-time cart updates.
- **Order Management:** Admin dashboard for managing products and viewing recent orders.
- **User Authentication:** Secure login and user profile management (planned).
- **Interactive FAQ & Contact Pages:** Easily accessible support and information.
- **Smooth Navigation:** Powered by React Router for a single-page app feel.
- **Designer UI:** Built with Tailwind CSS for rapid, consistent styling.
- **Custom Chat Page:** Animated background and real-time messaging (optional).
- **Responsive Design:** Optimized for all devices, from mobile to desktop.
- **Clean Codebase:** Modular, reusable components and clear project structure.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API
- **Animation:** Framer Motion
- **Backend:** Firebase Firestore (orders, users, products)
- **Authentication:** Firebase Auth (planned)
- **Payments:** Paystack integration
- **Icons & Assets:** Lucide, custom images, Google Fonts

---

## 🗂️ Project Structure

```
src/
│
├── assets/         # Images and static files
├── components/     # Reusable UI components (Hero, Footer, ProductCard, etc.)
├── constants/      # Static data (perfumes, FAQs, etc.)
├── contexts/       # React Context providers (Cart, Auth, Order, etc.)
├── pages/          # Route-level pages (Home, Contact, FAQ, Store, Admin, etc.)
├── App.jsx         # Main application file
└── index.js        # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/bilma-perfume-store.git
   cd bilma-perfume-store
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add your configuration:

   ```
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   VITE_PAYSTACK_PUBLIC_KEY=your_paystack_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:5173
   ```

---

## 🛠️ Usage

- **Browse Products:** Explore the home and store pages for featured perfumes.
- **Add to Cart:** Select products and add them to your shopping cart.
- **Checkout:** Fill in your contact details and complete payment via Paystack.
- **Order Management:** Admins can add/edit products and view recent orders.
- **Image Uploads:** Product images are uploaded to Cloudinary.

---

## 🧪 Testing

> _Unit and integration tests are planned for future releases._

---

## 📦 Deployment

- **Vercel, Netlify, or Firebase Hosting** are recommended for deployment.
- Ensure all environment variables are set in your deployment platform.

---

## 📌 Future Enhancements

- 🗃️ Backend integration with Node.js or Appwrite
- 🌐 SEO optimization
- 🔐 Full authentication and user profiles
- 🧪 Unit and integration testing
- 📊 Analytics dashboard for admins
- 🛡️ Enhanced security and validation

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Paystack](https://paystack.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

> _Bilma Scent — Bringing elegance and fragrance to your doorstep._
