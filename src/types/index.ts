export interface StepItem {
  step: number;
  title: string;
  description: string;
  image: string;
  remoteImage: string;
}

export interface FaqCard {
  id: string;
  cardNumber: number;
  title: string;
  shortDesc: string;
  youtubeUrl: string;
  youtubeEmbedId: string;
  steps: StepItem[];
}

export interface FeatureTab {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface BrandInfo {
  bankName: string;
  bankFullName: string;
  slogan: string;
  branchName: string;
  counterTitle: string;
  logo: string;
  logoFallback: string;
  hotline247: string;
  advisor: {
    name: string;
    title: string;
    phone: string;
  };
}

export interface RateItem {
  term: string;
  counterRate: string;
  onlineRate: string;
}

export interface ExchangeRateItem {
  currency: string;
  name: string;
  buyCash: string;
  buyTransfer: string;
  sell: string;
}
