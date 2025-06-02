function drawStarsToContext(ctx, width, height) {
  const starCount = 100;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function downloadCanvasScreenshot() {
  const ssCanvas = document.createElement('canvas');
  ssCanvas.width = 1080;
  ssCanvas.height = 1720;
  const ssCtx = ssCanvas.getContext('2d');

  // Draw star background
  drawStarsToContext(ssCtx, ssCanvas.width, ssCanvas.height);

  // Score (top-left)
  ssCtx.font = '100px StarJHol';
  ssCtx.fillStyle = '#00bfff';
  ssCtx.textAlign = 'center';
  ssCtx.shadowColor = '#00bfff';
  ssCtx.shadowBlur = 40;
  ssCtx.fillText(`SCoRE: ${score}`, ssCanvas.width / 2, 200);
  ssCtx.shadowBlur = 0;

  // its a trap
  ssCtx.font = 'bold 100px StarJHol';
  ssCtx.fillStyle = '#FFFF00';
  ssCtx.textAlign = 'center';
  ssCtx.fillText("it's a trap", ssCanvas.width / 2, 450);

  // Game Over title
  ssCtx.font = 'bold 100px StarJHol';
  ssCtx.fillStyle = '#FFFF00';
  ssCtx.textAlign = 'center';
  ssCtx.fillText('GAME oVER', ssCanvas.width / 2, 800);

  // Leaderboard title
  ssCtx.fillStyle = 'white';
  ssCtx.font = '24px Fira Code';
  const leaderboardStartY = 1000;
  const lineHeight = 50;
  ssCtx.fillText('NAME -- SCORE -- PERFECT', ssCanvas.width / 2, leaderboardStartY);

  // Get and draw leaderboard
  fetch('https://script.google.com/macros/s/AKfycbwSGIUcgYBeRcizkoCW4moD9xiJeEb1aeTh31V1HN9eIoaxmLG9ynwsT3zMYso1emLB/exec')
    .then(res => res.json())
    .then(data => {
  const name = document.querySelector('input[type="text"]')?.value || 'player';
  const currentEntry = { name, score, perfect: perfectCount };

  const isDuplicate = data.some(e =>
    e.name === currentEntry.name &&
    e.score === currentEntry.score &&
    e.perfect === currentEntry.perfect
  );
  const extended = isDuplicate ? [...data] : [...data, currentEntry];
  extended.sort((a, b) => b.score - a.score);

      const playerIndex = extended.findIndex(e =>
        e.name === currentEntry.name &&
        e.score === currentEntry.score &&
        e.perfect === currentEntry.perfect
      );

      const lines = extended.slice(0, 3).map((e, i) =>
        `${i + 1}. ${e.name} -- ${e.score} -- ${e.perfect}`
      );

      if (playerIndex >= 3) {
        lines.push('.', '.');
        lines.push(`${playerIndex + 1}. ${currentEntry.name} -- ${currentEntry.score} -- ${currentEntry.perfect}`);
      }

      // Draw leaderboard lines
      ssCtx.font = '24px Fira Code';
      lines.forEach((line, i) => {
        ssCtx.fillText(line, ssCanvas.width / 2, leaderboardStartY + (i + 1) * lineHeight);
      });

      // Footer call-to-action
      ssCtx.font = '22px Fira Code';
 ssCtx.fillText("By Three and a Half", ssCanvas.width / 2, 530);
 ssCtx.fillText("Featuring Dave Sear", ssCanvas.width / 2, 560);
 ssCtx.fillText("Produced by Mono Eleven", ssCanvas.width / 2, 590);
 ssCtx.fillText("Mastered by Convolution", ssCanvas.width / 2, 620);
 ssCtx.fillText("Full Song release 12.07.2025", ssCanvas.width / 2, 1460);
      ssCtx.fillText("Upload score to your story and tag", ssCanvas.width / 2, 1520);
      ssCtx.fillText("@threeandahalf3.5 for a chance to win!", ssCanvas.width / 2, 1570);

      // Save the image
      const link = document.createElement('a');
      link.download = 'score_screenshot.png';
      link.href = ssCanvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Copy handle to clipboard
      navigator.clipboard.writeText('@threeandahalf3.5').catch(console.warn);
    })
    .catch(err => {
      console.error('Failed to generate screenshot', err);
    });
}


function showGameOverScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars(1);

  const scaleX = canvas.width / BASE_WIDTH;
  const scaleY = canvas.height / BASE_HEIGHT;
  const scale = Math.min(scaleX, scaleY);

  ctx.fillStyle = yellow;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.font = `bold ${48 * scale}px StarJHol`;
  ctx.fillText('Game over', canvas.width / 2, 100 * scale);

const gameOverText = 'Game over';
ctx.font = `bold ${48 * scale}px StarJHol`;
const textMetrics = ctx.measureText(gameOverText);
const gameOverLeftX = (canvas.width / 2) - (textMetrics.width / 2);

drawLeaderboard(ctx, gameOverLeftX, 180 * scale, scale);

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Enter Name Here';
nameInput.maxLength = 20;
nameInput.style.position = 'absolute';
nameInput.style.left = `${gameOverLeftX}px`; // align with leaderboard left
nameInput.style.fontSize = `${16 * scale}px`;
nameInput.style.fontFamily = "'Fira Code', monospace";
nameInput.style.backgroundColor = 'black';
nameInput.style.color = 'white';
nameInput.style.border = '1px solid white';
nameInput.style.padding = '4px';
nameInput.style.zIndex = '10';
document.body.appendChild(nameInput);




  const playAgainButton = document.createElement('button');
  playAgainButton.style.position = 'absolute';
playAgainButton.textContent = 'Submit name and Play Again?';
  const yellowBottom = 250 * scale + 28 * scale;
  const whiteTop = 650 * scale;
  const midpoint = (yellowBottom + whiteTop) / 2;

  requestAnimationFrame(() => {
  const buttonHeight = playAgainButton.offsetHeight;
  const midpoint = (yellowBottom + whiteTop) / 2;
  playAgainButton.style.top = `${midpoint - buttonHeight / 2}px`;
});

  playAgainButton.style.left = '50%';
  playAgainButton.style.transform = 'translate(-50%, 0)';
  playAgainButton.style.fontSize = '24px';
  playAgainButton.style.padding = '10px 20px';
  playAgainButton.style.color = '#FFFF00';
  playAgainButton.style.backgroundColor = 'black';
  playAgainButton.style.border = '2px solid #FFFF00';
  playAgainButton.style.zIndex = '10';
  playAgainButton.style.fontWeight = 'bold';
  document.body.appendChild(playAgainButton);

const promoLink = document.createElement('a');
promoLink.href = 'https://linktr.ee/three3.5andahalf';
promoLink.textContent = 'Click me - Socials';
promoLink.target = '_blank';

promoLink.style.position = 'absolute';
promoLink.style.left = '50%';
promoLink.style.transform = 'translateX(-50%)';
promoLink.style.top = `${canvas.height * 0.92}px`;

promoLink.style.fontFamily = "'StarJHol', Arial, sans-serif";
promoLink.style.fontSize = '24px';
promoLink.style.color = '#00bfff';
promoLink.style.textShadow = `
  0 0 5px #00bfff,
  0 0 10px #00bfff,
  0 0 20px #00bfff,
  0 0 40px #00aacc
`;
promoLink.style.animation = 'flicker 1.5s infinite';
promoLink.style.textDecoration = 'none';
promoLink.style.zIndex = '10';

document.body.appendChild(promoLink);
playAgainButton.addEventListener('click', () => {
  console.log('CLICKED - hiding button now');

  const inputEl = document.querySelector('input[type="text"]');
  playAgainButton.style.display = 'none';
  if (inputEl) inputEl.style.display = 'none';

  // ✅ Show loading animation BEFORE fetch
  const loadingText = document.createElement('div');
  loadingText.textContent = 'Loading';
  loadingText.style.position = 'absolute';
  loadingText.style.left = '50%';
  loadingText.style.top = playAgainButton.style.top || '50%';
  loadingText.style.transform = 'translate(-50%, 0)';
  loadingText.style.fontSize = '24px';
  loadingText.style.fontWeight = 'bold';
  loadingText.style.color = '#FFFF00';
  loadingText.id = 'endLoadingText';
  document.body.appendChild(loadingText);

  let dots = 0;
  const loadingInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.textContent = 'Loading' + '.'.repeat(dots);
  }, 500);

  // 👇 Then continue with fetch
  const name = inputEl?.value.trim() || 'Anonymous';
  fetch('https://script.google.com/macros/s/AKfycbwSGIUcgYBeRcizkoCW4moD9xiJeEb1aeTh31V1HN9eIoaxmLG9ynwsT3zMYso1emLB/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      score: score,
      perfect: perfectCount
    })
  })
