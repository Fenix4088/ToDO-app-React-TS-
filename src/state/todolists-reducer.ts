export type StateT = {
  age: number;
  childrenCount: number;
  name: string;
};
type ActionT = {
  type: string;
  [key: string]: any;
};

export const userReducer = (state: StateT, action: ActionT): StateT => {
  switch (action.type) {
    case "INCREMENT-AGE":
      return { ...state, age: state.age + 1 };
    case "INCREMENT-CHILDREN-COUNT":
      return { ...state, childrenCount: state.childrenCount + 1 };
    case "CHANGE-NAME":
      return { ...state, name: action.newName};
    default:
      throw new Error("Action in userReducer is not valid!");
  }
};
