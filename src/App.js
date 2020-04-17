import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [techs, setTechs] = useState('')

  useEffect(() => {
    (async () => {
      const response = await api.get('repositories')
      setRepositories(response.data)
    })()
  }, [])

  async function handleAddRepository() {
    const splitTechs = techs.split(', ')
    const repository = {
      url,
      title,
      techs: splitTechs
    }

    const response = await api.post('repositories', repository)
    setRepositories(old => [...old, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repository = repositories.filter(repository => repository.id !== id)
    setRepositories(repository)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
          {title}
          <button onClick={() => handleRemoveRepository(id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <div>
        <input
          name="url"
          placeholder="Digite url"
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <input 
          name="title"
          placeholder="Digite o título"
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input 
          name="techs"
          placeholder="Digite as techs"
          type="text"
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
        />
      </div>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
