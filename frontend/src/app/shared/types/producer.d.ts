interface Producer {
    id: number;
    name: string;
    description: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    contract_type: string;
    contract_duration: number;
    dollars_per_kg: number;
    available_kg: number;
    logo_url: string;
    distance?: number;
}