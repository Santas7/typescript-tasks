
import { useState } from 'react'
import './App.css'
import { Signin } from './components/Signin/Signin'
import { Signup } from './components/Signup/Signup'

function App() {
  const [type, setType] = useState('signin')

  function handleSigninSubmit(data) {
    console.log("#### Signin data: ", data)
  }

  function handleSignupSubmit(data) {
    console.log("#### Signup data: ", data)
  }

  return (
    <>
      <div>
        <h1>Welcome!:D</h1>
        {type === 'signin' 
          ? <Signin onSubmit={handleSigninSubmit}/> 
          : <Signup onSubmit={handleSignupSubmit}/> 
        }
        <br/>
        <button style={{backgroundColor: type === 'signin' ? 'green' : 'red'}} onClick={() => setType('signin')}>Отобразить раздел Войти</button>
        <br/><br/>
        <button style={{backgroundColor: type === 'signin' ? 'red' : 'green'}} onClick={() => setType('signup')}>Отобразить раздел Зарегистрироваться</button>
      </div>
      
    </>
  )
}

export default App
