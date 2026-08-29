export class FindJobsDto {
  search?: string;
  category?: string;
  page?: number = 1;
  limit?: number = 10;
}
