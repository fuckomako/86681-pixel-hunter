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

export const questions = [
  {
    category: `oneImage`,
    description: `Угадай, фото или рисунок?`,
    images: 1,
    type: `classify`,
    inner: `game__content  game__content--wide`,
    params: [
      {
        index: 1,
        class: `paint`,
        src: pictures.paintings[0]
      }
    ]
  },

  {
    category: `twoImages`,
    description: `Угадайте для каждого изображения фото или рисунок?`,
    images: 2,
    type: `classify`,
    inner: `game__content`,
    params: [
      {
        index: 1,
        class: `paint`,
        src: pictures.paintings[1]
      },

      {
        index: 2,
        class: `photo`,
        src: pictures.photos[0]
      }
    ]
  },

  {
    category: `threeImagesPaint`,
    description: `Найдите рисунок среди изображений`,
    images: 3,
    type: `choose`,
    answerCorrect: `paint`,
    params: [
      {
        index: 1,
        class: `paint`,
        src: pictures.paintings[2]
      },

      {
        index: 2,
        class: `photo`,
        src: pictures.photos[1]
      },

      {
        index: 3,
        class: `photo`,
        src: pictures.photos[2]
      }
    ]
  },

  {
    category: `threeImagesPhoto`,
    description: `Найдите фотографию среди изображений`,
    images: 3,
    type: `choose`,
    answerCorrect: `photo`,
    params: [
      {
        index: 1,
        class: `paint`,
        src: pictures.paintings[0]
      },

      {
        index: 2,
        class: `paint`,
        src: pictures.paintings[1]
      },

      {
        index: 3,
        class: `photo`,
        src: pictures.photos[1]
      }
    ]
  }
];
