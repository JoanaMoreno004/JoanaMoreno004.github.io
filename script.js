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

// Aguarda que todo o conteúdo HTML seja carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

  // PRÉ-VISUALIZAÇÃO DOS PROJETOS AO PASSAR O RATO POR CIMA

  // Obtém a área onde a pré-visualização vai aparecer
  const preview = document.getElementById('project-preview');

  // Seleciona todos os links dentro da linha de projetos que têm a classe BaleteTypo
  const titles = document.querySelectorAll('.project-row .BaleteTypo a');

  // Verifica se a área de pré-visualização e os links existem
  if (preview && titles.length > 0) {

    // Para cada link de projeto adiciona eventos de rato
    titles.forEach(link => {

      // Quando o rato entra em cima do link
      link.addEventListener('mouseenter', function(e) {
        // Encontra o elemento do projeto mais próximo (pai)
        const project = link.closest('.project');

        // Pega o caminho para a pré-visualização (imagem ou vídeo) do atributo data-preview
        const src = project.getAttribute('data-preview');

        // Se o caminho existir e não for só reticências
        if (src && src !== "...") {
          // Se for vídeo, cria uma tag video com autoplay, loop e mute
          if (src.endsWith('.mp4')) {
            preview.innerHTML = `<video src="${src}" autoplay loop muted></video>`;
          } else {
            // Se não, mostra uma imagem
            preview.innerHTML = `<img src="${src}" alt="Project preview">`;
          }
          // Torna a área de pré-visualização visível
          preview.classList.add('active');
        }
      });

      // Quando o rato sai do link
      link.addEventListener('mouseleave', function(e) {
        // Remove a classe que mostra a pré-visualização (esconde)
        preview.classList.remove('active');

        // Após 200ms, se a pré-visualização ainda estiver escondida, limpa o conteúdo
        setTimeout(() => {
          if (!preview.classList.contains('active')) preview.innerHTML = '';
        }, 200);
      });
    });
  }

  // ANIMAÇÃO DAS FOTOS NA PÁGINA "ABOUT" (APENAS PARA DESKTOP)

  // Seleciona o container da pilha de fotos
  const photoStack = document.querySelector('.photo-stack');

  if (photoStack) {
    // Seleciona todas as fotos dentro da pilha
    const photos = Array.from(photoStack.querySelectorAll('.photo'));

    // Posições e transformações pré-definidas para o desktop
    const desktopPositions = [
      { x: 78,  y: 70,  rotation: -10, scale: 0.71 },
      { x: 675, y: 160, rotation: 7,  scale: 0.73 },
      { x: 330, y: 240, rotation: -2, scale: 0.73 },
      { x: 420, y: -30, rotation: 5,  scale: 0.71 },
    ];

    // Define as posições a usar (aqui só desktop)
    let positionsToUse = desktopPositions;

    const revealDistance = 400; // Distância do scroll para revelar cada foto
    let scrollPosition = 0; // Posição inicial do scroll
    const minScroll = 0; // Limite mínimo do scroll
    const maxScroll = revealDistance * photos.length; // Limite máximo do scroll

    // Função para atualizar a posição e transformação das fotos conforme o scroll
    function updatePhotosOnScroll() {
      photos.forEach((photo, i) => {
        // Obtém a posição e transformação definida para a foto
        const pos = positionsToUse[i] || positionsToUse[positionsToUse.length - 1] || { x: 0, y: 0, rotation: 0, scale: 1 };
        const start = i * revealDistance; // Ponto onde a foto começa a aparecer
        const end = start + revealDistance; // Ponto onde a foto está totalmente revelada
        const rotation = pos.rotation !== undefined ? pos.rotation : 0; // Rotação
        const scale = pos.scale !== undefined ? pos.scale : 1; // Escala

        // Se ainda não é tempo da foto aparecer (scroll antes do início)
        if (scrollPosition <= start) {
          photo.style.transform = `translate(${pos.x}px, 100vh) rotate(${rotation}deg) scale(${scale})`;
        }
        // Se já passou o ponto final, foto está na posição final
        else if (scrollPosition >= end) {
          photo.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${rotation}deg) scale(${scale})`;
        }
        // Durante o movimento de transição (scroll entre início e fim)
        else {
          const progress = (scrollPosition - start) / revealDistance;
          const targetY = (1 - progress) * window.innerHeight + progress * pos.y;
          photo.style.transform = `translate(${pos.x}px, ${targetY}px) rotate(${rotation}deg) scale(${scale})`;
        }
      });
    }

    // Atualiza as posições ao redimensionar a janela
    window.addEventListener('resize', () => {
      positionsToUse = desktopPositions;
      updatePhotosOnScroll();
    });

    // Atualiza a posição das fotos ao fazer scroll com o rato
    window.addEventListener('wheel', function(e) {
      scrollPosition += e.deltaY;
      // Limita o scroll entre mínimo e máximo
      scrollPosition = Math.max(minScroll, Math.min(maxScroll, scrollPosition));
      updatePhotosOnScroll();
      e.preventDefault(); // Impede o scroll normal da página
    }, { passive: false });

    // Controla o scroll via teclado (setas e page up/down)
    window.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        scrollPosition += 60;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        scrollPosition -= 60;
      }
      // Limita a posição do scroll
      scrollPosition = Math.max(minScroll, Math.min(maxScroll, scrollPosition));
      updatePhotosOnScroll();
    });

    // Inicializa a posição das fotos ao carregar a página
    updatePhotosOnScroll();
  }
});


// COPIAR EMAIL - BOTÃO "COPY EMAIL"

// Variáveis para guardar elementos e input temporário
let email_container_element, email_a_element, email_button_element;
let temp_input;

// Função de configuração inicial (usa p5.js)
function setup() {
  noCanvas(); // Remove o canvas criado por padrão pelo p5.js

  // Seleciona o container onde o email está
  email_container_element = select("#email_container");

  // Seleciona o link do email
  email_a_element = select("#email");

  // Cria um botão com o texto "Copy Email"
  email_button_element = createButton("Copy Email");

  // Coloca o botão dentro do container do email
  email_button_element.parent(email_container_element);

  // Esconde o botão inicialmente
  email_button_element.hide();

  // Adiciona ação ao clicar no botão para copiar o email
  email_button_element.mousePressed(copyEmail);
}

// Função que copia o email para a área de transferência
function copyEmail() {
  // Cria um input temporário para facilitar a cópia
  temp_input = createInput();

  // Adiciona o input temporário dentro do container
  temp_input.parent(email_container_element);

  // Coloca o texto do email dentro do input
  temp_input.value(email_a_element.html());

  // Tenta usar a API moderna de clipboard para copiar
  try {
    navigator.clipboard.writeText(temp_input.elt.select())
      .then(() => {
        temp_input.remove(); // Remove input temporário
        email_button_element.hide(); // Esconde botão após copiar
        console.log("Email copiado para a área de transferência (Clipboard API)");
      })
      .catch(err => {
        console.error("Erro com a Clipboard API: ", err);
        copyEmailFallback(); // Se falhar, usa método antigo
      });
  } catch (err) {
    console.error("Erro com a Clipboard API: ", err);
    copyEmailFallback(); // Se falhar, usa método antigo
  }
}

// Método alternativo para copiar caso a API moderna falhe
function copyEmailFallback() {
  temp_input.elt.select(); // Seleciona o texto no input temporário
  document.execCommand('copy'); // Executa o comando de cópia antigo
  temp_input.remove(); // Remove o input temporário
  email_button_element.hide(); // Esconde o botão
  console.log("Email copiado para a área de transferência");
}

// Mostra o botão "Copy Email"
function showEmailButton() {
  email_button_element.show();
}

// Esconde o botão "Copy Email"
function hideEmailButton() {
  email_button_element.hide();
}

