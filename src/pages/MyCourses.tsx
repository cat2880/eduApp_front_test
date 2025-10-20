import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api";

const MyCourses = () => {
  const navigate = useNavigate();
  
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

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
          <h1 className="text-lg font-semibold text-foreground">Мои курсы</h1>
        </div>
      </header>

      <main className="max-w-[420px] mx-auto px-4 py-6 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : courses && courses.length > 0 ? (
          courses.map((course) => {
            const progress = Math.floor(Math.random() * 100);
            return (
            <Card 
              key={course.id} 
              className="rounded-xl overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-32 overflow-hidden bg-muted">
                <img 
                  src={course.cover || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop"} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="text-sm">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>{course.instructor_name || "Преподаватель"}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-medium text-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            );
          })
        ) : (
          <Card className="rounded-xl border-border/50">
            <CardContent className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                У вас пока нет курсов
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MyCourses;
