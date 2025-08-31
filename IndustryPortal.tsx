import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gavel, ShoppingCart, TrendingUp, Clock, Award, IndianRupee, Users, Timer, Wheat, ArrowLeft, BarChart3, Activity } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart } from "recharts";

// Mock waste products data
const wasteProducts = [
  {
    id: 1,
    name: "Grape Waste for Wine Industry",
    farmer: "Rajesh Vineyard",
    originalCrop: "Grapes",
    quantity: 200,
    unit: "Tons",
    priceRange: "₹500-800/Ton",
    location: "Maharashtra",
    status: "Available"
  },
  {
    id: 2,
    name: "Wheat Straw for Paper Industry", 
    farmer: "Punjab Farms",
    originalCrop: "Wheat",
    quantity: 150,
    unit: "Tons",
    priceRange: "₹300-500/Ton",
    location: "Punjab",
    status: "Available"
  },
  {
    id: 3,
    name: "Corn Husks for Biofuel",
    farmer: "Green Valley Co-op",
    originalCrop: "Corn",
    quantity: 300,
    unit: "Tons", 
    priceRange: "₹200-400/Ton",
    location: "Karnataka",
    status: "Available"
  }
];

// Mock auction data
const mockAuctions = [
  {
    id: 1,
    product: "Premium Wheat",
    quantity: "50 tons",
    location: "Golden Fields Farm, Kansas, USA",
    status: "ongoing",
    timeLeft: 59 * 60 + 2,
    currentBid: 0,
    basePrice: 200000
  },
  {
    id: 2,
    product: "Organic Basmati Rice",
    quantity: "30 tons", 
    location: "Punjab Farms, India",
    status: "upcoming",
    startTime: "2:30 PM",
    basePrice: 150000
  },
  {
    id: 3,
    product: "Fresh Tomatoes",
    quantity: "25 tons",
    location: "Maharashtra Farms, India", 
    status: "upcoming",
    startTime: "4:00 PM",
    basePrice: 75000
  }
];

// Mock bidding data - reset to minimal
const mockBiddingSession = {
  product: "Premium Wheat",
  quantity: "50 tons",
  location: "Golden Fields Farm, Kansas, USA",
  basePrice: 200000,
  currentHighestBid: 0,
  timeLeft: 59 * 60 + 2, // 59:02
  lastYearHighest: 217200,
  description: "High-quality wheat suitable for bread making",
  bids: []
};

