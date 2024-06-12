import React from 'react'
 import{Link} from 'react-router-dom'
 import'./Header.css'

 import Logoimg from '../../public/ImageLogo/NEM104-logo.png'

const Header = () => {
    return (
        <div>
          <div className='headbar'>
            <div>
                 
                 <img  className='imagelogo' src={Logoimg} alt="" style={{width:150}}/>
            </div>
            <div className='buttonsofnav'>
               <a href=""> <h4>Compailer</h4></a>
               <a href=""> <h4>All Codes</h4> </a>
                <button className='btnLogin'>Login</button>
                <button className='btnSignup'>Signup</button>

            </div>
          </div>
        </div>
    )
}

export default Header
