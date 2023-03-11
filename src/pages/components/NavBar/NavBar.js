import { Link } from 'react-router-dom'
import * as userService from '../../../utilities/users-services'
import './NavBar.css'
import logo from '../../../images/logo.png'

export default function NavBar({ user, setUser }) {
	function handleLogOut() {
		// we should delegate the actual logging out to the users service
		userService.logOut()
		setUser(null)
	}
	return (
		<div className="top-nav-container">
			<div className="top-nav">
				<Link to="/"> <img className="navlogo" src={logo} alt={'logo'}/></Link>
				<nav className='nav'>
                <Link className='link' to="/update">Update Submission</Link> 
				<span className="divider"></span> &nbsp;
                <Link className='link' to="" onClick={handleLogOut}>Log Out</Link> 

                </nav>
			</div>
		</div>
	)
}
