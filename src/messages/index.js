export const pleaseProvide = (str) => `Please provide ${str}`;
export const alreadyInUse = (str) => `This ${str} is already in use.`;
export const pleaseProvideValid = (str) => `Please provide valid ${str}`;
export const lenOfStr = (str, len, moreOrLess = "atleast") =>
  `Please make sure ${str} is ${moreOrLess} ${len} character long.`;

export const notFound = (str) => `${str} not found.`;
