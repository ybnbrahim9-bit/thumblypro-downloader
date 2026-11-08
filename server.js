import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    name: "ThumblyPro Downloader",
    status: "online"
  });
});

app.post("/api/check", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "Please provide a video URL"
    });
  }

  let video;

  try {
    video = new URL(url);
  } catch {
    return res.status(400).json({
      success: false,
      error: "Invalid URL"
    });
  }

  const host = video.hostname
    .toLowerCase()
    .replace(/^www\./, "");

  const platforms = [
    "youtube.com",
    "youtu.be",
    "tiktok.com",
    "facebook.com",
    "fb.watch",
    "instagram.com",
    "x.com",
    "twitter.com",
    "vimeo.com",
    "dailymotion.com",
    "pinterest.com",
    "reddit.com"
  ];

  const platform = platforms.find(
    item => host === item || host.endsWith("." + item)
  );

  if (!platform) {
    return res.status(400).json({
      success: false,
      error: "Unsupported platform"
    });
  }

  res.json({
    success: true,
    platform,
    downloadAvailable: false,
    message: "Video link recognized successfully."
  });
});

app.listen(PORT, () => {
  console.log(`ThumblyPro running on port ${PORT}`);
});
