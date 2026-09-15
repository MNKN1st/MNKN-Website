# Manakin website

Producer business website, prepared for GitHub Pages. Uses plain HTML, CSS, and
JavaScript with no dependencies or build step.

## Structure

```text
index.html             Home page
assets/
  css/main.css         Site styles
  js/main.js           Site interactions
  images/              Optimised website images
  fonts/               Web fonts
  audio/               Published audio samples
  video/               Published video clips
.editorconfig          Shared formatting conventions
.gitattributes         Git text and binary file handling
.gitignore             Files excluded from Git
.nojekyll              Serve the site without Jekyll processing
```

Empty asset folders contain `.gitkeep` placeholders so Git preserves them.

## Local preview

Open `index.html` in a browser. For a local server, if Python 3 is available, run
the following from this folder and visit http://localhost:8000:

```sh
python3 -m http.server 8000
```

Use relative asset paths such as `assets/images/example.webp` so the site can
work under a GitHub Pages repository path as well as a custom domain.

## Publishing

Once the site is ready, connect this local repository to a GitHub repository
and push the `main` branch. Configure GitHub Pages to deploy from the `main`
branch's root folder. No custom build workflow is needed for this structure.

Hosting and a remote repository have not been configured yet.

## Content

Only place material intended for publication in the site folders. Keep source
recordings, large editing projects, credentials, and client working files out
of the repository. The `private/` folder is ignored by Git for local drafts.
Optimise published media; longer videos can be embedded from a video host.

## Pages and media

The site now has Home, Story, Commercial, Sync & Library, Showreel and Contact pages.
Commercial contains artist releases; Sync & Library contains the library playlist
and brand campaign credits.

The standalone Story page text is also saved in `story-copy.md`.
The Story video is a separate piece and does not use this text as a script.

## Showreel videos

The Showreel page contains 30 projects in a thumbnail grid. Selecting a project opens a video overlay.
Web-ready H.264/AAC MP4 copies are in `assets/video/web/`; thumbnails are in
`assets/images/video-posters/`. Original files remain in `assets/video/` and are
ignored by Git. Only the optimised copies should be published.

Project labels and playback paths are in `showreel.html`. Titles currently follow
the supplied filenames and the collection is in alphabetical order.
The Story page uses `assets/video/web/story-background.mp4` behind its text,
with `assets/images/story-background.jpg` as a still fallback. The original
`assets/video/story-background.mp4` remains local and is ignored by Git.
Playback is silent and looping, with a pause control and reduced-motion support.

Outstanding before publication: final review of project labels and
credits, and GitHub Pages configuration.

## Homepage brand band

The homepage displays all 24 brands in a continuous horizontal loop beneath the
hero. Logos are stored in `assets/images/brands/`, with sources in `logo-sources.md`.
The band pauses on hover, keyboard focus, off-screen, or via the pause button.
With reduced motion enabled, it becomes a manually scrollable row. The repeated
visual group is hidden from assistive technology. Showreel contains the project video gallery.
