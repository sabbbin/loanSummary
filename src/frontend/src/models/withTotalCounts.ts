export default interface IWithTotalCount<T = any> {
  totalCount: number;
  data: T[];
}
