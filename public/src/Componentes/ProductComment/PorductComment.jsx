import { useState } from 'react';
import { useUser } from '../../usecontext/UserContext.jsx'

const ProductCommentForm = ({ productId, onCommentSubmit }) => {
  const { user } = useUser();
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
        },
        body: JSON.stringify({ userId: user.id, comment: comment, username: user.username }) 
      });

      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }
      if (typeof onCommentSubmit === 'function') {
        onCommentSubmit();
      }

      setComment('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        {console.log(user)}
      </div>
    </>
  );
};

export default ProductCommentForm;
