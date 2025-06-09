import { setupCounter } from './modules/counter.js';
import { setupFavorite } from './modules/favorite.js';
import { loadRecommendations } from './modules/recommendations.js';
import { setupReviews } from './modules/reviews.js';

// Inicializa a funcionalidade do contador
setupCounter();

// Inicializa a funcionalidade de favoritos
setupFavorite();

// Carrega produtos recomendados
loadRecommendations();

// Inicializa o sistema de avaliações
setupReviews();
