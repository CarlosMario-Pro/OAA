import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../../types/panelAdmin";

const initialState = {
  admin: null,
};

export default function adminReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOGIN:
      return { ...state, admin: payload };
    case ADMIN_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
