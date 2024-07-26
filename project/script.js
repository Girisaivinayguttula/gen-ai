// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchReviews();
});

function fetchReviews() {
    fetch('/api/reviews')
        .then(response => response.json())
        .then(reviews => {
            const reviewsDiv = document.getElementById('reviews');
            reviewsDiv.innerHTML = '';
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'review';
                reviewDiv.innerHTML = `
                    <h2>${review.place}</h2>
                    <p>${review.review}</p>
                    <p>Rating: ${review.rating}</p>
                `;
                reviewsDiv.appendChild(reviewDiv);
            });
        });
}

function submitReview() {
    const place = document.getElementById('place').value;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;

    fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ place, review, rating })
    })
    .then(response => response.json())
    .then(review => {
        fetchReviews();
        document.getElementById('place').value = '';
        document.getElementById('review').value = '';
        document.getElementById('rating').value = '';
    });
}
