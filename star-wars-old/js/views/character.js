const showCharacters = (person, index) =>
  `<li id="${index}" class="person"><span class="person-name">${person.name}</span> <i class="fa-solid fa-plus add delete"></i></li>`

export default showCharacters
