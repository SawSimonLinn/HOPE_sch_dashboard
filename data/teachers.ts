export type Teacher = {
  email: string | number | readonly string[] | undefined;
  id: number;
  name: string;
  subject: string;
  age: number;
  grade: number;
};

export const teachers: Teacher[] = [
  { id: 1, name: "မောင်မောင်", subject: "သင်္ချာ", age: 32, grade: 6 },
  { id: 2, name: "ခင်မြတ်သူ", subject: "ဗျည်းဗျာ", age: 28, grade: 5 },
  { id: 3, name: "မေရိန်းသော်", subject: "အင်္ဂလိပ်စာ", age: 35, grade: 7 },
  { id: 4, name: "လင်းထက်", subject: "သမိုင်း", age: 41, grade: 9 },
  { id: 5, name: "သက်မြင့်မြင့်", subject: "ဘုရားရေးရာ", age: 37, grade: 8 },
  { id: 6, name: "သန်းထွေး", subject: "သိပ္ပံ", age: 30, grade: 6 },
  { id: 7, name: "အောင်မြင်သူ", subject: "ဂီတ", age: 26, grade: 4 },
  { id: 8, name: "လွင်မောင်", subject: "ဗီဇအထူး", age: 34, grade: 10 },
  { id: 9, name: "ခင်စိုးထွဋ်", subject: "ပန်းချီ", age: 29, grade: 5 },
  { id: 10, name: "အေးမြ", subject: "အတတ်ပညာ", age: 33, grade: 7 },
];
