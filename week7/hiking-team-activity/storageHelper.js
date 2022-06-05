
export const saveComments = (type, comment) => {
  let storageItem = JSON.stringify(comment);
  window.localStorage.setItem(type, storageItem);
};

export const loadComments = (type) => {
  let storageItem = window.localStorage.getItem(type);
  if (!storageItem)
    return [];
  return JSON.parse(storageItem);
};