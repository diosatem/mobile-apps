import { deleteLS } from '../model/ls.js'

export function removeFavorite(e) {
  const target = e.target
  if (target.nodeName == 'I' && target.id == 'trash-icon') {
    const parentLi = target.parentElement.parentElement
    const getKey = parentLi.querySelector('.fave-name').innerText
    const getId = parentLi.id.replace('favorite-', '')
    document.getElementById(getId).style.display = 'flex'
    parentLi.remove()
    deleteLS(getKey)
  }

  if (target.nodeName == 'BUTTON' && target.id == 'showMoreBtn') {
    const parentElement = target.parentElement.parentElement
    const moreInfo = parentElement.querySelector('.div-fave2')
    moreInfo.classList.toggle('more-info')
  }
}

//Adding image for favorite characters
export function handleUpload(e) {
  const target = e.target.parentElement.parentElement.parentElement
  const liElement = document.getElementById(target.id)
  const getFavePic = liElement.querySelector('.fave-pic')
  let uploadedImage = ''
  const reader = new FileReader()

  reader.onload = () => {
    uploadedImage = reader.result
    getFavePic.style.backgroundImage = `url(${uploadedImage})`
  }

  reader.readAsDataURL(e.target.files[0])
}
