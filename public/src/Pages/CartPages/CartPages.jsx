import { useState } from 'react';
import { useCarrito } from '../../usecontext/CarritoContext';

const CartPages=()=>{
    const { carrito, eliminar, vaciarCarrito } = useCarrito(); 



    return (
    <>
      <div className='container_cartPages'>

      </div>    
    </>
    )
}