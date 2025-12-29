// Ett gränssnitt som representerar en Tier
export interface Tier {
    title: string;
    monthly_cost: string;
    vcpu: number;
    ram_gb: number;
    storage_type: string;
    storage_gb: number;
    bandwidth_tb: number;
    info: string;
    id: number;
}