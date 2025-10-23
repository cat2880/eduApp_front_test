import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Search, User, Award, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const navigationItems = [
  {
    title: "Мои курсы",
    icon: BookOpen,
    path: "/my-courses",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    title: "Поиск курсов",
    icon: Search,
    path: "/search",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  {
    title: "Мои данные",
    icon: User,
    path: "/profile",
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  },
  {
    title: "Достижения",
    icon: Award,
    path: "/achievements",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, error, debugInfo } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-telegram">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="max-w-[420px] mx-auto px-4 py-4">
          {loading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin" />
              <p className="text-sm text-muted-foreground">Авторизация...</p>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.photoUrl} alt={user.name} />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-semibold">Ошибка авторизации</p>
              </div>
              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Debug Info */}
      {!user && !loading && (
        <div className="max-w-[420px] mx-auto px-4 py-4">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 space-y-2 text-xs">
              <p className="font-semibold text-yellow-900">🔍 Отладочная информация:</p>
              <div className="space-y-1 text-yellow-800">
                <p><strong>API URL:</strong> {debugInfo.apiUrl}</p>
                <p><strong>initData найден:</strong> {debugInfo.hasInitData ? "✅ Да" : "❌ Нет"}</p>
                <p><strong>initData длина:</strong> {debugInfo.initDataLength}</p>
                <p><strong>Запрос отправлен:</strong> {debugInfo.requestSent ? "✅ Да" : "❌ Нет"}</p>
                <p><strong>HTTP статус:</strong> {debugInfo.responseStatus || "не получен"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-[420px] mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Добро пожаловать! 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Выберите раздел для начала
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.path}
                  className="rounded-2xl border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
                  onClick={() => navigate(item.path)}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className={`p-4 rounded-2xl ${item.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-sm font-medium text-foreground">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;