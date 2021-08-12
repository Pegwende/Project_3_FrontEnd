import logo from './logo.svg';
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

const resetState=()=>{
  setNewImage("")
  setNewMake("")
  setNewModel('')
  setNewYear("")
  setNewPrice("")
  setNewMileage("")
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




return(
  <>
  <div class="container">

      <div class="header">
        <h1> Car Dealership Website</h1>
      </div>

      <div class="addBox">
          <form onSubmit={handleNewCarFormSubmit}>
                <h2>Add a New Car</h2>
                <spam>Image:</spam> <input type="text" value={newImage} onChange={handleImageChange}></input> <br/>
                <spam>Make:</spam> <input type="text" value={newMake} onChange={handleMakeChange}></input> <br/>
                <spam>Model:</spam> <input type="text" value={newModel} onChange={handleModelChange}></input> <br/>
                <spam>Year:</spam> <input type="text" value={newYear} onChange={ handleYearChange}></input><br/>
                <spam>Price:</spam> <input type="text" value={newPrice} onChange={ handlePriceChange}></input><br/>
                <spam>Mileage:</spam> <input type="text" value={newMileage} onChange={ handleMileageChange} ></input><br/> <br/>
                <input class="btn" type="Submit" value="Submit"></input><br/>
          </form> <br/> <br/> <br/>
      </div>

      <div class="resultBody">

            {
              cars.map((car)=>{
                return(
                  <div class="resultBox">
                      <h1>{car.make}</h1>
                      <h2>{car.model}</h2>
                      <details class="editBox">
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
                      <input class="btn" type="submit" onClick={(event)=>{handleDeleteCar(car)}} value="Delete" /> <br/> <br/><br/><br/>
                  </div>
                )})
            }
        </div>
            <footer>
                <h3><spam>Phone Number:</spam> 111-111-1111</h3>
                <h3><spam>Address:</spam> 333 street st, City, State, 77777</h3>
            </footer>

    </div>

  </>
)
}

export default App;
