import AbstractView from './abstract-view';
import headerLogoTemplate from '../template/template-header-logo';
import footerTemplate from '../template/template-footer';
import flowStatsTemplate from '../template/template-stats';

export default class FinalStatsView extends AbstractView {
  constructor(finalResult, score) {
    super();
    this.finalResult = finalResult;
    this.score = score;
  }

  get template() {
    return `
    <header class="header">
    ${headerLogoTemplate}</header>
  <div class="result">
    <h1>${this.finalResult.lives > 0 ? `Победа` : `Поражение`}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2" class="result__indicators">
          ${flowStatsTemplate(this.finalResult)}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${this.score.correctAnswers.points}
        </td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.score.fastResponse.count}
        &nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.score.fastResponse.points}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.score.lives.count}
        &nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.score.lives.points}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this.score.slowResponse.count}
        &nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.score.slowResponse.points}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this.score.totalPoints}
        </td>
      </tr>
    </table>
  </div>
    ${footerTemplate}
    `;
  }

  onLogoClick() { }

  bind() {
    const logoBtn = this.element.querySelector(`.back`);
    logoBtn.addEventListener(`click`, () => {
      this.onLogoClick();
    });
  }
}
