# FixedCode — Proposed Fixes for All 28 Weaknesses

Each section below corresponds to a numbered weakness from the README. Every section shows the **file**, the exact **Before** code, and the exact **After** code. Sections marked `[APPLIED]` have been edited in the actual source files. Sections marked `[APPROACH]` describe the strategy for changes that require larger refactors.

---

## Fix 1 — Hardcoded backend URL `[APPLIED]`

**Files:** `src/Pages/CatsContext.jsx`, `src/Pages/AuthenticateContext.jsx`, `src/Pages/Profile.jsx`, `src/Pages/Sign_in.jsx`, `src/Pages/Components/useComments.jsx`

Create a `.env` file at the project root:

```
# .env
VITE_API_URL=http://localhost:8080
```

Then replace every hardcoded URL string:

**Before (every fetch call):**
```js
await fetch('http://localhost:8080/Api/Posts/Feed', { ... })
```

**After:**
```js
const API = import.meta.env.VITE_API_URL;
// ...
await fetch(`${API}/Api/Posts/Feed`, { ... })
```

The `API` constant is declared once at the top of each file that makes network calls.

---

## Fix 2 — Silent error handling `[APPLIED]`

**Files:** `src/Pages/Profile.jsx`, `src/Pages/Posts.jsx`

**Before — Profile.jsx `Profile_Api()`:**
```js
} catch (error) {
  console.error(error);
  console.log("An error has occured while sending the profile");
}
```

**After:**
```js
const [uploadError, setUploadError] = useState('');
// ...
} catch (error) {
  console.error(error);
  setUploadError('Failed to upload image. Please try again.');
}
// render:
{uploadError && <div className="upload_error">{uploadError}</div>}
```

**Before — Posts.jsx `HandleSubmit()`:**
```js
} catch (error) {
  console.error(error);
}
```

**After:**
```js
const [postError, setPostError] = useState('');
// ...
} catch (error) {
  console.error(error);
  setPostError('Failed to create post. Please try again.');
}
// render:
{postError && <div className="post_error">{postError}</div>}
```

---

## Fix 3 — Missing loading states `[APPLIED]`

**Files:** `src/Pages/Posts.jsx`

**Before:**
```js
async function HandleSubmit(){
  // no loading state
  const SendPost = await fetch(...);
  setPostPop(false)
}

<button className='Create_Post' onClick={HandleSubmit}>Post</button>
```

**After:**
```js
const [isSubmitting, setIsSubmitting] = useState(false);

async function HandleSubmit(){
  if (isSubmitting) return;
  setIsSubmitting(true);
  try {
    const SendPost = await fetch(...);
    // ...
    setPostPop(false);
  } catch (error) {
    setPostError('Failed to create post. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
}

<button className='Create_Post' onClick={HandleSubmit} disabled={isSubmitting}>
  {isSubmitting ? 'Posting...' : 'Post'}
</button>
```

---

## Fix 4 — Auto-submit via `useEffect` for pet image `[APPLIED]`

**File:** `src/Pages/Profile.jsx`

**Before:**
```js
// Pet image auto-submits on state change:
useEffect(() => {
  HandlePetCard();
}, [petImage]);

// No button for saving, only a label:
<label htmlFor="pet_image" className="pet_image_upload">
  <FontAwesomeIcon icon={faPlus} />
</label>
```

**After:**
```js
// Remove the auto-submit useEffect entirely.
// Add an explicit save button that only appears when a file is chosen:

{petImage && (
  <button
    className="save_pet_img_btn"
    onClick={HandlePetCard}
    disabled={isPetUploading}
  >
    {isPetUploading ? 'Saving...' : 'Save Pet Image'}
  </button>
)}
```

The `HandlePetCard` function remains unchanged; it is just no longer called automatically.

---

## Fix 5 — Comma-split image URLs `[APPLIED]`

**File:** `src/Pages/Posts.jsx`

**Before:**
```js
const imagesArray = Element.images.split(',');
```

