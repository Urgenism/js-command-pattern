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

function createFrogsManager() {
  const frogs = [];

  return {
    execute(command, ...args) {
      return command.execute(frogs, ...args);
    },
  };
}

function Command(execute) {
  this.execute = execute;
}

function AddFrogCommand(frog) {
  return new Command(function (frogs) {
    frogs.push(frog);
  });
}

function GetFrogsCommand() {
  return new Command(function (frogs) {
    return frogs;
  });
}

function FeedFrogsCommand(food) {
  return new Command(function (frogs) {
    frogs.forEach((frog) => {
      frog.eat(food);
    });
  });
}

function SaveCommand() {
  return new Command(function (frogs) {
    api.saveToDB(
      frogs.map((frog) => ({
        name: frog.name,
        gender: frog.gender,
        age: frog.age,
      }))
    );
  });
}

function Food(name, type, calories) {
  this.name = name;
  this.type = type;
  this.calories = calories;
}

const mikeTheFrog = createFrog({
  name: 'mike',
  gender: 'male',
  age: 2,
});

const sallyTheFrog = createFrog({
  name: 'sally',
  gender: 'female',
  age: 1,
});

const frogsManager = createFrogsManager();
frogsManager.execute(new AddFrogCommand(mikeTheFrog));
frogsManager.execute(new FeedFrogsCommand(new Food('apple', 'fruit', 95)));
frogsManager.execute(new FeedFrogsCommand(new Food('fly', 'insect', 1)));
frogsManager.execute(new AddFrogCommand(sallyTheFrog));
frogsManager.execute(new SaveCommand());
const updatedFrogs = frogsManager.execute(new GetFrogsCommand());
