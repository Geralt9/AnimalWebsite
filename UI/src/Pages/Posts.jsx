import { Link , useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen, faXmark, faHeart, faShare, faCircleXmark,
  faHouse, faCircleUser, faBookOpen, faShop, faPaw,
  faImage, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {faComment, faImages} from '@fortawesome/free-regular-svg-icons';

import { useState , useEffect, useRef } from "react";
import { useAuthenticate} from "./AuthenticateContext";
import { useCat } from "./CatsContext";

import './Posts.css';
import CommentCard from "./Components/CommentCard.jsx";
import PostCard from "./Components/PostCard.jsx";

const API = import.meta.env.VITE_API_URL;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function parseImages(images) {
  return (images || "").split(",").map(s => s.trim()).filter(Boolean);
}

export default function Posts(){

const { AuthenticateStatus, UserId, finalCroppedpfpImage, fetchProfile } = useAuthenticate();
const {
  GetPosts, Posts_content, postsPage,
  likedPosts, ManageLikedPosts, GetLikeData,
  PostDetails, ImagesInter,
  HandlePostInteract, Postinteract, setPostinteract,
  ManageComments, Comment_pop, setCommentPop,
} = useCat();

const [PostPop, setPostPop] = useState(false);
const PostContentRef = useRef(null);
const objectUrlsRef = useRef([]);

useEffect(() => {
  document.body.style.backgroundColor = 'var(--color-bg, #f4f1e8)';
}, []);

useEffect(() => {
  fetchProfile();
  GetPosts();
  GetLikeData();
}, []);

useEffect(() => {
  return () => {
    objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  };
}, []);

// ── Image picker ──────────────────────────────────────────────────
const [PostPicture, setPostPic] = useState([]);
const [PicsPreview, setPicsPreview] = useState([]);
const [imgNumAlert, setimgNumAlert] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [postError, setPostError] = useState('');

const MaxImages = 4;

function clearPostForm() {
  objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
  objectUrlsRef.current = [];
  setPicsPreview([]);
  setPostPic([]);
  setimgNumAlert('');
  setPostError('');
}

function HandleImagePost(e) {
  const files = Array.from(e.target.files).filter(f => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      setimgNumAlert(`"${f.name}" is not a supported image type.`);
      return false;
    }
    return true;
  });
  if (!files.length) return;

  const newUrls = files.map(f => {
    const url = URL.createObjectURL(f);
    objectUrlsRef.current.push(url);
    return url;
  });

  setPicsPreview(prev => {
    if (prev.length + newUrls.length <= MaxImages) {
      setimgNumAlert('');
      return [...prev, ...newUrls];
    }
    setimgNumAlert(`Max ${MaxImages} images allowed.`);
    newUrls.forEach(url => URL.revokeObjectURL(url));
    objectUrlsRef.current = objectUrlsRef.current.filter(u => !newUrls.includes(u));
    return prev;
  });
  setPostPic(prev => prev.length + files.length <= MaxImages ? [...prev, ...files] : prev);
}

function GetGridClass() {
  const n = PicsPreview.length;
  if (n === 1) return 'grid single';
  if (n === 2) return 'grid two';
  if (n === 3) return 'grid three';
  if (n === 4) return 'grid four';
  return 'grid_maxed';
}

function GetImageGridClass(n) {
  if (n === 1) return 'Post_Image_Container single';
  if (n === 2) return 'Post_Image_Container two';
  if (n === 3) return 'Post_Image_Container three';
  return 'Post_Image_Container four';
}

