// Fade-in effect for scenes
const scenes = document.querySelectorAll('.scene-card, .song-card');

function revealScenes() {
  const triggerBottom = window.innerHeight * 0.9;

  scenes.forEach(scene => {
    const sceneTop = scene.getBoundingClientRect().top;

    if(sceneTop < triggerBottom) {
      scene.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealScenes);
revealScenes();
