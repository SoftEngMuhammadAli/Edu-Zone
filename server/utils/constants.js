const bios = [
  "Dreamer, doer, and a lifelong learner.",
  "Curious mind wandering in a world of possibilities.",
  "Just another soul turning coffee into code.",
  "Designing today, dreaming of tomorrow.",
  "On a mission to build cool things and break limits.",
  "Learning one bug at a time.",
  "Tech enthusiast with a twist of creativity.",
  "Gamer by night, coder by day.",
  "Running on caffeine and curiosity.",
  "Turning ideas into digital reality.",
  "Small progress is still progress.",
  "Exploring the digital world, one click at a time.",
  "Builder of dreams and fixer of bugs.",
  "Living life one playlist at a time.",
  "Debugging life, line by line.",
  "Big ideas, small steps, endless growth.",
  "Fluent in memes, mistakes, and motivation.",
  "Passion-fueled and purpose-driven.",
  "Learning AI so it doesn’t learn me first.",
  "Writing code like it's poetry (but messier).",
];

export const getRandomBio = () => bios[Math.floor(Math.random() * bios.length)];
