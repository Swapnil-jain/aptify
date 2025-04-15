"use client"

import { useEffect, useRef } from "react"
import { LightbulbIcon } from "lucide-react"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]

export function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Draw the chart
    const drawChart = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const width = rect.width
      const height = rect.height
      const padding = { top: 20, right: 20, bottom: 30, left: 40 }
      const chartWidth = width - padding.left - padding.right
      const chartHeight = height - padding.top - padding.bottom

      // Draw grid
      ctx.strokeStyle = "rgba(75, 85, 99, 0.2)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight * i) / 4
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(width - padding.right, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i <= 6; i++) {
        const x = padding.left + (chartWidth * i) / 6
        ctx.beginPath()
        ctx.moveTo(x, padding.top)
        ctx.lineTo(x, height - padding.bottom)
        ctx.stroke()
      }

      // Y-axis labels
      ctx.fillStyle = "rgba(156, 163, 175, 0.8)"
      ctx.font = "12px Inter, sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      const yLabels = ["0", "25", "50", "75", "100"]
      for (let i = 0; i <= 4; i++) {
        const y = height - padding.bottom - (chartHeight * i) / 4
        ctx.fillText(yLabels[i], padding.left - 10, y)
      }

      // X-axis labels
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      for (let i = 0; i <= 6; i++) {
        const x = padding.left + (chartWidth * i) / 6
        ctx.fillText(MONTHS[i], x, height - padding.bottom + 10)
      }

      // Data points for two lines
      const line1Points = [
        { x: 0, y: 45 },
        { x: 1, y: 48 },
        { x: 2, y: 60 },
        { x: 3, y: 65 },
        { x: 4, y: 75 },
        { x: 5, y: 85 },
        { x: 6, y: 95 },
      ]

      const line2Points = [
        { x: 0, y: 20 },
        { x: 1, y: 30 },
        { x: 2, y: 40 },
        { x: 3, y: 50 },
        { x: 4, y: 60 },
        { x: 5, y: 70 },
        { x: 6, y: 85 },
      ]

      // Draw area under line 1
      const drawArea = (points: { x: number; y: number }[], color: string) => {
        ctx.beginPath()
        ctx.moveTo(
          padding.left + (chartWidth * points[0].x) / 6,
          height - padding.bottom - (chartHeight * points[0].y) / 100,
        )

        for (let i = 1; i < points.length; i++) {
          const x = padding.left + (chartWidth * points[i].x) / 6
          const y = height - padding.bottom - (chartHeight * points[i].y) / 100
          ctx.lineTo(x, y)
        }

        // Complete the area by drawing to the bottom right and then bottom left
        ctx.lineTo(padding.left + chartWidth, height - padding.bottom)
        ctx.lineTo(padding.left, height - padding.bottom)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()
      }

      // Draw areas
      drawArea(line2Points, "rgba(80, 200, 120, 0.2)") // Green area
      drawArea(line1Points, "rgba(138, 112, 255, 0.2)") // Purple area

      // Draw line 1 (top line)
      ctx.beginPath()
      ctx.moveTo(
        padding.left + (chartWidth * line1Points[0].x) / 6,
        height - padding.bottom - (chartHeight * line1Points[0].y) / 100,
      )

      for (let i = 1; i < line1Points.length; i++) {
        const x = padding.left + (chartWidth * line1Points[i].x) / 6
        const y = height - padding.bottom - (chartHeight * line1Points[i].y) / 100
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = "rgba(138, 112, 255, 0.8)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw line 2 (bottom line)
      ctx.beginPath()
      ctx.moveTo(
        padding.left + (chartWidth * line2Points[0].x) / 6,
        height - padding.bottom - (chartHeight * line2Points[0].y) / 100,
      )

      for (let i = 1; i < line2Points.length; i++) {
        const x = padding.left + (chartWidth * line2Points[i].x) / 6
        const y = height - padding.bottom - (chartHeight * line2Points[i].y) / 100
        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = "rgba(80, 200, 120, 0.8)"
      ctx.lineWidth = 3
      ctx.stroke()
    }

    drawChart()

    // Redraw on window resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      drawChart()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="bg-aptify-card rounded-xl p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <LightbulbIcon className="text-aptify-purple h-6 w-6" />
        <h3 className="text-xl font-semibold">AI Solution Performance Growth</h3>
      </div>

      <div className="h-80 w-full relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm">
        <div className="flex items-center gap-2 text-purple-300">
          <div className="h-3 w-3 rounded-full bg-aptify-purple" />
          <span>Companies using Aptify see up to 95% increase in workflow efficiency</span>
        </div>
        <div className="flex items-center gap-2 text-green-300">
          <div className="h-3 w-3 rounded-full bg-aptify-green" />
          <span>85% adoption rate within 6 months</span>
        </div>
      </div>
    </div>
  )
}
