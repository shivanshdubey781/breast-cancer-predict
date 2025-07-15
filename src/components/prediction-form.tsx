import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { GlassCard } from "@/components/ui/glass-card"
import { Brain, Activity, Target, Zap } from "lucide-react"

interface PredictionFormProps {
  onPredict: (data: MedicalData) => void
  isLoading: boolean
}

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

const medicalFeatures = [
  { key: 'radius_mean' as keyof MedicalData, label: 'Radius Mean', min: 6, max: 30, step: 0.1, icon: Target },
  { key: 'texture_mean' as keyof MedicalData, label: 'Texture Mean', min: 9, max: 40, step: 0.1, icon: Activity },
  { key: 'perimeter_mean' as keyof MedicalData, label: 'Perimeter Mean', min: 40, max: 190, step: 0.1, icon: Brain },
  { key: 'area_mean' as keyof MedicalData, label: 'Area Mean', min: 140, max: 2500, step: 1, icon: Zap },
  { key: 'smoothness_mean' as keyof MedicalData, label: 'Smoothness Mean', min: 0.05, max: 0.17, step: 0.001, icon: Target },
  { key: 'concavity_mean' as keyof MedicalData, label: 'Concavity Mean', min: 0, max: 0.43, step: 0.001, icon: Activity },
  { key: 'concave_points_mean' as keyof MedicalData, label: 'Concave Points Mean', min: 0, max: 0.2, step: 0.001, icon: Brain },
  { key: 'radius_worst' as keyof MedicalData, label: 'Radius Worst', min: 7, max: 36, step: 0.1, icon: Zap },
  { key: 'perimeter_worst' as keyof MedicalData, label: 'Perimeter Worst', min: 50, max: 251, step: 0.1, icon: Target },
  { key: 'area_worst' as keyof MedicalData, label: 'Area Worst', min: 185, max: 4254, step: 1, icon: Activity }
]

export function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<MedicalData>({
    radius_mean: 14.0,
    texture_mean: 19.0,
    perimeter_mean: 90.0,
    area_mean: 650.0,
    smoothness_mean: 0.1,
    concavity_mean: 0.1,
    concave_points_mean: 0.05,
    radius_worst: 16.0,
    perimeter_worst: 110.0,
    area_worst: 850.0
  })

  const handleSliderChange = (key: keyof MedicalData, value: number[]) => {
    setFormData(prev => ({ ...prev, [key]: value[0] }))
  }

  const handleInputChange = (key: keyof MedicalData, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setFormData(prev => ({ ...prev, [key]: numValue }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict(formData)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Medical Feature Analysis
        </h2>
        <p className="text-muted-foreground">
          Enter the medical measurements for AI-powered breast cancer prediction
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicalFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <GlassCard 
                key={feature.key} 
                className="p-6 animate-fade-in-up hover:animate-glass-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <Label className="text-sm font-medium">{feature.label}</Label>
                  </div>
                  
                  <div className="space-y-3">
                    <Slider
                      value={[formData[feature.key]]}
                      onValueChange={(value) => handleSliderChange(feature.key, value)}
                      min={feature.min}
                      max={feature.max}
                      step={feature.step}
                      className="w-full"
                    />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {feature.min}
                      </span>
                      <Input
                        type="number"
                        value={formData[feature.key]}
                        onChange={(e) => handleInputChange(feature.key, e.target.value)}
                        min={feature.min}
                        max={feature.max}
                        step={feature.step}
                        className="w-24 h-8 text-center text-sm bg-glass-bg/50"
                      />
                      <span className="text-xs text-muted-foreground">
                        {feature.max}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>

        <GlassCard variant="elevated" className="p-8 text-center">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent transition-all duration-300 transform hover:scale-105 shadow-[var(--shadow-medical)]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-3 h-5 w-5" />
                Predict Risk
              </>
            )}
          </Button>
        </GlassCard>
      </form>
    </div>
  )
}