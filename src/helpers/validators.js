import { allPass, count, equals, filter, propEq, length, compose } from 'ramda';

export const validateFieldN1 = allPass([
  propEq('star', 'red'),
  propEq('square', 'green'),
  propEq('triangle', 'white'),
  propEq('circle', 'white')
]);

export const validateFieldN2 = shapes => {
  const greenCount = compose(
    length,
    filter(equals('green')),
    Object.values
  )(shapes);
  return greenCount >= 2;
};

export const validateFieldN3 = shapes => {
  const colors = Object.values(shapes);
  return count(equals('red'), colors) === count(equals('blue'), colors);
};

export const validateFieldN4 = allPass([
  propEq('circle', 'blue'),
  propEq('star', 'red'),
  propEq('square', 'orange')
]);

export const validateFieldN5 = shapes => {
  const colorCounts = Object.values(shapes)
    .filter(c => c !== 'white')
    .reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});
  return Object.values(colorCounts).some(count => count >= 3);
};

export const validateFieldN6 = shapes => {
  const colors = Object.values(shapes);
  const greenCount = count(equals('green'), colors);
  const redCount = count(equals('red'), colors);
  return greenCount === 2 && redCount === 1 && shapes.triangle === 'green';
};

export const validateFieldN7 = allPass([
  propEq('star', 'orange'),
  propEq('square', 'orange'),
  propEq('triangle', 'orange'),
  propEq('circle', 'orange')
]);

export const validateFieldN8 = shapes => 
  !['red', 'white'].includes(shapes.star);

export const validateFieldN9 = allPass([
  propEq('star', 'green'),
  propEq('square', 'green'),
  propEq('triangle', 'green'),
  propEq('circle', 'green')
]);

export const validateFieldN10 = shapes => 
  shapes.triangle === shapes.square && shapes.triangle !== 'white';