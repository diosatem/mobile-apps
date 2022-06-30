export async function getJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const fetchJson = await response.json();
        return fetchJson;        
      }
    } catch (error) {
      console.log(error);
    }
  }


export function readFromLS(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  export function writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  export function bindTouch(selector, callback) {
    const element = qs(selector);
    element.addEventListener("click", callback);
  }



