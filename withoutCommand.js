function createFrog(options) {
  const _opt = {
    name: options.name,
    age: options.age,
    sex: options.sex,
  };

  const foodsEaten = [];
  const wordsSpoken = [];

  return {
    getOption(key) {
      return _opt[key];
    },

    getFoodsConsumed() {
      return foodsEaten;
    },

    getWordsSpoken() {
      return wordsSpoken;
    },

    eat(food) {
      console.log(`Frog "${_opt.name}" is eating ${food.name} ${food.type}`);
      foodsEaten.push(food);
    },

    talk(words) {
      console.log(words);
      wordsSpoken.push(...word);
    },
  };
}

const mikeTheFrog = createFrog({ name: 'mike', sex: 'male', age: 1 });
const sallyTheFrog = createFrog({ name: 'sally', sex: 'female', age: 4 });
const michelleTheFrog = createFrog({
  name: 'michelle',
  sex: 'female',
  age: 10,
});

const api = {
  fetchFrogs: function () {
    return Promise.resolve([
      { name: 'mike', sex: 'male', age: 1 },
      { name: 'sally', sex: 'female', age: 4 },
      {
        name: 'michelle',
        sex: 'female',
        age: 10,
      },
    ]);
  },
  saveToDB: function (frogs) {
    console.log(`Saving ${frogs.length} frogs to our database`);
    return Promise.resolve();
  },
};

async function init() {
  try {
    const frogs = await api.fetchFrogs();
    return frogs.map((data) => createFrog(data));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createFrogsManager() {
  const frogs = [];

  return {
    addFrogs(frog) {
      frogs.push(frog);
      return this;
    },
    getFrogs() {
      return frogs;
    },
    getMaleFrogs() {
      return frogs.filter((frog) => frog.getOption('sex') === 'male');
    },
    getFemaleFrogs() {
      return frogs.filter((frog) => frog.getOption('sex') === 'female');
    },
    feedFrogs(food) {
      frogs.forEach((frog) => {
        frog.eat(food);
      });
      return this;
    },
    save: function () {
      return Promise.resolve(api.saveToDB(frogs));
    },
  };
}

function Food(name, type, calories) {
  this.name = name;
  this.type = type;
  this.calories = calories;
}

const fly = new Food('fly', 'insect', 1.5);
const dragonfly = new Food('dragonfly', 'insect', 4);
const mosquito = new Food('mosquito', 'insect', 1.8);
const apple = new Food('apple', 'fruit', 95);

init()
  .then((frogs) => {
    const frogsManager = createFrogsManager();
    frogs.forEach((frog) => {
      frogsManager.addFrogs(frog);
    });

    const genders = {
      males: frogsManager.getMaleFrogs(),
      females: frogsManager.getFemaleFrogs(),
    };

    frogsManager.feedFrogs(fly).feedFrogs(mosquito).save();
    console.log(
      'We reached the end and our database is now updated with new data!'
    );
    console.log(
      `Fed: ${genders.males.length} male frogs and ${genders.females.length} female frogs`
    );
    frogsManager.getFrogs().forEach((frog) => {
      console.log(
        `Frog ${frog.getOption('name')} consumed: ${frog
          .getFoodsConsumed()
          .map((food) => food.name)
          .join(', ')}`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
