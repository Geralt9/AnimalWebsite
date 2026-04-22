import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import './App.css';

import {useCat} from './Pages/CatsContext.jsx'
import { useAuthenticate } from './Pages/AuthenticateContext.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaw, faCircleUser, faArrowRightFromBracket,
  faMagnifyingGlass, faChevronDown, faStar,
  faHeart, faLeaf, faShield, faClock,
  faUsers, faBookOpen, faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const FACTS = [
  { icon: '🐾', heading: 'Cats sleep 12–16 hrs a day', body: 'Domestic cats spend up to two-thirds of their lives asleep, conserving energy as natural ambush predators.' },
  { icon: '🐕', heading: 'Dogs can smell disease', body: 'A dog\'s nose contains 300 million olfactory receptors — 50× more than humans — letting them detect cancer, diabetes and more.' },
  { icon: '🦜', heading: 'Parrots live up to 80 years', body: 'Some parrot species outlive their owners. The Hyacinth Macaw can live up to 80 years in captivity.' },
  { icon: '🐠', heading: 'Fish have unique personalities', body: 'Studies show fish exhibit individual boldness and curiosity. Cleaner wrasses even pass the mirror self-recognition test.' },
  { icon: '🐇', heading: 'Rabbits can\'t vomit', body: 'Unlike most mammals, rabbits lack the ability to vomit, which is why a proper diet is critical to their health.' },
  { icon: '🦔', heading: 'Hedgehogs are immune to some venoms', body: 'Hedgehogs carry a mutation in their muscle-cell receptors that makes them highly resistant to snake venom.' },
];

const TIPS = [
  {
    icon: faLeaf,
    title: 'Nutrition First',
    body: 'Species-appropriate nutrition is the foundation of animal health. Avoid processed fillers and prioritise whole-food ingredients tailored to your pet\'s life stage.',
  },
  {
    icon: faShield,
    title: 'Preventive Care',
    body: 'Regular vet check-ups, vaccinations, and parasite control prevent the vast majority of common illnesses before they become serious.',
  },
  {
    icon: faClock,
    title: 'Routine & Enrichment',
    body: 'Animals thrive on predictable schedules. Combine daily routines with mental stimulation — puzzles, play, and social time — to reduce anxiety and boredom.',
  },
];

const CATEGORIES = [
  { emoji: '🐱', label: 'Cats',    count: '70+ breeds',  color: '#f4a261', desc: 'From the regal Persian to the playful Bengal, explore the full spectrum of feline breeds and behaviours.' },
  { emoji: '🐶', label: 'Dogs',    count: '200+ breeds', color: '#52b788', desc: 'Discover working dogs, companion breeds, and everything in between — with care guides for every size.' },
  { emoji: '🦜', label: 'Birds',   count: '40+ species', color: '#4cc9f0', desc: 'Parrots, finches, canaries and more. Learn about their social needs, diet, and habitat requirements.' },
  { emoji: '🐠', label: 'Fish',    count: '60+ species', color: '#7b5ea7', desc: 'Freshwater and marine species, tank setup guides, and the science behind aquatic ecosystems.' },
];

