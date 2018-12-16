import {TimeLimits} from '../utils/constants';
import HeaderView from '../views/header-view';
import QuestionViewClassify from '../views/question-classify-view';
import QuestionViewChoose from '../views/question-choose-view';
import FooterView from '../views/footer-view';

const TIMER_INTERVAL = 1000;
const BLINK_TIME = 5;

export default class GameScreen {
  constructor(model, debug = false) {
    this.model = model;
    this._interval = null;
    this._debug = debug;

    this.header = this.createHeaderView(this.model.gameState.time);
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

    questionView.onDebug(this._debug);

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
      if (this.model.gameState.time === BLINK_TIME) {
        this.header.blink(true);
      }
      if (!this.model.gameState.time) {
        this.onAnswer(false);
        this.changeGameLevel();
      } else {
        this.updateTimer();
      }
    }, TIMER_INTERVAL);
  }

  clearTimer() {
    clearInterval(this._interval);
    this.header.blink(false);
  }

  changeGameLevel() {
    this.clearTimer();
    this.header.blink(false);
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
    this.header.update(this.model.gameState.time, this.model.gameState.lives);
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
