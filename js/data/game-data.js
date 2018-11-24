export const NUMBER_OF_GAMES = 10;

const pictures = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const gameTypeData = {
  oneImage: {
    description: `Угадай, фото или рисунок?`,
    images: 1,
    params: [
      {
        index: 1,
        type: `paint`,
        src: pictures.paintings[0]
      }
    ]
  },

  twoImages: {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    images: 2,
    params: [
      {
        index: 1,
        type: `paint`,
        src: pictures.paintings[1]
      },

      {
        index: 2,
        type: `photo`,
        src: pictures.photos[0]
      }
    ]
  },

  threeImages: {
    description: `Найдите рисунок среди изображений`,
    images: 3,
    params: [
      {
        index: 1,
        type: `paint`,
        src: pictures.paintings[2]
      },

      {
        index: 2,
        type: `photo`,
        src: pictures.photos[1]
      },

      {
        index: 3,
        type: `photo`,
        src: pictures.photos[2]
      }
    ]
  }
};

// (массив из 10 рандомных типов игр)
export const getGameOrder = () => {
  const gameTypes = Object.keys(gameTypeData);

  const gameOrder = [];
  for (let i = 0; i < NUMBER_OF_GAMES; i++) {
    gameOrder[i] = gameTypes[Math.floor(Math.random() * (gameTypes.length))];
  }
  return gameOrder;
};


