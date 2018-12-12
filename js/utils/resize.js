export const resizeImage = (frame, given) => {
  const ratio = {
    byWidth: frame.width / given.width,
    byHeight: frame.height / given.height
  };
  const minRatio = Math.min(ratio.byWidth, ratio.byHeight);
  const optimized = {
    width: given.width * minRatio,
    height: given.height * minRatio
  };

  return optimized;
};

const onLoadImage = (image) => {

  image.parentNode.style.display = `block`;

  const frameSize = {
    width: image.parentNode.clientWidth,
    height: image.parentNode.clientHeight
  };

  const naturalSize = {
    width: image.naturalWidth,
    height: image.naturalHeight
  };

  const optimizedSize = resizeImage(frameSize, naturalSize);

  image.width = optimizedSize.width;
  image.height = optimizedSize.height;
};

export default (element) => {
  const images = element.querySelectorAll(`.game__option > img`);
  images.forEach((image) => {
    image.parentNode.style.display = `none`;
    image.style.pointerEvents = `none`; // для firefox click div

    image.addEventListener(`load`, () => {
      onLoadImage(image);
    });
  });
};
