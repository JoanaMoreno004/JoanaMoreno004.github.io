/*------------------------------
  Joana Moreno - Nº3220549  
  Data: 04/05/2025
  Nome do Exercício: Website Portfólio  
  Época de Avaliação: Contínua (Durante as aulas)  
  Ano Letivo: 3º Ano, 2024-2025  
  Semestre: 2º  
  Unidade Curricular: Laboratório de Projeto II  
  Curso: Design Gráfico e Multimédia (DGM)  
  Escola: Escola Superior de Artes e Design das Caldas da Rainha (ESAD.CR)  
  Docente: Marco Heleno
------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
  
  // PROJECT/WORK PREVIEW ON HOVER
  const preview = document.getElementById('project-preview');
  const titles = document.querySelectorAll('.project-row .BaleteTypo a');

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
        setTimeout(() => { 
          if (!preview.classList.contains('active')) preview.innerHTML = ''; 
        }, 200);
      });
    });
  }

  // SCROLL - ANIMAÇÃO DA STACK DAS FOTOS DA PÁGINA DO ABOUT (APENAS DESKTOP)
  const photoStack = document.querySelector('.photo-stack');
  if (photoStack) {
    const photos = Array.from(photoStack.querySelectorAll('.photo'));

    const desktopPositions = [
      { x: 85,  y: 90,  rotation: -10, scale: 0.8 },
      { x: 655, y: 160, rotation: -1,  scale: 0.85 },
      { x: 310, y: 250, rotation: 7,   scale: 0.85 },
      { x: 430, y: -40, rotation: 5,   scale: 0.75 },
    ];

    let positionsToUse = desktopPositions;

    const revealDistance = 400;
    let scrollPosition = revealDistance * photos.length; 
    const minScroll = 0;
    const maxScroll = revealDistance * photos.length;

    function updatePhotosOnScroll() {
      photos.forEach((photo, i) => {
        const pos = positionsToUse[i] || positionsToUse[positionsToUse.length - 1] || { x: 0, y: 0, rotation: 0, scale: 1 };
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

    window.addEventListener('resize', () => {
      positionsToUse = desktopPositions;
      updatePhotosOnScroll();
    });

    window.addEventListener('wheel', function(e) {
      scrollPosition += e.deltaY;
      scrollPosition = Math.max(minScroll, Math.min(maxScroll, scrollPosition));
      updatePhotosOnScroll();
      e.preventDefault();
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


// ABOUT COPY EMAIL BOTÃO //
let email_container_element, email_a_element, email_button_element;
let temp_input;

function setup() {
  noCanvas();

  email_container_element = select("#email_container");
  email_a_element = select("#email");

  email_button_element = createButton("Copy Email");
  email_button_element.parent(email_container_element);
  email_button_element.hide();
  email_button_element.mousePressed(copyEmail);
}

function copyEmail() {
  temp_input = createInput();
  temp_input.parent(email_container_element);
  temp_input.value(email_a_element.html());

  try {
    navigator.clipboard.writeText(temp_input.elt.select())
      .then(() => {
        temp_input.remove();
        email_button_element.hide();
        console.log("Email copied to clipboard (Clipboard API)");
      })
      .catch(err => {
        console.error("Clipboard API failed: ", err);
        copyEmailFallback();
      });
  } catch (err) {
    console.error("Clipboard API failed: ", err);
    copyEmailFallback();
  }
}

function copyEmailFallback() {
  temp_input.elt.select();
  document.execCommand('copy');
  temp_input.remove();
  email_button_element.hide();
  console.log("Email copied to clipboard");
}

function showEmailButton() {
  email_button_element.show();
}

function hideEmailButton() {
  email_button_element.hide();
}
