import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import Navbar from './Navbar';
import './ProductList.css';

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=80`;

// 3 categories, each with 6 unique plants. Costs are numbers.
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: img('1593691509543-c55fb32d8de5'),
        description: 'Produces oxygen at night and removes toxins; nearly impossible to kill.',
        cost: 15,
      },
      {
        name: 'Spider Plant',
        image: img('1459411552884-841db9b3cc2a'),
        description: 'Filters formaldehyde and xylene; safe and easy for pets and beginners.',
        cost: 12,
      },
      {
        name: 'Peace Lily',
        image: img('1485955900006-10f4d324d411'),
        description: 'Elegant white blooms that remove mold spores and common indoor toxins.',
        cost: 18,
      },
      {
        name: 'Boston Fern',
        image: img('1463936575829-25148e1db1b8'),
        description: 'Lush, feathery fronds that add natural humidity and clean the air.',
        cost: 20,
      },
      {
        name: 'Rubber Plant',
        image: img('1520412099551-62b6bafeb5bb'),
        description: 'Bold glossy leaves that absorb airborne chemicals and brighten any room.',
        cost: 17,
      },
      {
        name: 'Aloe Vera',
        image: img('1501004318641-b39e6451bec6'),
        description: 'A low-maintenance succulent that purifies the air and soothes skin.',
        cost: 14,
      },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      {
        name: 'Lavender',
        image: img('1499002238440-d264edd596ec'),
        description: 'Calming fragrance that promotes relaxation and restful sleep.',
        cost: 20,
      },
      {
        name: 'Jasmine',
        image: img('1466692476868-aef1dfb1e735'),
        description: 'Sweet-smelling white flowers that lift the mood and perfume a room.',
        cost: 18,
      },
      {
        name: 'Rosemary',
        image: img('1512428813834-c702c7702b78'),
        description: 'Woody, fragrant herb that is great in the kitchen and for focus.',
        cost: 15,
      },
      {
        name: 'Mint',
        image: img('1446071103084-c257b5f70672'),
        description: 'Fresh, cooling aroma that repels insects and brightens teas and dishes.',
        cost: 10,
      },
      {
        name: 'Lemon Balm',
        image: img('1509423350716-97f9360b4e09'),
        description: 'Lemon-scented leaves that ease stress and attract helpful pollinators.',
        cost: 14,
      },
      {
        name: 'Basil',
        image: img('1530968464165-7a1861cbaf9f'),
        description: 'Aromatic culinary herb that thrives on a sunny kitchen windowsill.',
        cost: 9,
      },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      {
        name: 'Chamomile',
        image: img('1572688484438-313a6e50c333'),
        description: 'Gentle daisy-like flowers traditionally brewed to calm and aid sleep.',
        cost: 13,
      },
      {
        name: 'Tulsi (Holy Basil)',
        image: img('1604762524889-3e2fcc145683'),
        description: 'Sacred herb used for centuries to support immunity and reduce stress.',
        cost: 16,
      },
      {
        name: 'Ashwagandha',
        image: img('1598880940080-ff9a29891b85'),
        description: 'Adaptogenic herb traditionally used to support energy and balance.',
        cost: 22,
      },
      {
        name: 'Echinacea',
        image: img('1545241047-6083a3684587'),
        description: 'Purple coneflower known for supporting the immune system.',
        cost: 19,
      },
      {
        name: 'Calendula',
        image: img('1509937528035-ad76254b0356'),
        description: 'Bright orange blooms used in soothing salves for skin care.',
        cost: 12,
      },
      {
        name: 'Ginger',
        image: img('1525498128493-380d1990a112'),
        description: 'Zesty rhizome that helps settle the stomach and warms the body.',
        cost: 11,
      },
    ],
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Derived from the Redux store so it stays correct after visiting the cart page
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  return (
    <div className="product-list-page">
      <Navbar
        onHomeClick={onHomeClick}
        onPlantsClick={onPlantsClick}
        onCartClick={onCartClick}
      />

      <div className="product-grid-container">
        {plantsArray.map((categoryGroup) => (
          <section key={categoryGroup.category} className="category-section">
            <h2 className="category-title">{categoryGroup.category}</h2>
            <div className="product-grid">
              {categoryGroup.plants.map((plant) => {
                const added = isInCart(plant.name);
                return (
                  <div className="product-card" key={plant.name}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                    />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={added}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
