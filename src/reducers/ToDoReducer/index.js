const initialState = {
    items: [],
};

export const selectAllItems = (state) => state.items;

const type = {
    ADD_ITEM: 'ADD_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
    MARK_ITEM_AS_DONE: 'MARK_ITEM_AS_DONE',
};

export function addItem(item) {
    return { type: type.ADD_ITEM, item: item };
}

export function deleteItem(item) {
    return { type: type.DELETE_ITEM, item: item };
}

export function markItemAsDone(item, isDone) {
    return { type: type.MARK_ITEM_AS_DONE, item: item, isDone: isDone };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case type.ADD_ITEM: {
            return {
                ...state,
                items: [
                    ...state.items,
                    { ...action.item, isDone: false },
                ],
            };
        }
        case type.DELETE_ITEM: {
            const index = state.items.indexOf(action.item);

            if (index === -1) {
                return state;
            }

            return {
                ...state,
                items: [
                    ...state.items.slice(0, index),
                    ...state.items.slice(index + 1),
                ],
            };
        }
        case type.MARK_ITEM_AS_DONE: {
            const index = state.items.indexOf(action.item);

            if (index === -1) {
                return state;
            }

            return {
                ...state,
                items: [
                    ...state.items.slice(0, index),
                    {
                        ...state.items[index],
                        ...action.item,
                        isDone: action.isDone,
                    },
                    ...state.items.slice(index + 1),
                ],
            };
        }
        default:
            return state;
    }
}