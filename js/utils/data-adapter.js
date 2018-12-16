export default (data) => {
  const adapted = [];

  data.forEach((it) => {
    const question = {

      type: it.type,

      description: it.question,

      get category() {
        if (this.type === `tinder-like` || this.type === `two-of-two`) {
          return `classify`;
        }
        if (this.type === `one-of-three`) {
          return `choose`;
        } else {
          return null;
        }
      },

      get inner() {
        if (this.type === `tinder-like`) {
          return `game__content  game__content--wide`;
        }
        if (this.type === `two-of-two`) {
          return `game__content`;
        }
        if (this.type === `one-of-three`) {
          return `game__content game__content--triple`;
        } else {
          return null;
        }
      },

      get answers() {
        return [...it.answers].map((answer) => {
          return {
            get class() {
              return answer.type === `painting` ? `paint` : answer.type;
            },
            src: answer.image.url
          };
        });
      }
    };

    adapted.push(question);
  });

  return adapted;
};
