import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { GlassCard } from "@/components/ui/glass-card"
import { Brain, Activity, Target, Zap, Circle, Square, Triangle, Star, Diamond, Heart } from "lucide-react"

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
  compactness_mean: number
  concavity_mean: number
  concave_points_mean: number
  symmetry_mean: number
  fractal_dimension_mean: number
  radius_se: number
  texture_se: number
  perimeter_se: number
  area_se: number
  smoothness_se: number
  compactness_se: number
  concavity_se: number
  concave_points_se: number
  symmetry_se: number
  fractal_dimension_se: number
  radius_worst: number
  texture_worst: number
  perimeter_worst: number
  area_worst: number
  smoothness_worst: number
  compactness_worst: number
  concavity_worst: number
  concave_points_worst: number
  symmetry_worst: number
  fractal_dimension_worst: number
}

const medicalFeatures = [
  // Mean features
  { key: 'radius_mean' as keyof MedicalData, label: 'Radius Mean', min: 6, max: 30, step: 0.1, icon: Target },
  { key: 'texture_mean' as keyof MedicalData, label: 'Texture Mean', min: 9, max: 40, step: 0.1, icon: Activity },
  { key: 'perimeter_mean' as keyof MedicalData, label: 'Perimeter Mean', min: 40, max: 190, step: 0.1, icon: Brain },
  { key: 'area_mean' as keyof MedicalData, label: 'Area Mean', min: 140, max: 2500, step: 1, icon: Zap },
  { key: 'smoothness_mean' as keyof MedicalData, label: 'Smoothness Mean', min: 0.05, max: 0.17, step: 0.001, icon: Circle },
  { key: 'compactness_mean' as keyof MedicalData, label: 'Compactness Mean', min: 0.02, max: 0.35, step: 0.001, icon: Square },
  { key: 'concavity_mean' as keyof MedicalData, label: 'Concavity Mean', min: 0, max: 0.43, step: 0.001, icon: Triangle },
  { key: 'concave_points_mean' as keyof MedicalData, label: 'Concave Points Mean', min: 0, max: 0.2, step: 0.001, icon: Star },
  { key: 'symmetry_mean' as keyof MedicalData, label: 'Symmetry Mean', min: 0.1, max: 0.31, step: 0.001, icon: Diamond },
  { key: 'fractal_dimension_mean' as keyof MedicalData, label: 'Fractal Dimension Mean', min: 0.05, max: 0.1, step: 0.001, icon: Heart },
  
  // Standard error features
  { key: 'radius_se' as keyof MedicalData, label: 'Radius SE', min: 0.1, max: 3, step: 0.01, icon: Target },
  { key: 'texture_se' as keyof MedicalData, label: 'Texture SE', min: 0.4, max: 5, step: 0.01, icon: Activity },
  { key: 'perimeter_se' as keyof MedicalData, label: 'Perimeter SE', min: 0.8, max: 22, step: 0.01, icon: Brain },
  { key: 'area_se' as keyof MedicalData, label: 'Area SE', min: 7, max: 542, step: 0.1, icon: Zap },
  { key: 'smoothness_se' as keyof MedicalData, label: 'Smoothness SE', min: 0.002, max: 0.032, step: 0.0001, icon: Circle },
  { key: 'compactness_se' as keyof MedicalData, label: 'Compactness SE', min: 0.002, max: 0.135, step: 0.0001, icon: Square },
  { key: 'concavity_se' as keyof MedicalData, label: 'Concavity SE', min: 0, max: 0.4, step: 0.001, icon: Triangle },
  { key: 'concave_points_se' as keyof MedicalData, label: 'Concave Points SE', min: 0, max: 0.053, step: 0.0001, icon: Star },
  { key: 'symmetry_se' as keyof MedicalData, label: 'Symmetry SE', min: 0.008, max: 0.08, step: 0.0001, icon: Diamond },
  { key: 'fractal_dimension_se' as keyof MedicalData, label: 'Fractal Dimension SE', min: 0.001, max: 0.03, step: 0.0001, icon: Heart },
  
  // Worst features
  { key: 'radius_worst' as keyof MedicalData, label: 'Radius Worst', min: 7, max: 36, step: 0.1, icon: Target },
  { key: 'texture_worst' as keyof MedicalData, label: 'Texture Worst', min: 12, max: 50, step: 0.1, icon: Activity },
  { key: 'perimeter_worst' as keyof MedicalData, label: 'Perimeter Worst', min: 50, max: 251, step: 0.1, icon: Brain },
  { key: 'area_worst' as keyof MedicalData, label: 'Area Worst', min: 185, max: 4254, step: 1, icon: Zap },
  { key: 'smoothness_worst' as keyof MedicalData, label: 'Smoothness Worst', min: 0.07, max: 0.22, step: 0.001, icon: Circle },
  { key: 'compactness_worst' as keyof MedicalData, label: 'Compactness Worst', min: 0.03, max: 1.06, step: 0.001, icon: Square },
  { key: 'concavity_worst' as keyof MedicalData, label: 'Concavity Worst', min: 0, max: 1.25, step: 0.001, icon: Triangle },
  { key: 'concave_points_worst' as keyof MedicalData, label: 'Concave Points Worst', min: 0, max: 0.29, step: 0.001, icon: Star },
  { key: 'symmetry_worst' as keyof MedicalData, label: 'Symmetry Worst', min: 0.16, max: 0.66, step: 0.001, icon: Diamond },
  { key: 'fractal_dimension_worst' as keyof MedicalData, label: 'Fractal Dimension Worst', min: 0.055, max: 0.21, step: 0.001, icon: Heart }
]

export function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<MedicalData>({
    // Mean features
    radius_mean: 14.0,
    texture_mean: 19.0,
    perimeter_mean: 90.0,
    area_mean: 650.0,
    smoothness_mean: 0.1,
    compactness_mean: 0.1,
    concavity_mean: 0.1,
    concave_points_mean: 0.05,
    symmetry_mean: 0.2,
    fractal_dimension_mean: 0.06,
    
    // Standard error features
    radius_se: 0.5,
    texture_se: 1.2,
    perimeter_se: 3.0,
    area_se: 40.0,
    smoothness_se: 0.007,
    compactness_se: 0.025,
    concavity_se: 0.03,
    concave_points_se: 0.012,
    symmetry_se: 0.02,
    fractal_dimension_se: 0.004,
    
    // Worst features
    radius_worst: 16.0,
    texture_worst: 25.0,
    perimeter_worst: 110.0,
    area_worst: 850.0,
    smoothness_worst: 0.13,
    compactness_worst: 0.25,
    concavity_worst: 0.3,
    concave_points_worst: 0.15,
    symmetry_worst: 0.3,
    fractal_dimension_worst: 0.08
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