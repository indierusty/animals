import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8888/?" + new URLSearchParams({ q }),
    );
    const data = await response.json();
    setAnimals(data);
    localStorage.setItem("lastQuery", q);
  };

  return (
    <main>
      <h1>Animal Farm</h1>
      <input
        type="text"
        placeholder="Search Animals"
        onChange={(event) => search(event.target.value)}
      />
      <ul>
        {animals.map((animal) => (
          <Animal
            key={animal.id}
            type={animal.type}
            name={animal.name}
            age={animal.age}
          />
        ))}
        {animals.length === 0 && "No animals found!"}
      </ul>
    </main>
  );
}

function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} {age}
    </li>
  );
}

export default App;
