# 🎨 MagicThumb – AI Thumbnail Generator

MagicThumb is a simple and powerful AI-based thumbnail generator that helps users create eye-catching YouTube thumbnails instantly 🚀

---

# 🌐 Live Demo

👉 **Try it here:**
🔗 [Magicthumb.ai](https://magic-thumb.vercel.app/)

> Users can directly visit the website, generate thumbnails, and download images.

---

# 🚀 Features

* 🎯 Generate AI-powered thumbnails from text prompts
* 🎨 Customize style, color, and aspect ratio
* ⚡ Fast image generation using AI models
* 📥 Download generated thumbnails
* 🔐 Authentication system (Login & Session-based auth)
* 🧾 User-specific thumbnail history
* 🔄 Auto update thumbnail status (polling system)

---

# 🧠 How It Works

1. User logs in
2. Enters thumbnail details (title, style, prompt, etc.)
3. Backend sends request to AI model
4. AI generates image
5. Image is saved and uploaded (Cloudinary)
6. User can preview & download

---

# 🛠️ Tech Stack

## Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)
* Express Session (Authentication)

## AI & Storage

* Cloudflare AI / Pollinations API
* Cloudinary (Image Hosting)

---

# 🔐 Authentication System

* Session-based authentication
* Cookies used for maintaining login state
* Protected routes implemented
* Auto login check on page reload

---

# 📦 Installation & Setup

## 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/magic-thumb.git
cd magic-thumb
```

---

## 2️⃣ Install dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 3️⃣ Environment Variables

Create `.env` file in backend:

```env
PORT=3000
DB_URL=your_mongodb_url
SESSION_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## 4️⃣ Run the project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 📡 API Endpoints (Basic)

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | /api/user/login            | Login user          |
| POST   | /api/user/logout           | Logout user         |
| GET    | /api/user/verify           | Check session       |
| POST   | /api/generate              | Generate thumbnail  |
| GET    | /api/generate/my-thumbnail | Get user thumbnails |

---

# 🎯 Project Goals

* Build a real-world SaaS-style application
* Learn authentication & session management
* Integrate AI into a full-stack app
* Practice backend + frontend integration

---

# 🔮 Future Improvements

* 🔥 Multiple thumbnail variations
* 🎨 Built-in thumbnail editor
* 📊 CTR prediction system
* ❤️ Favorite & collection system
* 🔗 Shareable public links

---

# 🙌 Author

👤 Mostafiz
💻 Full Stack Developer (Learning & Building 🚀)

---

# ⭐ Final Note

This project is built for learning and improving full-stack development skills.
Feel free to explore, modify, and enhance it 🔥
