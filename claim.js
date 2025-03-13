const { Wallet } = require("ethers");
const fs = require("fs");
const readline = require("readline");
require("dotenv").config();
const { ethers } = require("ethers");
const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");

const RPC_URL = "https://sepolia-rollup.arbitrum.io/rpc";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const senderWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const AMOUNT_TO_SEND = ethers.parseEther("0.001");
const ADDRESSES_FILE = "addresses.txt";
const PRIVATE_KEYS_FILE = "pk.txt";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateWallets(count) {
    let addressData = "";
    let privateKeyData = "";

    for (let i = 0; i < count; i++) {
        let wallet = Wallet.createRandom();
        let address = wallet.address;
        let privateKey = wallet.privateKey;
        console.log(`Wallet ${i + 1}: ${address}`);
        addressData += `${address}\n`;
        privateKeyData += `${privateKey}\n`;
    }
    
    fs.writeFileSync(ADDRESSES_FILE, addressData);
    fs.writeFileSync(PRIVATE_KEYS_FILE, privateKeyData);
    console.log(`✅ ${count} wallet berhasil dibuat!`);
}

async function sendBulkTransactions() {
    const addresses = fs.readFileSync(ADDRESSES_FILE, "utf-8").split("\n").filter(addr => addr.trim() !== "");
    console.log(`🔹 Mengirim ${AMOUNT_TO_SEND} ETH ke ${addresses.length} wallet...`);

    for (let to of addresses) {
        try {
            console.log(`🚀 Mengirim ke ${to}...`);
            const tx = await senderWallet.sendTransaction({ to, value: AMOUNT_TO_SEND });
            console.log(`✅ Tx Terkirim! Hash: ${tx.hash}`);
            await tx.wait();
        } catch (error) {
            console.error(`❌ Gagal mengirim ke ${to}:`, error.message);
        }
    }
    console.log("🎉 Semua transaksi selesai!");
}

async function startClaim(useProxy) {
    const wallets = fs.readFileSync(ADDRESSES_FILE, 'utf8').split('\n').filter(addr => addr);
    const FAUCET_URL = "https://app.x-network.io/maitrix-faucet/faucet/";
    let failedClaims = [];
    
    async function claimFaucet(wallet) {
        try {
            let headers = { "Content-Type": "application/json", "User-Agent": "Mozilla/5.0" };
            let agent = useProxy ? new HttpsProxyAgent("http://your-proxy.com") : undefined;
            const response = await axios.post(FAUCET_URL, { address: wallet }, { headers, httpsAgent: agent });
            console.log(`✅ [SUCCESS] ${wallet}:`, response.data);
        } catch (error) {
            console.error(`❌ [ERROR] ${wallet}:`, error.response?.data || error.message);
            failedClaims.push(wallet);
        }
    }

    for (const wallet of wallets) {
        await claimFaucet(wallet);
        if (!useProxy) await new Promise(resolve => setTimeout(resolve, Math.random() * (60000 - 30000) + 30000));
    }
    
    console.log("✅ Semua address sudah diklaim!");
    if (failedClaims.length > 0) {
        console.log("⚠️ Beberapa klaim gagal, berikut daftar yang gagal:");
        console.log(failedClaims.join("\n"));
    }
}

rl.question("Pilih langkah: (1) Buat Wallet, (2) Kirim ETH, (3) Klaim Faucet: ", (step) => {
    if (step === "1") {
        rl.question("Masukkan jumlah wallet yang ingin dibuat: ", (count) => {
            generateWallets(parseInt(count));
            console.log("✅ Wallet berhasil dibuat!");
            rl.close();
        });
    } else if (step === "2") {
        if (!fs.existsSync(ADDRESSES_FILE)) {
            console.log("❌ File addresses.txt tidak ditemukan! Buat wallet terlebih dahulu.");
            rl.close();
            return;
        }
        sendBulkTransactions().then(() => rl.close());
    } else if (step === "3") {
        if (!fs.existsSync(ADDRESSES_FILE)) {
            console.log("❌ File addresses.txt tidak ditemukan! Buat wallet terlebih dahulu.");
            rl.close();
            return;
        }
        rl.question("Pilih metode klaim faucet: (1) Proxy, (2) Tanpa Proxy: ", (choice) => {
            startClaim(choice === "1");
            rl.close();
        });
    } else {
        console.log("❌ Pilihan tidak valid.");
        rl.close();
    }
});