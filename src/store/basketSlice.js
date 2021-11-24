import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  slots: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addWorker: (state, action) => {
 const {slotId, workerId} = action.payload || {};
      const currentSlotIndex = state.slots.findIndex(slot => slot.id === slotId);

      if (currentSlotIndex < 0) {
        const slotData = {
          id: slotId,
          workers: [workerId]
        }
        state.slots = [...state.slots, slotData]
      } else {
        const currentSlot = state.slots[currentSlotIndex]
        
        let {workers} = currentSlot;
        
workers = Array.from(new Set([...workers, workerId]))
currentSlot.workers = [...workers]

  
state.slots[currentSlotIndex] = currentSlot;
      }
    },
    removeWorker: (state, action) => {
      const {slotId, workerId} = action.payload;
       const currentSlotIndex = state.slots.findIndex(slot => slot.id === slotId);

       if (currentSlotIndex < 0) return;

       const currentSlot = state.slots[currentSlotIndex]
       const {workers} = currentSlot;
       const updatedWorkers = workers.filter(worker => worker !== workerId);
       currentSlot.workers = updatedWorkers;
       
       state.slots[currentSlotIndex] = currentSlot;
    },
    removeSlot: (state, action) => {
     const {slotId} = action.payload;
      const filteredSlots = state.slots.filter(slot => slot.id !== slotId);

       state.slots = filteredSlots;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addWorker, removeWorker, removeSlot } = basketSlice.actions

export default basketSlice.reducer