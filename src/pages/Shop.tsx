import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShoppingCart, Search, Filter } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPetType, setSelectedPetType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPetType]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').eq('is_featured', true).limit(12);

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    if (selectedPetType !== 'all') {
      query = query.eq('pet_type', selectedPetType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const categories = [
    'All Products',
    'Dog Food',
    'Cat Food',
    'Treats & Chews',
    'Toys',
    'Grooming',
    'Health & Wellness',
    'Accessories',
  ];

  const petTypes = [
    { value: 'all', label: 'All Pets' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
  ];

  const demoProducts = [
    {
      id: '1',
      name: 'Royal Canin Adult Dog Food',
      brand: 'Royal Canin',
      price: 2499,
      images: ['https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Dog Food',
      pet_type: 'dog',
      stock_quantity: 50,
    },
    {
      id: '2',
      name: 'Whiskas Cat Food - Ocean Fish',
      brand: 'Whiskas',
      price: 899,
      images: ['https://images.pexels.com/photos/7987145/pexels-photo-7987145.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Cat Food',
      pet_type: 'cat',
      stock_quantity: 75,
    },
    {
      id: '3',
      name: 'Pedigree Adult Dry Dog Food',
      brand: 'Pedigree',
      price: 1799,
      images: ['https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Dog Food',
      pet_type: 'dog',
      stock_quantity: 60,
    },
    {
      id: '4',
      name: 'Drools Chicken & Egg Adult Dog Food',
      brand: 'Drools',
      price: 1999,
      images: ['https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Dog Food',
      pet_type: 'dog',
      stock_quantity: 45,
    },
    {
      id: '5',
      name: 'Purepet Tuna Cat Food',
      brand: 'Purepet',
      price: 699,
      images: ['https://images.pexels.com/photos/7987145/pexels-photo-7987145.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Cat Food',
      pet_type: 'cat',
      stock_quantity: 80,
    },
    {
      id: '6',
      name: 'Goodies Dental Sticks for Dogs',
      brand: 'Goodies',
      price: 349,
      images: ['https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Treats & Chews',
      pet_type: 'dog',
      stock_quantity: 100,
    },
    {
      id: '7',
      name: 'Interactive Treat Ball for Dogs',
      brand: 'Pawsindia',
      price: 499,
      images: ['https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Toys',
      pet_type: 'dog',
      stock_quantity: 35,
    },
    {
      id: '8',
      name: 'Himalaya Erina Coat Cleanser',
      brand: 'Himalaya',
      price: 299,
      images: ['https://images.pexels.com/photos/5731874/pexels-photo-5731874.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: 'Grooming',
      pet_type: 'both',
      stock_quantity: 90,
    },
  ];

  const displayProducts = products.length > 0 ? products : demoProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold text-text-primary mb-4">Pet Food & Supplies</h1>
          <p className="text-xl text-text-secondary mb-8">
            Premium quality products delivered to your doorstep in 3 hours
          </p>
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input-field pl-12 py-4 text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-light w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              <div className="mb-6">
                <h4 className="font-medium text-text-primary mb-3">Pet Type</h4>
                <div className="space-y-2">
                  {petTypes.map((type) => (
                    <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="petType"
                        value={type.value}
                        checked={selectedPetType === type.value}
                        onChange={(e) => setSelectedPetType(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-text-secondary">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-text-primary mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category === 'All Products' ? 'all' : category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === (category === 'All Products' ? 'all' : category)
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-primary to-orange-600 text-white">
              <h3 className="text-xl font-bold mb-2">3-Hour Delivery</h3>
              <p className="text-sm opacity-90 mb-4">
                Get your pet supplies delivered super fast!
              </p>
              <Link to="/shop" className="inline-block bg-white text-primary px-4 py-2 rounded-lg font-medium text-sm hover:bg-opacity-90 transition">
                Shop Now
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{displayProducts.length}</span> products
              </p>
              <select className="input-field w-auto">
                <option>Sort by Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/shop/product/${product.id}`}
                    className="card overflow-hidden group cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.stock_quantity < 20 && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                          Only {product.stock_quantity} left
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-text-light mb-1">{product.brand}</p>
                      <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          ₹{product.price}
                        </span>
                        <button className="p-2 bg-primary bg-opacity-10 rounded-full hover:bg-opacity-20 transition">
                          <ShoppingCart className="w-5 h-5 text-primary" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
