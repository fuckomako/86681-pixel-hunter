import {assert} from 'chai';
import {countScore, addAnswer, getRandomInt, changeLevel, changeLives, INITIAL_GAME, changeTime} from "./data";

describe(`Score count`, () => {
  it(`should not answer less than 10 questions `, () => {
    const answers = [];
    const livesNumber = 3;
    const score = countScore(answers, livesNumber);
    assert.equal(score, -1);
  });

  it(`should return 1150 if all lives and normal speed `, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      addAnswer(answers, true, getRandomInt(10, 20));
    }
    const livesNumber = 3;
    const score = countScore(answers, livesNumber);
    assert.equal(score, 1150);
  });

  it(`should return 1650 if maximum score `, () => {
    const answers = [];
    for (let i = 0; i < 10; i++) {
      addAnswer(answers, true, getRandomInt(0, 9));
    }
    const livesNumber = 3;
    const score = countScore(answers, livesNumber);
    assert.equal(score, 1650);
  });

  it(`should answer more than 20 seconds with two lives `, () => {
    const answers = [];
    for (let i = 0; i < 9; i++) {
      addAnswer(answers, true, getRandomInt(21, 30));
    }
    addAnswer(answers, false, getRandomInt(21, 30));
    const livesNumber = 2;
    const score = countScore(answers, livesNumber);
    assert.equal(score, 550);
  });

});

describe(`Level Count`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
  });

  it(`should not allow set navigate values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  it(`should be less than 10 LEVEL_LIMIT`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, 102).level, /Level should not be greater than LEVEL_LIMIT/);
  });

  it(`should not allow set not number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
  });
});

describe(`Lives count`, () => {
  it(`should reduce lives count`, () => {
    assert.equal(changeLives(INITIAL_GAME, 1).lives, 0);
    assert.equal(changeLives(INITIAL_GAME, 2).lives, 1);
    assert.equal(changeLives(INITIAL_GAME, 3).lives, 2);
  });

  it(`should not allow set navigate values`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, -1).lives, /Lives should not be negative value/);
  });

  it(`should not allow set not number value`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, []).lives, /Lives should be of type number/);
  });

  it(`should be less than 3 LIVES`, () => {
    assert.throws(() => changeLives(INITIAL_GAME, 4).lives, /Lives should not be greater than LIVES/);
  });
});

describe(`Time count`, () => {
  it(`should reduce time count`, () => {
    assert.equal(changeTime(INITIAL_GAME, 0).time, 1);
    assert.equal(changeTime(INITIAL_GAME, 20).time, 21);
    assert.equal(changeTime(INITIAL_GAME, 13).time, 14);
  });

  it(`should not allow set navigate values`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, -1).lives, /Time should not be negative value/);
  });

  it(`should not allow set not number value`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, []).lives, /Time should be of type number/);
  });

  it(`should be less than 30 TIME_LIMIT`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, 31).lives, /Time should not be greater than TIME_LIMIT/);
  });
});
