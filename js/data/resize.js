export const resize = (frame, given) => {
  const ratio = {
    byWidth: frame.width / given.width,
    byHeight: frame.height / given.height
  };
  const minRatio = Math.min(ratio.byWidth, ratio.byHeight);
  let optimized = {
    width: given.width * minRatio,
    height: given.height * minRatio
  };

  return optimized;
};