const IndustryPortal = () => {
  const [portalMode, setPortalMode] = useState<'selection' | 'bidding' | 'waste'>('selection');
  const [timeLeft, setTimeLeft] = useState(mockBiddingSession.timeLeft);
  const [currentBid, setCurrentBid] = useState(mockBiddingSession.currentHighestBid);
  const [newBidAmount, setNewBidAmount] = useState('');
  const [bids, setBids] = useState(mockBiddingSession.bids);
  const [walletBalance] = useState(250000); // Set wallet balance
  const [chartData, setChartData] = useState([
    { 
      time: "60:00", 
      price: mockBiddingSession.basePrice, 
      timestamp: Date.now() - 60000,
      volume: 0,
      change: 0
    },
    { 
      time: "59:00", 
      price: mockBiddingSession.basePrice, 
      timestamp: Date.now() - 59000,
      volume: 0,
      change: 0
    },
  ]);
  const [chartView, setChartView] = useState<'price' | 'volume'>('price');

  // Initialize with 3 default bidders at 0
  const defaultBidders = [
    { id: 1, bidder: "Arnav", amount: 0, time: "Starting", isHighest: false },
    { id: 2, bidder: "Disha", amount: 0, time: "Starting", isHighest: false },
    { id: 3, bidder: "Krrish", amount: 0, time: "Starting", isHighest: false }
  ];

  useEffect(() => {
    setBids(defaultBidders);
  }, []);

  // Timer countdown and simulate some initial bidding activity
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate some initial bidding activity after 3 seconds
    const simulateInitialBids = setTimeout(() => {
      const initialBids = [
        { id: 101, bidder: "Arnav", amount: 200500, time: "58:30", isHighest: false },
        { id: 102, bidder: "Disha", amount: 201000, time: "58:00", isHighest: true }
      ];
      
      setBids(prev => [
        ...initialBids,
        { id: 3, bidder: "Krrish", amount: 0, time: "Starting", isHighest: false }
      ]);
      setCurrentBid(201000);
      
      // Update chart with initial bids
      setChartData(prev => [
        ...prev,
        { 
          time: "58:30", 
          price: 200500, 
          timestamp: Date.now() - 30000,
          volume: Math.floor(Math.random() * 50) + 10,
          change: 500
        },
        { 
          time: "58:00", 
          price: 201000, 
          timestamp: Date.now(),
          volume: Math.floor(Math.random() * 50) + 15,
          change: 500
        }
      ]);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(simulateInitialBids);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const placeBid = () => {
    const bidAmount = parseInt(newBidAmount);
    
    if (!bidAmount || bidAmount <= currentBid) {
      toast({
        title: "Invalid Bid",
        description: "Your bid must be higher than the current highest bid",
        variant: "destructive",
      });
      return;
    }

    if (bidAmount > walletBalance) {
      toast({
        title: "Insufficient Funds",
        description: "Your bid exceeds your wallet balance",
        variant: "destructive",
      });
      return;
    }

    const userBid = {
      id: Date.now(),
      bidder: "Krrish",
      amount: bidAmount,
      time: "Just now",
      isHighest: true
    };

    setBids(prev => [
      userBid,
      ...prev.map(bid => ({ ...bid, isHighest: false }))
    ]);
    setCurrentBid(bidAmount);
    
    // Update chart with live bid
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    setChartData(prev => {
      const lastPrice = prev[prev.length - 1]?.price || mockBiddingSession.basePrice;
      return [
        ...prev,
        { 
          time: timeString, 
          price: bidAmount,
          timestamp: Date.now(),
          volume: Math.floor(Math.random() * 30) + 5,
          change: bidAmount - lastPrice
        }
      ];
    });

    setNewBidAmount('');

    toast({
      title: "Bid Placed Successfully",
      description: `Your bid of ₹${bidAmount.toLocaleString('en-IN')} has been placed`,
    });
  };

  const progressPercentage = currentBid === 0 ? 0 : ((currentBid - mockBiddingSession.basePrice) / (mockBiddingSession.lastYearHighest - mockBiddingSession.basePrice)) * 100;

  if (portalMode === 'selection') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation userRole="industry" walletBalance={walletBalance} />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Industry Portal</h1>
            <p className="text-xl text-muted-foreground">What would you like to do today?</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Live Bidding Option */}
            <Card className="hover:shadow-lg transition-all cursor-pointer group" onClick={() => setPortalMode('bidding')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Gavel className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Live Bidding</h3>
                <p className="text-muted-foreground mb-4">
                  Participate in transparent bulk auctions for agricultural products
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Real-time bidding</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Live price charts</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-warning/10 rounded-lg">
                  <p className="text-sm font-medium text-warning">
                    {mockAuctions.filter(a => a.status === 'ongoing').length} Live Auctions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {mockAuctions.filter(a => a.status === 'upcoming').length} Starting Soon
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Waste Products Option */}
            <Card className="hover:shadow-lg transition-all cursor-pointer group" onClick={() => setPortalMode('waste')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success/20 transition-colors">
                  <ShoppingCart className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Buy Waste Products</h3>
                <p className="text-muted-foreground mb-4">
                  Purchase agricultural waste for industrial processing
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Wheat className="h-4 w-4" />
                    <span>Crop waste materials</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Direct from farmers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (portalMode === 'waste') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation userRole="industry" walletBalance={walletBalance} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => setPortalMode('selection')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Waste Products Marketplace</h1>
              <p className="text-muted-foreground">Purchase agricultural waste directly from farmers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="outline">{product.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Farmer:</span>
                      <span className="font-medium">{product.farmer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original Crop:</span>
                      <span className="font-medium">{product.originalCrop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-medium">{product.quantity} {product.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price Range:</span>
                      <span className="font-medium text-primary">{product.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{product.location}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Contact Farmer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Bidding Portal
  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="industry" walletBalance={walletBalance} />
      
      <div className="bg-warning text-warning-foreground px-4 py-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Gavel className="h-4 w-4" />
          <span className="font-medium">Bulk Auction System</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => setPortalMode('selection')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-warning" />
            <h1 className="text-2xl font-bold text-foreground">Live Auctions</h1>
          </div>
        </div>

        {/* Current Auction */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Wheat className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{mockBiddingSession.product}</h2>
                  <p className="text-sm text-muted-foreground">
                    {mockBiddingSession.quantity} • {mockBiddingSession.location}
                  </p>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">₹{currentBid.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Current Bid</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{bids.filter(b => b.amount > 0).length}</p>
                <p className="text-sm text-muted-foreground">Bidders</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{formatTime(timeLeft)}</p>
                <p className="text-sm text-muted-foreground">Time Left</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">₹{mockBiddingSession.lastYearHighest.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Last Year (Dec 2023)</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">{mockBiddingSession.description}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Bidding Chart & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Live Market Data
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={chartView === 'price' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setChartView('price')}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Price
                    </Button>
                    <Button
                      variant={chartView === 'volume' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setChartView('volume')}
                    >
                      <Activity className="h-4 w-4 mr-1" />
                      Volume
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-lg font-bold text-primary">₹{currentBid.toLocaleString('en-IN')}</p>
                    {chartData.length > 1 && (
                      <p className={`text-sm ${chartData[chartData.length - 1]?.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {chartData[chartData.length - 1]?.change >= 0 ? '+' : ''}₹{chartData[chartData.length - 1]?.change?.toLocaleString('en-IN') || 0}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">24h High</p>
                    <p className="text-lg font-bold">₹{Math.max(...chartData.map(d => d.price)).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="text-lg font-bold">{chartData.reduce((sum, d) => sum + (d.volume || 0), 0)} bids</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      price: {
                        label: "Price",
                        color: "hsl(var(--primary))",
                      },
                      volume: {
                        label: "Volume",
                        color: "hsl(var(--warning))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      {chartView === 'price' ? (
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="time" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis 
                            domain={['dataMin - 1000', 'dataMax + 1000']}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                          />
                          <ChartTooltip 
                            content={<ChartTooltipContent 
                              formatter={(value, name) => [
                                `₹${Number(value).toLocaleString('en-IN')}`,
                                'Current Price'
                              ]}
                              labelFormatter={(label) => `Time: ${label}`}
                            />} 
                          />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            fill="url(#priceGradient)"
                            dot={{ r: 4, fill: "hsl(var(--primary))" }}
                            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                          />
                          {/* Reference line for last year */}
                          <Area
                            type="monotone"
                            dataKey={() => mockBiddingSession.lastYearHighest}
                            stroke="hsl(var(--success))"
                            strokeWidth={2}
                            strokeDasharray="5,5"
                            fill="none"
                            dot={false}
                            activeDot={false}
                          />
                        </AreaChart>
                      ) : (
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="time" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <ChartTooltip 
                            content={<ChartTooltipContent 
                              formatter={(value, name) => [
                                `${value} bids`,
                                'Volume'
                              ]}
                              labelFormatter={(label) => `Time: ${label}`}
                            />} 
                          />
                          <Area
                            type="monotone"
                            dataKey="volume"
                            stroke="hsl(var(--warning))"
                            strokeWidth={2}
                            fill="url(#volumeGradient)"
                            dot={{ r: 3, fill: "hsl(var(--warning))" }}
                          />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                {/* Live Trading Info */}
                <div className="mt-4 grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Base Price</span>
                      <span className="text-sm font-medium">₹{mockBiddingSession.basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Year High</span>
                      <span className="text-sm font-medium text-success">₹{mockBiddingSession.lastYearHighest.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Market Change</span>
                      <span className={`text-sm font-medium ${currentBid >= mockBiddingSession.basePrice ? 'text-success' : 'text-destructive'}`}>
                        {currentBid >= mockBiddingSession.basePrice ? '+' : ''}₹{(currentBid - mockBiddingSession.basePrice).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{progressPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Place Bid */}
            <Card>
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Minimum bid increment: ₹100
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center border rounded-lg px-3 py-2 bg-background">
                          <IndianRupee className="h-4 w-4 text-muted-foreground mr-1" />
                          <Input
                            type="number"
                            value={newBidAmount}
                            onChange={(e) => setNewBidAmount(e.target.value)}
                            className="border-0 bg-transparent"
                            placeholder={`Min: ${(currentBid + 100).toLocaleString('en-IN')}`}
                            min={currentBid + 100}
                            max={walletBalance}
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={placeBid} 
                        disabled={timeLeft === 0 || !newBidAmount}
                        className="bg-warning hover:bg-warning/90 text-warning-foreground"
                      >
                        <Gavel className="h-4 w-4 mr-2" />
                        Place Bid
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Wallet Balance: ₹{walletBalance.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Auctions Sidebar */}
          <div className="space-y-6">
            {/* Current Bids - Top 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Bidders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...bids].sort((a, b) => b.amount - a.amount).slice(0, 3).map((bid, index) => (
                  <div
                    key={bid.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      bid.isHighest && bid.amount > 0
                        ? 'bg-warning/10 border border-warning/20' 
                        : bid.amount === 0
                        ? 'bg-muted/30'
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {index + 1}. {bid.bidder}
                        </span>
                        {bid.isHighest && bid.amount > 0 && (
                          <Badge variant="default" className="text-xs bg-warning text-warning-foreground">
                            Highest
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{bid.time}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${bid.amount === 0 ? 'text-muted-foreground' : ''}`}>
                        ₹{bid.amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Auctions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Auctions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAuctions.filter(auction => auction.status === 'upcoming').map((auction) => (
                  <div key={auction.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Wheat className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-sm">{auction.product}</h4>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Quantity: {auction.quantity}</p>
                      <p>Base: ₹{auction.basePrice.toLocaleString('en-IN')}</p>
                      <p className="text-warning font-medium">Starts: {auction.startTime}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryPortal;