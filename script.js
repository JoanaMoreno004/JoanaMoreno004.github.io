document.addEventListener('DOMContentLoaded', function() {
  // === 1. PROJECT PREVIEW ON HOVER (Work Page, fixed at right) ===
  const preview = document.getElementById('project-preview');
  const titles = document.querySelectorAll('.project-row .distressed a');

  if (preview && titles.length > 0) {
    titles.forEach(link => {
      link.addEventListener('mouseenter', function(e) {
        const project = link.closest('.project');
        const src = project.getAttribute('data-preview');
        if (src && src !== "...") {
          if (src.endsWith('.mp4')) {
            preview.innerHTML = `<video src="${src}" autoplay loop muted></video>`;
          } else {
            preview.innerHTML = `<img src="${src}" alt="Project preview">`;
          }
          preview.classList.add('active');
        }
      });

      link.addEventListener('mouseleave', function(e) {
        preview.classList.remove('active');
        // Optionally clear content after fade-out:
        setTimeout(() => { 
          if (!preview.classList.contains('active')) preview.innerHTML = ''; 
        }, 200);
      });
    });
  }

  // SMOOTH SCROLL-JACKING PHOTO ANIMATION (About Page) 
  const photoStack = document.querySelector('.photo-stack');
  if (photoStack) {
    const photos = Array.from(photoStack.querySelectorAll('.photo'));
    const positions = [
      { x: 80,  y: 90, rotation: -10, scale: 0.8 },
      { x: 700, y: 200, rotation: 10, scale: 0.8 },
      { x: 330, y: 150, rotation: 5, scale: 0.85 },
      { x: 300, y: 390, rotation: -5, scale: 0.77 },
      { x: 490, y: -8, rotation: 5, scale: 0.75 },
      
    ];

    // Mobile composition (customize as you like!)
    const mobilePositions = [
      { x: 10,  y: 40,  rotation: -8, scale: 0.6 },
      { x: 70,  y: 120, rotation: 7,  scale: 0.6 },
      { x: 110, y: 30,  rotation: -4, scale: 0.55 },
      { x: 60,  y: 200, rotation: 5,  scale: 0.65 },
      { x: 130, y: 170, rotation: 8,  scale: 0.5 },
    ];9
    const revealDistance = 300;
    let scrollPosition = 0;
    const minScroll = 0;
    const maxScroll = revealDistance * photos.length;

    function updatePhotosOnScroll() {
      photos.forEach((photo, i) => {
        const pos = positions[i] || positions[positions.length - 1] || { x: 0, y: 0, rotation: 0, scale: 1 };
        const start = i * revealDistance;
        const end = start + revealDistance;
        const rotation = pos.rotation !== undefined ? pos.rotation : 0;
        const scale = pos.scale !== undefined ? pos.scale : 1;
        if (scrollPosition <= start) {
          photo.style.transform = `translate(${pos.x}px, 100vh) rotate(${rotation}deg) scale(${scale})`;
        } else if (scrollPosition >= end) {
          photo.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${rotation}deg) scale(${scale})`;
        } else {
          const progress = (scrollPosition - start) / revealDistance;
          const targetY = (1 - progress) * window.innerHeight + progress * pos.y;
          photo.style.transform = `translate(${pos.x}px, ${targetY}px) rotate(${rotation}deg) scale(${scale})`;
        }
      });
    }
    

    // Listen for wheel events to update scroll position directly
    window.addEventListener('wheel', function(e) {
      scrollPosition += e.deltaY;
      scrollPosition = Math.max(minScroll, Math.min(maxScroll, scrollPosition));
      updatePhotosOnScroll();
      e.preventDefault(); // Prevent normal scroll
    }, { passive: false });

  
    window.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        scrollPosition += 60;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        scrollPosition -= 60;
      }
      scrollPosition = Math.max(minScroll, Math.min(maxScroll, scrollPosition));
      updatePhotosOnScroll();
    });

    updatePhotosOnScroll();
  }
});
