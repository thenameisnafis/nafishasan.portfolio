# Nafis Hasan — Final Portfolio

This is the polished final version of Nafis Hasan's portfolio.

## Structure
Home → About → Creative Portfolio → Experience → Projects → Research → Awards & Certificates → Gallery → Skills → Contact

## What is preserved
- All real uploaded graphic design samples
- All 12 projects from the original portfolio
- Current CV software projects
- Research/publications
- Leadership roles
- Certificates/recognition
- Profile image
- CV
- Original project links where available

## New final-version features
- Animated preloader
- Scroll progress indicator
- Original animated signal-field background
- Glass navigation
- Rotating role line
- Responsive mobile menu
- Creative-work category filtering
- Full-screen lightbox for creative work, gallery and certificates
- Current projects + complete original-project archive
- Responsive desktop/tablet/mobile layout
- Reduced-motion accessibility support

## Editing content
Most portfolio data is centralized inside `data.js`.

### Add a creative item
Add an object to `portfolioData.creative`:

```js
{
  title: "Project Name",
  category: "Social Media",
  image: "assets/creative/your-file.jpg",
  fit: "contain",
  description: "Short project description."
}
```

Use `fit: "contain"` for posters/certificates where the full layout should remain visible.

## Adding real video work later
When Nafis has MP4/YouTube/Drive video-editing samples, add them as a dedicated Video Editing section rather than claiming work that is not available yet.

## GitHub Pages deployment
1. Create a new GitHub repository.
2. Upload all contents of this folder to the repository root.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

## Vercel deployment
This is a static HTML/CSS/JS project:
1. Import the GitHub repository in Vercel.
2. Framework preset: **Other**.
3. No build command required.
4. Deploy.

## Important
This final portfolio is an original implementation written for Nafis Hasan. It may use common premium portfolio interaction patterns, but it does not copy another person's source code or personal content.


## Creative section cleanup
Removed the Graphic Design, UI / UX, and Motion / VFX categories from the Creative Portfolio section as requested.


## Gallery cleanup
Removed `Surreal Floral Composition` and `Surreal Portrait Experiment` from the Gallery section.


## Awards & Certificates expansion
The Awards & Certificates section now includes 12 real items restored from the original portfolio.
On wide screens, 4 compact cards appear in one row; the layout adapts to 3, 2, and 1 columns on smaller screens.


## Creative portfolio update
Added the Optical Fiber poster design to the Creative Portfolio section. The card description notes that this is the poster linked to the user's Physics Poster Contest award.
