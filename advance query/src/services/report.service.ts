import { RowDataPacket } from 'mysql2';
import pool from '../config/database';
import { reportQuery } from '../db/queries/report.query';
import { 
    Parameter, 
    AreaPercentage,
    AreaPercentageResponse, 
    SubRawatJalan, 
    SubAreaData, 
    SubArea,
    SubAreaOutput
} from '../types/report.type';

export class ReportService {
    async getParameter(startDate: string, endDate: string, id: number, tipe: string, kategori: string): Promise<Parameter> {
        const [rows] = await pool.query<RowDataPacket[]>(reportQuery.getKabupatenName, [id]);
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        
        return {
            tipe,
            date: `${start.toLocaleDateString('id-ID', options)} s.d ${end.toLocaleDateString('id-ID', options)}`,
            kabupaten: rows[0]?.nama || '',
            kategori
        };
    }

    async getPercentageAreaResponse(percentageData: AreaPercentage[]): Promise<AreaPercentageResponse[]> {
        return percentageData.map(item => ({
            nama: item.nama,
            percentage: `${parseFloat(item.percentage.toString()).toFixed(2)} %`
        }));
    }

    async getSubRawatJalan(id: number, startDate: string, endDate: string): Promise<SubRawatJalan[]> {
        const [rows] = await pool.query<SubRawatJalan[]>(
            reportQuery.getSubRawatJalan,
            [id, startDate, endDate]
        );
        return rows;
    }

    async getPercentageArea(id: number, startDate: string, endDate: string): Promise<AreaPercentage[]> {
        const [totalResult] = await pool.query<RowDataPacket[]>(
            reportQuery.getTotalByArea, 
            [id, startDate, endDate]
        );
        const total = totalResult[0]?.total || 0;

        const [rows] = await pool.query<AreaPercentage[]>(
            reportQuery.getPercentageByKecamatan,
            [total, startDate, endDate, id]
        );

        return rows;
    }

    async getSubAreaData(id: number, startDate: string, endDate: string, areaData: AreaPercentage[]): Promise<SubAreaData[]> {
        const result: SubAreaData[] = [];

        for (const kecamatan of areaData) {
            const [subAreas] = await pool.query<SubArea[]>(
                reportQuery.getSubAreaData,
                [startDate, endDate, kecamatan.id]
            );

            const transformedSubAreas: SubAreaOutput[] = subAreas.map(area => ({
                nama: area.nama,
                igd: Number(area.igd),
                poliklinik: Number(area.poliklinik),
                total: Number(area.total)
            }));

            result.push({
                area: kecamatan.nama,
                sub_area: transformedSubAreas,
                total: kecamatan.total
            });
        }

        return result;
    }
}