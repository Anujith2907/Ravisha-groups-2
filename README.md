# RAVISHA GROUPS 2 — Corporate Website & Admin System

Official production-ready website and Content Management System for **RAVISHA GROUPS 2** (Construction & Cinema Production).

---

## 🌐 Website Links

| Portal | URL | Description |
|---|---|---|
| **Public Website** | [http://localhost:5173](http://localhost:5173) | Main corporate website |
| **Admin Login** | [http://localhost:5173/admin/login](http://localhost:5173/admin/login) | Admin portal authentication |
| **Admin Dashboard** | [http://localhost:5173/admin/dashboard](http://localhost:5173/admin/dashboard) | CMS & Content Management |
| **Backend API** | [http://localhost:5000/api](http://localhost:5000/api) | Express REST API server |



## 🚀 How to Run locally

### 1. Backend Server
```bash
cd backend
npm install
npm run dev
```
*Runs at `http://localhost:5000`*

### 2. Frontend Dev Server
```bash
cd frontend
npm install
npm run dev
```
*Runs at `http://localhost:5173`*

### 3. Database Seeding (First Time Setup)
```bash
cd backend
npm run seed
```

---

## 🏗️ Project Architecture

```
RAVISHA GROUPS/
├── backend/                  # Node.js + Express REST API
│   ├── config/               # Database & Cloudinary configuration
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Auth (JWT), Upload (Multer), Error handling
│   ├── models/               # Mongoose MongoDB schemas
│   ├── routes/               # Express API endpoints
│   ├── seed.js               # Database initializer
│   └── server.js             # Express app entry point
│
└── frontend/                 # React 18 + Vite + TypeScript + Tailwind CSS
    ├── public/               # Static assets & brand logo
    └── src/
        ├── components/
        │   ├── admin/        # CMS sidebar & protected route guards
        │   ├── common/       # Navbar, Footer, ScrollToTop, Spinner
        │   ├── home/         # 9 Home page sections
        │   └── three/        # 3D Three.js architectural wireframe canvas
        ├── contexts/         # AuthContext with token persistence
        ├── pages/            # Public & Admin pages
        ├── services/         # Axios API client
        ├── styles/           # Design system tokens & Tailwind CSS
        └── types/            # TypeScript interfaces
```

---

## 🎨 Branding & Color Palette

* **Primary Dark:** `#0A0A0A` (Deep Off-Black)
* **Accent Maroon:** `#8B1A1A` (Deep Maroon)
* **Secondary Accent:** `#6B1111`
* **Typography:** Cormorant Garamond (Headings) & Inter (Body)
