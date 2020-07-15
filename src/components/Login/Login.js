import React from 'react'

const login = () => {
    return (
        <div className="Login">
            <h1>Login</h1>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="password"></input>
            <button type="submit">login</button>
        </div>
    )
}

export default login