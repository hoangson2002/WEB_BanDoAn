export class MonAnViewModel {
    ID_MonAn: number = 0;
    ID_MonAnPhanLoai: any = 0;
    ID_MonAnTrangThai: any = 0;
    TenMonAn: string = '';
    TenTrangThai: string = '';
    TenMonAnPhanLoai: string = '';
    HinhAnhTheHien: string = '';
    MaGiamGia: string = '';
    DonGia: number = 0;
    MoTa: string = '';
    TenNguyenLieu: string = '';
    ListXoaNguyenLieu: string = '';
    listNguyenLieu: NguyenLieuMonAnViewModel[] = [];
}

export class NguyenLieuMonAnViewModel {
    Index: number = 0;
    ID: number = 0;
    ID_MonAn: number = 0;
    ID_NguyenLieu: number = 0;
}