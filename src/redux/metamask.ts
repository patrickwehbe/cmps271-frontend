import { createSlice } from "@reduxjs/toolkit";

const metamaskSlice = createSlice({
	name: "metamask",
	initialState: {
		connected: false,
		address: null,
	},
	reducers: {
		connectMetamask: (state, action) => {
			state.connected = true;
			state.address = action.payload;
		},
		disconnectMetamask: (state) => {
			state.connected = false;
			state.address = null;
		},
	},
});

export default metamaskSlice;
