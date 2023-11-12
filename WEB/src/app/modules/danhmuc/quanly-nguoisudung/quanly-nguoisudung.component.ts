import { Component, OnInit, ViewChild } from '@angular/core';
import { QuanlyNguoisudungService } from './quanly-nguoisudung.service';
import { first, map } from 'rxjs';
import { TaiKhoanViewModel } from './model/taikhoan-view-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ComBoBoxViewModel } from '../monan/model/combobox-view-model';

@Component({
  selector: 'app-quanly-nguoisudung',
  templateUrl: './quanly-nguoisudung.component.html',
  styleUrls: ['./quanly-nguoisudung.component.scss']
})
export class QuanlyNguoisudungComponent implements OnInit {
  @ViewChild('data_report') data_report?: any;
  obj_filter: any = {
    ID_TaiKhoan: 0,
    TenDayDu: '',
    TenDangNhap: '',
    IsLock: -1,
    IsKhachHang: 0,
  };
  loading_grid: boolean = false;
  ListData: TaiKhoanViewModel[] = [];
  selectedData: TaiKhoanViewModel[] = [];

  obj: TaiKhoanViewModel = new TaiKhoanViewModel();
  constructor(
    private service: QuanlyNguoisudungService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  cols: any[] = [
    { field: 'STT', header: 'STT', width: '15px', align: 'center' },
    { field: 'Task', header: 'Tác vụ', width: '170px', align: 'center' },
    { field: 'TenDayDu', header: 'Tên đầy đủ', width: '200px', align: 'left' },
    { field: 'TenDangNhap', header: 'Tên đăng nhập', width: '200px', align: 'center' },
    { field: 'SoDienThoai', header: 'Số điện thoại', width: '200px', align: 'center' },
    { field: 'Email', header: 'Email', width: '200px', align: 'left' },
    { field: 'Roles', header: 'Vai trò', width: '200px', align: 'left' },
    // { field: 'TenChucDanh', header: 'Chức danh', width: '200px', align: 'left' },
    { field: 'TenGioiTinh', header: 'Giới tính', width: '70px', align: 'center' },
    { field: 'DiaChi', header: 'Địa chỉ', width: '250px', align: 'left' },
    { field: 'TrangThai', header: 'Trạng thái', width: '100px', align: 'center' },
  ];
  ngOnInit(): void {
    this.loadGrid();
    this.loadcombobox();
  }
  search(){
    this.loadGrid();
  }

  loadGrid() {
    this.loading_grid = true;
    this.service.getListTaiKHoan(this.obj_filter?.ID_TaiKhoan || 0,
      this.obj_filter?.TenDayDu || '',
      this.obj_filter?.TenDangNhap || '',
      this.obj_filter?.IsLock,
      this.obj_filter?.IsKhachHang).pipe(first()).subscribe(data => {
        if (data.length == 0) {
          this.loading_grid = false;
          this.ListData = [];
          this.messageService.add({ key: 'quanly-nguoisudung', severity: 'info', summary: 'Thông báo', detail: 'Không có dữ liệu!' });
        } else {
          this.ListData = data;
          this.loading_grid = false;
        }
      }, (error) => {
        this.messageService.add({ key: 'quanly-nguoisudung', severity: 'error', summary: 'Thông báo', detail: 'Lỗi server!' });
        this.ListData = [];
        this.loading_grid = false;
      })
  }

  //#region Thêm sửa
  isTaiKhoanDetail: boolean = false;
  key: string = 'quanly-nguoisudung';
  LABEL_HEADER_DIALOG: string = '';
  openThem() {
    this.LABEL_HEADER_DIALOG = 'Thêm mới tài khoản';
    this.obj = new TaiKhoanViewModel();
    this.isTaiKhoanDetail = true;
    
  }

  openUpdate(rowData) {
    this.LABEL_HEADER_DIALOG = 'Cập nhật tài khoản';
    this.obj = {...rowData};
    this.isTaiKhoanDetail = true;
  }

  hideTaiKhoanDetail(event){
    this.isTaiKhoanDetail = false;
    if(event)
      this.search();
  }
  //#endregion

  //#region Xóa
  deleteList() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa danh sách danh sách tài khoản đã chọn?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.service.xoaTaiKhoan(this.selectedData.map(p => p.ID_TaiKhoan).toString()).subscribe(data => {
          if(data.flag){
            this.messageService.add({ key: 'quanly-nguoisudung', severity: 'success', summary: 'Thông báo', detail: data.msg });
            this.loadGrid();
          }else{
            this.messageService.add({ key: 'quanly-nguoisudung', severity: 'warn', summary: 'Thông báo', detail: data.msg });
          }
        }, (error) => {
          this.messageService.add({ key: 'quanly-nguoisudung', severity: 'error', summary: 'Thông báo', detail: 'Lỗi server!' });
        })
      },
      reject: () => {

      }
    });
  }

  deleteRow(ID_TaiKhoan) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa tài khoản đã chọn không?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.service.xoaTaiKhoan(ID_TaiKhoan.toString()).subscribe(data => {
          if(data.flag){
            this.messageService.add({ key: 'quanly-nguoisudung', severity: 'success', summary: 'Thông báo', detail: data.msg });
            this.loadGrid();
          }else{
            this.messageService.add({ key: 'quanly-nguoisudung', severity: 'warn', summary: 'Thông báo', detail: data.msg });
          }
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
        })
      },
      reject: () => {

      }
    });
  }
  //#endregion

  khoaTaiKhoan(rowData){
    const message = rowData.IsLock ? 'Bạn muốn mở khóa tài khoản đã chọn?' : 'Bạn muốn khóa tài khoản đã chọn';
    this.confirmationService.confirm({
      message: message,
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.service.khoaTaiKhoan(rowData.ID_TaiKhoan,!rowData.IsLock).subscribe({
          next: data => {
            if (data) {
              this.messageService.add({ key: this.key, severity: 'success', summary: 'Thông báo', detail: data.msg });
              this.loadGrid();
            } else {
              this.messageService.add({ key: this.key, severity: 'warn', summary: 'Thông báo', detail: data.msg });
            }
          },
          error: (error) => {
            this.messageService.add({ key: this.key, severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
          }
        })
      },
      reject: () => {

      }
    });
  }

  //#region Combobox
  ComboboxTaiKhoan: ComBoBoxViewModel[] = [];
  ComboboxRoles: ComBoBoxViewModel[] = [];
  ComboboxTrangThai: ComBoBoxViewModel[] = [];

  loadcombobox() {
    this.ComboboxRoles = [
      { ID: 0, Value: 'Nhân viên' },
      { ID: 1, Value: 'Khách hàng' },
    ];

    this.ComboboxTrangThai = [
      { ID: -1, Value: 'Tất cả' },
      { ID: 0, Value: 'Hoạt động' },
      { ID: 1, Value: 'Đã khóa' },
    ];

    this.service.getListTaiKHoan( 0, '', '',
      this.obj_filter?.IsLock || -1,
      this.obj_filter?.IsKhachHang).pipe(first(),
      map(x => x.map(x => ({ID: x.ID_TaiKhoan, Value: x.TenDayDu})))
      ).subscribe(data => {
        if (data.length == 0) {
          this.ComboboxTaiKhoan = [];
        } else {
          this.ComboboxTaiKhoan = data;
        }
      })
  }

  ngChangeRoles(){
    this.loadcombobox();
  }
  //#endregion

  filterGlobal(event: any, filter_type: any) {
    this.data_report.filterGlobal((event.target as HTMLInputElement).value, filter_type);
  }
}
