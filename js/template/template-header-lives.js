const headerLivesTemplate = (gameStatus) =>
  `
  <div class="game__lives">
      ${new Array(3 - gameStatus.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Missed Life" width="31" height="27">`)
      .join(``)}
      ${new Array(gameStatus.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
  </div>
  `;

export default headerLivesTemplate;
