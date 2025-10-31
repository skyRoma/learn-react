export const MOCK_DATA = [
  { id: 1, name: "Apple M1 Chip", category: "Hardware", price: 1500, inStock: true },
  { id: 2, name: "Macbook Pro 14", category: "Hardware", price: 2500, inStock: true },
  { id: 3, name: "Logitech MX Master 3", category: "Peripherals", price: 100, inStock: true },
  { id: 4, name: "Webcam C920", category: "Peripherals", price: 60, inStock: false },
  { id: 5, name: "Adobe Photoshop CC", category: "Software", price: 50, inStock: true },
  { id: 6, name: "Figma Pro Subscription", category: "Software", price: 15, inStock: false },
  { id: 7, name: "Dell UltraSharp Monitor", category: "Hardware", price: 800, inStock: true },
];

export const genres = [
  { id: "1", name: "Action" },
  { id: "2", name: "Drama" },
  { id: "3", name: "Comedy" },
  { id: "4", name: "Sci-Fi" },
];

export const countries = [
  { id: "us", name: "USA" },
  { id: "uk", name: "UK" },
  { id: "fr", name: "France" },
  { id: "jp", name: "Japan" },
];

export const years = Array.from({ length: 20 }, (_, i) => 2005 + i);

export const movies = Array.from({ length: 60 }, (_, i) => ({
  id: i.toString(),
  imgUrl: `https://picsum.photos/200/300?random=${i}`,
  title: `Movie ${i + 1}`,
  rating: (Math.random() * 4 + 6).toFixed(1),
  genre: genres[Math.floor(Math.random() * genres.length)].name,
  year: years[Math.floor(Math.random() * years.length)],
  country: countries[Math.floor(Math.random() * countries.length)].name,
}));
