export default interface Stock {
  name: string;
  logo?: string;
  mentions: number;
  ticker: string;
  comments: number;
  upVotes: number;
  fire?: boolean;
}
