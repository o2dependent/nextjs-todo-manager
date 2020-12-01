import React, { useContext, useState } from 'react';

// Create Context
const CredentialsContext = React.createContext();

// Context Hook
export const useCredentials = () => {
	return useContext(CredentialsContext);
};

// Context Provider
const CredentialsProvider = ({ children }) => {
	const credentialsState = useState(null);

	return (
		<CredentialsContext.Provider value={credentialsState}>
			{children}
		</CredentialsContext.Provider>
	);
};
export default CredentialsProvider;
