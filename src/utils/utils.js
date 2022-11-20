export const updateElementInArrayByIndex = (array, elementIndex, newElement) => {
  return [].concat(array.slice(0, elementIndex), newElement, array.slice(elementIndex + 1));
};

export const removeElementInArrayByIndex = (array, elementIndex) => {
  return [].concat(array.slice(0, elementIndex), array.slice(elementIndex + 1));
};

export const insertElementToArrayAfterIndex = (array, insertElement, targetElement) => {
  // const newArray = [...array];
  // const index = newArray.findIndex((element) => element.key === insertElement.key);
  //
  // newArray.splice(index, 1);
  // newArray.splice(index + 1, 0, insertElement);
  // return newArray;
  // const to = array.findIndex((element) => element.key === targetElement.key);
  // const arrWithoutInsertElement = removeElementInArrayByIndex(array, from);
  // const targetElementIndex = arrWithoutInsertElement.findIndex(
  //   (element) => element.key === targetElement.key
  // );
  //
  // return arrWithoutInsertElement;
  // return [].concat(
  //   arrWithoutInsertElement.slice(0, to - 1),
  //   insertElement,
  //   //   targetElement,
  //   arrWithoutInsertElement.slice(to + 1)
  // );
  // console.log(array.splice(from, 1));
  // const arr = [...array];
  // arr.splice(to, 0, arr.splice(from, 1)[0]);
  // return arr;
};
