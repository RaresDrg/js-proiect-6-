const moviesWatched = [];
const moviesQueue = [];

const saveToWatched = (key, value) => {
  debugger;
  try {
    moviesWatched.push(value);

    const serializedData = JSON.stringify(moviesWatched);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
};

const saveToQueue = (key, value) => {
  try {
    moviesQueue.push(value);

    const serializedData = JSON.stringify(moviesQueue);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
};

const load = key => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData === null ? undefined : JSON.parse(serializedData);
  } catch (error) {
    console.error(error);
  }
};

const clear = () => {
  localStorage.clear();
};

export { saveToWatched, saveToQueue, load, clear };
