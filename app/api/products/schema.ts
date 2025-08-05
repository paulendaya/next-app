import { z } from "zod";

const schema = z.object({
  name: z.string().min(5),
  price: z.number().min(1),
});

export default schema; 