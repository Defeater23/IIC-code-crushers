import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Star, ShoppingCart, Leaf, X, Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Import product images
import tomatoesImage from "@/assets/tomatoes.jpg";
import spinachImage from "@/assets/spinach.jpg";
import basmatiRiceImage from "@/assets/basmati-rice.jpg";
import carrotsImage from "@/assets/carrots.jpg";

// Mock product data with more items
const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Rajesh Sharma",
    location: "Rajasthan",
    price: 45,
    originalPrice: 55,
    rating: 4.8,
    quantity: "1 KG",
    image: tomatoesImage,
    inStock: true,
    organic: true,
    description: "Fresh, juicy organic tomatoes grown without pesticides"
  },
  {
    id: 2,
    name: "Fresh Spinach",
    farmer: "Meera Devi",
    location: "Punjab",
    price: 25,
    originalPrice: 30,
    rating: 4.9,
    quantity: "500g Bundle",
    image: spinachImage,
    inStock: true,
    organic: true,
    description: "Crisp green spinach leaves, perfect for healthy meals"
  },
  {
    id: 3,
    name: "Basmati Rice",
    farmer: "Suresh Gupta",
    location: "Punjab",
    price: 120,
    originalPrice: 140,
    rating: 4.7,
    quantity: "5 KG",
    image: basmatiRiceImage,
    inStock: true,
    organic: false,
    description: "Premium long-grain basmati rice from Punjab"
  },
  {
    id: 4,
    name: "Fresh Carrots",
    farmer: "Amit Kumar",
    location: "Maharashtra",
    price: 35,
    originalPrice: 45,
    rating: 4.6,
    quantity: "1 KG",
    image: carrotsImage,
    inStock: true,
    organic: true,
    description: "Sweet, crunchy carrots rich in vitamins"
  },
  {
    id: 5,
    name: "Organic Potatoes",
    farmer: "Ravi Singh",
    location: "Uttar Pradesh",
    price: 30,
    originalPrice: 35,
    rating: 4.5,
    quantity: "2 KG",
    image: tomatoesImage, // placeholder
    inStock: true,
    organic: true,
    description: "Fresh organic potatoes, perfect for cooking"
  },
  {
    id: 6,
    name: "Fresh Onions",
    farmer: "Sunita Devi",
    location: "Karnataka",
    price: 40,
    originalPrice: 50,
    rating: 4.4,
    quantity: "1 KG",
    image: carrotsImage, // placeholder
    inStock: true,
    organic: false,
    description: "Quality onions for daily cooking needs"
  },
  {
    id: 7,
    name: "Green Beans",
    farmer: "Kiran Kumar",
    location: "Tamil Nadu",
    price: 60,
    originalPrice: 70,
    rating: 4.7,
    quantity: "500g",
    image: spinachImage, // placeholder
    inStock: true,
    organic: true,
    description: "Fresh green beans, rich in nutrients"
  },
  {
    id: 8,
    name: "Wheat Flour",
    farmer: "Harish Grain Mills",
    location: "Madhya Pradesh",
    price: 45,
    originalPrice: 50,
    rating: 4.8,
    quantity: "1 KG",
    image: basmatiRiceImage, // placeholder
    inStock: true,
    organic: false,
    description: "Premium quality wheat flour"
  }
];

const states = ["All States", "Rajasthan", "Punjab", "Maharashtra", "Uttar Pradesh", "Karnataka", "Tamil Nadu", "Madhya Pradesh", "Gujarat", "West Bengal", "Bihar", "Haryana"];

const ConsumerPortal = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(5000); // Consumer wallet balance

  const filteredProducts = selectedState === "All States" 
    ? products 
    : products.filter(product => product.location === selectedState);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems(prev => [...prev, { ...product, quantity }]);
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} (${quantity}) has been added to your cart`,
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getQuantity = (productId) => quantities[productId] || 1;
  const setQuantity = (productId, quantity) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, quantity) }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <Navigation userRole="consumer" cartItems={cartItems.length} />
        
        {/* Wallet Balance Display */}
        <div className="fixed top-4 right-4 z-40 bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Wallet:</span>
            <span className="text-sm font-bold text-primary">₹{walletBalance.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        {/* Cart Sheet */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="fixed top-4 right-20 z-50 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shopping Cart ({cartItems.length} items)
              </SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">Add some products to get started</p>
                  <Button onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
                        if (totalAmount > walletBalance) {
                          toast({
                            title: "Insufficient Balance",
                            description: "Please add money to your wallet to complete this purchase",
                            variant: "destructive"
                          });
                          return;
                        }
                        
                        setWalletBalance(prev => prev - totalAmount);
                        setCartItems([]);
                        setIsCartOpen(false);
                        toast({
                          title: "Purchase Successful!",
                          description: `₹${totalAmount.toLocaleString('en-IN')} has been deducted from your wallet`
                        });
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fresh Produce Marketplace</h1>
            <p className="text-muted-foreground mt-2">Buy directly from local farmers</p>
          </div>
          
          {/* State Filter */}
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="shadow-soft hover:shadow-hover transition-smooth group">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square bg-muted rounded-t-lg mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-success text-success-foreground">
                      <Leaf className="h-3 w-3 mr-1" />
                      Organic
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{product.farmer}, {product.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{product.quantity}</span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium">Qty:</span>
                    <div className="flex items-center border rounded-lg">
                      <button 
                        onClick={() => setQuantity(product.id, getQuantity(product.id) - 1)}
                        className="px-3 py-1 hover:bg-muted rounded-l-lg"
                        disabled={getQuantity(product.id) <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">{getQuantity(product.id)}</span>
                      <button 
                        onClick={() => setQuantity(product.id, getQuantity(product.id) + 1)}
                        className="px-3 py-1 hover:bg-muted rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => addToCart(product, getQuantity(product.id))}
                    className="w-full"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shopping Cart Display - Removed since we have the sheet now */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found in {selectedState}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerPortal;