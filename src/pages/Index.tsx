import { useState } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { PredictionForm } from "@/components/prediction-form"
import { PredictionResult } from "@/components/prediction-result"
import { useToast } from "@/hooks/use-toast"

type AppState = 'welcome' | 'form' | 'result'

interface MedicalData {
  radius_mean: number
  texture_mean: number
  perimeter_mean: number
  area_mean: number
  smoothness_mean: number
  concavity_mean: number
  concave_points_mean: number
  radius_worst: number
  perimeter_worst: number
  area_worst: number
}

interface PredictionResult {
  prediction: 'BENIGN' | 'MALIGNANT'
  accuracy: number
  confidence: number
  riskScore: number
  insights: {
    feature: string
    impact: 'positive' | 'negative'
    value: number
  }[]
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome')
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const { toast } = useToast()

  const handleStart = () => {
    setCurrentState('form')
  }

  const handlePredict = async (data: MedicalData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call with realistic medical AI prediction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock AI prediction logic with realistic medical insights
      const features = Object.entries(data)
      const riskFactors = features.filter(([key, value]) => {
        // Simplified risk assessment based on common medical knowledge
        if (key.includes('radius') && value > 15) return true
        if (key.includes('area') && value > 1000) return true
        if (key.includes('perimeter') && value > 100) return true
        if (key.includes('concave') && value > 0.1) return true
        return false
      })
      
      const riskScore = (riskFactors.length / features.length) * 100
      const prediction = riskScore > 50 ? 'MALIGNANT' : 'BENIGN'
      const confidence = Math.min(95, 75 + Math.random() * 20)
      
      const insights = features.slice(0, 5).map(([feature, value]) => ({
        feature: feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        impact: Math.random() > 0.5 ? 'positive' as const : 'negative' as const,
        value: Math.random() * 2 - 1
      }))

      const result: PredictionResult = {
        prediction,
        accuracy: 98.3,
        confidence,
        riskScore,
        insights
      }

      setPredictionResult(result)
      setCurrentState('result')
      
      toast({
        title: "Analysis Complete",
        description: `Prediction: ${prediction} (${confidence.toFixed(1)}% confidence)`,
      })
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setCurrentState('welcome')
    setPredictionResult(null)
  }

  return (
    <div className="min-h-screen">
      {currentState === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {currentState === 'form' && (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
          <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
        </div>
      )}
      {currentState === 'result' && predictionResult && (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
          <PredictionResult result={predictionResult} onReset={handleReset} />
        </div>
      )}
    </div>
  );
};

export default Index;
