import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, TrendingUp, Package, Recycle, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data - State-managed arrays
const myListings = [];

const wasteListings = [];

const FarmerPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddWaste, setShowAddWaste] = useState(false);
  const [cropListings, setCropListings] = useState([]);
  const [wasteListings, setWasteListings] = useState([]);

  const [newCrop, setNewCrop] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    unit: "KG",
    description: ""
  });

  const [newWaste, setNewWaste] = useState({
    name: "",
    quantity: "",
    unit: "Tons",
    targetIndustry: "",
    description: ""
  });

  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.price || !newCrop.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newListing = {
      id: Date.now(),
      ...newCrop,
      status: "Active",
      views: 0,
      orders: 0
    };

    setCropListings(prev => [...prev, newListing]);

    toast({
      title: "Crop Listed Successfully",
      description: `${newCrop.name} has been added to your listings`,
    });
    
    setNewCrop({
      name: "",
      category: "",
      price: "",
      quantity: "",
      unit: "KG",
      description: ""
    });
    setShowAddCrop(false);
  };

  const handleAddWaste = () => {
    if (!newWaste.name || !newWaste.quantity) {
      toast({
        title: "Missing Information", 
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newListing = {
      id: Date.now(),
      ...newWaste,
      status: "Available",
      interestedBuyers: 0,
      priceRange: "₹500-800"
    };

    setWasteListings(prev => [...prev, newListing]);

    toast({
      title: "Waste Listed Successfully",
      description: `${newWaste.name} has been listed for industry buyers`,
    });
    
    setNewWaste({
      name: "",
      quantity: "",
      unit: "Tons",
      targetIndustry: "",
      description: ""
    });
    setShowAddWaste(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="farmer" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your crops and connect with buyers</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">My Crops</TabsTrigger>
            <TabsTrigger value="waste">Waste Management</TabsTrigger>
            <TabsTrigger value="analytics">Live Bidding</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm text-muted-foreground">Active Listings</p>
                       <p className="text-2xl font-bold">{cropListings.length}</p>
                     </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <Eye className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-earth" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No activity yet. Start by adding your first crop listing!</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crops Tab */}
          <TabsContent value="crops" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Crop Listings</h2>
              <Button onClick={() => setShowAddCrop(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Crop
              </Button>
            </div>

            {showAddCrop && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Crop Listing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cropName">Crop Name *</Label>
                      <Input
                        id="cropName"
                        value={newCrop.name}
                        onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                        placeholder="e.g., Organic Tomatoes"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newCrop.category} onValueChange={(value) => setNewCrop({...newCrop, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="grains">Grains</SelectItem>
                          <SelectItem value="pulses">Pulses</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price per unit (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newCrop.price}
                        onChange={(e) => setNewCrop({...newCrop, price: e.target.value})}
                        placeholder="45"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={newCrop.quantity}
                          onChange={(e) => setNewCrop({...newCrop, quantity: e.target.value})}
                          placeholder="500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={newCrop.unit} onValueChange={(value) => setNewCrop({...newCrop, unit: value})}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KG">KG</SelectItem>
                            <SelectItem value="Tons">Tons</SelectItem>
                            <SelectItem value="Quintal">Quintal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCrop.description}
                      onChange={(e) => setNewCrop({...newCrop, description: e.target.value})}
                      placeholder="Describe your crop, growing conditions, organic certification, etc."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddCrop}>Add Crop Listing</Button>
                    <Button variant="outline" onClick={() => setShowAddCrop(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Listings */}
            {cropListings.length > 0 ? (
              <div className="grid gap-4">
                {cropListings.map((crop) => (
                  <Card key={crop.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{crop.name}</h3>
                            <Badge variant="outline" className="bg-success/10 text-success border-success">
                              {crop.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Category</p>
                              <p className="font-medium">{crop.category || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Quantity</p>
                              <p className="font-medium">{crop.quantity} {crop.unit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Price</p>
                              <p className="font-medium">₹{crop.price}/{crop.unit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Views</p>
                              <p className="font-medium">{crop.views}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No crop listings yet. Click "Add New Crop" to get started!</p>
              </div>
            )}
          </TabsContent>

          {/* Waste Management Tab */}
          <TabsContent value="waste" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Waste Management</h2>
                <p className="text-sm text-muted-foreground">Connect crop waste with industries</p>
              </div>
              <Button onClick={() => setShowAddWaste(true)}>
                <Recycle className="h-4 w-4 mr-2" />
                List Crop Waste
              </Button>
            </div>

            {showAddWaste && (
              <Card>
                <CardHeader>
                  <CardTitle>List Crop Waste for Industries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="wasteName">Waste Product Name *</Label>
                      <Input
                        id="wasteName"
                        value={newWaste.name}
                        onChange={(e) => setNewWaste({...newWaste, name: e.target.value})}
                        placeholder="e.g., Grape Waste from Grapes for Wine Industry"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wasteQuantity">Available Quantity *</Label>
                      <Input
                        id="wasteQuantity"
                        type="number"
                        value={newWaste.quantity}
                        onChange={(e) => setNewWaste({...newWaste, quantity: e.target.value})}
                        placeholder="200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wasteUnit">Unit</Label>
                      <Select value={newWaste.unit} onValueChange={(value) => setNewWaste({...newWaste, unit: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tons">Tons</SelectItem>
                          <SelectItem value="KG">KG</SelectItem>
                          <SelectItem value="Quintal">Quintal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="targetIndustry">Target Industry</Label>
                      <Select value={newWaste.targetIndustry} onValueChange={(value) => setNewWaste({...newWaste, targetIndustry: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="wine">Wine Industry</SelectItem>
                          <SelectItem value="fertilizer">Fertilizer Industry</SelectItem>
                          <SelectItem value="paper">Paper Industry</SelectItem>
                          <SelectItem value="biofuel">Biofuel Industry</SelectItem>
                          <SelectItem value="textile">Textile Industry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="wasteDescription">Description</Label>
                    <Textarea
                      id="wasteDescription"
                      value={newWaste.description}
                      onChange={(e) => setNewWaste({...newWaste, description: e.target.value})}
                      placeholder="Describe the waste material, quality, processing state, etc."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddWaste}>List Waste Product</Button>
                    <Button variant="outline" onClick={() => setShowAddWaste(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Waste Listings */}
            {wasteListings.length > 0 ? (
              <div className="grid gap-4">
                {wasteListings.map((waste) => (
                  <Card key={waste.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{waste.name}</h3>
                            <Badge variant="outline" className="bg-success/10 text-success border-success">
                              {waste.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Quantity</p>
                              <p className="font-medium">{waste.quantity} {waste.unit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Price Range</p>
                              <p className="font-medium">{waste.priceRange}/{waste.unit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Target Industry</p>
                              <p className="font-medium">{waste.targetIndustry || "Any"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No waste listings yet. Click "List Crop Waste" to get started!</p>
              </div>
            )}
          </TabsContent>

          {/* Live Bidding Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Bidding Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">View Live Bidding Sessions</h3>
                  <p className="text-muted-foreground mb-4">
                    Monitor real-time bidding for agricultural products and track market trends
                  </p>
                  <Button onClick={() => setActiveTab("overview")}>
                    View Current Bidding Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerPortal;