import { useQuery } from "@tanstack/react-query";
import { organizerService } from "@/shared/services/organizer.service";

const ORGANIZER_QUERY_KEY = ["organizers"] as const;

export function useOrganizers() {
  return useQuery({
    queryKey: ORGANIZER_QUERY_KEY,
    queryFn: () => organizerService.getOrganizers(),
  });
}
