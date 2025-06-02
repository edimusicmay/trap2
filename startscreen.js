function setupStartButton() {
// Show loading animation before fonts load
const preloadLoadingText = document.createElement('div');
preloadLoadingText.textContent = 'Loading';
preloadLoadingText.style.position = 'absolute';
preloadLoadingText.style.left = '50%';
preloadLoadingText.style.top = '50%';
preloadLoadingText.style.transform = 'translate(-50%, -50%)';
preloadLoadingText.style.fontSize = '24px';
preloadLoadingText.style.fontWeight = 'bold';
preloadLoadingText.style.color = '#FFFF00';
preloadLoadingText.id = 'preloadLoadingText';
document.body.appendChild(preloadLoadingText);

let preloadDots = 0;
const preloadInterval = setInterval(() => {
  preloadDots = (preloadDots + 1) % 4;
  preloadLoadingText.textContent = 'Loading' + '.'.repeat(preloadDots);
}, 500);



  Promise.all([
    document.fonts.load("64px StarJHol"),
    document.fonts.load("32px StarJedi")
  ]).then(() => {
// Remove preload loader
clearInterval(preloadInterval);
document.body.removeChild(preloadLoadingText);

    drawStartScreen();

  // ✅ Now create the button
  const startButton = document.createElement('button');
  startButton.textContent = 'Start Game';
  startButton.style.position = 'absolute';
  startButton.style.left = '50%';
  startButton.style.transform = 'translateX(-50%)';
  startButton.style.fontSize = '24px';
  startButton.style.padding = '10px 20px';
  startButton.style.color = '#FFFF00';
  startButton.style.backgroundColor = 'black';
  startButton.style.border = '2px solid #FFFF00';
  startButton.style.zIndex = '10';
  startButton.style.fontWeight = 'bold';
  document.body.appendChild(startButton);

  startButton.addEventListener('click', () => {
    document.body.removeChild(startButton);

    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading';
    loadingText.style.position = 'absolute';
    loadingText.style.left = '50%';
    loadingText.style.transform = 'translateX(-50%)';
    loadingText.style.fontSize = '24px';
    loadingText.style.fontWeight = 'bold';
    loadingText.style.color = '#FFFF00';
    loadingText.style.top = startButton.style.top;
    loadingText.id = 'loadingText';
    document.body.appendChild(loadingText);

    let dots = 0;
    const loadingInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      loadingText.textContent = 'Loading' + '.'.repeat(dots);
    }, 500);

    startGame(() => {
      clearInterval(loadingInterval);
      document.body.removeChild(loadingText);
    });
  });

    const scaleX = canvas.width / BASE_WIDTH;
    const scaleY = canvas.height / BASE_HEIGHT;
    const scale = Math.min(scaleX, scaleY);
    const yellowBottom = 340 * scale + 28 * scale;
    const whiteTop = 520 * scale;
    const buttonTop = (yellowBottom + whiteTop) / 2;
    requestAnimationFrame(() => {
      const buttonHeight = startButton.offsetHeight;
      startButton.style.top = `${buttonTop - buttonHeight / 2}px`;
requestAnimationFrame(() => {
  const buttonHeight = startButton.offsetHeight;
  const actualTop = buttonTop - buttonHeight / 2;
  startButton.style.top = `${actualTop}px`;

  // ✅ Call leaderboard renderer AFTER button is placed
  const scale = Math.min(canvas.width / BASE_WIDTH, canvas.height / BASE_HEIGHT);
const belowWhiteTextY = 600 * scale; // Just below "Full song release"
drawStartScreenLeaderboard(belowWhiteTextY);

});

    });
  });
}

function drawStartScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars(1);

  const scaleX = canvas.width / BASE_WIDTH;
  const scaleY = canvas.height / BASE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  ctx.fillStyle = yellow;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.font = `${64 * scale}px StarJHol`;
  ctx.fillText("iT'S A TRAP", canvas.width / 2, 100 * scale);

  ctx.font = `bold ${36 * scale}px StarJedi`;
  ctx.fillText("", canvas.width / 2, 180 * scale);

  ctx.font = `bold ${28 * scale}px StarJedi`;
  ctx.fillText("By Three and a Half", canvas.width / 2, 220 * scale);
  ctx.fillText("Featuring Dave Sear", canvas.width / 2, 260 * scale);
  ctx.fillText("Produced by Mono Elekin", canvas.width / 2, 300 * scale);
  ctx.fillText("Mastered by Convolution", canvas.width / 2, 340 * scale);

  ctx.fillStyle = white;
  setSpaceFont(16 * scale);
  ctx.fillText("Highest score uploaded to insta story wins free merch!", canvas.width / 2, 500 * scale);
  ctx.fillText("Full song release: 12.07.2025", canvas.width / 2, 530 * scale);
  

}
function drawStartScreenLeaderboard(leaderboardStartY) {
  fetch('https://script.google.com/macros/s/AKfycbwSGIUcgYBeRcizkoCW4moD9xiJeEb1aeTh31V1HN9eIoaxmLG9ynwsT3zMYso1emLB/exec')
    .then(response => response.json())
    .then(data => {
      const scale = Math.min(canvas.width / BASE_WIDTH, canvas.height / BASE_HEIGHT);
      const leaderboardX = canvas.width / 2 - 180 * scale;
      const spacing = 24 * scale;
      const availableHeight = canvas.height - leaderboardStartY - 20 * scale;
      const maxLines = Math.floor(availableHeight / spacing);

      ctx.textAlign = 'left';
      ctx.font = `${16 * scale}px 'Fira Code', monospace`;
      ctx.fillStyle = 'white';
      const headerY = leaderboardStartY;
      ctx.fillText('NAME  --  SCORE  --  PERFECT', leaderboardX, headerY);

      const visibleEntries = Math.min(maxLines - 1, data.length);
      for (let i = 0; i < visibleEntries; i++) {
        const entry = data[i];
        const line = `${i + 1}. ${entry.name} -- ${entry.score} -- ${entry.perfect}`;
        ctx.fillText(line, leaderboardX, headerY + spacing * (i + 1));
      }
    })
    .catch(err => {
      console.error("Leaderboard fetch failed:", err);
    });
}

