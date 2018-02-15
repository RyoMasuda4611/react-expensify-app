import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/'>Go Home</NavLink>
        <NavLink to='/create'>Go AddExpensePage</NavLink>
        <NavLink to='/edit'>Go EditExpensePage</NavLink>
        <NavLink to='/help'>Go HelpPage</NavLink>        
    </header>
);

export default Header;