# AnimalWebsite — UI

A React-based social platform for cat enthusiasts. Users can browse cat breeds, create posts, interact through comments and likes, and manage a personal profile with pet details.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Code Behaviour Report](#code-behaviour-report)
   - [Routing & Entry Point](#routing--entry-point)
   - [State Management](#state-management)
   - [Authentication Flow](#authentication-flow)
   - [Landing Page](#landing-page)
   - [Cat Breed Browser](#cat-breed-browser)
   - [Social Feed & Posts](#social-feed--posts)
   - [Comments System](#comments-system)
   - [Profile Page](#profile-page)
   - [Image Handling](#image-handling)
   - [API Integration](#api-integration)
4. [Weaknesses](#weaknesses)
   - [Critical](#critical)
   - [Major](#major)
   - [Performance](#performance)
   - [Security](#security)
   - [Code Quality](#code-quality)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | React Router DOM 7 |
| Build tool | Vite 6 |
| Styling | Vanilla CSS (no framework) |
| Icons | FontAwesome 6 |
| Image cropping | react-image-crop 11 |
| Image compression | browser-image-compression 2 |
| State | React Context API |

---

## Project Structure

```
src/
├── App.jsx                  # Landing page (hero, breed search)
├── App.css                  # Global styles + landing styles (712 lines)
├── main.jsx                 # Entry point, router, context providers
├── Sliding.jsx              # Pagination context (largely unused)
│
├── Pages/
│   ├── CatsContext.jsx      # Core state: breeds, posts, likes, comments
│   ├── AuthenticateContext.jsx  # Auth state: login, logout, token refresh
│   ├── Info.jsx             # Breed detail page
│   ├── Sign_in.jsx          # Registration page
│   ├── LogIn.jsx            # Login page
│   ├── Profile.jsx          # User profile: bio, images, pet details
│   ├── Posts.jsx            # Social feed: create/view posts
│   ├── CropModel.jsx        # Reusable image crop modal
│   ├── setCanvasPreview.js  # Canvas utility for crop preview
│   ├── notes.js             # Abandoned code snippets
│   │
│   └── Components/
│       ├── CommentCard.jsx  # Comment section popup modal
│       ├── PostCard.jsx     # Post detail view with comments
│       ├── CommentNode.jsx  # Recursive comment tree node
│       ├── ReplyBox.jsx     # Reply input component
│       └── useComments.jsx  # Custom hook: fetch + manage comments
│
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Code Behaviour Report

### Routing & Entry Point

`main.jsx` wraps the entire app in three nested context providers before passing control to `RouterProvider`:

```
User_login (AuthenticateContext)
  └─ Slide_context (pagination - unused)
     └─ InfoContext (CatsContext)
        └─ RouterProvider
```

Routes defined:

| Path | Component | Purpose |
|---|---|---|
| `/` | `App.jsx` | Landing / hero / breed search |
| `/Info` | `Info.jsx` | Cat breed detail |
| `/Sign_Up` | `Sign_in.jsx` | Registration |
| `/Log_In` | `LogIn.jsx` | Login |
| `/Profile` | `Profile.jsx` | User profile management |
| `/Posts` | `Posts.jsx` | Social feed |

---

### State Management

Two context files handle all shared state, consuming no external library.

**`CatsContext.jsx`** owns:
- Breed list (`breeds`, `page`, `limit`, `Search`, `FilteredBreed`)
- Currently selected breed (`ID`, `Description`, `Catimage`)
- Posts feed (`Posts_content`, `PostDetails`, `ImagesInter`)
- Interaction state (`likedPosts`, `commentLikes`, `Postinteract`, `Comment_pop`)

**`AuthenticateContext.jsx`** owns:
- Session status (`AuthenticateStatus`, `UserId`, `UserName`)
- Form fields (`emailAddress`, `Password`, `showPassword`)
- UI state (`isLoading`, `success`, `error`)
- Cropped images to be uploaded (`finalCroppedpfpImage`, `finalCroppedBgImage`)

Both contexts expose their state and action functions directly to any consuming component.

---

### Authentication Flow

1. **Sign Up** — validates name format (`/^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/`), email, and password strength (8+ chars, uppercase, lowercase, digit, special char), then `POST /User/SignUp`.
2. **Log In** — `POST /User/LogIn` → stores `UserId` in `localStorage` → sets `AuthenticateStatus = true`.
3. **Token Refresh** — `AuthFetch()` wraps every protected request. On a `401` response it calls `POST /refresh`, then retries the original request once.
4. **Logout** — `DELETE /Logout` → clears `AuthenticateStatus`, navigates to `/`.

---

### Landing Page

`App.jsx` renders the marketing hero section. Key interactive behaviour:

- **Breed search bar** — filters `breeds` array from `CatsContext` on every keystroke and renders a dropdown of matches.
- **Auth-conditional header** — shows Sign Up / Log In links when logged out; shows a profile avatar dropdown with a Logout button when logged in.
- **Dropdown close** — a `mousedown` listener on `document` collapses the dropdown when clicking outside. This listener is added on open and removed on close.

---

### Cat Breed Browser

`CatsContext` fetches `GET /Cats/Images?limit={limit}&page={page}` on mount via `load()`. Results populate the `breeds` array rendered on the landing page grid. Clicking a breed sets `ID`, `Description`, and `Catimage` in context and navigates to `/Info`.

`Info.jsx` reads those three values from context and renders a simple detail card (43 lines).

---

### Social Feed & Posts

`Posts.jsx` (311 lines) is the social feed page:

- **Create post** — a text area + image picker (up to 4 images). Images are previewed with `URL.createObjectURL`. On submit, a `FormData` object is sent to the backend, then `GetPosts()` re-fetches the feed.
- **Image grid** — CSS class applied dynamically based on image count (1–4) to arrange previews in different grid layouts.
- **Like button** — calls `ManageLikedPosts(id)` which `POST`s to `/Api/Posts/Post_data/Likes/{id}` and syncs `likedPosts` state.
- **Open post** — `HandlePostInteract(id)` fetches full post data and images, then opens `CommentCard` as an overlay.
- **Body scroll lock** — `document.body.style.overflow` is toggled manually when modals open/close.

---

### Comments System

Built across four files:

- **`useComments.jsx`** — custom hook that fetches comments for a given `postId` with an `AbortController`, exposes `addComment(text, parentId)` to post replies via `POST /Api/Comment`, and re-fetches after submission.
- **`CommentNode.jsx`** — recursive component. Renders a comment, then maps its direct children through itself again. Indentation increases with depth (capped at 48px margin-left).
- **`ReplyBox.jsx`** — small controlled input component, calls `addComment` on submit.
- **`CommentCard.jsx`** / **`PostCard.jsx`** — modal wrappers that render the full post (with image carousel), call `useComments`, and render the comment tree.

Comment liking is handled separately in context: `LikeComment()` calls `POST /Api/Comments/Likes` and `GetCommentsLikes()` syncs which comments the current user has liked.

---

### Profile Page

`Profile.jsx` (628 lines) handles the most complex user interactions:

- **Profile picture & background image** — each goes through: file picker → `CropModel` modal → `setCanvasPreview` (canvas draw) → `browser-image-compression` (max 1 MB, max 1920px) → `POST /Api/Upload` as `FormData`.
- **Bio** — editable text area, saved via `POST /Profile/Bio`.
- **Pet details form** — Name, Breed, Age, Sex fields saved via `POST /Api/pet/form`.
- **Pet image** — uploaded and auto-submitted through a `useEffect` that watches the pet image state variable.

All data is fetched on mount (`fetchProfile`, `GetBio`, `GetPet`, `GetPetForm`).

---

### Image Handling

| Context | Source |
|---|---|
| Landing hero images | External CDN URLs (`futurecdn.net`, `getodie.com`) |
| Cat breed thumbnails | `https://cdn2.thecatapi.com/images/{id}.jpg` |
| Post images | Backend-served URLs, stored as comma-separated string |
| Profile / pet images | Backend file storage, served via backend URL |

Uploaded images are always compressed client-side before sending. Multiple post images are parsed by splitting on `","` which is fragile if a URL ever contains a comma.

---

### API Integration

All requests target `http://localhost:8080`. There is no environment variable — the URL is hardcoded across `CatsContext` and `AuthenticateContext`. Authentication relies entirely on cookies (`credentials: 'include'`); no `Authorization` header is set.

---

## Weaknesses

### Critical

| # | Issue | Location |
|---|---|---|
| 1 | **Hardcoded backend URL** `http://localhost:8080` — cannot deploy without editing source files. Should use `import.meta.env.VITE_API_URL`. | `CatsContext.jsx`, `AuthenticateContext.jsx` |
| 2 | **Silent error handling** — most `catch` blocks only `console.log('error')` with no user feedback or recovery. | Everywhere |
| 3 | **Missing loading states** on image uploads, comment submissions, and feed refresh — users get no feedback while waiting. | `CommentCard.jsx`, `PostCard.jsx`, most API calls |
| 4 | **Auto-submit via `useEffect`** — pet image is sent to the backend automatically whenever its state changes, which can fire on unintended renders. | `Profile.jsx:36-39` |
| 5 | **Comma-split image URLs** — multiple post images are stored and parsed as a comma-separated string. Any URL containing a comma will corrupt the list. | `Posts.jsx`, `CommentCard.jsx` |

---

### Major

| # | Issue | Location |
|---|---|---|
| 6 | **No input sanitization** — user text is sent directly to the backend with no client-side escaping. | All form components |
| 7 | **Inconsistent form validation** — Sign Up has thorough live validation; Log In has none. | `LogIn.jsx` |
| 8 | **Server error responses not surfaced** — `response.json()` error payloads are never read or displayed to the user. | All API calls |
| 9 | **Object URL leaks** — `URL.createObjectURL()` previews for post images are created but `URL.revokeObjectURL()` is never called. | `Posts.jsx` |
| 10 | **Single responsive breakpoint** — only one `@media` query at `max-width: 1100px`; layouts break on phones. | All CSS files |
| 11 | **No accessibility** — interactive elements (dropdowns, modals, like buttons) have no ARIA roles, labels, or keyboard focus styles. | Throughout |
| 12 | **Oversized components** — `Profile.jsx` is 628 lines, `Posts.jsx` is 311 lines; both mix data fetching, image logic, and rendering. | `Profile.jsx`, `Posts.jsx` |
| 13 | **Code duplication** — `CommentCard` and `PostCard` render the same comment tree and image carousel with nearly identical code. | `CommentCard.jsx`, `PostCard.jsx` |
| 14 | **Dead file** — `notes.js` contains abandoned code snippets and should be removed. | `src/Pages/notes.js` |

---

### Performance

| # | Issue | Location |
|---|---|---|
| 15 | **No memoization** — large context values re-render all consumers on every state change; no `useMemo`/`useCallback` used. | `CatsContext.jsx`, `AuthenticateContext.jsx` |
| 16 | **No pagination on posts feed** — `GetPosts()` fetches all posts at once with no infinite scroll or page limit. | `CatsContext.jsx` |
| 17 | **External hero images not optimized** — landing page loads full-size images from third-party CDNs with no lazy loading or `loading="lazy"`. | `App.jsx` |
| 18 | **CSS is not modular** — only `Info` uses CSS Modules; all other pages use global class names, risking collisions and making dead-style detection impossible. | `App.css`, `Posts.css`, `Profile.css` |

---

### Security

| # | Issue | Location |
|---|---|---|
| 19 | **`UserId` in `localStorage`** — exposes the user identifier to any JavaScript running on the page (XSS risk). | `LogIn.jsx` |
| 20 | **No CSRF protection** — cookies are sent automatically but no CSRF token is included in mutation requests. | All `POST`/`DELETE` calls |
| 21 | **No file-type validation beyond `accept`** — `accept="image/*"` is a UI hint only; actual MIME type is not checked before upload. | `Profile.jsx`, `Posts.jsx` |
| 22 | **No rate-limiting on the client** — like/comment/upload buttons can be clicked rapidly and will fire a new request on every click. | `Posts.jsx`, `CommentCard.jsx` |

---

### Code Quality

| # | Issue | Location |
|---|---|---|
| 23 | **JSX stored in state** — `SetVerifyname(<FontAwesomeIcon ... />)` puts a React element into a state variable, an anti-pattern that causes stale closures and reconciliation issues. | `Sign_in.jsx:87` |
| 24 | **Inconsistent naming conventions** — context setters mix `PascalCase` (`SetPostContent`) and `camelCase` (`setContent`). | `CatsContext.jsx`, `AuthenticateContext.jsx` |
| 25 | **No CSS variables** — colours and spacing are hardcoded magic values repeated across 2,400+ lines of CSS. | All CSS files |
| 26 | **`Sliding.jsx` context is unused** — the pagination context is imported and provided at the root but never consumed. | `main.jsx`, `Sliding.jsx` |
| 27 | **No test suite** — no unit, integration, or end-to-end tests are configured. | Project root |
| 28 | **`@types/react` listed but TypeScript not used** — prop shapes are entirely undocumented and type errors are undetectable at build time. | `package.json` |
