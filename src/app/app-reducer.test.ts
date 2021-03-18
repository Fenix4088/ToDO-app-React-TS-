import {appReducer, InitialStateT, setAppErrorAC, setAppStatusAC, StatusT} from "./app-reducer";

let startState: InitialStateT;

beforeEach(function () {
    startState = {
        status: "idle",
        error: null,
    };
});

test("should set error", () => {
    const action = setAppErrorAC("Error");
    const endState = appReducer(startState, action);

    expect(endState !== startState).toBeTruthy();
    expect(endState.error).toBe("Error");
    expect(typeof endState.error).toBe("string");
});

test("should set status", () => {
    const action = setAppStatusAC("loading");
    const endState = appReducer(startState, action);

    expect(endState !== startState).toBeTruthy();
    expect(endState.status).toBe("loading");
    expect(typeof endState.status).toBe("string");
});




