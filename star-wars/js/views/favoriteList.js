export default function favoriteList(getInfo) {
   return `<li class="li-fave">
    <div class="div-fave1">
    <span class="fave-name">${getInfo.name}</span>
    </div>

    <div class="div-fave2">

    <div class="fave-info">
     <p>Height: ${getInfo.height}<p>
    <p>Mass: ${getInfo.mass}<p>
    <p>Hair color: ${getInfo.hair_color}<p>
    <p>Skin color: ${getInfo.skin_color}<p>
    <p>Eye color: ${getInfo.eye_color}<p>
    <p>Birth year: ${getInfo.birth_year}<p>
    <p>Gender: ${getInfo.gender}<p>  
    </div>

    <div class="fave-pic"><input type="file" id="file-input" accept="image/png, image/jpeg">
    <label id="input-label" for="file-input"><i class="fa-solid fa-image"></i> &nbsp;Upload a Photo</label>
    </input></div>
       </div>

    <div class="div-fave3">
    
    
    <i id="trash-icon" class="fa-solid fa-trash"></i>
    </div>
    </li>`
}