import { ArrowRight, Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';
import './HeroPage.css';

function HeroPage({ onStart, onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const slides = [0, 1, 2, 3];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, clientHeight } = scrollContainerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      if (index !== currentSlide) {
        setCurrentSlide(index);
      }
    }
  };

  const scrollToSlide = (index) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: index * scrollContainerRef.current.clientHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="cinematic-hero-container">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      {/* Floating Navbar */}
      <nav className="pill-navbar">
        <div className="logo-group">
          {/* Logo SVG */}
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" stroke="#1D9E75" strokeWidth="1" strokeOpacity="0.4"/>
            <circle cx="16" cy="16" r="10" stroke="#1D9E75" strokeWidth="1" strokeOpacity="0.65"/>
            <circle cx="16" cy="16" r="6" fill="#1D9E75"/>
            <circle cx="16" cy="16" r="2" fill="#F2F7F5"/>
          </svg>
          <span className="logo-text">Lisanga</span>
        </div>
        <div className="nav-links">
          <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>À propos de nous</a>
          <div className="dropdown">
            <a href="#resources" onClick={(e) => { e.preventDefault(); onNavigate('resources'); }}>Ressources ▾</a>
            <div className="dropdown-menu">
              <button onClick={() => onNavigate('resources/emergency')}>Annuaire d'Urgence</button>
              <button onClick={() => onNavigate('resources/legal')}>Droits & Démarches</button>
              <button onClick={() => onNavigate('resources/groups')}>Groupes de Soutien</button>
              <button onClick={() => onNavigate('resources/psy')}>Aide Psychologique</button>
            </div>
          </div>
        </div>

        {/* Burger Button */}
        <button 
          className="burger-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} color="var(--color-white)" /> : <Menu size={24} color="var(--color-white)" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#about" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); onNavigate('about'); }}>À propos de nous</a>
          <div className="mobile-menu-section-title">Ressources</div>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('resources/emergency'); }}>Annuaire d'Urgence</button>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('resources/legal'); }}>Droits & Démarches</button>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('resources/groups'); }}>Groupes de Soutien</button>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('resources/psy'); }}>Aide Psychologique</button>
        </div>
      </div>

      {/* Dot Pagination (Progress Bar) */}
      <div className="dot-pagination">
        {slides.map((index) => (
          <button 
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => scrollToSlide(index)}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Fixed Central CTA */}
      <div className="fixed-cta-container">
        <button className="btn-cinematic-cta" onClick={onStart}>
          Parler maintenant <ArrowRight size={20} />
        </button>
      </div>

      {/* Vertical Scroll Area */}
      <main 
        className="vertical-scroll-container" 
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        
        {/* Slide 1 : Bienvenue */}
        <section className="scroll-slide">
          <div className="slide-content">
            <h1>Ensemble, en sécurité.</h1>
            <p className="slide-subtitle">
              Faites défiler vers le bas pour comprendre pourquoi nous avons créé cet espace, 
              ou cliquez sur le bouton ci-dessous pour trouver une oreille attentive dès maintenant.
            </p>
          </div>
        </section>

        {/* Slide 2 : Stats / Contexte */}
        <section className="scroll-slide">
          <div className="slide-content text-left">
            <span className="slide-label">La Réalité</span>
            <h2>En Afrique, près d'1 femme sur 3 subit des violences au cours de sa vie.</h2>
            <p>
              Les violences basées sur le genre sont un fléau silencieux. Les pressions sociales, 
              la peur du jugement et la stigmatisation enferment souvent les survivant(e)s dans un isolement profond. 
              Pourtant, vous n'êtes pas seul(e)s.
            </p>
            <div className="stat-cards">
              <div className="stat-card">
                <h3>33%</h3>
                <span>Des femmes touchées</span>
              </div>
              <div className="stat-card">
                <h3>Le Silence</h3>
                <span>Principal complice</span>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 : Conséquences du silence */}
        <section className="scroll-slide">
          <div className="slide-content text-left">
            <span className="slide-label">Le Fardeau</span>
            <h2>Se taire, c'est porter un poids trop lourd pour une seule personne.</h2>
            <p>
              Le silence imposé par la honte ou la peur ne fait qu'aggraver les traumatismes. 
              Il crée de l'anxiété, de la dépression et un sentiment d'impuissance. 
              Garder la douleur pour soi n'est pas une preuve de force, mais une prison émotionnelle.
            </p>
          </div>
        </section>

        {/* Slide 4 : Bienfaits de la parole */}
        <section className="scroll-slide">
          <div className="slide-content text-left">
            <span className="slide-label">La Libération</span>
            <h2>Parler est le premier pas vers la guérison.</h2>
            <p>
              Mettre des mots sur sa souffrance permet de briser le cycle de l'isolement. 
              Ici, une intelligence artificielle bienveillante est prête à vous écouter sans jugement, 
              de manière totalement anonyme. Pas de traces. Juste du soutien.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default HeroPage;
