const TelegramBot = require("node-telegram-bot-api");
const token = "7436618744:AAGciq3Clhgs9pIOpthrUovN--8z3zsLEqg";
const options = {
  polling: true,
};

const fadilbot = new TelegramBot(token, options);

const prefix = ".";
const prefix2 = "/";
const sayHi = new RegExp(`^${prefix}halo$`);
const gempa = new RegExp(`^${prefix}gempa$`);
const mulai = new RegExp(`^${prefix2}start$`);
const help = new RegExp(`^${prefix2}help$`);

fadilbot.onText(mulai, (callback) => {
  const firstName = callback.from.first_name;
  const welcomeMessage =
    `👋 Selamat datang, ${firstName}!\n\n` +
    `Halo! Saya adalah bot yang sedang dikembangkan untuk membantu Anda. Saat ini, Anda dapat menggunakan beberapa fitur yang sudah tersedia:\n\n` +
    `➡️ Jika Anda ingin melihat informasi gempa terbaru, cukup ketikkan .gempa.\n\n` +
    `ℹ️ Kami sedang dalam tahap pengembangan, dan akan menambahkan fitur-fitur baru di masa mendatang. Terima kasih telah menggunakan bot kami!\n\n` +
    `Untuk bantuan lebih lanjut, silakan ketik /help.\n\n` +
    `Selamat menggunakan bot kami!`;

  fadilbot.sendMessage(callback.from.id, welcomeMessage);
});

fadilbot.onText(help, (callback) => {
  const helpMessage =
    `ℹ️ **Pusat Bantuan**\n\n` +
    `Halo! Berikut adalah daftar perintah yang bisa Anda gunakan:\n\n` +
    `- /start: Memulai percakapan dan menampilkan pesan sambutan.\n\n` +
    `- .gempa: Menampilkan informasi gempa terbaru.\n\n` +
    `ℹ️ **Tentang Bot**\n\n` +
    `Bot ini sedang dalam tahap pengembangan. Fitur-fitur baru akan ditambahkan di masa mendatang.\n\n` +
    `🙏 Terima kasih telah menggunakan bot kami! Jika Anda memiliki pertanyaan atau masukan, jangan ragu untuk mengirimkan pesan kepada kami.\n\n` +
    `Selamat menggunakan bot kami!`;

  fadilbot.sendMessage(callback.from.id, helpMessage);
});
fadilbot.onText(sayHi, (callback) => {
  fadilbot.sendMessage(callback.from.id, "Selamat Datang di");
});

fadilbot.onText(gempa, async (callback) => {
  const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/";
  const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json");
  const {
    Infogempa: {
      gempa: { Jam, Magnitude, Tanggal, Potensi, Kedalaman, Wilayah, Shakemap },
    },
  } = await apiCall.json();
  const BMKGImage = BMKG_ENDPOINT + Shakemap;
  const resultText = `Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude} SR
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}
`;
  fadilbot.sendPhoto(callback.from.id, BMKGImage, {
    caption: resultText,
  });
});
