import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, GraduationCap, Loader2, Info } from "lucide-react"; // Добавил Info
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Добавил useEffect
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api";

const SearchCourses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // --- НОВЫЙ КОД ДЛЯ ОТЛАДКИ ---
  const [debugToken, setDebugToken] = useState<string | null>(null);
  
  // Читаем URL эндпоинта из переменных окружения (как в api.ts)
  const endpoint = `${import.meta.env.VITE_API_URL}/api/courses`;

  // Получаем токен из localStorage при загрузке компонента
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setDebugToken(token);
  }, []);
  // --- КОНЕЦ НОВОГО КОДА ---

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const filteredCourses = (courses || []).filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-telegram">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        {/* ... (код хедера без изменений) ... */}
        <div className="max-w-[420px] mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-xl"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Поиск курсов</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Найти курс..." 
              className="pl-9 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-[420px] mx-auto px-4 py-6 space-y-3">
        
        {/* --- НОВАЯ КАРТОЧКА ОТЛАДКИ --- */}
        <Card className="rounded-xl border-blue-500/50 bg-blue-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-blue-600 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Отладочная информация
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div>
              <p className="font-semibold">Endpoint запроса:</p>
              <p className="break-words font-mono text-muted-foreground">{endpoint}</p>
            </div>
            <div>
              <p className="font-semibold">Токен из localStorage:</p>
              <p 
                className="font-mono text-muted-foreground" 
                style={{ wordBreak: 'break-all' }} // для переноса длинных токенов
              >
                {debugToken ? `Bearer ${debugToken}` : "Токен не найден"}
              </p>
            </div>
          </CardContent>
        </Card>
        {/* --- КОНЕЦ КАРТОЧКИ ОТЛАДКИ --- */}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            // ... (код карточек курсов без изменений) ...
            <Card 
              key={course.id} 
              className="rounded-xl overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-32 overflow-hidden bg-muted">
                <img 
                  src={course.cover || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="text-sm">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{course.instructor_username ? `@${course.instructor_username}` : "Преподаватель"}</span>
                  </div>
                </div>
                <Button className="w-full rounded-xl" size="sm">
                  Записаться
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="rounded-xl border-border/50">
            <CardContent className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                Курсы не найдены
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SearchCourses;