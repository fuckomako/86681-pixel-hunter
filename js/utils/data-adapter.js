export default (data) => {
  const adapted = [];

  const dataMapper = {
    category: {
      'tinder-like': `classify`,
      'two-of-two': `classify`,
      'one-of-three': `choose`
    },
    inner: {
      'tinder-like': `game__content  game__content--wide`,
      'two-of-two': `game__content`,
      'one-of-three': `game__content game__content--triple`
    },
    answerClass: {
      'painting': `paint`,
      'photo': `photo`
    }
  };

  data.forEach((it) => {
    const question = {
      type: it.type,
      description: it.question,
      category: dataMapper.category[it.type],
      inner: dataMapper.inner[it.type],
      answers: [...it.answers].map((answer) => {
        return {
          class: dataMapper.answerClass[answer.type],
          src: answer.image.url,
          width: answer.image.width,
          height: answer.image.height
        };
      })
    };

    adapted.push(question);
  });

  return adapted;
};
