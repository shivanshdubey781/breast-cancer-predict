import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { CheckCircle, AlertTriangle, BarChart3, TrendingUp, TrendingDown, RotateCcw } from "lucide-react"

interface PredictionResultProps {
  result: {
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
  onReset: () => void
}

export function PredictionResult({ result, onReset }: PredictionResultProps) {
  const isBenign = result.prediction === 'BENIGN'
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          AI Analysis Complete
        </h2>
        <p className="text-muted-foreground">
          Advanced machine learning prediction results
        </p>
      </div>

      {/* Main Result Card */}
      <GlassCard variant="elevated" className="p-8 text-center animate-fade-in-up">
        <div className="space-y-6">
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${
            isBenign 
              ? 'bg-gradient-to-r from-success to-success/80 text-success-foreground' 
              : 'bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground'
          }`}>
            {isBenign ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
            <span className="text-xl font-bold">
              {result.prediction}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">
                {result.accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Model Accuracy
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-bold text-accent">
                {result.confidence.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Prediction Confidence
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${
                result.riskScore < 30 ? 'text-success' : 
                result.riskScore < 70 ? 'text-orange-500' : 'text-destructive'
              }`}>
                {result.riskScore.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Risk Score
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Feature Insights */}
      <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Feature Impact Analysis</h3>
          </div>
          
          <div className="space-y-3">
            {result.insights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass-bg/50">
                <div className="flex items-center space-x-3">
                  {insight.impact === 'positive' ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-sm font-medium">{insight.feature}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    insight.impact === 'positive' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {insight.impact === 'positive' ? '↑' : '↓'} {Math.abs(insight.value).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Medical Disclaimer */}
      <GlassCard variant="subtle" className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Medical Disclaimer</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This AI prediction is for research purposes only and should not replace professional medical diagnosis. 
            Please consult with a qualified healthcare provider for proper medical evaluation.
          </p>
        </div>
      </GlassCard>

      {/* Action Button */}
      <div className="text-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="px-8 py-3 bg-glass-bg/60 hover:bg-glass-bg/80 transition-all duration-300"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          New Prediction
        </Button>
      </div>
    </div>
  )
}