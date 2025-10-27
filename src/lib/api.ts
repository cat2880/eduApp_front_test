const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface User {
  id: number;
  username: string;
  name: string;
  photoUrl?: string;
  role: "INSTRUCTOR" | "STUDENT" | "ADMIN";
  createdAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor_username: string;
  createdAt?: string;
  updatedAt?: string;
  cover?: string;
  modules?: CourseModule[];
}

export interface CourseModule {
  id: string;
  course?: Course;
  title: string;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
  lessons?: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  module?: CourseModule;
  title: string;
  content?: string;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

// DTOs
export interface CourseCreateRequest {
  instructorId: number;
  title: string;
  description: string;
}

export interface ModuleCreateRequest {
  title: string;
  orderIndex: number;
}

export interface LessonCreateRequest {
  title: string;
  content?: string;
  orderIndex: number;
}

const getAuthToken = (): string | null => {
  return localStorage.getItem("jwt");
};

const getAuthHeaders = (isPost: boolean = false) => {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  
  if (isPost) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const getCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${API_BASE_URL}/api/courses`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch courses");
  return response.json();
};


// // ============= USERS =============
// export const getUsers = async (): Promise<User[]> => {
//   const response = await fetch(`${API_BASE_URL}/api/users`);
//   if (!response.ok) throw new Error("Failed to fetch users");
//   return response.json();
// };

// export const getUserById = async (id: number): Promise<User> => {
//   const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
//   if (!response.ok) throw new Error("Failed to fetch user");
//   return response.json();
// };




// export const getCourse = async (id: string): Promise<Course> => {
//   const response = await fetch(`${API_BASE_URL}/api/courses/${id}`);
//   if (!response.ok) throw new Error("Failed to fetch course");
//   return response.json();
// };

// export const createCourse = async (data: CourseCreateRequest): Promise<Course> => {
//   const response = await fetch(`${API_BASE_URL}/api/courses`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to create course");
//   return response.json();
// };

// // ============= MODULES =============
// export const getCourseModules = async (courseId: string): Promise<CourseModule[]> => {
//   const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/modules`);
//   if (!response.ok) throw new Error("Failed to fetch modules");
//   return response.json();
// };

// export const createModule = async (
//   courseId: string, 
//   data: ModuleCreateRequest
// ): Promise<CourseModule> => {
//   const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}/modules`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to create module");
//   return response.json();
// };

// // ============= LESSONS =============
// export const getModuleLessons = async (moduleId: string): Promise<CourseLesson[]> => {
//   // ИСПРАВЛЕНО: добавлен /api в начало
//   const response = await fetch(`${API_BASE_URL}/api/modules/${moduleId}/lessons`);
//   if (!response.ok) throw new Error("Failed to fetch lessons");
//   return response.json();
// };

// export const createLesson = async (
//   moduleId: string, 
//   data: LessonCreateRequest
// ): Promise<CourseLesson> => {
//   const response = await fetch(`${API_BASE_URL}/api/modules/${moduleId}/lessons`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to create lesson");
//   return response.json();
// };

// // ============= TELEGRAM AUTH =============
// export interface TelegramAuthData {
//   id: number;
//   first_name?: string;
//   last_name?: string;
//   username?: string;
//   photo_url?: string;
//   auth_date: number;
//   hash: string;
// }

// export const authenticateWithTelegram = async (
//   telegramData: TelegramAuthData
// ): Promise<User> => {
//   // Этот endpoint нужно будет создать на бэкенде
//   const response = await fetch(`${API_BASE_URL}/auth/telegram`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(telegramData),
//   });
//   if (!response.ok) throw new Error("Failed to authenticate");
//   return response.json();
// };