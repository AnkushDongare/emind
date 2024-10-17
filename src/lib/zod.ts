import { z } from 'zod';

export const formSchema = z.object({
  dob: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  siblings: z.string().min(1, 'Number of Siblings is required'),
  education: z.string().min(1, 'Education is required'),
  cast: z.string().min(1, 'Cast is required'),
  religion: z.string().min(1, 'Religion is required'),
  residence: z.string().default('rural'),
  fatherOccupation: z.string().min(1, 'Father&apos;s Occupation is required'),
  fatherIncome: z.string().min(1, 'Father&apos;s Income is required'),
  address: z.string().min(1, 'Address is required'),
});

export type FormValues = z.infer<typeof formSchema>;
