export function dataReducer(state, action) {
  switch (action.type) {
    case "HISTORY":
      return { ...state, historyData: action.payload };
    case "WATCH_LATER":
      return { ...state, watchLaterData: action.payload };
    case "LIKED":
      return { ...state, likedData: action.payload };
    default:
      return state;
  }
}
