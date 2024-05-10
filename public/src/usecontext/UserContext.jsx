import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://pokestorebackend-production.up.railway.app/user/user');
        const data = await response.json();

        // Verificar si la respuesta es exitosa
        if (response.ok) {
          setUser(data);
        } else {
          console.log("Error al obtener los datos del usuario:", data.message);
        }
      } catch (error) {
        console.log("Error al obtener los datos del usuario", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div> Loading ... </div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);