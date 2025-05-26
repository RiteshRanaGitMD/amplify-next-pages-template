import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator, UseAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [helloMsg, setHelloMsg] = useState<string>("");
  const { user, signOut } = useAuthenticator();
  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    client.queries
      .sayHello({ name: user?.signInDetails?.loginId })
      .then((res) => {
        // console.log("**res", user);
        setHelloMsg(res.data ?? "No response");
      })
      .catch((err) => {
        setHelloMsg("Error: " + err.message);
      });
  }, []);

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  // Calculator state and logic
  const [calcNum1, setCalcNum1] = useState<number>(0);
  const [calcNum2, setCalcNum2] = useState<number>(0);
  const [calcOp, setCalcOp] = useState<"add" | "subtract" | "multiply" | "divide">("add");
  const [calcResult, setCalcResult] = useState<string>("");

  async function handleCalcSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCalcResult("Calculating...");
    try {
      // Call the GraphQL mutation via Amplify Data client
      const response = await client.mutations.calculate({
        num1: calcNum1,
        num2: calcNum2,
        operation: calcOp,
      });
      if (typeof response.data === "number") {
        console.log("*** calulation result", response)
        setCalcResult("Result: " + response.data);
      } else {
         console.log("*** err", response)
        setCalcResult("Error: " + (response.errors?.[0]?.message || "Unknown error"));
      }
    } catch (err) {
       console.log("*** err", err)
      setCalcResult("Error: " + (err as Error).message);
    }
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}&#39;s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => deleteTodo(todo.id)}
            style={{ cursor: "pointer" }}
          >
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
          Review next steps of this tutorial.
        </a>
      </div>
      <h2>
        {helloMsg} <br/>
        {"Wecome to the app"}
      </h2>
      {/*  place here a calculator  */}
      <section style={{ marginTop: 32, marginBottom: 32 }}>
        <h2>Calculator</h2>
        <form onSubmit={handleCalcSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="number"
            value={calcNum1}
            onChange={e => setCalcNum1(Number(e.target.value))}
            required
            style={{ width: 80 }}
          />
          <select value={calcOp} onChange={e => setCalcOp(e.target.value as any)}>
            <option value="add">+</option>
            <option value="subtract">−</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>
          <input
            type="number"
            value={calcNum2}
            onChange={e => setCalcNum2(Number(e.target.value))}
            required
            style={{ width: 80 }}
          />
          <button type="submit">Calculate</button>
        </form>
        <div style={{ marginTop: 8 }}>{calcResult}</div>
      </section>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
