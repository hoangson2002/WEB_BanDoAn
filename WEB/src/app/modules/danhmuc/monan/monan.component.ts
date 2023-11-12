import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MonanService } from './monan.service';
import { first, forkJoin } from 'rxjs';
import { MonAnViewModel, NguyenLieuMonAnViewModel } from './model/monan-view-model';
import { ComBoBoxViewModel } from './model/combobox-view-model';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-monan',
  templateUrl: './monan.component.html',
  styleUrls: ['./monan.component.css']
})

export class MonanComponent implements OnInit {
  phanloaiDialog: boolean = false;
  loading_grid: boolean = false;
  ListPhanLoaiDoAn: MonAnViewModel[] = [];
  selectedPhanLoaiDoAn: MonAnViewModel[] = [];
  obj: MonAnViewModel = new MonAnViewModel;
  model_fillter = {
    ID_MonAnTrangThai: 0,
    ID_MonAnPhanLoai: 0,
    TenMonAn: ''
  }
  cols: any[] = [
    { field: 'STT', header: 'STT', width: '8px', align: 'center' },
    { field: 'Task', header: 'Tác vụ', width: '100px', align: 'center' },
    { field: 'HinhAnhTheHien', header: 'Hình ảnh', width: '100px', align: 'center' },
    { field: 'TenMonAn', header: 'Tên món ăn', width: '100px', align: 'left' },
    { field: 'TenMonAnPhanLoai', header: 'Phân loại', width: '100px', align: 'left' },
    // { field: 'MaGiamGia', header: 'Mã giảm giá', width: '100px', align: 'left' },
    { field: 'DonGia', header: 'Đơn giá', width: '100px', align: 'left' },
    { field: 'MoTa', header: 'Mô tả', width: '500px', align: 'left' },
    { field: 'TenNguyenLieu', header: 'Tên nguyên liệu', width: '100px', align: 'left' },
    { field: 'TenTrangThai', header: 'Trạng thái', width: '100px', align: 'left' },
  ];
  LABEL_HEADER_DIALOG: string = '';

  constructor(
    private moanService: MonanService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.LoadGrid();
    this.LoadComBoBox();
  }

  LoadGrid() {
    this.loading_grid = true;
    let ID_MonAnPhanLoai = this.model_fillter.ID_MonAnPhanLoai ? this.model_fillter.ID_MonAnPhanLoai : 0;
    let ID_MonAnTrangThai = this.model_fillter.ID_MonAnTrangThai ? this.model_fillter.ID_MonAnTrangThai : 0;
    let TenMonAn = this.model_fillter.TenMonAn ? this.model_fillter.TenMonAn : '';
    this.moanService.GetListMonAn(ID_MonAnPhanLoai, ID_MonAnTrangThai, TenMonAn).pipe(first()).subscribe(data => {
      if (data.length == 0) {
        this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Không có dữ liệu!' });
        this.ListPhanLoaiDoAn = [];
        this.loading_grid = false;
      } else {
        this.ListPhanLoaiDoAn = data;
        this.loading_grid = false;
      }
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi tải dữ liệu!' });
      this.loading_grid = false;
    })
  }

  TimKiem() {
    this.LoadGrid();
  }

  openThemPhanLoai() {
    this.obj = new MonAnViewModel();
    this.obj.ID_MonAnPhanLoai = null;
    this.obj.ID_MonAnTrangThai = null;
    this.LABEL_HEADER_DIALOG = 'THÊM MỚI MÓN ĂN';
    this.ListNguyenLieu = [];
    this.phanloaiDialog = true;
  }

  openUpdatePhanLoaiDoAn(rowData: any) {
    this.obj = { ...rowData };
    this.LABEL_HEADER_DIALOG = 'CẬP NHẬT MÓN ĂN';
    this.ListNguyenLieu = [];
    this.moanService.GetListNguyenLieuMonAn(rowData.ID_MonAn).pipe(first()).subscribe(data => {
      data.forEach((item, index) => {
        item.Index = index + 1;
        this.Index = item.Index + 1;
      })
      this.ListNguyenLieu = data;
    })
    this.phanloaiDialog = true;
  }

  hidePhanLoaiDoAnDialog() {
    this.phanloaiDialog = false;
    this.obj = new MonAnViewModel();
    this.LABEL_HEADER_DIALOG = '';
    this.selectedPhanLoaiDoAn = [];
    this.fileupload.clear();
  }

