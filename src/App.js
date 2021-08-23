import axios from 'axios'
import './App.css';
import {useState, useEffect} from 'react'



const App = () =>{


const [cars, setCars] = useState([])
const [newImage, setNewImage] = useState('')
const [newMake, setNewMake] = useState('')
const [newModel, setNewModel] = useState('')
const [newYear, setNewYear] = useState('')
const [newPrice, setNewPrice] = useState('')
const [newMileage, setNewMileage] = useState('')
// signup
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
// login
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [currentUser, setCurrentUser] = useState('')
const [isAuthorized, setAuthorized] = useState(false)
// navigation
const [pageShown, setPageShown] = useState('index')

  useEffect(()=>{
    axios
        .get("https://cardealershipbackend.herokuapp.com/cars")
        .then((response)=>{
          setCars(response.data)
        })
  },[])




// handle new change functions
const handleImageChange=(event)=>{
  setNewImage(event.target.value)
}

const handleMakeChange = (event)=>{
  setNewMake(event.target.value)
}
const handleModelChange =(event)=>{
  setNewModel(event.target.value)
}

const handleYearChange =(event)=>{
  setNewYear(event.target.value)
}

const handlePriceChange =(event)=>{
  setNewPrice(event.target.value)
}

const handleMileageChange =(event)=>{
  setNewMileage(event.target.value)
}

// signup
const handleUsernameChange =(event)=>{
  setNewUsername(event.target.value)
}

const handlePasswordChange =(event)=>{
  setNewPassword(event.target.value)
}

// login
const usernameChange = (event) => {
  setUsername(event.target.value)
}

const passwordChange = (event) => {
  setPassword(event.target.value)
}

const resetState=()=>{
  setNewImage("")
  setNewMake("")
  setNewModel('')
  setNewYear("")
  setNewPrice("")
  setNewMileage("")
  setUsername("")
  setPassword("")
}

const resetYear=()=>{
  setNewYear('')
}

// to be able to add add Cars
const handleNewCarFormSubmit = (event)=>{
  event.preventDefault()
  axios.post(
    "https://cardealershipbackend.herokuapp.com/cars",
    {
      image: newImage,
      make: newMake,
      model: newModel,
      year: newYear,
      price: newPrice,
      mileage: newMileage

    }
  ).then(()=>{
    axios
        .get("https://cardealershipbackend.herokuapp.com/cars")
        .then((response)=>{
          setCars(response.data)
        })
  })
  resetState()
}

// to be able to delete a car
const handleDeleteCar =(carData)=>{
  axios
      .delete(`https://cardealershipbackend.herokuapp.com/cars/${carData._id}`)
      .then(()=>{
        axios
            .get('https://cardealershipbackend.herokuapp.com/cars')
            .then((response)=>{
              setCars(response.data)
            })
      })
}

const handleEdit=(event, carData)=>{
  event.preventDefault()
  axios
      .put(
        `https://cardealershipbackend.herokuapp.com/cars/${carData._id}`,
        {
          image: newImage,
          make: newMake,
          model: newModel,
          year: newYear,
          price: newPrice,
          mileage: newMileage
        }
      )
      .then(()=>{
        axios
            .get('https://cardealershipbackend.herokuapp.com/cars')
            .then((response)=>{
              setCars(response.data)
            })
      })
      resetState()
}


// for user signup
const resetSignup = () => {
  setNewUsername('')
  setNewPassword('')
  setAuthorized(false)
  setPageShown('index')
}

const handleNewUserFormSubmit = (event)=>{
  event.preventDefault()
  axios.post(
    "https://cardealershipbackend.herokuapp.com/cars/users",
    {
      username: newUsername,
      password: newPassword
    }
  ).then(()=>{
    
    axios
        .get("https://cardealershipbackend.herokuapp.com/cars/users")
        .then((response)=>{
          alert("User account was created successfully.")
        })
        
  })
  resetSignup()
}

// for login

const handleLogin=(event)=>{
  event.preventDefault()
  console.log('logging in')
  axios
      .post(
        `https://cardealershipbackend.herokuapp.com/cars/sessions`,
        {
          username: username,
          password: password
        }
      )
      .then((response)=>{
        if (response.data.error) {
          setAuthorized(false)
          alert(response.data.error)
        }
        else {
          //alert(response.data)
          console.log(response.data)
          setCurrentUser(response.data)
          setAuthorized(true)            
        }
      })
      resetState()
}

const viewSignupForm = (event) => {
  event.preventDefault()
  setPageShown('signup')
}

const cancelSignup = (event) => {
  event.preventDefault()
  setPageShown('index')
}

const handleLogout = (event) => {
  event.preventDefault()
  
  axios
  .delete('https://cardealershipbackend.herokuapp.com/cars/sessions')
  .then((response)=>{
    setCurrentUser('')
    setAuthorized(false)
    setPageShown('index')
  })
  resetState()
}

return(
  <>
  <div class="container">

      <div class="header">
        <span class="h1">Car Dealership Website</span>

        {isAuthorized || pageShown !== 'index' ? "" : 
          <div class="login">
            <form onSubmit={handleLogin}>
              <label for="uname">Username</label> <input type="text" value={username} onChange={usernameChange} /><br/>
              <label for="pword">Password</label> <input type="password" value={password} onChange={passwordChange} /><br/>
              <input type="submit" value="Login" /> <button type="button" value="Signup" onClick={viewSignupForm}>Signup</button>
            </form>
          </div>
        }
      </div>

      {isAuthorized ? 
        <div class="row">
          <h3>Hello, {currentUser}!</h3>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      : "" }

      <div class="row">
        <div class={isAuthorized ? "addBox center" : "hidden"}>
          <form onSubmit={handleNewCarFormSubmit}>
                <h2>Add a New Car</h2>
                <span>Image:</span> <input type="text" value={newImage} onChange={handleImageChange}></input> <br/>
                <span>Make:</span> <input type="text" value={newMake} onChange={handleMakeChange}></input> <br/>
                <span>Model:</span> <input type="text" value={newModel} onChange={handleModelChange}></input> <br/>
                <span>Year:</span> <input type="text" value={newYear} onChange={ handleYearChange}></input><br/>
                <span>Price:</span> <input type="text" value={newPrice} onChange={ handlePriceChange}></input><br/>
                <span>Mileage:</span> <input type="text" value={newMileage} onChange={ handleMileageChange} ></input><br/> <br/>
                <input class="btn" type="Submit" value="Submit"></input>
                <br/>
          </form> <br/> <br/> <br/>
        </div>

        {pageShown !== 'signup' ? "" : 
          <div class="signupBox center">
            <form onSubmit={handleNewUserFormSubmit}>
              <h2>Sign Up</h2>
              <label for="username">Username: </label><input type="text" value={newUsername} onChange={handleUsernameChange} /> <br/>
              <label for="password">Password: </label><input type="password" value={newPassword} onChange={handlePasswordChange} /> <br/>
              <input class="btn" type="Submit" value="Submit" />&nbsp;
                <button type="button" onClick={cancelSignup}>Cancel</button>
            </form>
          </div>
        }
      </div>

      
        <div id="resultBody">
          {pageShown === 'signup' ? "" :
                cars.map((car)=>{
                  return(
                    <div class="resultBox">
                        <h1>{car.make}</h1>
                        <h2>{car.model}</h2>
                        <details class={isAuthorized ? "editBox" : "hidden"}>
                              <summary>Edit</summary>
                              <form onSubmit={(event)=>{handleEdit(event, car)}} key={car._id}>
                                  Image: <input type="text" value={newImage} onChange={handleImageChange} placeholder={car.image}></input> <br/>
                                  Make: <input type="text" value={newMake} onChange={handleMakeChange} placeholder={car.make}></input> <br/>
                                  Model: <input type="text" value={newModel} onChange={handleModelChange} placeholder={car.model}></input> <br/>
                                  Year: <input type="text" value={newYear} onChange={handleYearChange} placeholder={car.year}></input><br/>
                                  Price: <input type="text" value={newPrice} onChange={handlePriceChange} placeholder={car.price}></input><br/>
                                  Mileage: <input type="text" value={newMileage} onChange={handleMileageChange} placeholder={car.mileage}></input><br/>
                                  <input type="Submit" class="btn" value="Submit"></input><br/>
                              </form>
                        </details>
                        <img src={car.image}/>
                        <h3>year: {car.year}</h3>
                        <h2>Price: ${car.price}</h2>
                        <h4>Mileage: {car.mileage}</h4>
                        <input class={isAuthorized ? "btn" : "hidden"} type="submit" onClick={(event)=>{handleDeleteCar(car)}} value="Delete" /> <br/> <br/><br/><br/>
                    </div>
                  )})
              }
          </div>
              <footer>
                  <h3><span>Phone Number:</span> 111-111-1111</h3>
                  <h3><span>Address:</span> 333 street st, City, State, 77777</h3>
              </footer>

      </div>

  </>
)
}

export default App;









