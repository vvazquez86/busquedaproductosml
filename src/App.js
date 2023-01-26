import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products, setProducts] = useState([])
  const [input, setInput] = useState('')

  useEffect(()=>{
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=Motorola')
    .then(response =>{
      // para no hacer cadenas de then, tenemos que retornar el json de la primera promesa y hacer un then por fuera 
      return response.json()        
    })
    .then(json =>{
      // dentro del json tengo los resultados, entonces al poner .results me va a dar el array con todos los resultados de 
      // la busqueda
      setProducts(json.results)
    })
  },[]) 
   
  const handleOnSubmit = (e)=>{
    // el preventDefault evita que se recargue la pagina.
    e.preventDefault()
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${input}`)
    .then(response =>{
      // para no hacer cadenas de then, tenemos que retornar el json de la primera promesa y hacer un then por fuera 
      return response.json()        
    })
    .then(json =>{
      // dentro del json tengo los resultados, entonces al poner .results me va a dar el array con todos los resultados de 
      // la busqueda
      setProducts(json.results)
    })
  }
  return (
    <div className="App">
      <h1>Titulo</h1>
      <form onSubmit={handleOnSubmit}>
        <input value={input} onChange={(e)=> setInput(e.target.value)} />
        <button type='submit'>Search</button>
      </form>
      <div>
        {
          products.map(prod =>{
            return(
              <div key={prod.id}>
                <h4>{prod.title}</h4>
                <img src={prod.thumbnail} alt={prod.title}/>
                <h5>${prod.price}</h5>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