export default function App() {

  const { page, setPage, limit, setLimit, breeds,
    setBreeds, BarState, setBarState, Search, setSearch,
    load, FilteredBreed, Getinfo } = useCat();

  const { AuthenticateStatus, Logout, PopUp, setPopUp,
          finalCroppedpfpImage, UserName, fetchProfile } = useAuthenticate();

  const DropDown = useRef(null);
  const Iconref  = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFact, setActiveFact] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = 'var(--color-bg)';
  }, []);

  useEffect(() => {
    if (AuthenticateStatus) fetchProfile();
  }, [AuthenticateStatus]);

  useEffect(() => {
    load();
  }, [page, limit]);

  function HandleClickOutside(e) {
    if (DropDown.current && !DropDown.current.contains(e.target) && !Iconref.current.contains(e.target)) {
      setPopUp(false);
    }
  }

  useEffect(() => {
    if (PopUp) {
      document.addEventListener('mousedown', HandleClickOutside);
    } else {
      document.removeEventListener('mousedown', HandleClickOutside);
    }
    return () => document.removeEventListener('mousedown', HandleClickOutside);
  }, [PopUp]);

  // Auto-advance facts
  useEffect(() => {
    const t = setInterval(() => setActiveFact(prev => (prev + 1) % FACTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ───────────── NAVBAR ───────────── */}
      <header className="navbar">
        <div className="navbar__inner">

          <div className="navbar__logo">
            <FontAwesomeIcon icon={faPaw} className="navbar__logo-icon" />
            <span>AnimalWiki</span>
          </div>

          {/* Search */}
          <div className="navbar__search-wrap" onBlur={() => setBarState(false)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="navbar__search-icon" />
            <input
              className="navbar__search"
              onFocus={() => setBarState(true)}
              onChange={e => setSearch(e.target.value)}
              value={Search}
              placeholder="Search breeds…"
              aria-label="Search for cat breeds"
            />
            {BarState && FilteredBreed.length > 0 && (
              <div className="navbar__dropdown" onMouseDown={e => e.preventDefault()}>
                {FilteredBreed.map((element, i) => (
                  <Link
                    to="/Info"
                    key={i}
                    className="navbar__dropdown-item"
                    onClick={() => Getinfo(element)}
                  >
                    <FontAwesomeIcon icon={faPaw} className="navbar__dropdown-paw" />
                    {element.cat_id}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          <nav className="navbar__auth">
            {AuthenticateStatus ? (
              <>
                <button
                  className="navbar__avatar-btn"
                  aria-label="User menu"
                  aria-expanded={PopUp}
                  aria-haspopup="true"
                  onClick={() => setPopUp(!PopUp)}
                  ref={Iconref}
                >
                  {finalCroppedpfpImage
                    ? <img src={finalCroppedpfpImage} alt="avatar" className="navbar__avatar-img" />
                    : <FontAwesomeIcon icon={faCircleUser} />
                  }
                  <FontAwesomeIcon icon={faChevronDown} className={`navbar__chevron${PopUp ? ' navbar__chevron--open' : ''}`} />
                </button>

                {PopUp && (
                  <div className="navbar__user-menu" ref={DropDown}>
                    <div className="navbar__menu-header">
                      {finalCroppedpfpImage
                        ? <img src={finalCroppedpfpImage} alt="avatar" className="navbar__menu-header-img" />
                        : <FontAwesomeIcon icon={faCircleUser} className="navbar__menu-header-icon" />
                      }
                      <span className="navbar__menu-header-name">{UserName || 'My Account'}</span>
                    </div>
                    <Link to="/Profile" className="navbar__menu-item" onClick={() => setPopUp(false)}>
                      <FontAwesomeIcon icon={faCircleUser} /> Profile
                    </Link>
                    <Link to="/Posts" className="navbar__menu-item" onClick={() => setPopUp(false)}>
                      <FontAwesomeIcon icon={faUsers} /> Community
                    </Link>
                    <button className="navbar__menu-item navbar__menu-item--logout" onClick={Logout}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="navbar__auth-links">
                <Link to="/Log_In" className="btn btn--ghost">Log In</Link>
                <Link to="/Sign_Up" className="btn btn--primary">Sign Up</Link>
              </div>
            )}
          </nav>

        </div>
      </header>

      {/* ───────────── HERO ───────────── */}
      <section className="hero">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1" />
          <div className="hero__shape hero__shape--2" />
          <div className="hero__shape hero__shape--3" />
        </div>

        <div className="hero__content">
          <div className="hero__badge">
            <FontAwesomeIcon icon={faStar} /> Trusted by animal lovers worldwide
          </div>
          <h1 className="hero__title">
            Your Gateway to the <span className="hero__title-accent">Animal World</span>
          </h1>
          <p className="hero__subtitle">
            Explore hundreds of breeds, discover fascinating wildlife facts, share your
            pet stories, and connect with a passionate community of animal enthusiasts.
          </p>

          <div className="hero__actions">
            {AuthenticateStatus
              ? <Link to="/Posts" className="btn btn--primary btn--lg">Browse Community</Link>
              : <Link to="/Sign_Up" className="btn btn--primary btn--lg">Get Started Free</Link>
            }
            <Link to="/Info" className="btn btn--outline btn--lg">Explore Breeds</Link>
          </div>
        </div>

        <div className="hero__images">
          <div className="hero__img-card hero__img-card--main">
            <img
              src="https://cdn.mos.cms.futurecdn.net/v2/t:0,l:240,cw:1440,ch:1080,q:80,w:1440/KHQb3Ny62YxXnCEon4mm43.jpg"
              alt="Beautiful cat"
              loading="lazy"
            />
          </div>
          <div className="hero__img-card hero__img-card--secondary">
            <img
              src="https://getodie.com/wp-content/uploads/2024/06/close-up-beautiful-pet-cat-1-scaled.jpg"
              alt="Close-up cat"
              loading="lazy"
            />
          </div>
          <div className="hero__floating-badge">
            <span className="hero__floating-badge-num">500+</span>
            <span>Breeds catalogued</span>
          </div>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="stats-bar">
        <div className="stats-bar__inner">
          {[
            { num: '500+',  label: 'Breeds & Species' },
            { num: '12K+',  label: 'Community Members' },
            { num: '50+',   label: 'Animal Categories' },
            { num: '1000+', label: 'Care Articles' },
          ].map(s => (
            <div className="stat" key={s.label}>
              <span className="stat__num">{s.num}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── CATEGORIES ───────────── */}
      <section className="section categories">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">Explore by Animal</h2>
            <p className="section__subtitle">Dive into detailed guides for every type of pet and animal companion.</p>
          </div>

          <div className="categories__grid">
            {CATEGORIES.map(cat => (
              <div className="category-card" key={cat.label} style={{ '--card-accent': cat.color }}>
                <div className="category-card__emoji">{cat.emoji}</div>
                <div className="category-card__body">
                  <div className="category-card__label">{cat.label}</div>
                  <div className="category-card__count">{cat.count}</div>
                  <p className="category-card__desc">{cat.desc}</p>
                </div>
                <Link to="/Info" className="category-card__link">Explore →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FACTS ───────────── */}
      <section className="section facts">
        <div className="section__inner facts__inner">

          <div className="section__header">
            <h2 className="section__title">Did You Know?</h2>
            <p className="section__subtitle">Fascinating facts from the animal kingdom, updated daily.</p>
          </div>

          <div className="facts__carousel">
            <div className="facts__active-card">
              <span className="facts__active-emoji">{FACTS[activeFact].icon}</span>
              <h3 className="facts__active-heading">{FACTS[activeFact].heading}</h3>
              <p className="facts__active-body">{FACTS[activeFact].body}</p>
            </div>

            <div className="facts__dots">
              {FACTS.map((_, i) => (
                <button
                  key={i}
                  className={`facts__dot ${i === activeFact ? 'facts__dot--active' : ''}`}
                  onClick={() => setActiveFact(i)}
                  aria-label={`Fact ${i + 1}`}
                />
              ))}
            </div>

            <div className="facts__grid">
              {FACTS.map((fact, i) => (
                <button
                  key={i}
                  className={`fact-chip ${i === activeFact ? 'fact-chip--active' : ''}`}
                  onClick={() => setActiveFact(i)}
                >
                  <span>{fact.icon}</span>
                  <span>{fact.heading}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ───────────── CARE TIPS ───────────── */}
      <section className="section tips">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">Essential Care Tips</h2>
            <p className="section__subtitle">Simple principles every responsible pet owner should know.</p>
          </div>

          <div className="tips__grid">
            {TIPS.map(tip => (
              <div className="tip-card" key={tip.title}>
                <div className="tip-card__icon">
                  <FontAwesomeIcon icon={tip.icon} />
                </div>
                <h3 className="tip-card__title">{tip.title}</h3>
                <p className="tip-card__body">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── COMMUNITY CTA ───────────── */}
      <section className="community-cta">
        <div className="community-cta__inner">
          <div className="community-cta__text">
            <h2 className="community-cta__title">
              Join a community of <span className="community-cta__accent">animal lovers</span>
            </h2>
            <p className="community-cta__body">
              Share photos of your pets, ask for advice, swap care tips, and celebrate
              the joy of living alongside animals — every day.
            </p>
            <div className="community-cta__actions">
              {AuthenticateStatus
                ? <Link to="/Posts" className="btn btn--white btn--lg">Go to Community</Link>
                : <>
                    <Link to="/Sign_Up" className="btn btn--white btn--lg">Create Free Account</Link>
                    <Link to="/Log_In" className="btn btn--outline-white btn--lg">Log In</Link>
                  </>
              }
            </div>
          </div>
          <div className="community-cta__art">
            <img src="../Icons_Images/PetAnimal2.png" alt="Pet illustration" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="footer">
        <div className="footer__inner">

          <div className="footer__brand">
            <div className="footer__logo">
              <FontAwesomeIcon icon={faPaw} /> AnimalWiki
            </div>
            <p className="footer__tagline">
              Connecting animal lovers with the knowledge and community they need to care better.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <div className="footer__col-title">Explore</div>
              <Link to="/Info" className="footer__link">Cat Breeds</Link>
              <Link to="/Posts" className="footer__link">Community Feed</Link>
              <Link to="/Profile" className="footer__link">Your Profile</Link>
            </div>

            <div className="footer__col">
              <div className="footer__col-title">Animals</div>
              <span className="footer__link footer__link--muted">Cats</span>
              <span className="footer__link footer__link--muted">Dogs</span>
              <span className="footer__link footer__link--muted">Birds</span>
              <span className="footer__link footer__link--muted">Fish</span>
            </div>

            <div className="footer__col">
              <div className="footer__col-title">Account</div>
              {AuthenticateStatus
                ? <Link to="/Profile" className="footer__link">My Profile</Link>
                : <>
                    <Link to="/Sign_Up" className="footer__link">Sign Up</Link>
                    <Link to="/Log_In" className="footer__link">Log In</Link>
                  </>
              }
            </div>
          </div>

        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} AnimalWiki. Made with <FontAwesomeIcon icon={faHeart} className="footer__heart" /> for animals everywhere.</span>
        </div>
      </footer>
    </>
  );
}
