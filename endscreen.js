function downloadCanvasScreenshot() {
  const dataURL = canvas.toDataURL('image/png');
  
  // Trigger image download
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'score_screenshot.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Copy Instagram handle
  navigator.clipboard.writeText('@threeandahalf3.5').then(() => {
    console.log('Instagram handle copied to clipboard!');
  }).catch(err => {
    console.warn('Failed to copy Instagram handle:', err);
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
nameInput.placeholder = 'player';
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
playAgainButton.textContent = 'Play Again?';
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
  playAgainButton.style.display = 'none';

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

  const video = document.getElementById('trapVideo');
  // Setup before loading
video.style.position = 'absolute';
video.style.top = '50%';
video.style.left = '50%';
video.style.transform = 'translate(-50%, -50%)';
video.style.width = '80%';
video.style.height = 'auto';
video.style.zIndex = '100';
video.style.display = 'none'; // 🔄 Wait to show until canplaythrough
video.style.backgroundColor = 'black';
video.controls = false;
// Attach listener before setting currentTime or loading
video.addEventListener('canplaythrough', () => {
  clearInterval(loadingInterval);
  if (loadingText) document.body.removeChild(loadingText);
  if (promoLink) promoLink.remove();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  video.style.display = 'block';
  video.play().catch(err => {
    console.error("Video playback failed:", err);
  });
}, { once: true });

video.currentTime = 0;
video.load(); // Load AFTER listener is attached



  video.onended = () => {
    video.style.display = 'none';
    location.reload();
  };
});





  ctx.fillStyle = white;
  setSpaceFont(25 * scale);
  ctx.fillText("Upload screenshot of this page to your", canvas.width / 2, 550 * scale);
  ctx.fillText("insta story and tag us @threeandahalf3.5", canvas.width / 2, 580 * scale);
  ctx.fillText("for a chance to win free merch!", canvas.width / 2, 610 * scale);
setSpaceFont(16 * scale);
ctx.fillText("Click Submit button to copy Insta handle and download screenshot.", canvas.width / 2, 650 * scale);
// Random hint
const hints = [
  "Hint: You can tap anywhere on the lane, above or below the hitbox.",
  "Hint: Getting multiple perfect notes in a row gets you a multiplier.",
  "Hint: Try shaking your phone during a long note.",
  "Hint: Follow Three and a Half on Insta/Youtube for a free sticker at their next show."
];
const randomHint = hints[Math.floor(Math.random() * hints.length)];
ctx.font = `${12 * scale}px 'Fira Code', monospace`;
ctx.fillText(randomHint, canvas.width / 2, 690 * scale);



}

function drawLeaderboard(ctx, centerX, startY, scale) {
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

// Create Submit Button
const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.style.position = 'absolute';
const buttonWidth = 80 * scale; // approximate width of the button
submitButton.style.left = `${centerX - (buttonWidth * 1.5)}px`; // align right edge with leaderboard start
submitButton.style.width = `${buttonWidth}px`; // ensure button has this width
submitButton.style.top = `${yPos + nameFontSize}px`;
submitButton.style.lineHeight = `${nameFontSize}px`;
submitButton.style.height = `${nameFontSize*1.5}px`; // tweak for balance
submitButton.style.fontSize = `${nameFontSize}px`;
submitButton.style.fontFamily = "'Fira Code', monospace";
submitButton.style.backgroundColor = 'black';
submitButton.style.color = '#00bfff';
submitButton.style.border = '2px solid #00bfff';
submitButton.style.textShadow = `
  0 0 5px #00bfff,
  0 0 10px #00bfff,
  0 0 20px #00bfff,
  0 0 40px #00aacc
`;
submitButton.style.animation = 'flicker 1.5s infinite';

submitButton.style.padding = '2px 6px';
submitButton.style.zIndex = '10';
submitButton.style.cursor = 'pointer';

submitButton.onclick = () => {
  const name = inputEl.value.trim() || 'Anonymous';

  fetch('https://script.google.com/macros/s/AKfycbwSGIUcgYBeRcizkoCW4moD9xiJeEb1aeTh31V1HN9eIoaxmLG9ynwsT3zMYso1emLB/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      score: currentPlayer.score,
      perfect: currentPlayer.perfect
    })
  })
  .then(() => {
    downloadCanvasScreenshot(); // <-- This runs first

    console.log('Submitted!');
    submitButton.disabled = true;
    if (inputEl) inputEl.style.display = 'none';
    if (submitButton) submitButton.style.display = 'none';

// Show loading animation
const loadingText = document.createElement('div');
loadingText.textContent = 'Loading';
loadingText.style.position = 'absolute';
loadingText.style.left = '50%';
loadingText.style.top = '50%';
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

// Prepare and play the video
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

  submitButton.textContent = '✓';
})
.catch(err => {
  console.error('Submission failed:', err);
  submitButton.textContent = 'Error';
});

};

if (!document.body.contains(submitButton)) {
  document.body.appendChild(submitButton);
}

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

