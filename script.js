/* ========================================================
   Sahil Alam - Personal Portfolio Interactions
======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navigation Menu Toggle
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  // 2. Active Link Highlight On Scroll
  const sections = document.querySelectorAll('section[id]');
  const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const sectionsClass = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

      if (sectionsClass) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sectionsClass.classList.add('active-link');
        } else {
          sectionsClass.classList.remove('active-link');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActive);

  // 3. Header Shadow On Scroll
  const header = document.getElementById('header');
  const scrollHeader = () => {
    if (window.scrollY >= 50) {
      header.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', scrollHeader);

  // 4. Top Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  });

  // 5. Typing Animation (Hero Section)
  const words = ["Web Developer", "UI Designer", "Digital Creator"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  function typeEffect() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // 6. Scroll Reveal Observer
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealOnScroll.observe(el));

  // 7. Footer Scroll to Top
  const footerScrollBtn = document.getElementById('footer-scroll-top');
  if (footerScrollBtn) {
    footerScrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 8. Contact Form Live Submission (Formspree to Gmail)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formStatus.style.color = '#2563eb';
      formStatus.innerText = 'Sending message...';

      const data = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.color = '#10b981';
          formStatus.innerText = 'Shukriya! Aapka message direct mere email par receive ho gaya hai.';
          contactForm.reset();
        } else {
          formStatus.style.color = '#ef4444';
          formStatus.innerText = 'Kuch dikkat aayi, kripya direct WhatsApp par message karein.';
        }
      } catch (error) {
        formStatus.style.color = '#ef4444';
        formStatus.innerText = 'Network error. Kripya connection check karein.';
      }

      setTimeout(() => {
        formStatus.innerText = '';
      }, 6000);
    });
  }

});