export const CURRENT_USER = {
  id: "u1",
  name: "Alex Rivera",
  username: "arivera_art",
  avatar: "https://picsum.photos/seed/user_alex/100/100",
  followers: "12.4k",
  following: 842,
  postsCount: 156,
  bio: "Digital artist exploring the intersection of dreams and code. 🌌 Generative AI enthusiast.",
};

export const CATEGORIES = [
  "All",
  "Fantasy",
  "Cyberpunk",
  "Nature",
  "Architecture",
  "Portrait",
  "Abstract",
  "Sci-Fi",
];

// Generate 20 mock posts
export const MOCK_POSTS = Array.from({ length: 20 }).map((_, i) => {
  const isTall = i % 3 === 0;
  const height = isTall ? 800 : 500;
  const categoriesPool = CATEGORIES.slice(1);
  const cat = categoriesPool[i % categoriesPool.length];
  
  return {
    id: `post_${i}`,
    imageUrl: `https://picsum.photos/seed/art_${i}/400/${height}`,
    prompt: `A beautiful ${cat.toLowerCase()} scene with intricate details, volumetric lighting, masterpiece, 8k resolution, highly detailed.`,
    likes: Math.floor(Math.random() * 5000) + 10,
    category: cat,
    creator: {
      name: `Creator ${i + 1}`,
      username: `creator_${i + 1}`,
      avatar: `https://picsum.photos/seed/user_${i}/100/100`,
    }
  };
});
