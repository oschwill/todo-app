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

export const getAllData = () => contentData;
export const getActiveData = () => contentData.filter((c) => c.completed === false);
export const getCompletedData = () => contentData.filter((c) => c.completed === true);
