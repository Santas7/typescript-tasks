import { useReducer } from "react";

function reducer(state, action) {
  const { values, currentIndex } = state;
  switch (action.type) {
    case "TOGGLE":
        if (values.includes(action.payload)) 
            return { ...state, currentIndex: values.indexOf(action.payload) };
        return { ...state, currentIndex: (currentIndex + 1) % values.length };

    default:
        break;
  }
  return state;
}

export function useToggle(initialValues = [true, false]) {
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    currentIndex: 0,
  });

  return [state.values[state.currentIndex], (value) => {
    return dispatch({ type: "TOGGLE", payload: value })
  }];
}
