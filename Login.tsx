import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, Factory, Wheat } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Accept specific credentials for all portals
    if (email === "user@gmail.com" && password === "123") {
      toast({
        title: "Login Successful",
        description: `Welcome to the ${role} portal!`,
      });
      
      // Navigate to appropriate portal
      navigate(`/${role}`);
    } else {
      toast({
        title: "Login Failed",
        description: "Please use: user@gmail.com / 123",
        variant: "destructive",
      });
    }
  };

  const getRoleConfig = () => {
    switch (role) {
      case 'consumer':
        return {
          title: 'Consumer Login',
          icon: Users,
          color: 'bg-primary',
          description: 'Access the marketplace to buy fresh produce'
        };
      case 'industry':
        return {
          title: 'Industry Login',
          icon: Factory,
          color: 'bg-earth',
          description: 'Join live bidding for bulk agricultural products'
        };
      case 'farmer':
        return {
          title: 'Farmer Login',
          icon: Wheat,
          color: 'bg-success',
          description: 'Manage your crops and connect with buyers'
        };
      default:
        return {
          title: 'Login',
          icon: Users,
          color: 'bg-primary',
          description: 'Access your portal'
        };
    }
  };

  const config = getRoleConfig();
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="shadow-soft">
          <CardHeader className="text-center pb-8">
            <div className={`w-16 h-16 ${config.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{config.title}</CardTitle>
            <p className="text-muted-foreground">{config.description}</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Login to {role} Portal
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Demo Credentials:<br />
              <strong>Email:</strong> user@gmail.com<br />
              <strong>Password:</strong> 123
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;