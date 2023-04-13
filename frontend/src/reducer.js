export const initialState={
    users:['hello', 'helllloooo'],
    college:[],
    posts:[],
    events:[],
    comments:[]
}


function reducer(state, action){
    switch(action.type){
        case'ADD_USER':
            console.log("adding user reducer");
            break;
        
        case 'REMOVE_USER':
            console.log("removing user reducer");
            break;
        
        default:
            return state;
    }
}

export default reducer;