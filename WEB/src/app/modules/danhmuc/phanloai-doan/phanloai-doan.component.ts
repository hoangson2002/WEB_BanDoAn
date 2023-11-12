import { Component, OnInit, ViewChild } from '@angular/core';
import { PhanloaiDoanService } from './phanloai-doan.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first, forkJoin, mergeMap } from 'rxjs';
import { PhanLoaiDoAnViewModel } from './model/phanloai-doan-view-model';

@Component({
  selector: 'app-phanloai-doan',
  templateUrl: './phanloai-doan.component.html',
  styleUrls: ['./phanloai-doan.component.css']
})
export class PhanloaiDoanComponent implements OnInit {
  phanloaiDialog: boolean = false;
  loading_grid: boolean = false;
  ListPhanLoaiDoAn: PhanLoaiDoAnViewModel[] = [];
  selectedPhanLoaiDoAn: PhanLoaiDoAnViewModel[] = [];
  objPhanLoai: PhanLoaiDoAnViewModel = new PhanLoaiDoAnViewModel();;
  cols: any[] = [
    { field: 'STT', header: 'STT', width: '8px', align: 'center' },
    { field: 'Task', header: 'Tác vụ', width: '80px', align: 'center' },
    { field: 'TenMonAnPhanLoai', header: 'Tên phân loại món ăn', width: '500px', align: 'center' },
    // { field: 'HinhAnh', header: 'Hình ảnh thể hiện', width: '100px', align: 'center' },
  ];
  LABEL_DIALOG_PHANLOAI_DOAN: string = '';

  constructor(
    private phanloaiService: PhanloaiDoanService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.LoadGrid();
  }

  LoadGrid() {
    this.loading_grid = true;
    this.phanloaiService.GetListPhanLoaiDoAn().pipe(first()).subscribe(data => {
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

  openThemPhanLoai() {
    this.objPhanLoai = new PhanLoaiDoAnViewModel();
    this.LABEL_DIALOG_PHANLOAI_DOAN = 'THÊM MỚI PHÂN LOẠI';
    this.phanloaiDialog = true;
  }

  openUpdatePhanLoaiDoAn(rowData: any) {
    this.objPhanLoai = { ...rowData };
    this.LABEL_DIALOG_PHANLOAI_DOAN = 'CẬP NHẬT PHÂN LOẠI ĐỒ ĂN'
    this.phanloaiDialog = true;
  }

  hidePhanLoaiDoAnDialog() {
    this.phanloaiDialog = false;
    this.objPhanLoai = new PhanLoaiDoAnViewModel();
    this.LABEL_DIALOG_PHANLOAI_DOAN = '';
    this.selectedPhanLoaiDoAn = [];
  }

  saveDialog() {
    if(this.validate()){
      console.warn("objPhanLoai",this.objPhanLoai);
      
      this.phanloaiService.InsertOrUpdatePhanLoai(this.objPhanLoai.ID_MonAnPhanLoai, this.objPhanLoai.TenMonAnPhanLoai).subscribe(data=>{
        this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.msg });
        this.LoadGrid();
        this.hidePhanLoaiDoAnDialog();
      },(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
      });
    }
  }
  
  validate(){
    let flag = true
    
    if(flag && !this.objPhanLoai.TenMonAnPhanLoai?.trim()){
      this.messageService.add({severity:'warn', summary: 'Thông báo', detail: 'Vui lòng nhập tên phân loại đồ ăn!'})
      flag = false;
    }
    if(flag && this.ListPhanLoaiDoAn.filter(p=>p.TenMonAnPhanLoai == this.objPhanLoai.TenMonAnPhanLoai.trim()).length > 0){
      this.messageService.add({severity:'warn', summary: 'Thông báo', detail: 'Tên phân loại đồ ăn đã tồn tại!'})
      flag = false;
    }

    return flag;
  }

  //#region Xóa Phân loại
  deleteRowPhanLoai(rowData: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa loại đồ ăn chọn không?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.phanloaiService.DeletePhanLoaiMonAn(rowData.ID_MonAnPhanLoai.toString()).subscribe(data => {
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
      message: 'Bạn có muốn xóa danh sách loại đồ ăn không?',
      header: 'Thông báo',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
      accept: () => {
        this.phanloaiService.DeletePhanLoaiMonAn(this.selectedPhanLoaiDoAn.map(p => p.ID_MonAnPhanLoai).toString()).subscribe(data => {
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
  
  //#region Xử lý hình ảnh
  uploadedFiles: any[] = [];
  @ViewChild('fileUpload') fileupload?: any;
  xoaFile(file: any){
    // this.fileupload._files = this.fileupload._files.filter(a => a.lastModified != file.lastModified);
  }
  onCloseDialogChonFile() {
    this.fileupload.clear();
    // this.uploadedFiles = [];
  }
  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
  //#endregion
  
}
