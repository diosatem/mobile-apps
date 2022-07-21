export function writeToLS(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
  }

export function readFromLS(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error(error);
    }
  }

  export function deleteLS(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
  }

  // export function checkLS(key) {
  //   let favePeople;
  //   if (localStorage.getItem("key") === null) {
  //       favePeople = [];
  //     } else {
  //       favePeople = readFromLS(key);
  //     }
  // }
  