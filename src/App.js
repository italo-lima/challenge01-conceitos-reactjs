import React, {useState, useEffect} from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function loadRepositories(){
    const repositories = await api.get('repositories')

    setRepositories(repositories.data)
  }

  useEffect(()=>{
    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }

    await api.post('repositories', repository)
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repos = repositories.filter(repository => repository.id != id)
    setRepositories(repos)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
