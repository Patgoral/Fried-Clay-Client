import './App.css'
import { useState } from 'react'
import UpdatePage from '../UpdatePage/UpdatePage'
import EventPage from '../EventPage/EventPage'
import RegistrationPage from '../Registration/RegistrationPage'

import NavBar from '../components/NavBar/NavBar'


import { getUser } from '../../utilities/users-services'


function App() {
const [user, setUser] = useState(getUser())

  return (
<main className="App">
<>
<NavBar />
<EventPage />
<RegistrationPage />
<UpdatePage />

</>
		</main>
  
  );
}

export default App;