**After — use the helper already defined in `CatsContext.jsx`:**
```js
// parseImages helper (already defined in CatsContext, now also usable here)
const parseImages = (images) =>
  (images || "").split(",").map(s => s.trim()).filter(Boolean);

// Usage:
const imagesArray = parseImages(Element.images);
```

> **Long-term fix:** Store multiple images as a JSON array on the backend (`["url1","url2"]`) and use `JSON.parse` on the client. This eliminates the edge case of a URL containing a comma.

---

## Fix 6 — Input sanitization `[APPLIED]`

**File:** `src/Pages/Posts.jsx`

**Before:**
```js
formdata.append('Post_Content', value);
```

**After:**
```js
formdata.append('Post_Content', value.trim());
```

**File:** `src/Pages/Profile.jsx`

**Before:**
```js
body: JSON.stringify({ Bio_text: BioText }),
```

**After:**
```js
body: JSON.stringify({ Bio_text: BioText.trim() }),
```

---

## Fix 7 — Inconsistent form validation (Log In has none) `[APPLIED]`

**File:** `src/Pages/AuthenticateContext.jsx`

**Before:**
```js
async function Submit(e){
  e.preventDefault();
  if (isLoading) return;

  if(Password == '' || emailAddress == ''){
    setError('Please make sure to fill in all the required fields')
  } else {
    // directly proceeds to login
  }
}
```

**After:**
```js
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function Submit(e){
  e.preventDefault();
  if (isLoading) return;

  if (Password === '' || emailAddress === '') {
    return setError('Please fill in all required fields.');
  }
  if (!emailRegex.test(emailAddress)) {
    return setError('Please enter a valid email address.');
  }
  if (Password.length < 8) {
    return setError('Password must be at least 8 characters.');
  }
  setError('');
  // ...proceeds to fetch
}
```

---

## Fix 8 — Server error responses not surfaced `[APPLIED]`

**Files:** `src/Pages/AuthenticateContext.jsx`, `src/Pages/Profile.jsx`, `src/Pages/Posts.jsx`

**Before — typical response handling:**
```js
const response = await fetch(...);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
```

**After — parse and show the server's actual error message:**
```js
const response = await fetch(...);
if (!response.ok) {
  const errData = await response.json().catch(() => ({}));
  throw new Error(errData.error || errData.message || `Request failed (${response.status})`);
}
```

---

## Fix 9 — `URL.createObjectURL` memory leaks `[APPLIED]`

**File:** `src/Pages/Posts.jsx`

**Before:**
```js
const [PicsPreview, setPicsPreview] = useState([]);

function HandleImagePost(e){
  const file = Array.from(e.target.files);
  const PreviewPics = file.map(element => URL.createObjectURL(element));
  setPicsPreview(prev => [...prev, ...PreviewPics]);
}
// Object URLs are never revoked.
```

**After:**
```js
const objectUrlsRef = useRef([]);

function HandleImagePost(e){
  const files = Array.from(e.target.files);
  const newUrls = files.map(f => {
    const url = URL.createObjectURL(f);
    objectUrlsRef.current.push(url);
    return url;
  });
  setPicsPreview(prev => [...prev, ...newUrls]);
}

// Revoke all URLs when the post popup closes or on unmount:
useEffect(() => {
  return () => {
    objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  };
}, []);

// Also revoke when post is submitted or popup cleared:
function clearPostForm() {
  objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
  objectUrlsRef.current = [];
  setPicsPreview([]);
  setPostPic([]);
}
```

---

## Fix 10 — Single responsive breakpoint `[APPROACH]`

**Files:** `src/App.css`, `src/Pages/Posts.css`, `src/Pages/Profile.css`

Currently there is only one breakpoint at `max-width: 1100px`. Add two additional breakpoints for tablet and phone:

```css
/* Tablet */
@media (max-width: 768px) {
  .header { flex-direction: column; gap: 1rem; }
  .Posts { padding: 0 1rem; }
  .profile_feed { padding: 0 0.5rem; }
}

/* Phone */
@media (max-width: 480px) {
  .Left_Navigation { display: none; }   /* collapse to bottom nav */
  .Ads_box { display: none; }
  .Mid_comment_pop { width: 95vw; }
  .Posts_Interaction_container { flex-direction: column; }
}
```

This is a large CSS-only change that does not affect any logic. Apply after adjusting layouts for each page.

---

## Fix 11 — No accessibility (ARIA / keyboard) `[APPLIED]`

**File:** `src/App.jsx`

**Before:**
```jsx
<FontAwesomeIcon icon={faCircleUser} onClick={(e)=> setPopUp(!PopUp)} ref={Iconref}/>
```

**After:**
```jsx
<button
  aria-label="User menu"
  aria-expanded={PopUp}
  aria-haspopup="true"
  className="profile_icon_btn"
  onClick={() => setPopUp(!PopUp)}
  ref={Iconref}
>
  <FontAwesomeIcon icon={faCircleUser} />
</button>
```

**File:** `src/Pages/Posts.jsx`

**Before:**
```jsx
<div className="Likes" onClick={(e) => ManageLikedPosts(Element.post_id)}>
  <FontAwesomeIcon icon={faHeart} ... /> &nbsp; Like
</div>
```

**After:**
```jsx
<button
  className="Likes"
  aria-label={likedPosts[Element.post_id] ? 'Unlike post' : 'Like post'}
  aria-pressed={!!likedPosts[Element.post_id]}
  onClick={() => ManageLikedPosts(Element.post_id)}
>
  <FontAwesomeIcon icon={faHeart} ... /> Like
</button>
```

Apply the same pattern (`<button>` with `aria-label`) to all interactive `<div>` elements used as buttons across the app.

---

## Fix 12 — Oversized components `[APPROACH]`

**Files:** `src/Pages/Profile.jsx` (628 lines), `src/Pages/Posts.jsx` (311 lines)

Extract logical units into sub-components:

**Profile.jsx — suggested split:**
```
Profile.jsx               ← orchestrator (~80 lines)
  ProfileHeader.jsx       ← background + pfp crop upload
  BioEditor.jsx           ← bio read/edit card
  PetDetailsForm.jsx      ← pet form + pet image upload
```

**Posts.jsx — suggested split:**
```
Posts.jsx                 ← orchestrator + feed list (~100 lines)
  CreatePostModal.jsx     ← textarea + image picker + submit
  FeedPost.jsx            ← single post card (image grid, like/comment bar)
```

Each sub-component receives only the props it needs. State that is only used within one card moves into that component.

---

## Fix 13 — Code duplication between `CommentCard` and `PostCard` `[APPLIED]`

**File:** `src/Pages/Components/PostCard.jsx`

`PostCard` renders its comment list as inline JSX (duplicating the `CommentNode` tree that `CommentCard` already uses). Replace the inline rendering with the shared `CommentNode`:

**Before — PostCard renders comments inline:**
```jsx
parentComments.map((Element, i) => (
  <div key={i}>
    <div className="user_details_area"> ... </div>
    <div className="Comment_Content">{Element.content}</div>
    <div className="Like_reply"> ... </div>
    {repliesByParent[Element.Comment_id]?.map(reply => ( ... ))}
  </div>
))
```

**After — use the shared `CommentNode`:**
```jsx
import { CommentNode } from './CommentNode';

// ...
parentComments.map(comment => (
  <CommentNode
    key={comment.Comment_id}
    comment={comment}
    repliesByParent={repliesByParent}
    Replyto={Replyto}
    setReplyto={setReplyto}
    CommentReply={CommentReply}
    setCommentReply={setCommentReply}
    handleSubmitComment={handleSubmitComment}
    commentLikes={commentLikes}
    HandleLikeComment={HandleLikeComment}
    UserImg={UserImg}
    loading={loading}
  />
))
```

This eliminates ~70 lines of duplicate code.

---

## Fix 14 — Dead file `notes.js` `[APPLIED]`

**File:** `src/Pages/notes.js`

This file contains abandoned code snippets with no exports and no imports. It is safe to delete.

```bash
# Delete the file:
rm src/Pages/notes.js
```

---

## Fix 15 — No memoization on context values `[APPLIED]`

**Files:** `src/Pages/CatsContext.jsx`, `src/Pages/AuthenticateContext.jsx`

**Before — CatsContext:**
```jsx
return (
  <Catcontext.Provider value={{ page, Setpage, limit, ... }}>
    {children}
  </Catcontext.Provider>
);
```

**After — wrap value in `useMemo`:**
```jsx
import { useState, useRef, useContext, createContext, useEffect, useMemo } from "react";

const contextValue = useMemo(() => ({
  page, Setpage, limit, Setlimit, breeds, setBreeds,
  BarState, setBarState, Search, setSearch, load, FilteredBreed, Getinfo,
  Description, setDescription, ID, setID, Catimage, setCatImage,
  GetPosts, Posts_content, SetPostContent,
  likedPosts, setLikedPosts, ManageLikedPosts, GetLikeData,
  PostDetails, setpostDetails, ImagesInter, setimagesInter,
  HandlePostInteract, Postinteract, setPostinteract,
  ManageComments, Comment_pop, setCommentPop,
  LikeComment, GetCommentsLikes, commentLikes, setCommentLikes, HandleLikeComment,
// eslint-disable-next-line react-hooks/exhaustive-deps
}), [page, limit, breeds, BarState, Search, FilteredBreed, Posts_content,
     likedPosts, commentLikes, Postinteract, Comment_pop, PostDetails, ImagesInter]);

return (
  <Catcontext.Provider value={contextValue}>
    {children}
  </Catcontext.Provider>
);
```

Apply the same pattern to `AuthenticateContext`.

---

## Fix 16 — No pagination on posts feed `[APPLIED]`

**File:** `src/Pages/CatsContext.jsx`

**Before:**
```js
async function GetPosts(){
  const response = await fetch('http://localhost:8080/Api/Posts/Feed', {
    method: 'GET',
    credentials: 'include'
  });
  const Post_Content = await response.json();
  SetPostContent(Post_Content.post_elements);
}
```

**After:**
```js
const [postsPage, setPostsPage] = useState(1);
const POSTS_LIMIT = 10;

async function GetPosts(page = 1){
  const response = await fetch(
    `${API}/Api/Posts/Feed?page=${page}&limit=${POSTS_LIMIT}`,
    { method: 'GET', credentials: 'include' }
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const Post_Content = await response.json();

  if (page === 1) {
    SetPostContent(Post_Content.post_elements);
  } else {
    SetPostContent(prev => [...prev, ...Post_Content.post_elements]);
  }
  setPostsPage(page);
}
```

In `Posts.jsx`, add a "Load more" button:
```jsx
<button
  className="load_more_btn"
  onClick={() => GetPosts(postsPage + 1)}
>
  Load more
</button>
```

> Note: this requires the backend `/Api/Posts/Feed` route to accept `page` and `limit` query parameters.

---

## Fix 17 — Hero images not lazy-loaded `[APPLIED]`

**File:** `src/App.jsx`

**Before:**
```jsx
<img className='Image1' src='https://cdn.mos.cms.futurecdn.net/...' />
<img className='Image2' src='https://getodie.com/...' />
```

**After:**
```jsx
<img className='Image1' src='https://cdn.mos.cms.futurecdn.net/...' loading="lazy" alt="Cat" />
<img className='Image2' src='https://getodie.com/...' loading="lazy" alt="Cat" />
```

---

## Fix 18 — CSS is not modular `[APPROACH]`

**Files:** All CSS files except `Info.module.css`

Currently only `Info.jsx` uses CSS Modules. Migrating the rest requires renaming every class reference in JSX. Steps:

1. Rename each `.css` file to `.module.css` (e.g., `Posts.css` → `Posts.module.css`).
2. Change the import: `import styles from './Posts.module.css'`
3. Replace every `className="ClassName"` with `className={styles.ClassName}`.
4. For conditional classes use `clsx` or template literals: `` className={`${styles.base} ${condition ? styles.active : ''}`} ``

This prevents global class name collisions and makes dead-CSS detection possible via tooling.

