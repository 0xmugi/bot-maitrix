# 🚀 Bot Maitrix Faucet

Automasi untuk membuat wallet, mengirim ETH, dan klaim faucet secara massal menggunakan Node.js & Ethers.js.

# 📌 Fitur

Membuat wallet secara massal

Mengirim ETH ke banyak wallet

Mengklaim faucet secara otomatis (dengan atau tanpa proxy)

Melanjutkan ke step 3 langsung jika sudah punya wallet & ETH

Log transaksi dan klaim yang gagal

# 🛠️ Instalasi

Pastikan Anda telah menginstal Node.js dan memiliki akun GitHub.

# 1️⃣ Clone Repository

git clone https://github.com/username/bot-maitrix.git
cd bot-maitrix

# 2️⃣ Install Dependencies

npm install

# 3️⃣ Konfigurasi Environment

Buat file .env di root proyek dan tambahkan private key:

PRIVATE_KEY="0xYOUR_PRIVATE_KEY_HERE"

# ⚠️ Jangan bagikan private key Anda!

# 🚀 Cara Menggunakan

Jalankan script dengan perintah berikut:

node claim.js

Kemudian, pilih opsi yang ingin dijalankan:
1️⃣ Buat Wallet2️⃣ Kirim ETH ke Wallet3️⃣ Klaim Faucet

Anda dapat langsung ke Step 3 jika sudah memiliki wallet dan ETH.

# 📝 Log Transaksi & Klaim

Wallet yang dibuat: addresses.txt

Private key wallet: pk.txt

Log transaksi & klaim gagal: Ditampilkan di terminal

# ⚠️ Disclaimer

Script ini hanya untuk keperluan edukasi. Gunakan dengan bijak dan tanggung jawab.

# 🤝 Kontribusi

Pull request dipersilakan! Jika ada masalah, silakan buat issue.

# 📄 Lisensi

MIT License.
