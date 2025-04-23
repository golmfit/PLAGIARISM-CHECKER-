"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: number[]
  value?: number[]
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, defaultValue, value, max = 100, step = 1, onValueChange, ...props }, ref) => {
    const initialValue = value || defaultValue || [0]
    const [sliderValue, setSliderValue] = React.useState(initialValue[0])

    React.useEffect(() => {
      if (value !== undefined) {
        setSliderValue(value[0])
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number.parseInt(e.target.value)
      setSliderValue(newValue)
      if (onValueChange) {
        onValueChange([newValue])
      }
    }

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="absolute h-full bg-primary" style={{ width: `${(sliderValue / max) * 100}%` }} />
        </div>
        <input
          type="range"
          ref={ref}
          min={0}
          max={max}
          step={step}
          value={sliderValue}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleChange}
          {...props}
        />
        <div
          className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background"
          style={{ left: `calc(${(sliderValue / max) * 100}% - 10px)` }}
        />
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }
