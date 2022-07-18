export default function favoriteList(getInfo) {
  const trashID = getInfo.name.split(" ").join("") + `-trash`;
  const uploadID = getInfo.name.split(" ").join("") + `-upload`;

  return `<li class="li-fave" draggable="true">
    <div class="div-fave1">
    <span class="fave-name">${getInfo.name}</span>    
    <button onclick="showMoreFaveInfo()" id="showMoreBtn">Show more info <i class="fa-solid fa-angles-down"></i></button>
    </div>

    <div class="div-fave2 more-info">
        <div class="fave-info">
     <p>Height: ${getInfo.height}<p>
    <p>Mass: ${getInfo.mass}<p>
    <p>Hair color: ${getInfo.hair_color}<p>
    <p>Skin color: ${getInfo.skin_color}<p>
    <p>Eye color: ${getInfo.eye_color}<p>
    <p>Birth year: ${getInfo.birth_year}<p>
    <p>Gender: ${getInfo.gender}<p>  
    </div>

    <div class="fave-pic">
    <input type="file" id="file-input" class="${uploadID}" accept="image/png, image/jpeg">
    <label id="input-label" for="file-input">
    <i class="fa-solid fa-image"></i> &nbsp;Upload a Photo
    </label>
    </input>
    </div>
       </div>

    <div class="div-fave3">     
    <i id="trash-icon" class="${trashID} trash-icon fa-solid fa-trash"></i>
    </div>
    </li>`;
}
