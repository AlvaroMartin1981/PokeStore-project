import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token,setToken]=useState(null)

  useEffect(() => {
    const storedUser=JSON.parse(localStorage.getItem('user'))
    const storedToken=localStorage.getItem('token')
      if(storedUser){
        setUser(storedUser)
      }
      if(storedToken){
        setToken(storedToken)
      }
},[]);

  const login =(userData,authToken)=>{
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('user',JSON.stringify(userData))
    localStorage.setItem('token',authToken)
  }

  const register =(userData,authToken)=>{
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('user',JSON.stringify(userData))
    localStorage.setItem('token',authToken)
    }
  const logout=()=>{
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }  

  return (
    <UserContext.Provider value={{ user,setUser,token, login,register,logout }}>
      {children}
     
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
