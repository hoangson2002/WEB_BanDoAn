import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CauhinhBannerService } from './cauhinh-banner.service';
import { first } from 'rxjs';
import { CauHinhBannerViewModel } from './model/cauhinh-banner-view-model';

@Component({
    selector: 'app-cauhinh-banner',
    templateUrl: './cauhinh-banner.component.html',
    styleUrls: ['./cauhinh-banner.component.scss']
})
export class CauhinhBannerComponent implements OnInit {
    cauhinhDialog: boolean = false;
    loading: boolean = false;
    ListCauHinh: CauHinhBannerViewModel[] = [];
    objCauHinh: CauHinhBannerViewModel = new CauHinhBannerViewModel;
    selectedCauHinh: CauHinhBannerViewModel[] = [];
    cols: any[] = [
        { field: 'STT', header: 'STT', width: '8px', align: 'center' },
        { field: 'Task', header: 'Tác vụ', width: '80px', align: 'center' },
        { field: 'URL', header: 'Hình ảnh', width: '80px', align: 'center' },
        { field: 'NgayBatDau', header: 'Ngày bắt đầu', width: '100px', align: 'center' },
        { field: 'NgayKetThuc', header: 'Ngày kết thúc', width: '100px', align: 'left' },
        { field: 'TieuDe', header: 'Tiêu đề', width: '100px', align: 'left' },
        { field: 'MoTa', header: 'Mô tả', width: '100px', align: 'left' },
        { field: 'TrangThai', header: 'Trạng thái', width: '100px', align: 'left' },
    ];
    LABEL_DIALOG_CONFIG: string = '';

    constructor(
        private bannerService: CauhinhBannerService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.LoadGrid();
    }

    LoadGrid(){
        this.loading = true;
        this.bannerService.GetListCauHinh().pipe(first()).subscribe(data=>{
            if(data.length == 0){
                this.messageService.add({severity: 'info', summary: 'Thông báo', detail: 'Không có dữ liệu!'});
                this.ListCauHinh = [];
                this.loading = false;
            }else{
                this.ListCauHinh = data;
                this.loading = false;
            }
        }, (error) => {
            this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Lỗi tải dữ liệu!' });
            this.loading = false;
        })
    }

    openThemCauHinhDialog() {
        this.objCauHinh = new CauHinhBannerViewModel();
        this.LABEL_DIALOG_CONFIG = 'Thêm cấu hình';
        this.cauhinhDialog = true;
    }

    deleteListCauHinh() {
        this.confirmationService.confirm({
            message: 'Bạn có muốn xóa danh sách cấu hình đã chọn không?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
            accept: () => {
                this.bannerService.DeleteCauHinh(this.selectedCauHinh.map(p=>p.ID_Banner).toString()).subscribe(data=>{
                    this.messageService.add({severity: data.severity, summary: data.summary, detail: data.msg});
                    this.LoadGrid();
                    this.hideCauHinhDialog();
                },(error)=>{
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
                })
            },
            reject: () => {

            }
        });
    }

    openUpdateCauHinh(rowData: any) {
        this.objCauHinh = { ...rowData };
        this.cauhinhDialog = true;
    }

    deleteRowCauHinh(rowData: any) {
        this.confirmationService.confirm({
            message: 'Bạn có muốn xóa cấu hình đã chọn không?',
            header: 'Thông báo',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Đồng ý", rejectLabel: "Từ chối",
            accept: () => {
                this.bannerService.DeleteCauHinh(rowData.ID_Banner.toString()).subscribe(data=>{
                    this.messageService.add({severity: data.severity, summary: data.summary, detail: data.msg});
                    this.LoadGrid();
                    this.hideCauHinhDialog();
                },(error)=>{
                    this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
                })
            },
            reject: () =>{

            }
        });
    }

    hideCauHinhDialog() {
        this.cauhinhDialog = false;
        this.objCauHinh = new CauHinhBannerViewModel();
        this.LABEL_DIALOG_CONFIG = '';
        this.selectedCauHinh = [];
    }

    saveCauHinh() {
        this.ListCauHinh = [...this.ListCauHinh];
        this.cauhinhDialog = false;
    }
}
