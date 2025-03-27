export interface IBcFacilitiesProps {
  items: any[];
  facility:string;
  setUserProperty: ( value: string) => Promise<void>;
}