---

## Fix 19 — `UserId` stored in `localStorage` `[APPLIED]`

**File:** `src/Pages/LogIn.jsx`

**Before:**
```js
useEffect(() => {
  if (UserId) {
    localStorage.setItem("UserId", UserId);
  } else {
    localStorage.removeItem("UserId");
  }
}, [UserId]);
```

**After — remove the localStorage side-effect entirely:**
```js
// Delete the useEffect above.
// UserId is already in AuthenticateContext state.
// Posts.jsx reads it directly from context — no localStorage needed.
```

**File:** `src/Pages/Posts.jsx`

**Before:**
```js
useEffect(() => {
  const userId = parseInt(localStorage.getItem('UserId'));
  setUserId(userId);
  GetPosts();
  GetLikeData();
}, []);
```

**After — use `UserId` already in context, no localStorage read:**
```js
useEffect(() => {
  GetPosts();
  GetLikeData();
}, []);
// UserId is already available from useAuthenticate() — no need to re-read from localStorage.
```

Also remove `isAuthenticated` from `localStorage` in `AuthenticateContext` if the backend sets a secure HttpOnly session cookie — auth state should be derived from the server, not from a localStorage flag that any script can set.

---

## Fix 20 — No CSRF protection `[APPROACH]`

**Files:** All `POST`/`DELETE` fetch calls

CSRF protection requires a server-side change. The standard approach:

1. Backend sets a CSRF token in a **non-HttpOnly** cookie (readable by JS) on page load.
2. Frontend reads that cookie and sends it in a custom header on every mutation:

```js
function getCsrfToken() {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrf_token='))
    ?.split('=')[1];
}

// In every mutating fetch:
headers: {
  'Content-Type': 'application/json',
  'X-CSRF-Token': getCsrfToken(),
}
```

3. Backend middleware verifies the header value matches the cookie value before processing the request.

---

## Fix 21 — No real file-type validation `[APPLIED]`

**Files:** `src/Pages/Posts.jsx`, `src/Pages/Profile.jsx`

**Before — Posts.jsx `HandleImagePost`:**
```js
function HandleImagePost(e){
  const file = Array.from(e.target.files);
  // No type check — any file passes through.
```

**After:**
```js
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function HandleImagePost(e){
  const files = Array.from(e.target.files).filter(f => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      setimgNumAlert(`"${f.name}" is not a supported image type.`);
      return false;
    }
    return true;
  });
  if (!files.length) return;
  // ... rest unchanged
```

Apply the same filter in `Profile.jsx` inside `handleImageUpload` and `HandlePet_image_upload`.

---

## Fix 22 — No rate-limiting on like/comment buttons `[APPLIED]`

**File:** `src/Pages/CatsContext.jsx`

**Before — `ManageLikedPosts` can fire on every click with no throttle:**
```js
async function ManageLikedPosts(Post_id) {
  try {
    const Likes_Response = await fetch(...);
```

**After — guard with an in-flight set:**
```js
const pendingLikes = useRef(new Set());

async function ManageLikedPosts(Post_id) {
  if (pendingLikes.current.has(Post_id)) return; // already in flight
  pendingLikes.current.add(Post_id);
  try {
    const Likes_Response = await fetch(...);
    // ...
  } finally {
    pendingLikes.current.delete(Post_id);
  }
}
```

Apply the same pattern to `HandleLikeComment`.

---

## Fix 23 — JSX stored in state `[APPLIED]`

**File:** `src/Pages/Sign_in.jsx`

**Before:**
```js
const [Verifyname, SetVerifyname] = useState();

// Inside HandleName:
if (nameTest.test(value)) {
  SetVerifyname(<FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />)
  setFullnamevalidation(true);
} else {
  SetVerifyname();
  setFullnamevalidation(false);
}

// In JSX:
<label>Full name : {Verifyname}</label>
```

