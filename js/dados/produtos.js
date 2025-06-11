export const produtos = [
    // chás
    {
        id: 1,
        nome: "Chá Verde Orgânico",
        preco: 24.90,
        imagem: "src/assets/img/cha-verde.webp",
        categoria: "cha"
    },
    {
        id: 2,
        nome: "Chá de Camomila",
        preco: 19.90,
        imagem: "src/assets/img/cha-camomila.webp",
        categoria: "cha"
    },
    {
        id: 5,
        nome: "Chá Preto Premium",
        preco: 22.90,
        imagem: "src/assets/img/cha-preto.jpg", 
        categoria: "cha"
    },
    {
        id: 8,
        nome: "Chá de Hibisco",
        preco: 18.50,
        imagem: "src/assets/img/cha-hibisco.jpg", 
        categoria: "cha"
    },
    {
        id: 11,
        nome: "Chá Misto de Frutas",
        preco: 21.50,
        imagem: "src/assets/img/cha-misto-frutas.jpg",
        categoria: "cha"
    },
    // óleos
    {
        id: 3,
        nome: "Óleo Essencial de Lavanda",
        preco: 45.50,
        imagem: "src/assets/img/frasco-oleo-essencial.avif", // Atualizado para usar imagem existente
        categoria: "oleo"
    },
    {
        id: 6,
        nome: "Óleo de Coco Extravirgem",
        preco: 32.50,
        imagem: "src/assets/img/oleo-coco-extravirgem.jpg",
        categoria: "oleo"
    },
    {
        id: 9,
        nome: "Óleo Essencial de Tea Tree",
        preco: 38.90,
        imagem: "src/assets/img/oleo-essencial-tea-tree.jpg",
        categoria: "oleo"
    },
    {
        id: 12,
        nome: "Óleo Essencial de Eucalipto",
        preco: 29.90,
        imagem: "src/assets/img/oleo-essencial-eucalipto.jpg",
        categoria: "oleo"
    },
    // cosméticos
    {
        id: 4,
        nome: "Hidratante Facial Natural",
        preco: 59.90,
        imagem: "src/assets/img/hidratante-facial-natural.webp",
        categoria: "cosmetic"
    },
    {
        id: 7,
        nome: "Sabonete Artesanal de Calendula",
        preco: 15.90,
        imagem: "src/assets/img/sabonete-calendula.webp", // Atualizado para usar imagem existente
        categoria: "cosmetic"
    },
    {
        id: 10,
        nome: "Máscara Facial de Argila",
        preco: 42.90,
        imagem: "src/assets/img/mascara-facial-argila.webp",
        categoria: "cosmetic"
    },
    // alimentos
    {
        id: 13,
        nome: "Mel Orgânico",
        preco: 35.90,
        imagem: "src/assets/img/mel_puro_250g_1011_1_20200507094756.webp", // Atualizado para usar imagem existente
        categoria: "alimento"
    },
    {
        id: 14,
        nome: "Granola Artesanal",
        preco: 28.90,
        imagem: "src/assets/img/granola.jpeg", // Atualizado para usar imagem existente
        categoria: "alimento"
    },
    // Suplementos
    {
        id: 15,
        nome: "Whey Protein Vegano",
        preco: 89.90,
        imagem: "src/assets/img/whey-protein-vegano.jpg",
        categoria: "suplemento"
    },
    {
        id: 16,
        nome: "Colágeno Hidrolisado",
        preco: 65.50,
        imagem: "src/assets/img/colageno-hidrolisado.jpeg",
        categoria: "suplemento"
    }
];

export const categorias = {
    'cha': 'Chás',
    'oleo': 'Óleos Essenciais',
    'cosmetic': 'Cosméticos',
    'alimento': 'Alimentos',
    'suplemento': 'Suplementos'
};