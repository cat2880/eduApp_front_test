import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockUser = {
  id: 1061604432,
  username: "kirill_ai",
  name: "Kirill",
  photo_url: "https://placekitten.com/80/80",
  role: "INSTRUCTOR",
  email: "kirill@example.com",
  created_at: "2025-10-01T10:00:00Z"
};

const Profile = () => {
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
          <h1 className="text-lg font-semibold text-foreground">Мои данные</h1>
        </div>
      </header>

      <main className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <Card className="rounded-xl border-border/50 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockUser.photo_url} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">{mockUser.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{mockUser.name}</CardTitle>
            <CardDescription>@{mockUser.username}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                Имя
              </Label>
              <Input 
                id="name" 
                defaultValue={mockUser.name}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                Имя пользователя
              </Label>
              <Input 
                id="username" 
                defaultValue={mockUser.username}
                className="rounded-xl"
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input 
                id="email" 
                type="email"
                defaultValue={mockUser.email}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                Дата регистрации
              </Label>
              <p className="text-sm text-muted-foreground px-3 py-2 bg-muted rounded-xl">
                {new Date(mockUser.created_at).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="pt-2">
              <Button className="w-full rounded-xl">
                Сохранить изменения
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Статус аккаунта</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {mockUser.role === "INSTRUCTOR" ? "Преподаватель" : "Студент"}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
