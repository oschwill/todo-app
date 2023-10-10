let contentData = [];
let id = 1;

export const setData = (content) => {
  let newObj = {
    id,
    content,
    completed: false,
  };
  contentData.push(newObj);

  id++;

  return contentData;
};
