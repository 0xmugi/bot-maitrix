# 🚀 Bot Maitrix Faucet & Bulk Sender

# 📌 Deskripsi

Bot ini digunakan untuk:

Membuat banyak wallet (batch wallet generator)

Mengirim ETH ke banyak wallet secara otomatis (bulk send ETH)

Mengklaim faucet untuk wallet yang dibuat

Mengirim semua token faucet yang sudah diklaim ke wallet utama

# 📂 Fitur

✅ Generate banyak wallet dengan private key yang disimpan di pk.txt
✅ Mengirim ETH ke banyak wallet dari file addresses.txt
✅ Mengklaim faucet secara otomatis dengan opsi proxy atau tanpa proxy
✅ Mengirim semua token yang diklaim ke wallet yang diinginkan menggunakan bulk_send_ATH.js

# 🛠️ Instalasi

Clone repositori ini

git clone https://github.com/username/repository.git
cd repository

Install dependencies

npm install

Buat file .env dan tambahkan private key Anda:

PRIVATE_KEY=0xYOUR_PRIVATE_KEY

# 🚀 Penggunaan

# 1️⃣ Membuat Wallet

node claim.js

Masukkan jumlah wallet yang ingin dibuat

Wallet dan private key akan disimpan di addresses.txt dan pk.txt

# 2️⃣ Mengirim ETH ke Wallet

node claim.js

Setelah membuat wallet, ETH akan dikirim secara otomatis

# 3️⃣ Klaim Faucet

node claim.js

Pilih metode klaim: 1 untuk Proxy, 2 untuk tanpa Proxy

Jika ada kegagalan di step 3, Anda bisa langsung mengulang hanya bagian klaim tanpa mengulang step 1 & 2

# 4️⃣ Mengirim Semua Token ke Wallet Tujuan

node bulk_send_ATH.js

Semua faucet yang diklaim akan dikirim ke wallet utama yang ditentukan

# 📝 Konfigurasi

Ganti wallet tujuan di bulk_send_ATH.js:

const receiverAddress = '0xYourMainWalletAddress';

Ganti jumlah token yang dikirim di bulk_send_ATH.js:

const amount = web3.utils.toWei('50', 'ether');

# ⚠️ Disclaimer

Gunakan script ini dengan bijak. Penggunaan berlebihan atau pelanggaran aturan faucet dapat menyebabkan pemblokiran!

# 💡 Contributors: 0xMugi
# 📌 Repository: [[GitHub Link](https://github.com/0xmugi/)]
