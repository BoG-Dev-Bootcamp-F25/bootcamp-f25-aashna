import logo from './logo.svg';
import './App.css';

function App() {
    return (
    <div className="app">
      <h1 className="title">Mini Pokédex</h1>

      <div className="controls">
        <button className="arrow">◀</button>
        <span className="dex-id">#1</span>{/* placeholder for current dex id */}
        <button className="arrow">▶</button>

        {/* will add Info/Moves tabs later */}
      </div>

      <div className="dex-card">{/* card that will hold image and name */}
        <img
          className="sprite"
          src=""        /* empty for now, will fill with API later */
          alt="pokemon"
        />
        <h2 className="poke-name">Pokémon Name</h2>{/* placeholder for now */}
      </div>

      <p className="muted">Loading…</p>{/* simple status line for now */}

      <footer className="footer">
        Data from{" "}
        <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
          PokeAPI
        </a>
      </footer> 
    </div>
  );
}

export default App;
