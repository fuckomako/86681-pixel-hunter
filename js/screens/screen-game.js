import {TimeLimits} from '../utils/constants';
import HeaderView from '../views/view-header';
import QuestionViewClassify from '../views/view-question-classify';
import QuestionViewChoose from '../views/view-question-choose';
import FooterView from '../views/view-footer';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;
    this.header = this.createHeaderView();
    this.content = this.createQuestionView();
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  createQuestionView() {
    const question = this.model.renewQuestionType();
    const questionType = question.category;

    const questionTypeMap = {
      'classify': new QuestionViewClassify(question, this.model.gameState),
      'choose': new QuestionViewChoose(question, this.model.gameState)
    };

    const questionView = questionTypeMap[questionType];

    questionView.onAnswer = (result) => {
      this.onAnswer(result);
      this.changeGameLevel();
    };

    return questionView;
  }

  createHeaderView() {
    const headerView = new HeaderView(this.model.gameState);
    headerView.onLogoClick = () => this.showModal();
    return headerView;
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.gameState.time <= 0) {
        this.onAnswer(false);
        this.changeGameLevel();
      }
      this.updateTimer();
    }, 1000);
  }

  clearTimer() {
    clearInterval(this._interval);
  }

  changeGameLevel() {
    this.clearTimer();
    this.model.nextLevel();

    if (this.model.isDead() || this.model.gameComplete()) {
      this.showNextScreen();
    } else {
      this.updateScreen();
    }
  }

  onAnswer(result) {
    let answer;
    const answerTime = TimeLimits.INITIAL_TIMER - this.model.gameState.time;
    const answerResult = result;

    if (answerResult) {
      if (answerTime < TimeLimits.QUICK_RESPONSE_TIMELIMIT) {
        answer = `fast`;
      } else if (answerTime > TimeLimits.SLOW_RESPONSE_TIMELIMIT) {
        answer = `slow`;
      } else {
        answer = `correct`;
      }
    } else {
      answer = `wrong`;
    }

    if (answer === `wrong`) {
      this.model.die();
    }

    this.model.gameState.answers.push(answer);
  }

  updateQuestion() {
    const nextQuestionView = this.createQuestionView();
    this.root.replaceChild(nextQuestionView.element, this.content.element);
    this.content = nextQuestionView;
  }

  updateTimer() {
    this.header.update(this.model.gameState.time);
  }

  updateScreen() {
    this.model.renewTimer();

    this.updateTimer();
    this.updateQuestion();

    this.startTimer();
  }

  showNextScreen() { }
  showModal() { }
}
