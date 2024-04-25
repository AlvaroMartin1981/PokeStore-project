import { createContext, useContext, useEffect, useState } from "react";



const  UserContext = createContext();

export const  UserProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  

    useEffect(() =>{
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:2999/user')
                if(!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                const data = await response.json()
                setUser(data);
                setLoading(false)
            } catch (error) {
                console.log("Error al obtener los datos del usuario", error);
                setUser(null);
                setLoading(false);
            }
        }
       fetchUserData();       
      },[])

      if (loading) {
        return <div> Loading ... </div>;
      }
        
   return(
       <UserContext.Provider value={{user}}> 
        {children}
       </UserContext.Provider>
    );

};    

export const  UseUser = ()=> useContext(UserContext);