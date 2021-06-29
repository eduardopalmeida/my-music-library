import React from 'react'
import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';


const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}><NavLink to='/' >My Music Library</NavLink></div>
            <nav className={classes.nav}>
                <ul>
                    <li><NavLink to='/genres'  activeClassName={classes.active}>Genres</NavLink>    </li>
                    <li style={{"color":"white"}}><b>/</b></li>
                    <li><NavLink to='/artists' activeClassName={classes.active}>Artists</NavLink>   </li>
                    <li style={{"color":"white"}}><b>/</b></li>
                    <li><NavLink to='/albums'  activeClassName={classes.active}>Albums</NavLink>    </li>
                    <li style={{"color":"white"}}><b>/</b></li>
                    <li><NavLink to='/tracks'  activeClassName={classes.active}>Tracks</NavLink>    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;