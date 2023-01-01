import axios from "axios"
import { useEffect, useCallback, useState, useContext, useRef } from "react";
import './app.css'
import BeerList from "./beerList";
import { BrowserRouter as useParams, Route ,Link, Routes, useNavigate} from "react-router-dom";
import BeerCreator from "./BeerCreator"
import LogIn from "./logIn"
import SignUp from "./signUp"
import Home from "./home"
import ConnexionContext from "./contexts";
import Beer from "./beer";
import Video from "./video";

function App() {

  const [data, setData] = useState([])
  const [formFields, setFormFields] = useState([])
  const [loginFields, setLoginFields] = useState([])
  const { connexion } = useContext(ConnexionContext)

  useEffect(() => {
    const beersRequest = axios.get('http://localhost:5000/beers')
    const formFieldsRequest = axios.get('http://localhost:5000/')
    const loginFieldsRequest = axios.get('http://localhost:5000/loginFields')
    axios.all([beersRequest, formFieldsRequest, loginFieldsRequest])
      .then(
        axios
          .spread((...responses) => {
            [setData, setFormFields, setLoginFields]
              .forEach((set, i) => set(responses[i].data))
          }
        )
      )
      .catch(errors => {
        console.log(errors)
      })
  }, [])

  const updateBeerList = (newBeer) => {
    console.log(newBeer)
    setData([...data, Object.entries(newBeer).reduce((acc, [key, val]) =>  ({...acc, [key] : val.value}), {})])
  }

  const deleteBeer = useCallback((id) => {
    axios.delete(
      `http://localhost:5000/beers/${id}`, {
      headers: {
          "x-access-token" : localStorage.getItem("token")
      }
    })
    .then((response) => {
      console.log("delete ok")
      console.log(response.data)
      setData(data.filter(beer => beer.id !== id))
    })
    .catch((error) => {
      console.log("problem with deleting the beer")
      console.log(error)
    });
  }, [data])

  return (
    <main>
    {connexion && <h4>Hi, {connexion.lastName}</h4>}
    {console.log("--- RENDER DE L'APP ---")}
      <div className="App">
        <div className="link">
          <Link to="/logIn">Log In</Link>
        </div>
        <div className="link">
          <Link to="/signUp">Sign Up</Link>
        </div>
        <div className="link">
          <Link to="/beerCreator">Beer Creator</Link>
        </div>
        <div className="link">
          <Link to="/beerList">Beer List</Link>
        </div>
        <div className="link">
          <Link to="/">Home</Link>
        </div>
        <div className="link">
          <Link to="/video">Video</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signUp" element={<SignUp loginFields={loginFields} />} />
          <Route path="/logIn" element={<LogIn loginFields={loginFields} />} />
          <Route path="/beerCreator" element={<BeerCreator formFields={formFields} updateBeerList={updateBeerList} />} />
          <Route path="/beerList" element={<BeerList data={data} deleteBeer={deleteBeer} />} />
          <Route path="/beerList/:beerID" element={<Beer data={data} deleteBeer={deleteBeer} />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </div>
    </main>
  )
}

export default App;