// script.js
const preview = document.getElementById('project-preview');
const projects = document.querySelectorAll('.project');

projects.forEach(project => {
  project.addEventListener('mouseenter', e => {
    const src = project.getAttribute('data-preview');
    if (src && src !== "...") {
      // Use <video> for .mp4, <img> otherwise
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
    // Offset so preview doesn't cover cursor
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