.then(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      downloadCanvasScreenshot();

      const video = document.getElementById('trapVideo');
      video.style.position = 'absolute';
      video.style.top = '50%';
      video.style.left = '50%';
      video.style.transform = 'translate(-50%, -50%)';
      video.style.width = '80%';
      video.style.height = 'auto';
      video.style.zIndex = '100';
      video.style.display = 'none';
      video.style.backgroundColor = 'black';
      video.controls = false;

      video.addEventListener('canplaythrough', () => {
        clearInterval(loadingInterval);
        if (loadingText) document.body.removeChild(loadingText);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        video.style.display = 'block';
        video.play().catch(err => {
          console.error("Video playback failed:", err);
        });
      }, { once: true });

      video.currentTime = 0;
      video.load();

      video.onended = () => {
        video.style.display = 'none';
        location.reload();
      };
    }, 0);
  });
})
.catch(err => {
  console.error('Submission failed:', err);
  playAgainButton.textContent = 'Error';
});

})


  ctx.fillStyle = white;
  setSpaceFont(15 * scale);
  ctx.fillText("Click submit to be added to the leaderboard", canvas.width / 2, 530 * scale);
  ctx.fillText("and to automatically download score.png", canvas.width / 2, 550 * scale);
  ctx.fillText("and copy @threeandahalf3.5 to clipboard.", canvas.width / 2, 570 * scale);
  ctx.fillText("Share score,png to insta story and tag us", canvas.width / 2, 610 * scale);
  ctx.fillText("for a chance to win free merch!", canvas.width / 2, 630 * scale);
