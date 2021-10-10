const INSURANCE_BLOCK = "INSURANCE_BLOCK";
const VALUE_ITEM = "VALUE_ITEM";
const ADD_INSURANCE = "ADD_INSURANCE";
let initialState = {
    Ins: [
        {
            id: '1',
            name: 'Bike',
            сoverage_min: 0,
            сoverage_max: 3000,
            value: 0,
            risk: 30,
            total:0
        },
        {
            id: '2',
            name: 'Jewelry',
            сoverage_min: 500,
            сoverage_max: 10000,
            value: 0,
            risk: 5,
            total:0
        },
        {
            id: '3',
            name: 'Electronics',
            сoverage_min: 500,
            сoverage_max: 6000,
            value: 0,
            risk: 35,
            total:0
        },
        {
            id: '4',
            name: 'Sports Equipment',
            сoverage_min: 0,
            сoverage_max: 20000,
            value:0,
            risk: 30,
            total:0
        },
    ],
};
let InsuranceReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSURANCE_BLOCK:
            return {
                ...state,
                Ins: state.Ins.filter(h => {
                    return h.id !== action.id
                })
            };

        case VALUE_ITEM:
            return {
                ...state,
                Ins: state.Ins.map(n => n.id === action.object.id ? { ...n, value: action.object.value,total: action.object.total} : n)

            };

        case ADD_INSURANCE:
            return {
                ...state,
                Ins: [...state.Ins,action.object]

            };
        default:
            return state;
    }
}
export let addConsuranceItem = (id) => ({type: INSURANCE_BLOCK, id: id});
export let addEventValue = (object) => ({type: VALUE_ITEM, object});
export let addInsurancee = (object) => ({type: ADD_INSURANCE, object});
export default InsuranceReducer;
