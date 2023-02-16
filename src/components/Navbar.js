import React from 'react'
import chef from '../img/chef.png'
import './Navbar.css'
const Navbar =()=>{

    return(
        <nav class="navbar shadow rounded-bottom fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand mx-auto" href="#">
                    <img src={chef} width="50" height="54"  className=''/>
                    <b className='text-white'>ChefBot</b>
                </a>
            </div>
        </nav>
    )
}
export default Navbar;