// ── Submit ────────────────────────────────────────────────────────
async function HandleSubmit() {
  if (isSubmitting) return;
  const value = PostContentRef.current.value;
  if (value.trim() === '' && PicsPreview.length === 0) return;

  setIsSubmitting(true);
  setPostError('');
  try {
    const formdata = new FormData();
    formdata.append('User', UserId);
    formdata.append('Post_Content', value.trim());
    PostPicture.forEach(file => formdata.append('images', file));

    const res = await fetch(`${API}/Api/Posts`, {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed (${res.status})`);
    }
    clearPostForm();
    if (PostContentRef.current) PostContentRef.current.value = '';
    setPostPop(false);
    GetPosts();
  } catch (error) {
    console.error(error);
    setPostError('Failed to create post. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
}

// ── Scroll lock ───────────────────────────────────────────────────
useEffect(() => {
  document.body.style.overflow = Postinteract ? 'hidden' : 'auto';
}, [Postinteract]);

// ─────────────────────────────────────────────────────────────────

return (
  <>
    {/* ── Create-post overlay ── */}
    <div className={PostPop ? 'modal-overlay' : 'modal-overlay modal-overlay--hidden'}>
      <div className={PostPop ? 'post-modal' : 'post-modal post-modal--hidden'}>

        <div className="post-modal__header">
          <span className="post-modal__title">Create Post</span>
          <button
            className="post-modal__close"
            aria-label="Close"
            onClick={() => { setPostPop(false); clearPostForm(); }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="post-modal__author">
          {finalCroppedpfpImage
            ? <img src={finalCroppedpfpImage} className="post-modal__avatar" alt="You" />
            : <div className="post-modal__avatar post-modal__avatar--placeholder"><FontAwesomeIcon icon={faCircleUser} /></div>
          }
          <span className="post-modal__author-name">Sharing with the community</span>
        </div>

        <textarea
          className="post-modal__textarea"
          placeholder="What's on your mind?"
          ref={PostContentRef}
        />

        {PicsPreview.length > 0 && (
          <div className={GetGridClass()}>
            {PicsPreview.map((url, i) => (
              <div key={i} className="Grid-image-wrapper">
                <img src={url} alt={`preview-${i}`} />
              </div>
            ))}
          </div>
        )}

        <div className="post-modal__footer">
          <input
            type="file" multiple accept="image/*"
            id="PostPic" style={{ display: 'none' }}
            onChange={HandleImagePost}
          />
          <label htmlFor="PostPic" className="post-modal__img-btn" title="Add photos">
            <FontAwesomeIcon icon={faImages} /> Photos
          </label>

          <button
            className="post-modal__submit"
            onClick={HandleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting…' : 'Post'}
          </button>
        </div>

        {imgNumAlert && <div className="post-modal__error">{imgNumAlert}</div>}
        {postError   && <div className="post-modal__error">{postError}</div>}
      </div>
    </div>

    {/* ── Page shell ── */}
    <div className="posts-page">

      {/* Left nav */}
      <aside className="posts-sidenav">
        <div className="sidenav__logo">
          <FontAwesomeIcon icon={faPaw} className="sidenav__logo-icon" />
          AnimalWiki
        </div>
        <nav className="sidenav__nav">
          <Link to="/" className="sidenav__item">
            <FontAwesomeIcon icon={faHouse} /> Home
          </Link>
          <Link to="/Profile" className="sidenav__item">
            <FontAwesomeIcon icon={faCircleUser} /> Profile
          </Link>
          <div className="sidenav__item sidenav__item--disabled">
            <FontAwesomeIcon icon={faBookOpen} /> Animal Wiki
          </div>
          <div className="sidenav__item sidenav__item--disabled">
            <FontAwesomeIcon icon={faShop} /> Shops
          </div>
        </nav>
      </aside>

      {/* Feed */}
      <main className="posts-feed">

        {/* Composer trigger */}
        <div className="composer-card">
          {finalCroppedpfpImage
            ? <img src={finalCroppedpfpImage} className="composer-card__avatar" alt="You" />
            : <div className="composer-card__avatar composer-card__avatar--empty"><FontAwesomeIcon icon={faCircleUser} /></div>
          }
          <button className="composer-card__trigger" onClick={() => setPostPop(true)}>
            What's on your mind?
          </button>
          <button className="composer-card__photo-btn" onClick={() => setPostPop(true)}>
            <FontAwesomeIcon icon={faImage} />
          </button>
        </div>

        {/* Posts list */}
        <div className="posts-list">
          {Posts_content && Posts_content.map((post, i) => {
            const imgs = parseImages(post.images);
            return (
              <article className="post-card" key={i}>

                <div className="post-card__header">
                  <div className="post-card__avatar-wrap">
                    <img src={post.pfp_img} className="post-card__avatar" alt={post.FullName} />
                  </div>
                  <div className="post-card__meta">
                    <span className="post-card__name">{post.FullName}</span>
                    <span className="post-card__date">{new Date(post.post_created_at).toLocaleString()}</span>
                  </div>
                </div>

                {post.content && (
                  <p className="post-card__content">{post.content}</p>
                )}

                {imgs.length > 0 && (
                  <div className={GetImageGridClass(imgs.length)}>
                    {imgs.map((url, j) => (
                      <div className="Images_Wrapper" key={j}>
                        <img
                          className="Post_Image"
                          src={url}
                          alt={`post image ${j + 1}`}
                          onClick={() => HandlePostInteract(post.post_id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="post-card__actions">
                  <button
                    className="post-card__action-btn"
                    aria-label={likedPosts[post.post_id] ? 'Unlike' : 'Like'}
                    aria-pressed={!!likedPosts[post.post_id]}
                    onClick={() => ManageLikedPosts(post.post_id)}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={likedPosts[post.post_id] ? 'post-card__heart--liked' : 'post-card__heart'}
                    />
                    Like
                  </button>

                  <button
                    className="post-card__action-btn"
                    onClick={() => { ManageComments(post.post_id); fetchProfile(); }}
                  >
                    <FontAwesomeIcon icon={faComment} /> Comment
                  </button>

                  <button className="post-card__action-btn">
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                </div>

              </article>
            );
          })}

          {Posts_content && Posts_content.length > 0 && (
            <button className="load-more-btn" onClick={() => GetPosts(postsPage + 1)}>
              Load more
            </button>
          )}
        </div>
      </main>

      {/* Right sidebar / ads */}
      <aside className="posts-sidebar">
        <div className="sidebar-card">
          <div className="sidebar-card__title">Sponsored</div>
          <img src="../Icons_Images/PetAd.jpg"  className="sidebar-card__ad" alt="Pet ad" loading="lazy" />
          <img src="../Icons_Images/PetAd2.jpg" className="sidebar-card__ad" alt="Pet ad" loading="lazy" />
        </div>
      </aside>

    </div>

    {/* ── Comment popup ── */}
    {Comment_pop && PostDetails && (
      <>
        <CommentCard
          Name={PostDetails.Username}
          Image={PostDetails.pfp}
          UserImg={finalCroppedpfpImage}
          date={new Date(PostDetails.post_details[0].created_at).toLocaleString()}
          PostImgs={ImagesInter}
          Liked={likedPosts[PostDetails.post_details[0].post_id]}
          onLike={() => ManageLikedPosts(PostDetails.post_details[0].post_id)}
          Content={PostDetails.post_details[0].content}
          onImageClick={() => HandlePostInteract(PostDetails.post_details[0].post_id)}
          UserId={UserId}
          PostId={PostDetails.post_details[0].post_id}
        />
        <button className="closeInterpop" aria-label="Close comments" onClick={() => setCommentPop(false)}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </>
    )}

    {/* ── Post inspection modal ── */}
    {Postinteract && PostDetails && (
      <>
        <PostCard
          key={finalCroppedpfpImage}
          UserId={UserId}
          userName={PostDetails.Username}
          Pictures={ImagesInter}
          Profile_pic={PostDetails.pfp}
          Text={PostDetails.post_details[0].content}
          CreatedAt={new Date(PostDetails.post_details[0].created_at).toLocaleString()}
          Like={() => ManageLikedPosts(PostDetails.post_details[0].post_id)}
          Liked={likedPosts[PostDetails.post_details[0].post_id]}
          PostId={PostDetails.post_details[0].post_id}
          UserImg={finalCroppedpfpImage}
        />
        <button className="closeInterpop" aria-label="Close post" onClick={() => setPostinteract(false)}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </>
    )}
  </>
);
}
