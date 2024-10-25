export const reportQuery = {
    getKabupatenName: `
        SELECT nama FROM dc_kabupaten WHERE id = ?
    `,
    
    getTotalByArea: `
        SELECT COUNT(dc_pendaftaran.id) as total 
        FROM dc_pendaftaran
        INNER JOIN dc_pasien ON dc_pendaftaran.id_pasien = dc_pasien.id
        INNER JOIN dc_kelurahan ON dc_pasien.id_kelurahan = dc_kelurahan.id
        INNER JOIN dc_kecamatan ON dc_kelurahan.id_kecamatan = dc_kecamatan.id
        INNER JOIN dc_kabupaten ON dc_kecamatan.id_kabupaten = dc_kabupaten.id
        WHERE dc_kabupaten.id = ?
        AND dc_pendaftaran.waktu_daftar >= ?
        AND dc_pendaftaran.waktu_daftar <= ?
    `,

    getPercentageByKecamatan: `
        SELECT 
            dc_kecamatan.id,
            dc_kecamatan.nama,
            COUNT(dc_pendaftaran.id) as total,
            COALESCE(COUNT(dc_pendaftaran.id)/?*100, 0) as percentage
        FROM dc_kecamatan
        LEFT JOIN dc_kelurahan ON dc_kelurahan.id_kecamatan = dc_kecamatan.id
        LEFT JOIN dc_pasien ON dc_pasien.id_kelurahan = dc_kelurahan.id
        LEFT JOIN dc_pendaftaran ON dc_pendaftaran.id_pasien = dc_pasien.id
            AND dc_pendaftaran.waktu_daftar >= ?
            AND dc_pendaftaran.waktu_daftar <= ?
        JOIN dc_kabupaten ON dc_kecamatan.id_kabupaten = dc_kabupaten.id
        WHERE dc_kabupaten.id = ?
        GROUP BY dc_kecamatan.id, dc_kecamatan.nama
        HAVING total > 0
    `,

    getSubRawatJalan: `
        SELECT jenis, COUNT(dc_pendaftaran.id) as total
        FROM dc_pendaftaran
        JOIN dc_pasien ON dc_pendaftaran.id_pasien = dc_pasien.id
        JOIN dc_kelurahan ON dc_pasien.id_kelurahan = dc_kelurahan.id
        JOIN dc_kecamatan ON dc_kelurahan.id_kecamatan = dc_kecamatan.id
        JOIN dc_kabupaten ON dc_kecamatan.id_kabupaten = dc_kabupaten.id
        WHERE dc_kabupaten.id = ?
        AND dc_pendaftaran.waktu_daftar >= ?
        AND dc_pendaftaran.waktu_daftar <= ?
        GROUP BY jenis
    `,

    getSubAreaData: `
        SELECT 
            dc_kelurahan.id,
            dc_kelurahan.nama,
            COUNT(dc_pendaftaran.id) as total,
            SUM(CASE WHEN dc_pendaftaran.jenis = 'igd' THEN 1 ELSE 0 END) AS igd,
            SUM(CASE WHEN dc_pendaftaran.jenis = 'poliklinik' THEN 1 ELSE 0 END) AS poliklinik
        FROM dc_kecamatan
        LEFT JOIN dc_kelurahan ON dc_kecamatan.id = dc_kelurahan.id_kecamatan
        LEFT JOIN dc_pasien ON dc_kelurahan.id = dc_pasien.id_kelurahan
        LEFT JOIN dc_pendaftaran ON dc_pasien.id = dc_pendaftaran.id_pasien
            AND dc_pendaftaran.waktu_daftar >= ?
            AND dc_pendaftaran.waktu_daftar <= ?
        WHERE dc_kecamatan.id = ?
        GROUP BY dc_kelurahan.id, dc_kelurahan.nama
        HAVING total > 0
    `
};
