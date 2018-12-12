export default (element) => {
  const correctAnswers = element.querySelectorAll(`.correct-answer`);
  correctAnswers.forEach((correctAnswer) => {
    correctAnswer.style.outline = `5px solid red`;
  });
};
