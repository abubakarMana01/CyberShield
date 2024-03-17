export interface Country {
  flag: string;
  dialCode: string;
  name: string;
}

export const countryData: Country[] = [
  {
    flag: '🇳🇬',
    dialCode: '+234',
    name: 'Nigeria',
  },
  {
    flag: '🇬🇧',
    dialCode: '+44',
    name: 'United Kingdom',
  },
  {
    flag: '🇺🇸',
    dialCode: '+1',
    name: 'United States',
  },
];
