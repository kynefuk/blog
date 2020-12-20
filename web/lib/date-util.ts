import { parseISO, format } from "date-fns";

export default function toDate(date: string) {
  return format(parseISO(date), "LLLL d, yyyy");
}
