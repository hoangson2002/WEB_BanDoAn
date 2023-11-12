import { Component, OnInit } from '@angular/core';
import { PhanLoaiDoAnViewModel } from '../phanloai-doan/model/phanloai-doan-view-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { NguyenLieuViewModel } from './model/nguyenlieu-view-model';
import { NguyenlieuService } from './nguyenlieu.service';

@Component({
  selector: 'app-nguyenlieu',
  templateUrl: './nguyenlieu.component.html',
  styleUrls: ['./nguyenlieu.component.css']
})
export class NguyenlieuComponent implements OnInit {

  phanloaiDialog: boolean = false;
  loading_grid: boolean = false;
  ListNguyenLieu: NguyenLieuViewModel[] = [];
  selectedNguyenLieu: NguyenLieuViewModel[] = [];
  obj: NguyenLieuViewModel = new NguyenLieuViewModel();
  cols: any[] = [
    { field: 'STT', header: 'STT', width: '8px', align: 'center' },
    { field: 'Task', header: 'Tác vụ', width: '80px', align: 'center' },
    { field: 'TenNguyenLieu', header: 'Tên nguyên liệu', width: '500px', align: 'center' },
    // { field: 'HinhAnh', header: 'Hình ảnh thể hiện', width: '100px', align: 'center' },
  ];
  LABEL_DIALOG_PHANLOAI_DOAN: string = '';

  constructor(
    private nguyenlieuService: NguyenlieuService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.LoadGrid();
  }

  LoadGrid() {
    this.loading_grid = true;
    this.nguyenlieuService.GetLisNguyenLieu().pipe(first()).subscribe(data => {
      if (data.length == 0) {
        this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Không có dữ liệu!' });
        this.ListNguyenLieu = [];
        this.loading_grid = false;
      } else {
        this.ListNguyenLieu = data;
        this.loading_grid = false;
      }
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi tải dữ liệu!' });
      this.loading_grid = false;
    })
  }

  openThemNguyenLieu() {
    this.obj = new NguyenLieuViewModel();
    this.LABEL_DIALOG_PHANLOAI_DOAN = 'THÊM MỚI NGUYÊN LIỆU';
    this.phanloaiDialog = true;
  }

  openUpdateNguyenLieu(rowData: any) {
    this.obj = { ...rowData };
    this.LABEL_DIALOG_PHANLOAI_DOAN = 'CẬP NHẬT NGUYÊN LIỆU'
    this.phanloaiDialog = true;
  }

  hideNguyenLieuDialog() {
    this.phanloaiDialog = false;
    this.obj = new NguyenLieuViewModel();
    this.LABEL_DIALOG_PHANLOAI_DOAN = '';
    this.selectedNguyenLieu = [];
  }

  saveDialog() {
    if(this.validate()){
      console.warn("obj",this.obj);
      
      this.nguyenlieuService.InsertOrUpdateNguyenLieu(this.obj.ID_NguyenLieu, this.obj.TenNguyenLieu).subscribe(data=>{
        this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.msg });
        this.LoadGrid();
        this.hideNguyenLieuDialog();
      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
      });
    }
  }
  
  validate(){
    let flag = true
    
    if(flag && !this.obj.TenNguyenLieu?.trim()){
      this.messageService.add({severity:'warn', summary: 'Thông báo', detail: 'Vui lòng nhập tên nguyên liệu!'})
      flag = false;
    }

    if(flag && this.ListNguyenLieu.filter(p=>p.TenNguyenLieu == this.obj.TenNguyenLieu.trim()).length > 0){
      this.messageService.add({severity:'warn', summary: 'Thông báo', detail: 'Tên nguyên liệu đã tồn tại!'})
      flag = false;
    }

    return flag;
  }

  //#region Xóa Nguyên lệu
  deleteRowNguyenLieu(rowData: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa nguyên liệu đã chọn không?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.nguyenlieuService.DeleteNguyenLieu(rowData.ID_NguyenLieu.toString()).subscribe(data => {
          this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.msg });
          this.LoadGrid();
          this.hideNguyenLieuDialog();
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
        })
      },
      reject: () => {

      }
    });
  }
  deleteListNguyenLieu() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa danh sách nguyên liệu đã chọn không?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.nguyenlieuService.DeleteNguyenLieu(this.selectedNguyenLieu.map(p => p.ID_NguyenLieu).toString()).subscribe(data => {
          this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.msg });
          this.LoadGrid();
          this.hideNguyenLieuDialog();
        }, (error) => {
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
        })
      },
      reject: () => {

      }
    });
  }
  //#endregion
}
