import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, Trophy, Star, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const achievements = [
  {
    id: 1,
    title: "Первый шаг",
    description: "Завершите первый урок",
    icon: Star,
    progress: 100,
    unlocked: true,
    color: "text-yellow-500"
  },
  {
    id: 2,
    title: "Целеустремленный",
    description: "Завершите 5 курсов",
    icon: Target,
    progress: 40,
    unlocked: false,
    color: "text-blue-500"
  },
  {
    id: 3,
    title: "Мастер AI",
    description: "Завершите все курсы по AI",
    icon: Trophy,
    progress: 60,
    unlocked: false,
    color: "text-purple-500"
  },
  {
    id: 4,
    title: "Непрерывное обучение",
    description: "Учитесь 7 дней подряд",
    icon: Award,
    progress: 100,
    unlocked: true,
    color: "text-green-500"
  }
];

const stats = [
  { label: "Завершено курсов", value: "2" },
  { label: "Часов обучения", value: "24" },
  { label: "Достижений", value: "2/8" }
];

const Achievements = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-telegram">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="max-w-[420px] mx-auto px-4 py-3 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Достижения</h1>
        </div>
      </header>

      <main className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="rounded-xl border-border/50 shadow-sm">
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card 
                key={achievement.id} 
                className={`rounded-xl border-border/50 shadow-sm transition-all ${
                  achievement.unlocked ? 'bg-card' : 'bg-card/50 opacity-60'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl bg-muted ${achievement.unlocked ? achievement.color : 'text-muted-foreground'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1">{achievement.title}</CardTitle>
                      <CardDescription className="text-xs">{achievement.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-primary">Получено!</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-medium text-foreground">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Achievements;
