import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Age must be a valid positive number.",
  }),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),

  contact: z.string().regex(/^(09\d{9}|\+639\d{9})$/, {
    message:
      "Invalid contact number! Use '09XXXXXXXXX' or '+639XXXXXXXXX' format.",
  }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  course: z
    .string()
    .min(5, { message: "Course name must be at least 5 characters long." }),

  year: z.enum(["1st", "2nd", "3rd", "4th", "5th"], {
    message: "Please select a valid year level.",
  }),

  room: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Room number must be a valid positive number.",
  }),

  dorm: z
    .string()
    .min(5, { message: "Dorm name must be at least 5 characters long." }),

  dateOfStay: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date) && date <= new Date();
    },
    { message: "Date of stay cannot be in the future!" }
  ),
});
