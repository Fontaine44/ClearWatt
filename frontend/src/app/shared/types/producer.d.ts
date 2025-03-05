interface Producer {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    contract_duration: number;
    dollars_per_kg: number;
    available_kg: number;
    logo_url: string;
    distance?: number;
}