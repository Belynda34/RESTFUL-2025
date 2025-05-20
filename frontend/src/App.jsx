import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route ,Routes} from 'react-router-dom'
import Login from '../src/screens/Login'
import Signup from '../src/screens/SignUp'
import Dashboard from './screens/Entry';
import Entered from './screens/EnteredCars';
import ParkingCreate from './screens/ParkingCreate';
import SessionWrapper from "./components/SessionWrapper";


function App() {

  return (
   <>
   <BrowserRouter>


    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

       <Route element={<SessionWrapper />}>
          <Route path='/entry' element={<Dashboard />} />
          <Route path='/entered' element={<Entered />} />
          <Route path='/parking' element={<ParkingCreate />} />
        </Route>
     
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App