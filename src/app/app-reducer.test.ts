import {appReducer, InitialStateT, setAppErrorAC, setAppStatusAC, setAppSuccessAC} from "./app-reducer";

let startState: InitialStateT;

beforeEach(function () {
    startState = {
        status: "idle",
        isInitialized: false,
        appActionStatus: {
            error: null,
            success: null,
        },
    };
});

test("should set error", () => {
    const action = setAppErrorAC({error: "Error"});
    const endState = appReducer(startState, action);

    expect(endState !== startState).toBeTruthy();
    expect(endState.appActionStatus.error).toBe("Error");
    expect(typeof endState.appActionStatus.error).toBe("string");
});

test("should set success", () => {
    const action = setAppSuccessAC({success: "Success"});
    const endState = appReducer(startState, action);

    expect(endState !== startState).toBeTruthy();
    expect(endState.appActionStatus.success).toBe("Success");
    expect(typeof endState.appActionStatus.success).toBe("string");
});

test("should set status", () => {
    const action = setAppStatusAC({status: "loading"});
    const endState = appReducer(startState, action);

    expect(endState !== startState).toBeTruthy();
    expect(endState.status).toBe("loading");
    expect(typeof endState.status).toBe("string");
});






