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

export function threNewsCategoty(category) {
    return async function (dispatch) {
        try {
            const categoriesThree = await axios.get(`http://localhost:3001/news/category/${category}`)
            return dispatch({type: constants.THREE_CATEGORIES, payload : categoriesThree })
        } catch (error) {
            console.log(error.message);
        }
    }
}