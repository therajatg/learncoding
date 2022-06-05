export function authReducer(state, action) {
  switch (action.type) {
    case "FIRST_NAME":
      return { ...state, user: { ...state.user, firstName: action.payload } };

    case "LAST_NAME":
      return { ...state, user: { ...state.user, lastName: action.payload } };

    case "EMAIL":
      return { ...state, user: { ...state.user, email: action.payload } };

    case "PASSWORD":
      return { ...state, user: { ...state.user, password: action.payload } };
    case "TOKEN":
      return { ...state, token: action.payload };
    case "ERROR":
      return { ...state, error: action.payload };
  }
}
