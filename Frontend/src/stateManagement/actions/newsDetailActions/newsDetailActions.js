import axios from "axios"
import * as constants from "../../types/constActionsDetail"

export function addUserToNewsletter(data) {
    return async function (dispatch) {
        try {
            const newUser = await axios.post("http://localhost:3001/newsletter", data)
            alert('Inscrito con exito')
            return dispatch({type: constants.INSCRIPTION_NEWSLETTER, payload: newUser })
            
        } catch (error) {
            console.log(error)
        }
    }
};

export function threNewsCategory(category) {
    return async function (dispatch) {
        try {
            const categoriesThree = await axios.get(`http://localhost:3001/news/category/${category}`)
            console.log(categoriesThree.data, 'en el action');
            return dispatch({type: constants.THREE_CATEGORIES, payload : categoriesThree.data })
        } catch (error) {
            console.log(error.message);
        }
    }
};