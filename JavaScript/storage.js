// Storage.js - Funções centralizadas para localStorage
export const Storage = {
    // Cart functions
    getCart() {
        return JSON.parse(localStorage.getItem('carrinho')) || [];
    },
    
    setCart(cart) {
        localStorage.setItem('carrinho', JSON.stringify(cart));
    },
    
    // Favorites functions
    getFavorites() {
        return JSON.parse(localStorage.getItem('favoritos')) || [];
    },
    
    setFavorites(favorites) {
        localStorage.setItem('favoritos', JSON.stringify(favorites));
    },
    
    // User functions
    getUser() {
        return JSON.parse(localStorage.getItem('usuario')) || null;
    },
    
    setUser(user) {
        localStorage.setItem('usuario', JSON.stringify(user));
    },
    
    clearUser() {
        localStorage.removeItem('usuario');
    },
    
    // Settings functions
    getSettings() {
        return JSON.parse(localStorage.getItem('configuracoes')) || {
            theme: 'light',
            notifications: true,
            language: 'pt-BR'
        };
    },
    
    setSettings(settings) {
        localStorage.setItem('configuracoes', JSON.stringify(settings));
    },
    
    // Clear all data
    clearAll() {
        localStorage.clear();
    }
};
