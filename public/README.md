# 🎵 Audio Files

## How to Add Your Stotram Audio

1. **Get your audio file** - Download or record the Dvadasha Jyotirlinga Stotram
2. **Name it** `stotram.mp3` (or keep your original name)
3. **Place it here** in the `public` folder
4. The website will automatically use it!

## Supported Formats

The audio player supports multiple formats (in order of preference):
- **MP3** (`.mp3`) - Most compatible, recommended
- **OGG** (`.ogg`) - Good quality, smaller file size
- **WAV** (`.wav`) - Highest quality, larger file size

## File Naming

If you use a different filename, update line 434 in `src/App.jsx`:

```javascript
<source src="/your-audio-file.mp3" type="audio/mpeg" />
```

## Timing Synchronization

The lyrics are currently timed as follows:
- Line 1: 0 seconds
- Line 2: 4 seconds
- Line 3: 8 seconds
- Line 4: 12 seconds
- Line 5: 16 seconds
- Line 6: 20 seconds

To adjust timing for your audio, edit the `lyrics` array in the `StotramLyrics` component (around line 63 in App.jsx).

## Tips for Best Results

1. **Audio Quality**: Use at least 128kbps MP3 for good quality
2. **File Size**: Keep under 5MB for fast loading
3. **Duration**: The current timing assumes ~24 seconds total
4. **Format**: MP3 is most widely supported across browsers

## Where to Find Stotram Audio

You can find authentic Dvadasha Jyotirlinga Stotram recordings on:
- YouTube (download using a converter)
- Spiritual audio websites
- Record your own recitation

---

**Current Status**: Using placeholder audio. Replace with your authentic Stotram recording!
