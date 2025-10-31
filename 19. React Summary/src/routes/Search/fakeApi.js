const MOCK_DATA = [
    { id: 1, name: "Apple M1 Chip", category: "Hardware", price: 1500, inStock: true },
    { id: 2, name: "Macbook Pro 14", category: "Hardware", price: 2500, inStock: true },
    { id: 3, name: "Logitech MX Master 3", category: "Peripherals", price: 100, inStock: true },
    { id: 4, name: "Webcam C920", category: "Peripherals", price: 60, inStock: false },
    { id: 5, name: "Adobe Photoshop CC", category: "Software", price: 50, inStock: true },
    { id: 6, name: "Figma Pro Subscription", category: "Software", price: 15, inStock: false },
    { id: 7, name: "Dell UltraSharp Monitor", category: "Hardware", price: 800, inStock: true },
];

export async function searchProducts(query, filters) {
    let results = MOCK_DATA.filter((item) => {
        if (filters.inStockOnly && !item.inStock) {
            return false;
        }

        if (item.category !== filters.category && filters.category !== 'All') {
            return false;
        }

        if (!item.name.includes(query.toLowerCase())) {
            return false;
        }

        return true;
    })

    return { data: results, count: results.length };
}
