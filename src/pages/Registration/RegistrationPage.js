import { useNavigate } from 'react-router-dom'
// import * as participantsAPI from '../../utilities/participants-api'
import './RegistrationPage.css'

export default function RegistrationPage() {

        //HANDLES THE CHANGE IN INPUT
        function handleInputChange(event) {
            const addNewParticipant = {
                [event.target.name]: event.target.value,
            }
            addNewParticipant()
        }

    return (
        <div className='wrap-div'>
            <div className='register-page'>
              
                    <div className="register-form-container">

                        <div className="register-header">Enter your Info below to Join Us!</div>
                        <form className="register-form" >
                            <div>
                                <input
                                    placeholder="Name"
                                    name="name"
                                    value={''}
                                    onChange={handleInputChange}
                                />
                                <input
                                    placeholder="Location"
                                    name="location"
                                    value={''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className="register-button" type="submit">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            
            </div>
    
    )
}