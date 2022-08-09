export const getAnimationVariant = (direct, delay) => {
  let variant = {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.8,
        duration: 0.8
      }
    }
  };
  // variant.offscreen[direct] = -100
  // variant.onscreen[direct] = 0
  // variant.onscreen.transition.delay = delay
  return variant
};
