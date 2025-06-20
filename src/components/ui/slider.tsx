import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onValueChange, min = 0, max = 100, step = 1, className, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(value)

    React.useEffect(() => {
      setLocalValue(value)
    }, [value])

    const handleChange = (index: number, newValue: string) => {
      const numValue = parseInt(newValue)
      const newValues = [...localValue]
      newValues[index] = numValue
      
      // Ensure min value is not greater than max value
      if (newValues.length === 2) {
        if (index === 0 && numValue > newValues[1]) {
          newValues[1] = numValue
        } else if (index === 1 && numValue < newValues[0]) {
          newValues[0] = numValue
        }
      }
      
      setLocalValue(newValues)
      onValueChange(newValues)
    }

    const sliderStyles = `
      .custom-slider {
        -webkit-appearance: none;
        appearance: none;
        background: hsl(var(--secondary));
        outline: none;
        border-radius: 0.5rem;
      }
      .custom-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: hsl(var(--primary));
        cursor: pointer;
        border: 2px solid hsl(var(--background));
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .custom-slider::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: hsl(var(--primary));
        cursor: pointer;
        border: 2px solid hsl(var(--background));
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    `

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
        <div ref={ref} className={cn("relative flex w-full items-center space-x-2", className)} {...props}>
          {value.length === 1 ? (
            // Single slider
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue[0]}
              onChange={(e) => handleChange(0, e.target.value)}
              className="w-full h-2 custom-slider"
            />
          ) : (
            // Range slider (two inputs)
            <>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={localValue[0]}
                onChange={(e) => handleChange(0, e.target.value)}
                className="absolute w-full h-2 custom-slider z-10"
              />
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={localValue[1]}
                onChange={(e) => handleChange(1, e.target.value)}
                className="absolute w-full h-2 custom-slider z-20"
              />
            </>
          )}
        </div>
      </>
    )
  }
)

Slider.displayName = "Slider"

export { Slider } 