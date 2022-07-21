export default async function getJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      let peopleArray = [];
      peopleArray = await response.json();
      // console.log(typeof peopleArray);
      return peopleArray;
    }
  } catch (error) {
    console.log(error);
  }
}

