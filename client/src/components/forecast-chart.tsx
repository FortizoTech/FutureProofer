import { MagicCard } from "@/components/magic-card";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface ForecastChartProps {
  title: string;
  description?: string;
  data: Array<{ name: string; value: number; forecast?: number }>;
}

export function ForecastChart({ title, description, data }: ForecastChartProps) {
  const [period, setPeriod] = useState("1Y");
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'forecast-chart.png';
      link.href = url;
      link.click();
      toast({ title: "Chart downloaded", description: "The chart has been saved to your device." });
    } catch (err) {
      console.error(err);
      toast({ title: "Download failed", description: "Could not generate image.", variant: "destructive" });
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'forecast-chart.png', { type: 'image/png' });

        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Career Forecast',
              text: 'Check out my career trajectory forecast!',
              files: [file]
            });
          } catch (shareErr) {
            console.log('Share canceled or failed', shareErr);
          }
        } else {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            toast({ title: "Copied to clipboard", description: "Chart image copied to clipboard." });
          } catch (clipErr) {
            console.error('Clipboard failed', clipErr);
            toast({ title: "Share failed", description: "Could not share or copy image.", variant: "destructive" });
          }
        }
      });
    } catch (err) {
      console.error(err);
      toast({ title: "Share failed", variant: "destructive" });
    }
  };

  return (
    <MagicCard ref={cardRef} className="h-full" data-testid="card-forecast-chart">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <CardTitle className="font-serif text-xl mb-2">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={period} onValueChange={setPeriod}>
              <TabsList className="bg-muted">
                <TabsTrigger value="6M" className="text-xs" data-testid="button-period-6m">6M</TabsTrigger>
                <TabsTrigger value="1Y" className="text-xs" data-testid="button-period-1y">1Y</TabsTrigger>
                <TabsTrigger value="3Y" className="text-xs" data-testid="button-period-3y">3Y</TabsTrigger>
                <TabsTrigger value="5Y" className="text-xs" data-testid="button-period-5y">5Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="ghost" size="icon" data-testid="button-download-chart" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-share-chart" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--popover-foreground))'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Historical"
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            {data.some(d => d.forecast) && (
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
                dot={{ fill: 'hsl(var(--accent))' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </MagicCard>
  );
}
