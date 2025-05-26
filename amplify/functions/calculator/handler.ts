// amplify/functions/calculator/handler.ts

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

interface CalculatorEvent {
  num1: number;
  num2: number;
  operation: Operation;
}

export const handler = async (event: any) => {
  // For AppSync/Amplify Gen 2, arguments are under event.arguments
  const { num1, num2, operation } = event.arguments || {};
  let result: number;

  // Debug log for event
  console.log("Calculator event received:", event);

  if (typeof num1 !== "number" || typeof num2 !== "number" || !operation) {
    console.log("Missing or invalid arguments:", { num1, num2, operation });
    return 0;
  }

  // Fallback/default for operation
  const op = typeof operation === "string" && operation
    ? operation.trim().toLowerCase()
    : "add";

  switch (op) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        throw new Error("Division by zero is not allowed");
      }
      result = num1 / num2;
      break;
    default:
      throw new Error(`Invalid operation: ${operation}`);
  }

  return result;
};
