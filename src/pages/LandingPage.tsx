import { Link } from 'react-router-dom';
import { CheckSquare, CheckCircle, Clock, Target, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function LandingPage() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Easy Task Management',
      description: 'Create, edit, and organize your todos with a simple and intuitive interface.',
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Track completion times and see your productivity patterns over time.',
    },
    {
      icon: Target,
      title: 'Stay Focused',
      description: 'Organize tasks by date and priority to maintain focus on what matters most.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <CheckSquare className="size-5" />
              </div>
              <h1 className="text-xl font-bold">Todo App</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Stunning Todos to{' '}
                <span className="text-primary">Make</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your productivity with our beautiful, intuitive todo application. 
                Organize your life, track your progress, and achieve your goals with ease.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Start Organizing <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Login to your account
                </Button>
              </Link>
            </div>

            {/* Demo Todo Cards */}
            <div className="max-w-md mx-auto mt-16 space-y-4">
              <div className="bg-background border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="size-3 text-white" />
                  </div>
                  <span className="line-through text-muted-foreground">
                    Complete project proposal
                  </span>
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-4 border-2 border-muted-foreground rounded-full" />
                  <span>Review quarterly goals</span>
                </div>
              </div>
              <div className="bg-background border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-4 border-2 border-muted-foreground rounded-full" />
                  <span>Plan weekend trip</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our todo app comes with powerful features designed to help you manage 
              your tasks efficiently and boost your productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary size-12 rounded-lg flex items-center justify-center">
                    <feature.icon className="size-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to get organized?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity 
              with our beautiful todo application.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Create your free account <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <CheckSquare className="size-4" />
              </div>
              <span className="font-medium">Todo App</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Todo App. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 