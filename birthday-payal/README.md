# Happy Birthday, Payal 🎂

A cinematic, interactive birthday website — a digital gift built as a single continuous experience: loading reveal → hero → countdown → personal message → why she's special → memory wall → your story → wishes → interactive gift → make a wish → final letter → big celebration.

No backend, no build step. Just open `index.html`.

---

## 1. How to open the website

Double-click **`index.html`**, or right-click → *Open with* → your browser.

That's it — everything (HTML, CSS, JS, images, audio) is local and self-contained.

> Tip: some browsers restrict autoplaying audio and loading local files with stricter security rules. If music or images seem to misbehave, try a quick local server instead:
> ```bash
> cd birthday-payal
> python3 -m http.server 8000
> ```
> then open `http://localhost:8000` in your browser.

## 2. How to add Payal's real photos

Replace the files in `images/` — keep the same filenames (`payal1.jpg` … `payal8.jpg`) and it just works, or:

1. Add your own image files anywhere inside `images/`.
2. Open `script.js`, find the `CONFIG.photos` array near the top, and update each `src` to point at your file.

The gallery gracefully shows a soft placeholder if any image is missing, so nothing ever breaks.

## 3. How to replace the birthday music

Drop your own MP3 into `audio/` and name it `birthday.mp3` (or update `CONFIG.musicFile` in `script.js` if you rename it). The included track is just a short original placeholder chime — swap it for Payal's favorite song or a proper birthday track.

## 4. How to change the birthday date (for the countdown)

In `script.js`, find:

```js
birthdayDate: "2026-12-25T00:00:00",
```

Change it to her real birthday, in the format `YYYY-MM-DDTHH:MM:SS`.

## 5. How to change photo captions

Still inside `CONFIG.photos` in `script.js`, edit the `caption` field for each photo.

## 6. How to edit the messages

- **Personal message** ("Dear Payal…"): edit the text directly inside `index.html`, inside the `<section id="message">` block (`#messageText`).
- **Gift reveal message**: inside `<section id="gift">`, in `#giftMessage`.
- **Final letter**: inside `<section id="letter">`, in `#envelopeLetter`.
- **"Why You're Special" / "For You, Always" cards**: edit the text inside each `<article>` in the `#special` and `#wishes` sections.

## 7. How to edit the timeline ("Our Little Story")

In `script.js`, edit the `timelineData` array near the top:

```js
const timelineData = [
  { chapter: "Chapter 01", title: "The Beginning", year: "", description: "…" },
  // add or remove chapters here
];
```

## 8. How to deploy to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`.
4. Save — your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## 9. How to deploy to Vercel

1. Install the CLI (`npm i -g vercel`) or use the Vercel dashboard.
2. From inside the `birthday-payal` folder, run:
   ```bash
   vercel
   ```
3. Accept the defaults (it's a static site — no build command needed) and confirm.
4. Vercel gives you a live URL immediately, ready to share.

*(You can also just drag-and-drop the folder onto vercel.com's dashboard.)*

---

## Project structure

```
birthday-payal/
│
├── index.html      → all sections & structure
├── style.css        → all visual styling, animations, responsiveness
├── script.js         → CONFIG (edit here!), timeline data, all interactivity
├── README.md
│
├── images/
│   ├── payal1.jpg … payal8.jpg   (replace with real photos)
│
└── audio/
    └── birthday.mp3              (replace with real music)
```

## Notes

- Fully responsive from 320px phones up to large desktops.
- Respects `prefers-reduced-motion` — animation is significantly reduced for visitors who need that.
- Keyboard accessible: tab through every interactive element, use arrow keys / Escape in the photo lightbox.
- If an image or the audio file is missing, the site keeps working — no broken layout, no console-breaking errors.
- Confetti uses the lightweight [canvas-confetti](https://github.com/catdad/canvas-confetti) library via CDN; everything else is vanilla HTML/CSS/JS.

Happy Birthday, Payal! ❤️