**After — store a plain string status, render icon in JSX:**
```js
const [nameStatus, setNameStatus] = useState(''); // '' | 'valid' | 'invalid'

// Inside HandleName:
if (nameTest.test(value)) {
  setNameStatus('valid');
  setFullnamevalidation(true);
} else {
  setNameStatus(value ? 'invalid' : '');
  setFullnamevalidation(false);
}

// In JSX:
<label>
  Full name :{' '}
  {nameStatus === 'valid' && <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />}
  {nameStatus === 'invalid' && <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }} />}
</label>
```

Apply the same change to `Verifyemail` / `SetVerifyemail`.

---

## Fix 24 — Inconsistent naming conventions `[APPLIED]`

**Files:** `src/Pages/CatsContext.jsx`, `src/Pages/AuthenticateContext.jsx`

React convention: state setters use `camelCase`. Replace `PascalCase` setters:

| Before | After |
|---|---|
| `Setpage` | `setPage` |
| `Setlimit` | `setLimit` |
| `SetPostContent` | `setPostContent` |
| `SetPassword` | `setPassword` |
| `SetFullname` | `setFullname` |
| `SetemailAddress` | `setEmailAddress` |

Update all call sites accordingly. Component names remain `PascalCase` — only setter functions change.

---

## Fix 25 — No CSS variables (magic values) `[APPLIED]`

**File:** `src/App.css`

**Before — colours hardcoded throughout:**
```css
button.Sign_in { background-color: #278783; }
button.Log_in  { background-color: #278783; }
.Drop_down     { background-color: #FFF8E1; }
```

**After — define once, use everywhere:**
```css
:root {
  --color-primary:    #278783;
  --color-primary-hover: #4acfc9;
  --color-bg:         #FFF8E1;
  --color-bg-dark:    #EAE6D3;
  --color-border:     #A1887F;
  --color-blue:       #0047AB;
  --color-text:       #333;
  --radius-card:      12px;
  --shadow-card:      0 2px 8px rgba(0,0,0,0.12);
}

button.Sign_in { background-color: var(--color-primary); }
button.Log_in  { background-color: var(--color-primary); }
.Drop_down     { background-color: var(--color-bg); }
```

---

## Fix 26 — `Sliding.jsx` context is unused `[APPLIED]`

**File:** `src/main.jsx`

**Before:**
```jsx
import {Slide_context} from './Sliding.jsx'
// ...
<InfoContext>
  <Slide_context>
    <User_login>
      <RouterProvider router={router} basename='/Home' />
    </User_login>
  </Slide_context>
</InfoContext>
```

**After — remove the unused wrapper:**
```jsx
// Remove import of Slide_context entirely.
<InfoContext>
  <User_login>
    <RouterProvider router={router} basename='/Home' />
  </User_login>
</InfoContext>
```

`Sliding.jsx` itself can be deleted once the import is removed.

---

## Fix 27 — No test suite `[APPROACH]`

Install Vitest (compatible with Vite):

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `vite.config.js`:
```js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
```

Create `src/test/setup.js`:
```js
import '@testing-library/jest-dom';
```

Priority tests to write first:
- `Sign_in.jsx` — validation logic (name regex, email regex, password strength)
- `useComments.jsx` — fetch, addComment, abort controller
- `AuthenticateContext.jsx` — Submit, Logout, AuthFetch retry logic

---

## Fix 28 — `@types/react` installed but TypeScript not used `[APPROACH]`

Either:

**Option A — Remove the unused type package:**
```bash
npm uninstall @types/react @types/react-dom
```

**Option B — Migrate to TypeScript (recommended for long term):**
```bash
npm install -D typescript @types/react @types/react-dom
npx tsc --init
```

Rename files `.jsx` → `.tsx` incrementally. Add prop types to components:
```tsx
interface CommentCardProps {
  Image: string;
  Name: string;
  date: string;
  PostImgs: string[];
  Content: string;
  UserImg: string;
  Liked: boolean;
  onLike: () => void;
  onImageClick: () => void;
  UserId: number;
  PostId: number;
}

function CommentCard({ Image, Name, ...}: CommentCardProps) { ... }
```

TypeScript will surface prop-shape mismatches at build time that currently only appear as runtime errors.
