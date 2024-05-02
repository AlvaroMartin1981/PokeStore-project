import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [Error, setError] =  useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [registered, setRegistered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('Datos a enviar:', formData); // Verifica que los datos estén correctos aquí
        try {
            const response = await fetch('http://localhost:2999/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }
            // Usuario registrado exitosamente
            navigate('/pokemon');
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            setError('Error al registrar usuario. Inténtelo de nuevo.');
        }
        setIsSubmitting(false);
    };
    

    useEffect(() => {
        if (registered) {
            navigate('/pokemon');
        }
    }, [registered, navigate]);


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;