  saveDialog() {
    if (this.validate()) {
      this.obj.listNguyenLieu = this.ListNguyenLieu;
      this.obj.ListXoaNguyenLieu = this.ListXoaNguyenLieu.filter(p => p.ID > 0).map(x=>x.ID).toString();

      this.moanService.InsertOrUpdateMonAn(this.obj).subscribe(data => {
        if(data.msg)
          this.uploadFileToActivity(data.value);
        this.LoadGrid();
        this.hidePhanLoaiDoAnDialog();
        this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.msg });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
        this.fileupload.clear();
      });
    }
  }

  validate() {
    let flag = true;
    if (flag && !this.obj.TenMonAn.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng nhập tên món ăn!' })
      flag = false;
    }
    if (flag && this.obj.ID_MonAnPhanLoai == 0 || flag && this.obj.ID_MonAnPhanLoai == null) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng chọn phân loại!' })
      flag = false;
    }
    if (flag && this.obj.ID_MonAnTrangThai == 0 || flag && this.obj.ID_MonAnTrangThai == null) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng chọn trạng thái!' })
      flag = false;
    }
    if (flag && this.ListNguyenLieu.length == 0) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng nhập nguyên liệu món ăn!' })
      flag = false;
    }
    if (flag) {
      this.ListNguyenLieu.forEach(item => {
        if (flag && this.ListNguyenLieu.filter(p => p.ID_NguyenLieu == item.ID_NguyenLieu).length > 1) {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Tên nguyên liệu đã tồn tại!' })
          flag = false;
        }
        if (flag && item.ID_NguyenLieu == 0 || flag && item.ID_NguyenLieu == null) {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng chọn tên nguyên liệu!' })
          flag = false;
        }
      })
    }

    return flag;
  }

  //#region Xóa Món ăn
  deleteRowPhanLoai(rowData: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa món ăn đã chọn không?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.moanService.DeleteMonAn(rowData.ID_MonAn.toString()).subscribe(data => {
          this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.msg });
          this.LoadGrid();
          this.hidePhanLoaiDoAnDialog();
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
        })
      },
      reject: () => {

      }
    });
  }
  
  deleteListPhanLoai() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa danh sách món ăn không?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.moanService.DeleteMonAn(this.selectedPhanLoaiDoAn.map(p => p.ID_MonAn).toString()).subscribe(data => {
          this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.msg });
          this.LoadGrid();
          this.hidePhanLoaiDoAnDialog();
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
        })
      },
      reject: () => {

      }
    });
  }
  //#endregion
  //#region Xử lý nguyên liệu
  Index: number = 1;
  ListNguyenLieu: NguyenLieuMonAnViewModel[] = [];
  ListXoaNguyenLieu: NguyenLieuMonAnViewModel[] = [];
  ThemMoiNguyenLieu() {
    let obj: NguyenLieuMonAnViewModel = new NguyenLieuMonAnViewModel();
    obj.Index = this.Index;
    this.ListNguyenLieu.push(obj);
    this.Index++;
  }

  XoaNguyenLieu(row: NguyenLieuMonAnViewModel) {
    this.ListXoaNguyenLieu.push(row);
    this.ListNguyenLieu = this.ListNguyenLieu.filter(x => x.Index != row.Index);
  }
  //#endregion

  //#region Xử lý hình ảnh
  @ViewChild('fileUpload') fileupload!: FileUpload;

  uploadFileToActivity(ID_MonAn: number){
    const fileUp = this.fileupload?.files; // Get the selected files using FileList
    
    console.warn("fileUp", fileUp);
    
    if(fileUp.length > 0){
      this.moanService.SaveFile(fileUp, ID_MonAn || 0).pipe(first()).subscribe((data) => {
        if (data.flag) {
          this.LoadGrid();
        }
      });
    }
  }
  //#endregion

  //#region LoadCombobox
  ComboboxPhanLoaiMonAn: ComBoBoxViewModel[] = [];
  ComboboxTrangThaiMonAn: ComBoBoxViewModel[] = [];
  ComboboxNguyenLieu: ComBoBoxViewModel[] = [];
  LoadComBoBox() {
    forkJoin([
      this.moanService.ComboboxPhanLoaiMonAn().pipe(first()),
      this.moanService.ComboboxTrangThaiMonAn().pipe(first()),
      this.moanService.ComboboxNguyenLieu().pipe(first())
    ]).pipe(first()).subscribe({
      next: (([resPhanLoaiMonAn, resTrangThaiMonAn, resNguyenLieu]) => {
        this.ComboboxPhanLoaiMonAn = resPhanLoaiMonAn;
        this.ComboboxTrangThaiMonAn = resTrangThaiMonAn;
        this.ComboboxNguyenLieu = resNguyenLieu;
      })
    })
  }
  //#endregion

}
