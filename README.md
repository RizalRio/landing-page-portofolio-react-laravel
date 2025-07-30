🌐 Landing Page Portofolio – React & Laravel
Landing page portofolio modern yang dibangun menggunakan ReactJS sebagai frontend dan Laravel sebagai backend API. Project ini dirancang untuk menampilkan profil developer, skill, proyek, dan kontak dalam satu tampilan web yang elegan, responsif, dan ringan.

🚀 Fitur Utama
Tampilan responsif & modern (TailwindCSS)

Showcase project & pengalaman

Kontak langsung via email/form

Backend API (Laravel) untuk data dinamis

🛠️ Tech Stack
Frontend:

ReactJS

TailwindCSS

Axios

Backend:

Laravel 12

Sanctum (jika ada autentikasi)

MySQL

📦 Instalasi Lokal
1. Clone Repo
bash
Salin
Edit
git clone https://github.com/RizalRio/landing-page-portofolio-react-laravel.git
2. Setup Backend (Laravel)
bash
Salin
Edit
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Setup DB lalu migrate
php artisan migrate --seed
php artisan serve
3. Setup Frontend (React)
bash
Salin
Edit
cd frontend
npm install
npm run dev
📸 Preview
(Tambahkan screenshot landing page-nya di sini, atau pakai link live demo jika ada)

🎯 Tujuan Proyek
Project ini dikembangkan sebagai bagian dari portofolio pribadi untuk memamerkan kemampuan fullstack menggunakan Laravel & React. Cocok digunakan untuk CV online, showcase freelance, maupun self-branding digital.
