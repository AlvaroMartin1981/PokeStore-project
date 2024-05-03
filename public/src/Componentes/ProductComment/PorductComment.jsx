import React, { useState } from 'react';
// Elimina la importación del contexto de usuario

const ProductCommentForm = ({ productId, onCommentSubmit }) => {
  const [comment, setComment] = useState('');
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
          // No incluyas la autorización aquí, ProductDetail se encargará de eso
        },
        body: JSON.stringify({ comment: comment }) // Solo envía el comentario
      });

      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }

      // Notifica a ProductDetail después de enviar el comentario exitosamente
      if (typeof onCommentSubmit === 'function') {
        onCommentSubmit();
      }

      // Si la solicitud es exitosa, limpiamos el campo de comentario
      setComment('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-form">
      <h2>Leave a Comment</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default ProductCommentForm;
