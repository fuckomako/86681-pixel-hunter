import adaptServerData from './data-adapter';
import resizeImage from './resize';
import {checkStatus, loadImage} from './loader-utils';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `test`;
const APP_ID = 666666;

export default class Loader {
  static async loadData() {
    try {
      const response = await fetch(`${SERVER_URL}/questions`);
      checkStatus(response);
      const data = await response.json();
      return adaptServerData(data);
    } catch (error) {
      throw new Error(`Ошибка загрузки вопросов`);
    }
  }

  static preloadImages(data) {
    const promises = [];

    data.forEach((question) => {
      const answers = question.answers;

      answers.forEach((answer) => {
        promises.push(loadImage(answer.src)
            .then((image) => {

              const imageFrameSize = {
                width: answer.width,
                height: answer.height
              };
              const imageNaturalSize = {
                width: image.naturalWidth,
                height: image.naturalHeight
              };

              const imageOptimizedSize = resizeImage(imageFrameSize, imageNaturalSize);

              image.width = imageOptimizedSize.width;
              image.height = imageOptimizedSize.height;

              return image;
            })
        );
      });
    });
    return Promise.all(promises);
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    checkStatus(response);
    return await response.json();
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    const result = {
      name,
      answers: data.answers,
      lives: data.lives
    };
    const requestSettings = {
      body: JSON.stringify(result),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings);
    return checkStatus(response);
  }
}
