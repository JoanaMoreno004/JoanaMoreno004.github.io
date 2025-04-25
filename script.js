document.addEventListener('DOMContentLoaded', function() {
  // === 1. PROJECT PREVIEW ON HOVER (Work Page) ===
  const preview = document.getElementById('project-preview');
  const projects = document.querySelectorAll('.project');

  if (preview && projects.length > 0) {
    projects.forEach(project => {
      project.addEventListener('mouseenter', e => {
        const src = project.getAttribute('data-preview');
        if (src && src !== "...") {
          if (src.endsWith('.mp4')) {
            preview.innerHTML = `<video src="${src}" autoplay loop muted></video>`;
          } else {
            preview.innerHTML = `<img src="${src}" alt="Project preview">`;
          }
          preview.classList.add('active');
          preview.style.display = 'block';
        }
      });

      project.addEventListener('mousemove', e => {
        const offsetX = 32;
        const offsetY = -40;
        preview.style.left = (e.clientX + offsetX) + 'px';
        preview.style.top = (e.clientY + offsetY) + 'px';
      });

      project.addEventListener('mouseleave', () => {
        preview.classList.remove('active');
        preview.style.display = 'none';
        preview.innerHTML = '';
      });
    });
  }

  // === 2. SMOOTH SCROLL-JACKING PHOTO ANIMATION (About Page) ===
  const photoStack = document.querySelector('.photo-stack');
  if (photoStack) {
    const photos = Array.from(photoStack.querySelectorAll('.photo'));
    const positions = [
      { x: 60,  y: 400 },
      { x: 500, y: 320 },
      { x: 250, y: 120 },
      // Add more as needed, one per photo
    ];
    const revealDistance = 300;
    let scrollPosition = 0;
    const minScroll = 0;
    const maxScroll = revealDistance * photos.length;

    function updatePhotosOnScroll() {
      photos.forEach((photo, i) => {
        const start = i * revealDistance;
        const end = start + revealDistance;
        if (scrollPosition <= start) {
          // Off-screen
          photo.style.transform = `translate(${positions[i].x}px, 100vh)`;
        } else if (scrollPosition >= end) {
          // At landing position
          photo.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        } else {
          // In between: interpolate Y
          const progress = (scrollPosition - start) / revealDistance;
          const targetY = (1 - progress) * window.innerHeight + progress * positions[i].y;
          photo.style.transform = `translate(${positions[i].x}px, ${targetY}px)`;
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

    // Optional: Keyboard support
    window.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        scrollPosition += 60;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        scrollPosition -= 60;
      }
      scrollPosition = Math.max(minScroll, Math.min(maxScroll, scrollPosition));
      updatePhotosOnScroll();
    });

    // Initial render
    updatePhotosOnScroll();
  }
});