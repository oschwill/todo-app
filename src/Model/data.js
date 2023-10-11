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

export const editData = (key) => {
  contentData = contentData.map((val) => {
    if (val.id === Number(key)) {
      return {
        id: val.id,
        content: val.content,
        completed: !val.completed,
      };
    }

    return val;
  });
};

export const getAllData = () => contentData;
export const getActiveData = () => contentData.filter((c) => c.completed === false);
export const getCompletedData = () => contentData.filter((c) => c.completed === true);
