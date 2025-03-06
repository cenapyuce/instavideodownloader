import instaloader
import sys

# URL'yi al
url = sys.argv[1]

def download_video(url):
    L = instaloader.Instaloader()

    # URL'yi shortcode'a dönüştürüp postu al
    post = instaloader.Post.from_shortcode(L.context, url.split("/")[-2])

    # Videoyu kaydet
    L.download_post(post, target='downloads')
    return f"downloads/{post.shortcode}.mp4"  # İndirilen video yolu döndürülür

if __name__ == "__main__":
    video_path = download_video(url)
    print(video_path)
