import { LIBRARY_STATUS } from "../actions/libraryStatusTypes";

const initialState = {
  libraryStatus: false,
};

const libraryStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIBRARY_STATUS:
      return {
        ...state,
        libraryStatus: !state.libraryStatus,
      };
    default:
      return state;
  }
};

export default libraryStatusReducer;
