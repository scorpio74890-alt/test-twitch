# Testing the Battle Royal Overlay

## Option 1: GitHub Pages (Recommended for Production)

1. **Push to GitHub** (if not already done):
   ```bash
   git add widget/live/top1-battle-royal/overlay.html
   git commit -m "Add battle royal overlay"
   git push
   ```

2. **Enable GitHub Pages** (if not already enabled):
   - Go to your repository settings
   - Navigate to "Pages"
   - Select your branch (usually `main` or `master`)
   - Save

3. **Access the overlay**:
   ```
   https://YOUR-USERNAME.github.io/test-twitch/widget/live/top1-battle-royal/overlay.html
   ```

## Option 2: Local Testing with Python

If you want to test locally before pushing to GitHub:

```bash
# Navigate to your project root
cd /home/scorpio/twitch/fugu/test-twitch

# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000/widget/live/top1-battle-royal/overlay.html`

## Option 3: Using OBS Studio (For Stream Testing)

1. **Add Browser Source in OBS**:
   - Right-click in Sources → Add → Browser Source
   - Name it "Battle Royal Overlay"
   - Set URL to your GitHub Pages URL or localhost URL
   - Width: 1920, Height: 1080 (or your stream resolution)
   - Check "Shutdown source when not visible" (optional)
   - Check "Refresh browser when scene becomes active" (recommended)

2. **Position the overlay**:
   - The overlay appears on the right side of the screen
   - Adjust position in OBS as needed

## Testing Commands

Once the overlay is running and connected to the chat:

### In Twitch Chat (as sc0rpio74890 or a moderator):

- `!show list` - Shows all games in the list
- `!hide list` - Shows only the currently playing game
- `!remove fortnite` - Marks Fortnite as removed (darker with red X)
- `!remove apex legends` - Marks Apex Legends as removed
- `!add fortnite` - Restores Fortnite back to normal

### Testing Game Detection

1. **Start streaming** on Twitch with `sc0rpio74890` account
2. **Set your game category** to one of the supported games:
   - Fortnite
   - Apex Legends
   - Call of Duty: Warzone
   - PUBG: BATTLEGROUNDS
   - Fall Guys
   - The Finals
   - Rocket League
   - Super People 2

3. The overlay should automatically detect and highlight the current game

## Debugging

Open browser console (F12) to see:
- Connection status to Twitch chat
- Game detection logs
- Command execution logs
- Any errors

## Troubleshooting

**Overlay not showing:**
- Check browser console for errors
- Verify the URL is correct
- Make sure GitHub Pages is enabled

**Chat commands not working:**
- Verify you're logged in as `sc0rpio74890` or have moderator privileges
- Check browser console for connection errors
- Make sure the channel name matches in the code

**Game not detected:**
- Check browser console for API errors
- Verify the game category name matches exactly (check Twitch API response)
- The overlay checks every 30 seconds, wait a moment

