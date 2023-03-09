export class DashboardTotalDataDto {
  period: string;
  totalPeriod: number;
  totalByCategories: {name: string; value: number }[];
}
