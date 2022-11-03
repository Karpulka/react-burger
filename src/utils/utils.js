export const updateElementInArrayByIndex = (array, elementIndex, newElement) => {
  return [].concat(array.slice(0, elementIndex), newElement, array.slice(elementIndex + 1));
};

export const removeElementInArrayByIndex = (array, elementIndex) => {
  return [].concat(array.slice(0, elementIndex), array.slice(elementIndex + 1));
};
