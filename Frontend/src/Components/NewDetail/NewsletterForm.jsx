import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { addUserToNewsletter } from '../../stateManagement/actions/newsDetailActions/newsDetailActions';


export default function FormNewsletter () {
    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState({name: '', email: ''})

    const handleChange = (event)=> {
        const {name, value} = event.target
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const handleSubmit = (event)=> {
        event.preventDefault()
        dispatch(addUserToNewsletter(newUser))
        setNewUser({name: '', email: ''})
        
    }
    
    return (
        <form onSubmit={handleSubmit} >
            <input type="text"           
            id="name"
            name="name"
            value={newUser.name}
            placeholder='Nombre'
            onChange={handleChange} />
            <input type="email"              
            id="email"
            name="email"
            value={newUser.email}
            placeholder='Correo Electronico'
            onChange={handleChange} />
            <input type="submit" value="Suscribete" />
        </form>
    );
  };