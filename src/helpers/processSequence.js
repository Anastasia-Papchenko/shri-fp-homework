import Api from '../tools/api';
import { allPass, tap, test, ifElse, gt, lt, pipe, tryCatch, identity } from 'ramda';

const api = new Api();

const validate = allPass([
  test(/^[0-9.]+$/),
  v => gt(v.length, 2),
  v => lt(v.length, 10),
  v => parseFloat(v) > 0
]);

const logStep = (title, value, writeLog) => {
  writeLog(`${title}: ${value}`);
  return value;
};

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {

  writeLog('--- New Sequence ---');
  writeLog(`Введенное число: ${value}`);

  const process = pipe(
    tryCatch(
      ifElse(
        validate,
        identity,
        () => { throw new Error('ValidationError'); }
      ),
      () => { throw new Error('ValidationError'); }
    ),

    v => parseFloat(v),
    v => Math.round(v),
    tap(v => logStep('Округление числа', v, writeLog)),
    
    async (num) => {
      try {
        const binary = await api.get('https://api.tech/numbers/base', {
          from: 10, 
          to: 2, 
          number: num
        });
        logStep('Перевод из двоичной системы в десятичную', binary.result, writeLog);
        
        const len = binary.result.length;
        logStep('Длина строки', len, writeLog);
        
        const squared = len * len;
        logStep('Возведение в квадрат', squared, writeLog);

        const mod = squared % 3;
        logStep('Остаток от деления на 3', mod, writeLog);
        
        const animal = await api.get(`https://animals.tech/${mod}`)({});
        logStep('Животное', animal.result, writeLog);
        
        return animal.result;
      } catch (error) {
        throw error;
      }
    }
  );

  Promise.resolve(value)
    .then(process)
    .then(result => {
      handleSuccess(result);
      writeLog(`Success: ${result}`);
      writeLog(``);
    })
    .catch(error => {
      handleError(error.message);
      writeLog(`Error: ${error.message}`);
      writeLog(``);
    });
};

export default processSequence;