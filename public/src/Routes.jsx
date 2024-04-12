import Home from './Pages/Home';
import Error from './Pages/Error'
import NavAndFooter from './templates/Nav';
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error />,
        element: <NavAndFooter />,
        children: [
            {path:'/', element: <Home/>}  
        ]
    } 
])

export default router
