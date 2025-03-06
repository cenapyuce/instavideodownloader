 <script>
    document.getElementById("checkBtn").addEventListener("submit", function(event) {
        event.preventDefault();
                // setTimeout(function() {
                //     // Hide loading overlay
                //     document.getElementById('loadingOverlay').classList.remove('active');
                    
                //     // Show video info
                //     document.getElementById('videoInfo').classList.add('active');
                // }, 2000); // 2 second delay to simulate server response
        const urlInput = document.getElementById('reelUrl');
            if(urlInput.value.trim() !== '') {
                // Show loading overlay
                document.getElementById('loadingOverlay').classList.add('active');
                fetch('/download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: url })
                })
                    .then(response => response.json())
                    .then(data => {
                        // Hide loading overlay
                        document.getElementById('loadingOverlay').classList.remove('active');
                        
                        
                        // Show video info
                        document.getElementById('videoInfo').classList.add('active');
                    })
            } else {
                alert('Please enter a valid Instagram Reel URL');
            }
        });
                .catch(error => {
            console.error(error);
            loader.style.display = "none";
            alert("Hata: Video indirilemedi.");
        });
        
        // // Toggle active class for quality options
        // const qualityOptions = document.querySelectorAll('.quality-option');
        // qualityOptions.forEach(option => {
        //     option.addEventListener('click', function() {
        //         qualityOptions.forEach(opt => opt.classList.remove('active'));
        //         this.classList.add('active');
        //     });
        // });

    //     const url = document.getElementById("url").value;
    //     const loader = document.getElementById("loader");
    //     const downloadLink = document.getElementById("downloadLink");
    //     const videoPlayer = document.getElementById("videoPlayer");
    //     const videoSource = document.getElementById("videoSource");
    //     const downloadButton = document.getElementById("downloadButton");

    //     // Yüklenme animasyonunu başlat
    //     loader.style.display = "block";

    //     // Video indirildiğinde ne olacak
    //     fetch('/download', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ url: url })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Yüklenme animasyonunu durdur
    //         loader.style.display = "none";

    //         // Video kaynağını ayarla
    //         videoSource.src = data.videoUrl; // videoUrl artık tam URL olacak
    //         videoPlayer.load();
    //         videoPlayer.style.display = "block";

    //         // İndirme butonunu göster
    //         downloadLink.style.display = "block";
    //         downloadButton.addEventListener("click", function() {
    //             window.location.href = data.videoUrl; // İndirme işlemi
    //         });
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         loader.style.display = "none";
    //         alert("Hata: Video indirilemedi.");
    //     });

        // });

    </script>