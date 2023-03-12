export class DashboardTotalDataDto {
  period: string;
  totalPeriod: number;
  totalByCategories: {name: string; value: number }[];
}

export const monthList ={
  January:"Janeiro",
  Febuary: "Fevereiro",
  March:"Março",
  April: "Abril",
  May: "Maio",
  June:"Junho"
}