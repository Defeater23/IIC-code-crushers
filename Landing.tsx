import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Factory, Wheat, ShoppingCart, TrendingUp, Leaf, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Landing = () => {
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const handleCardClick = (role: string) => {
    setClickedCard(role);
    // Reset after animation
    setTimeout(() => setClickedCard(null), 300);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full animate-float" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-success/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-earth/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-earth/90" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-white animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-bounce-soft" />
              <span className="text-lg font-medium opacity-90">Modern Agriculture</span>
              <Sparkles className="h-8 w-8 text-yellow-300 animate-bounce-soft" style={{ animationDelay: '0.2s' }} />
            </div>
            <h1 className="text-5xl font-bold mb-6 animate-slide-up">
              AgriConnect Marketplace
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Connecting farmers, consumers, and industries for a sustainable agricultural ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="py-20 px-6 relative">
        {/* Blur overlay when a card is clicked */}
        {clickedCard && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in" />
        )}
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground animate-slide-up">
            Choose Your Portal
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Consumer Portal */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Link 
                to="/login/consumer"
                onClick={() => handleCardClick('consumer')}
              >
                <Card className={`shadow-soft hover:shadow-hover transition-all duration-300 group cursor-pointer transform hover:scale-105 ${
                  clickedCard === 'consumer' ? 'scale-110 shadow-glow z-50 relative' : ''
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 group-hover:shadow-glow">
                      <Users className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Consumer Portal</h3>
                    <p className="text-muted-foreground mb-6">
                      Buy fresh produce directly from local farmers. Filter by location and add to cart.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Direct Shopping</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4" />
                        <span>Fresh & Local</span>
                      </div>
                    </div>
                    <Button className="w-full group-hover:shadow-soft transition-all duration-300">
                      Enter Consumer Portal
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Industry Portal */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link 
                to="/login/industry"
                onClick={() => handleCardClick('industry')}
              >
                <Card className={`shadow-soft hover:shadow-hover transition-all duration-300 group cursor-pointer transform hover:scale-105 ${
                  clickedCard === 'industry' ? 'scale-110 shadow-glow z-50 relative' : ''
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-earth rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 group-hover:shadow-glow">
                      <Factory className="h-8 w-8 text-earth-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Industry Portal</h3>
                    <p className="text-muted-foreground mb-6">
                      Participate in live bidding for bulk agricultural products with transparent pricing.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Live Bidding</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Factory className="h-4 w-4" />
                        <span>Bulk Orders</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-earth text-earth hover:bg-earth hover:text-earth-foreground group-hover:shadow-soft transition-all duration-300">
                      Enter Industry Portal
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Farmer Portal */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link 
                to="/login/farmer"
                onClick={() => handleCardClick('farmer')}
              >
                <Card className={`shadow-soft hover:shadow-hover transition-all duration-300 group cursor-pointer transform hover:scale-105 ${
                  clickedCard === 'farmer' ? 'scale-110 shadow-glow z-50 relative' : ''
                }`}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 group-hover:shadow-glow">
                      <Wheat className="h-8 w-8 text-success-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Farmer Portal</h3>
                    <p className="text-muted-foreground mb-6">
                      List your crops, manage inventory, and connect with consumers and industries.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Wheat className="h-4 w-4" />
                        <span>Crop Listing</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>Price Analytics</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-success text-success hover:bg-success hover:text-success-foreground group-hover:shadow-soft transition-all duration-300">
                      Enter Farmer Portal
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Animated Features Section */}
          <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Real-time Market Data</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                <span>Sustainable Agriculture</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-earth rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                <span>Transparent Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;