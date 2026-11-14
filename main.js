/**
 * FARHAN IQBAL — LUXURY MONOCHROME & LIQUID CHROME SCROLLYTELLING ENGINE
 * Pure Vanilla Modern JavaScript + Three.js
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. MILLISECOND INTRO CURTAIN REVEAL
     ============================================================ */
  const curtain = document.getElementById('introCurtain');
  if (curtain) {
    setTimeout(() => {
      curtain.classList.add('revealed');
      triggerHeroEntry();
    }, 400); // Revealed within 400ms
  }

  function triggerHeroEntry() {
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px) scale(0.96)';
      item.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`;
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
      }, 50);
    });
  }


  /* ============================================================
     2. DYNAMIC ROLE ROTATOR
     ============================================================ */
  const roleSlot = document.getElementById('roleSlot');
  const roles = [
    'Cybersecurity & Forensics',
    'Front-End Web Developer',
    'C++ (OOP) Programmer',
    'Relational SQL Specialist',
    'Islamia Univ. Bahawalpur (ADP)'
  ];
  let rIndex = 0;

  if (roleSlot) {
    setInterval(() => {
      roleSlot.style.opacity = '0';
      roleSlot.style.transform = 'translateY(-8px)';
      roleSlot.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      setTimeout(() => {
        rIndex = (rIndex + 1) % roles.length;
        roleSlot.textContent = roles[rIndex];
        roleSlot.style.transform = 'translateY(8px)';
        
        setTimeout(() => {
          roleSlot.style.opacity = '1';
          roleSlot.style.transform = 'translateY(0)';
        }, 50);
      }, 300);
    }, 2800);
  }


  /* ============================================================
     3. WORD-BY-WORD SCROLL SCRUB TEXT (Apple Pro Display style)
     ============================================================ */
  const scrubEl = document.getElementById('scrubText');
  let wordSpans = [];

  if (scrubEl) {
    const originalText = scrubEl.textContent.trim();
    const words = originalText.split(/\s+/);
    scrubEl.innerHTML = words.map(w => `<span class="word-scrub">${w}</span> `).join('');
    wordSpans = scrubEl.querySelectorAll('.word-scrub');
  }


  /* ============================================================
     4. THREE.JS LIQUID CHROME 3D SCULPTURE & CAMERA DOLLY
     ============================================================ */
  const canvas = document.getElementById('webglCanvas');
  let scene, camera, renderer, sculpture, sculptureMaterial;
  let wireframeMode = false;

  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  function initThree() {
    if (!canvas || typeof THREE === 'undefined') return;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.04);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lighting for Liquid Chrome Reflections
    const ambientLight = new THREE.AmbientLight(0x222226, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4d4d8, 3.0);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 20);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Procedural reflective environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Create 3D Liquid Chrome Torus Knot
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.48, 160, 32, 2, 3);
    
    sculptureMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.96,
      roughness: 0.12,
      wireframe: false
    });

    sculpture = new THREE.Mesh(geometry, sculptureMaterial);
    sculpture.position.set(0, 0, 0);
    scene.add(sculpture);

    // Wireframe toggle button
    const wireframeBtn = document.getElementById('wireframeToggle');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        wireframeMode = !wireframeMode;
        sculptureMaterial.wireframe = wireframeMode;
        wireframeBtn.style.borderColor = wireframeMode ? '#ffffff' : 'rgba(255,255,255,0.08)';
        showToast(wireframeMode ? '3D Wireframe Mesh Enabled' : '3D Liquid Chrome Surface Restored');
      });
    }

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    animateThree();
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(e) {
    mouseX = (e.clientX - windowHalfX) * 0.001;
    mouseY = (e.clientY - windowHalfY) * 0.001;
  }

  function animateThree() {
    requestAnimationFrame(animateThree);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    if (sculpture) {
      // Continuous liquid motion
      sculpture.rotation.x += 0.004 + targetY * 0.02;
      sculpture.rotation.y += 0.006 + targetX * 0.02;

      // Dynamic Scroll Morphing: Update position, scale, and camera depth based on scroll progress
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / (docHeight || 1), 0), 1);

      // Chapter-based interpolation
      if (progress < 0.25) {
        // Hero stage: Center, prominent
        const p = progress / 0.25;
        sculpture.position.x = 0;
        sculpture.position.y = 0;
        sculpture.position.z = -1.2 * p;
        sculpture.scale.setScalar(1 - p * 0.2);
      } else if (progress < 0.5) {
        // Manifesto stage: Shifts right to frame quote
        const p = (progress - 0.25) / 0.25;
        sculpture.position.x = THREE.MathUtils.lerp(0, 2.2, p);
        sculpture.position.y = THREE.MathUtils.lerp(0, 0.5, p);
        sculpture.position.z = THREE.MathUtils.lerp(-1.2, -2.5, p);
        sculpture.scale.setScalar(THREE.MathUtils.lerp(0.8, 0.65, p));
      } else if (progress < 0.75) {
        // Arsenal stage: Shifts left behind Bento cards
        const p = (progress - 0.5) / 0.25;
        sculpture.position.x = THREE.MathUtils.lerp(2.2, -2.5, p);
        sculpture.position.y = THREE.MathUtils.lerp(0.5, -0.3, p);
        sculpture.position.z = THREE.MathUtils.lerp(-2.5, -3.2, p);
        sculpture.scale.setScalar(THREE.MathUtils.lerp(0.65, 0.55, p));
      } else {
        // Works & Contact: Moves to lower center
        const p = (progress - 0.75) / 0.25;
        sculpture.position.x = THREE.MathUtils.lerp(-2.5, 0, p);
        sculpture.position.y = THREE.MathUtils.lerp(-0.3, -1.8, p);
        sculpture.position.z = THREE.MathUtils.lerp(-3.2, -1.8, p);
        sculpture.scale.setScalar(THREE.MathUtils.lerp(0.55, 0.7, p));
      }
    }

    renderer.render(scene, camera);
  }

  initThree();


  /* ============================================================
     5. SCROLL-DRIVEN STRUCTURE MORPH & SCRUB HIGHLIGHT
     ============================================================ */
  const meterBar = document.getElementById('scrollMeterBar');
  const meterPercent = document.getElementById('scrollMeterPercent');
  const navItems = document.querySelectorAll('.nav-item');
  const chapters = document.querySelectorAll('.chapter-section');
  const vectorPaths = document.querySelectorAll('.draw-path');
  const spatialBadges = document.querySelectorAll('.spatial-badge');

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const totalProgress = Math.min(Math.max(scrollY / (docHeight || 1), 0), 1);

    // 1. Update Scroll Meter
    if (meterBar) meterBar.style.height = `${(totalProgress * 100).toFixed(0)}%`;
    if (meterPercent) meterPercent.textContent = `${(totalProgress * 100).toFixed(0).padStart(2, '0')}%`;

    // 2. Parallax Spatial Badges
    spatialBadges.forEach(badge => {
      const speed = parseFloat(badge.getAttribute('data-speed')) || 1;
      badge.style.transform = `translateY(${scrollY * speed * -0.22}px)`;
    });

    // 3. Highlight Current Chapter in Nav
    let currentChapterId = '';
    chapters.forEach(chap => {
      const top = chap.offsetTop - 300;
      const height = chap.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentChapterId = chap.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentChapterId}`) {
        item.classList.add('active');
      }
    });

    // 4. Word-by-Word Scrub Highlight in Manifesto
    const manifestoSec = document.getElementById('manifesto');
    if (manifestoSec && wordSpans.length > 0) {
      const rect = manifestoSec.getBoundingClientRect();
      const secProgress = Math.min(Math.max((window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.4), 0), 1);
      
      const wordsToHighlight = Math.floor(secProgress * wordSpans.length);
      wordSpans.forEach((span, i) => {
        if (i < wordsToHighlight) {
          span.classList.add('highlighted');
        } else {
          span.classList.remove('highlighted');
        }
      });

      // 5. Dynamic SVG Vector Path Drawing on Scroll
      vectorPaths.forEach(path => {
        const offset = Math.max(2000 - secProgress * 2000, 0);
        path.style.strokeDashoffset = offset;
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  /* ============================================================
     6. ARROW KEYS & SMOOTH CHAPTER JUMP
     ============================================================ */
  const chapterIds = ['hero', 'manifesto', 'arsenal', 'creations', 'contact'];
  let currentChapterIdx = 0;

  window.addEventListener('keydown', (e) => {
    // Only capture when not typing inside input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      if (currentChapterIdx < chapterIds.length - 1) {
        currentChapterIdx++;
        scrollToChapter(chapterIds[currentChapterIdx]);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      if (currentChapterIdx > 0) {
        currentChapterIdx--;
        scrollToChapter(chapterIds[currentChapterIdx]);
      }
    }
  });

  function scrollToChapter(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }


  /* ============================================================
     7. 3D INTERACTIVE CARD TILT ON MOUSE MOVE
     ============================================================ */
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -6;
      const rotY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });


  /* ============================================================
     8. MAGNETIC CURSOR SMOOTH LERP
     ============================================================ */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mX = -100, mY = -100;
    let rX = -100, rY = -100;

    window.addEventListener('mousemove', (e) => {
      mX = e.clientX;
      mY = e.clientY;
      cursorDot.style.left = `${mX}px`;
      cursorDot.style.top = `${mY}px`;
    });

    function loopCursor() {
      rX += (mX - rX) * 0.18;
      rY += (mY - rY) * 0.18;
      cursorRing.style.left = `${rX}px`;
      cursorRing.style.top = `${rY}px`;
      requestAnimationFrame(loopCursor);
    }
    loopCursor();

    const interactives = document.querySelectorAll('a, button, input, textarea, .bento-card, .work-card, .contact-pill-card, .filter-chip');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '52px';
        cursorRing.style.height = '52px';
        cursorRing.style.borderColor = '#ffffff';
        cursorRing.style.background = 'rgba(255, 255, 255, 0.08)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '32px';
        cursorRing.style.height = '32px';
        cursorRing.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        cursorRing.style.background = 'transparent';
      });
    });
  }


  /* ============================================================
     9. WORKS FILTERING
     ============================================================ */
  const filterChips = document.querySelectorAll('.filter-chip');
  const workCards = document.querySelectorAll('.work-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      workCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ============================================================
     10. REAL-TIME MULTAN PKT CLOCK
     ============================================================ */
  const clock = document.getElementById('livePktClock');
  function refreshClock() {
    if (!clock) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Karachi',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clock.textContent = `${now.toLocaleTimeString('en-US', options)} PKT [UTC+5]`;
  }
  setInterval(refreshClock, 1000);
  refreshClock();

});


/* ============================================================
   11. SPEC MODAL CONTROLLER & DATA
   ============================================================ */
const projectSpecs = {
  1: {
    tag: '// ARCHITECTURE BLUEPRINT: EXP_01',
    title: 'CYBERSECURITY TOOLS & AUDIT SUITE',
    body: `
      <p style="margin-bottom: 12px; color: #fff;"><strong>Core Architecture:</strong> High-reliability Python and SQLite security auditing framework engineered for password entropy evaluation, network socket auditing, and phishing URL classification.</p>
      <div style="background: rgba(255, 255, 255, 0.04); border-left: 2px solid #ffffff; padding: 14px; margin-bottom: 16px; border-radius: 4px;">
        <strong style="color: #fff;">Engineering Highlights:</strong>
        <ul style="padding-left: 20px; margin-top: 6px; font-size: 0.9rem;">
          <li>Multi-threaded localhost and target network port scanner utilizing raw socket connections.</li>
          <li>Entropy calculation and cryptographic hash breach auditing in password_checker.py.</li>
          <li>Domain heuristic analyzer profiling malicious redirects and suspicious URL structures.</li>
          <li>Relational SQLite logging module persisting scan telemetry and vulnerability reports.</li>
        </ul>
      </div>
      <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim);">TECH: Python 3, SQLite3, Sockets, Hashlib, RegEx, Security Auditing.</p>
    `,
    repo: 'https://github.com/muhammadfarhaiqbal/cybersecurity-tools'
  },
  2: {
    tag: '// ARCHITECTURE BLUEPRINT: EXP_02',
    title: 'FARHANIQBAL.LIVE // 3D SPATIAL WEBGL ENGINE',
    body: `
      <p style="margin-bottom: 12px; color: #fff;"><strong>Core Architecture:</strong> High-performance personal web platform utilizing Three.js WebGL rendering, custom liquid chrome PBR shaders, dynamic wireframe mode switching, and dual special edition routing.</p>
      <div style="background: rgba(255, 255, 255, 0.04); border-left: 2px solid #ffffff; padding: 14px; margin-bottom: 16px; border-radius: 4px;">
        <strong style="color: #fff;">Engineering Highlights:</strong>
        <ul style="padding-left: 20px; margin-top: 6px; font-size: 0.9rem;">
          <li>Real-time 3D metallic Torus Knot sculpture with velocity-reactive gyro damping.</li>
          <li>Dynamic wireframe mesh switcher triggered via top HUD navigation.</li>
          <li>Apple-style word-by-word scroll scrub illumination in the Manifesto chapter.</li>
          <li>Automated GitHub Pages deployment mapped with Hostinger custom DNS records.</li>
        </ul>
      </div>
      <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim);">TECH: Three.js, WebGL, JavaScript, CSS3 Chrome Gradients, GitHub Pages API.</p>
    `,
    repo: 'https://github.com/muhammadfarhaiqbal/farhaniqbal.live'
  },
  3: {
    tag: '// ARCHITECTURE BLUEPRINT: EXP_03',
    title: 'CREATIVE DEVELOPER PORTFOLIO ENGINE',
    body: `
      <p style="margin-bottom: 12px; color: #fff;"><strong>Core Architecture:</strong> Lightweight front-end personal developer engine engineered with HTML5 Canvas particle systems, mouse reactive physics, and modern CSS3 layout architecture.</p>
      <div style="background: rgba(255, 255, 255, 0.04); border-left: 2px solid #ffffff; padding: 14px; margin-bottom: 16px; border-radius: 4px;">
        <strong style="color: #fff;">Engineering Highlights:</strong>
        <ul style="padding-left: 20px; margin-top: 6px; font-size: 0.9rem;">
          <li>Custom particle canvas rendering with velocity vectors and proximity connections.</li>
          <li>Staggered CSS3 transition animations and active scroll tracking.</li>
          <li>Pure zero-framework architecture yielding sub-100ms first contentful paint.</li>
        </ul>
      </div>
      <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim);">TECH: HTML5, CSS3 Grid/Flexbox, JavaScript ES6+, HTML5 Canvas API.</p>
    `,
    repo: 'https://github.com/muhammadfarhaiqbal/portfolio'
  },
  4: {
    tag: '// ARCHITECTURE BLUEPRINT: EXP_04',
    title: 'C++ STUDENT RECORD SYSTEM & OOP FOUNDATIONS',
    body: `
      <p style="margin-bottom: 12px; color: #fff;"><strong>Core Architecture:</strong> Robust console software engineered in C++ utilizing object-oriented principles, binary file stream I/O for data persistence, dynamic student record indexing, and algorithmic grade sorting.</p>
      <div style="background: rgba(255, 255, 255, 0.04); border-left: 2px solid #ffffff; padding: 14px; margin-bottom: 16px; border-radius: 4px;">
        <strong style="color: #fff;">Engineering Highlights:</strong>
        <ul style="padding-left: 20px; margin-top: 6px; font-size: 0.9rem;">
          <li>Encapsulated student classes with constructors, accessors, and memory pointers.</li>
          <li>Binary file persistence using fstream (ifstream/ofstream) preventing data corruption.</li>
          <li>Algorithmic binary search and sorting routines for rapid record indexing.</li>
        </ul>
      </div>
      <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim);">TECH: C++, OOP, Binary File I/O, Data Structures, Algorithms.</p>
    `,
    repo: 'https://github.com/muhammadfarhaiqbal'
  }
};

function openSpecModal(id) {
  const modal = document.getElementById('specModal');
  const spec = projectSpecs[id];
  if (!modal || !spec) return;

  document.getElementById('specTag').textContent = spec.tag;
  document.getElementById('specTitle').textContent = spec.title;
  document.getElementById('specBody').innerHTML = spec.body;
  document.getElementById('specRepo').href = spec.repo;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSpecModal(e) {
  const modal = document.getElementById('specModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSpecModal();
});


/* ============================================================
   12. FORM & CLIPBOARD DISPATCH
   ============================================================ */
function handleCapsuleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('capName').value.trim();
  const email = document.getElementById('capEmail').value.trim();
  const message = document.getElementById('capMessage').value.trim();

  const formattedMsg = `*Transmission from Farhan's Portfolio*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;
  const whatsappUrl = `https://wa.me/923126823078?text=${formattedMsg}`;

  showToast('Opening Direct WhatsApp Dispatch...');
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 400);

  e.target.reset();
}

function copyContact(text, msg = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg);
  }).catch(() => {
    const tmp = document.createElement('input');
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    showToast(msg);
  });
}

function showToast(msg) {
  const toast = document.getElementById('luxuryToast');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
