import AbstractView from './abstract-view';
import statsBarTemplate from '../templates/template-stats-bar';
import getScore from '../utils/get-score';

export default class StatsView extends AbstractView {
  constructor(data) {
    super();
    this.data = data.reverse();
    this.title = this.data[0].lives >= 0 ? `Победа!` : `Проигрыш :(`;
  }

  get template() {
    return `
    <section class="result">
      <h1>${this.title}</h1>
      ${[...this.data].map((gameResult, gameIndex) => StatsView.gameStats(gameResult, gameIndex + 1)).join(``)}
    </section>
    `;
  }

  static gameStats(gameResult, gameIndex) {
    const score = getScore(gameResult.answers, gameResult.lives);

    if (gameResult.lives >= 0) {
      return `
      <table class="result__table">
        <tr>
          <td class="result__number">${gameIndex}.</td>
          <td colspan="2">
          ${statsBarTemplate(gameResult.answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${score.correctAnswers.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${score.fastResponse.count}
      &nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${score.fastResponse.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${score.lives.count}
          &nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${score.lives.points}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${score.slowResponse.count}
          &nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${score.slowResponse.points}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${score.totalScore}</td>
        </tr>
      </table>
      `;
    }
    return `
    <table class="result__table">
      <tr>
        <td class="result__number">${gameIndex}.</td>
        <td>
        ${statsBarTemplate(gameResult.answers)}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
      `;
  }
}