setSpaceFont(16 * scale);
// Random hint
const hints = [
  "Hint: You can tap anywhere on the lane, above or below the hitbox.",
  "Hint: Getting multiple perfect notes in a row gets you a multiplier.",
  "Hint: Try shaking your phone during a long note.",
  "Hint: Click on the spaceships."
];
const randomHint = hints[Math.floor(Math.random() * hints.length)];
ctx.font = `${12 * scale}px 'Fira Code', monospace`;
ctx.fillText(randomHint, canvas.width / 2, 690 * scale);



}

function drawLeaderboard(ctx, centerX, startY, scale) {
// 👇 Add loading text element for leaderboard
const leaderboardLoadingText = document.createElement('div');
leaderboardLoadingText.textContent = 'Leaderboard Loading';
leaderboardLoadingText.style.position = 'absolute';
leaderboardLoadingText.style.left = '50%';
leaderboardLoadingText.style.top = `${300 * scale}px`;
leaderboardLoadingText.style.transform = 'translate(-50%, 0)';
leaderboardLoadingText.style.fontSize = `${16 * scale}px`;
leaderboardLoadingText.style.fontFamily = "'Fira Code', monospace";
leaderboardLoadingText.style.fontWeight = 'normal';
leaderboardLoadingText.style.color = 'white';
leaderboardLoadingText.style.zIndex = '10';
leaderboardLoadingText.id = 'leaderboardLoadingText';
document.body.appendChild(leaderboardLoadingText);

// 👇 Add dot animation
let leaderboardDots = 0;
const leaderboardLoadingInterval = setInterval(() => {
  leaderboardDots = (leaderboardDots + 1) % 4;
  leaderboardLoadingText.textContent = 'Leaderboard Loading' + '.'.repeat(leaderboardDots);
}, 500);

  fetch('https://script.google.com/macros/s/AKfycbwSGIUcgYBeRcizkoCW4moD9xiJeEb1aeTh31V1HN9eIoaxmLG9ynwsT3zMYso1emLB/exec')
    .then(response => response.json())
    .then(data => {
      // Simulated current player entry (replace with real vars later)
      const inputEl = document.querySelector('input[type="text"]');
const currentPlayer = {
  name: '__INPUT__', // special marker to know this is the input
  score: score,
  perfect: perfectCount
};


      // Add to data, then re-sort
      const extended = [...data, currentPlayer];
      extended.sort((a, b) => b.score - a.score);

      // Find player position
      const playerIndex = extended.findIndex(entry =>
        entry.name === currentPlayer.name &&
        entry.score === currentPlayer.score &&
        entry.perfect === currentPlayer.perfect
      );

      // Get top 3 + current player (if not in top 3)
      const topEntries = extended.slice(0, 3);
      const isInTop = playerIndex < 3;
      const displayEntries = isInTop ? topEntries : [...topEntries, currentPlayer];
      const displayIndices = isInTop ? [0, 1, 2] : [0, 1, 2, playerIndex];
// ✅ Remove loading text now that leaderboard is ready
clearInterval(leaderboardLoadingInterval);
if (leaderboardLoadingText && leaderboardLoadingText.parentNode) {
  leaderboardLoadingText.parentNode.removeChild(leaderboardLoadingText);
}

      // Draw
      ctx.font = `${16 * scale}px 'Fira Code', monospace`; // smaller, no bold
ctx.textAlign = 'left';
ctx.fillStyle = 'white'; // white instead of yellow


      ctx.fillText('NAME -- SCORE -- PERFECT', centerX, startY);

      displayIndices.forEach((i, lineNum) => {
  // After top 3, insert separator before current player
  if (!isInTop && lineNum === 3) {
    ctx.fillText('.', centerX, startY + (30 * (lineNum + 1) * scale));
    ctx.fillText('.', centerX, startY + (30 * (lineNum + 2) * scale));
    lineNum += 2;
  }

  const entry = extended[i];
  const yPos = startY + (30 * (lineNum + 1) * scale);
const isInput = entry.name === '__INPUT__';
const rankText = `${i + 1}. `;
const scorePerfectText = ` -- ${entry.score} -- ${entry.perfect}`;

if (isInput && inputEl) {
  const nameFontSize = 16 * scale;
  const textWidth = ctx.measureText(rankText).width;

  // Adjust top for better vertical alignment (tweak this pixel value if needed)
  inputEl.style.top = `${yPos + nameFontSize }px`;


  inputEl.style.left = `${centerX + textWidth}px`;
  inputEl.style.width = `${160 * scale}px`;

  // Match styles to canvas font
  inputEl.style.position = 'absolute';
  inputEl.style.fontSize = `${nameFontSize}px`;
inputEl.style.lineHeight = `${nameFontSize}px`;

  inputEl.style.fontFamily = "'Fira Code', monospace";
  inputEl.style.backgroundColor = 'transparent';
  inputEl.style.color = 'white';
  inputEl.style.border = 'none';
  inputEl.style.padding = '0';
  inputEl.style.outline = 'none';
  inputEl.style.zIndex = '10';
  inputEl.style.letterSpacing = '0.5px'; // mimic canvas look

  // Add it to the DOM (only once)
  if (!document.body.contains(inputEl)) {
    document.body.appendChild(inputEl);
  }

  ctx.fillText(rankText, centerX, yPos);
  ctx.fillText(scorePerfectText, centerX + textWidth + 200 * scale, yPos);


}
 else {
  const line = `${i + 1}. ${entry.name} -- ${entry.score} -- ${entry.perfect}`;
  ctx.fillText(line, centerX, yPos);
}

});

    })
    .catch(error => {
      console.error('Leaderboard fetch failed:', error);
      ctx.fillText("Unable to load leaderboard", centerX, startY);
    });
}

