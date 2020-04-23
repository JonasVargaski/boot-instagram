module.exports = function randWithVariation(_min, _max, _variation) {
  let min = _min;
  let max = _max;
  let variation = _variation;
  let seed = (Math.floor(Math.random() * max) % (max - min)) + min;

  const random = () => {
    let offset = Math.floor(Math.random() * variation);
    if (Math.random() < 0.5) offset *= -1;
    seed += offset;
    if (seed < min) return max - seed;
    if (seed > max) return min + (seed - max);
    else return seed;
  };

  return random;
};
