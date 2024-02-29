import './AccessPage.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  logo  from '../../images/fried-clay.png'


export default function AccessPage() {
    const [input, setInput]= useState('')
    const navigate = useNavigate();

    function handleAccessToken(event) {
        event.preventDefault()
        const secretCode = 123
        const adminCode = process.env.REACT_APP_ADMINCODE
  

        if(input.toLowerCase() === secretCode.toLowerCase()){
            navigate('/register')
        }
        else if(input.toLowerCase() === adminCode.toLowerCase()){
            navigate('/update')
        }
        else{
            document.getElementById('message-container2').innerHTML = 'Invalid Access Code';
            return;
          }
        
    }

	function handleInputChange(event) {
		setInput(event.target.value)
	}
	return (
        <div className="wrap-div">

		<div className="access-container">
            <div className="access-header">
            <Link className='link' to="/"><img className="logo" alt="logo" src={logo} /></Link>                
            </div>
			<div className="form-container">
            <h2 className='access-text'>Enter access code to post result!</h2>
				<form className="access-form" onSubmit={handleAccessToken}>
                    <div>
					<input
						placeholder="Enter Access Code"
						name="access"
						value={input}
						onChange={handleInputChange}
					/>
                    </div>
					<button className="submit-button" type="submit">
						Submit
					</button>
                
				</form>
                <h3 id='message-container2'></h3>
			</div>
		</div>
        </div>
	)
}
