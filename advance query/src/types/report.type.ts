import { RowDataPacket } from 'mysql2';

export interface Parameter {
    tipe: string;
    date: string;
    kabupaten: string;
    kategori: string;
}

export interface AreaPercentage extends RowDataPacket {
    id: number;
    nama: string;
    total: number;
    percentage: number;
}

export interface AreaPercentageResponse {
    nama: string;
    percentage: string;
}

export interface SubRawatJalan extends RowDataPacket {
    jenis: string;
    total: number;
}

export interface SubArea extends RowDataPacket {
    nama: string;
    igd: number;
    poliklinik: number;
    total: number;
}

export interface SubAreaOutput {
    nama: string;
    igd: number;
    poliklinik: number;
    total: number;
}

export interface SubAreaData {
    area: string;
    total: number;
    sub_area: SubAreaOutput[];
}

export interface ReportResponse {
    status: string;
    parameter: Parameter;
    presentase_wilayah: AreaPercentageResponse[];
    sub_rawat_jalan: SubRawatJalan[];
    data: SubAreaData[];
}
