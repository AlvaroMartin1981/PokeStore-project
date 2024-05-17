import { useState } from 'react';
import { useUser } from '../../usecontext/UserContext.jsx';

const ProductCommentForm = ({ productId, onCommentSubmit }) => {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:2999/productos/${productId}/comentario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Añadir token de autenticación si es necesario
        },
        body: JSON.stringify({ 
          userId: user.id, 
          comment: comment, 
          rating: rating,
          username: user.username 
        }) 
      });

      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }
      const newComment = await response.json();

      if (typeof onCommentSubmit === 'function') {
        onCommentSubmit(newComment);
      }

      setComment('');
      setRating(0); // Restablecer la calificación después de enviar el comentario
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-form">
      <h2>Dejar un comentario</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Calificación:</label>
        <div id="rating">
          {[1, 2, 3, 4, 5].map(star => (
            <span 
              key={star} 
              onClick={() => setRating(star)} 
              style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
            >
              ★
            </span>
          ))}
        </div>
        <label htmlFor="comment">Comentario:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Enviar'}</button>
      </form>
    </div>
  );
};

export default ProductCommentForm;

