import { createContext, useState } from "react";

export const ProductsContext = createContext({
  products: [],
  toggleFavorite() { }
});

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }]);

  const toggleFavorite = (id) => {
    setProducts(prevProducts => {
      const prodIndex = prevProducts.findIndex(
        p => p.id === id
      );
      const newFavStatus = !prevProducts[prodIndex].isFavorite;
      const updatedProducts = [...prevProducts];
      updatedProducts[prodIndex] = {
        ...prevProducts[prodIndex],
        isFavorite: newFavStatus
      };

      return updatedProducts;
    });
  }

  return (
    <ProductsContext.Provider value={{ products, toggleFavorite }}>
      {children}
    </ProductsContext.Provider>
  )
}
