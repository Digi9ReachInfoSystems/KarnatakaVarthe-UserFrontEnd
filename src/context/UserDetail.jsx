import { createContext, useState, useEffect } from "react";



export const UserDetailContext = createContext();

const UserDetailProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default UserDetailProvider;