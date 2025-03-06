const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
// EJS'yi view engine olarak ayarla
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/downloads', express.static('downloads'));


app.get("/", (req, res) => {
    res.render("index");
});

// Instagram video indirme fonksiyonu
function downloadInstagramVideo(url) {
    return new Promise((resolve, reject) => {
        // Python script'ini parametreyle çalıştır
        exec(`python install.py ${url}`, (error, stdout, stderr) => {
            if (error) {
                reject(`Hata: ${error}`);
            } else {
                // İndirilen video dosyasının yolunu döndür
                resolve(stdout.trim());
            }
        });
    });
}

// POST isteği ile URL almak
app.post("/download",async (req, res) => {
    const videoURL = req.body.url;

   await downloadInstagramVideo(videoURL)
        .then(videoPath => {
            changedVideo = "";

            // Video Path: downloads\2025-02-02_08-47-24_UTC.jpg exists [Tamam sensin. Ko��!!] unchanged downloads\2025-02-02_08-47-24_UTC.mp4 exists json
            console.log(`Video Path: ${videoPath}`);
            if(videoPath.split(" ").reverse()[2] == "exists") {changedVideo = videoPath.split(" ").reverse()[3];} 
            else {changedVideo =  videoPath.split(" ").reverse()[2];}

            txtfile = changedVideo.replace(".mp4", ".txt");
                    // Yeni oluşturulan .txt dosyasını okuma
                fs.readFile(txtfile, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Dosya okunurken hata oluştu:', err);
                            res.json({ videoUrl: changedVideo, videoDesc: "No Description" });
                        } else {
                            console.log('Dosya içeriği:', data);
                            console.log(`Video URL: ${changedVideo}`);
                            console.log(`Video Description: ${data}`);
                            res.json({ videoUrl: changedVideo, videoDesc: data });
                        }
                    });
            });
})
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
