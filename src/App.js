import { useState } from 'react';
import { Route, Routes,useNavigate } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx'
import About from './components/About/About';
import Details from './components/Details/Details';
import NotFound from './components/NotFound/NotFound';


function App() {
   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();
   const backToHome = ()=>{
      navigate("/")
    }

   const onSearch = (id) => {
      backToHome();
      if (isNaN(id)||id==="") {
         window.alert('¡Ingrese un ID válido!')         
      } else {         
         if (characters.filter((char) => char.id === +id).length > 0) {
            window.alert('¡Ya existe un personaje con este ID!')
         }
         else {
            fetch(`https://rickandmortyapi.com/api/character/${id}`)
               .then((res) => res.json())
               .then((data) => {
                  setCharacters((characters) => [...characters, data])
               })
               //setCharacters(...characters, data]) ES LO MISMO
               .catch((error) => window.alert('¡No hay personajes con este ID!'))
         }
      }
      // !XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      const inputDOM =document.getElementById('id-input');
      inputDOM.value='';
      // !NO DEBERIA MANIPULAR EL DOM, HACERLO CON LOS ESTADOS
   }

   const onClose = (id) => {
      const filtered = characters.filter((char) => char.id !== id)
      setCharacters(filtered)
   }

   return (
      <div className='App'>
         <div className='Presentacion'>
            <h1 className='Bienvenidos'> Bienvenidos</h1>
            <img className='LogoRickMorty' src='https://vectorlogo4u.com/wp-content/uploads/2020/11/Rick-and-Morty-Logo-Vector-01-1536x726.png' alt='No encuentro la imagen' />
         </div>
         <Nav onSearch={onSearch} />         
         <Routes>
            <Route path="/" element={<Cards characters={characters} onClose={onClose} />} />
            <Route path="/about" element={<About />} />
            <Route path="/details/:DetailId" element={<Details characters={characters}/>} />
            <Route path='*' element={<NotFound />}/>
         </Routes>
      </div>
   );
}

export default App;

// Función para obtener todos los personajes 
// const onSearch = (id) => { 
//    if (isNaN(id)) { 
//      alert("Por favor, ingresa un número válido como ID."); 
//      return; 
//    } 

//    axios(`https://rickandmortyapi.com/api/character/${id}`) 
//      .then(({ data }) => { 
//        if (data.name) { 
//          const characterExists = characters.some( 
//            (character) => character.id === data.id 
//          ); 

//          if (characterExists) { 
//            alert("Este personaje ya se encuentra en la lista."); 
//          } else { 
//            setCharacters((characters) => [...characters, data]); 
//          } 
//        } else { 
//          alert(`¡No hay personajes con el ID proporcionado!`); 
//        } 
//      }) 
//      .catch((error) => { 
//        alert( 
//          `Ocurrió un error al obtener los datos de la API. Por favor, intenta nuevamente más tarde.` 
//        ); 
//        console.error(error); 
//      }); 
//  };