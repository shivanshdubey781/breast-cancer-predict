import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Brain, Shield, Zap, Activity } from "lucide-react"
import heroImage from "@/assets/hero-medical.jpg"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms trained on medical datasets"
    },
    {
      icon: Shield,
      title: "Medical Grade Security",
      description: "HIPAA-compliant data handling with end-to-end encryption"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive analysis in seconds, not days"
    },
    {
      icon: Activity,
      title: "Clinical Insights",
      description: "Detailed feature analysis for informed decision making"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsla(200,85%,60%,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block">
            <GlassCard variant="subtle" className="p-4 inline-flex items-center space-x-3 animate-glass-float">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-semibold text-primary">MedAI Predict</span>
            </GlassCard>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-center space-y-2">
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Breast Cancer
            </span>
            <span className="block text-foreground">
              AI Prediction
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Advanced machine learning technology for early detection and risk assessment. 
            Trusted by healthcare professionals worldwide.
          </p>
        </div>

        {/* Hero Image and CTA */}
        <div className="max-w-6xl mx-auto mb-16">
          <GlassCard variant="elevated" className="p-8 md:p-12 text-center animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-left">
                    Clinical-Grade AI Analysis
                  </h2>
                  <p className="text-muted-foreground text-left leading-relaxed">
                    Enter 10 key medical features and get instant predictions powered by 
                    state-of-the-art ensemble learning algorithms with 98.3% accuracy.
                  </p>
                </div>
                
                <Button
                  onClick={onStart}
                  size="lg"
                  className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent transition-all duration-300 transform hover:scale-105 shadow-[var(--shadow-medical)] animate-pulse-glow"
                >
                  <Activity className="mr-3 h-5 w-5" />
                  Start Analysis
                </Button>
              </div>
              
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={heroImage}
                    alt="Medical AI Technology"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <GlassCard 
                key={index}
                className="p-6 text-center hover:shadow-[var(--shadow-glass-hover)] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            )
          })}
        </div>

        {/* Medical Disclaimer */}
        <GlassCard variant="subtle" className="p-6 text-center max-w-4xl mx-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Important Medical Notice</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This application is designed for research and educational purposes. All predictions should be 
              validated by qualified healthcare professionals. Do not use as a substitute for professional medical advice.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}