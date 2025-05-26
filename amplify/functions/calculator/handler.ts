// amplify/functions/calculator/handler.ts

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

interface CalculatorEvent {
  num1: number;
  num2: number;
  operation: Operation;
}

export const handler = async (event: CalculatorEvent) => {
  const { num1, num2, operation } = event;
  let result: number;

  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num2 !== 0 ? num1 / num2 : NaN;
      break;
    default:
      throw new Error("Invalid operation");
  }

  return result;
};
