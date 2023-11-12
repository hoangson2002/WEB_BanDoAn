import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaiKhoanViewModel } from '../model/taikhoan-view-model';
import { GiohangService } from 'src/app/modules/giohang/giohang.service';
import { ComBoBoxViewModel } from '../../monan/model/combobox-view-model';
import { first } from 'rxjs';
import { TaikhoanDetailService } from './taikhoan-detail.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-taikhoan-detail',
  templateUrl: './taikhoan-detail.component.html',
  styleUrls: ['./taikhoan-detail.component.scss']
})
export class TaikhoanDetailComponent implements OnInit {
  taiKhoanDialog: boolean = true;
  @Input() obj: TaiKhoanViewModel = new TaiKhoanViewModel();
  @Input() key: string = '';
  @Input() LABEL_HEADER_DIALOG: string = '';
  comBoBoxGioTinh: any[] = [
    { ID: 'NAM', Value: 'Nam'},
    { ID: 'NU', Value: 'Nữ'},
    { ID: 'KHAC', Value: 'Khác'}
  ];
  selectGioiTinh: string = 'NAM';

  @Output() closeDialogTaiKhoanDetail = new EventEmitter<boolean>();
  constructor(private giohangService: GiohangService,
    private taikhoanDetailService: TaikhoanDetailService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadcomboxbox();
  }

  save() {
    if (this.validate()) {
      this.obj.GioiTinh = this.selectGioiTinh || 'NAM';
      this.taikhoanDetailService.InsertOrUpdateMonAn(this.obj).subscribe({
        next: data => {
          if (data) {
            this.messageService.add({ key: this.key, severity: 'info', summary: 'Thông báo', detail: data.flag });
            this.closeDialogTaiKhoanDetail.emit(true);
          } else {
            this.messageService.add({ key: this.key, severity: 'info', summary: 'Thông báo', detail: data.flag });
            this.closeDialogTaiKhoanDetail.emit(false);
            }
        },
        error: (error) => {
          this.messageService.add({ key: this.key, severity: 'info', summary: 'Thông báo', detail: 'Tác vuj thực hiện thất bại!' });
        }
      })
    }
  }

  validate() {
    let flag = true;


    return flag;
  }

  //#region Địa giới hành chính
  ComboboxTinhThanh: ComBoBoxViewModel[] = [];
  ComboboxQuanHuyen: ComBoBoxViewModel[] = [];
  ComboboxPhuongXa: ComBoBoxViewModel[] = [];
  HinhThucThanhToan: number = 0;
  ComboboxHinhThucThanhToan: ComBoBoxViewModel[] = [
    { ID: 1, Value: 'Thanh toán sau khi nhận hàng' },
    { ID: 3, Value: 'Thanh toán bằng QR' },
  ]

  onChangeDiaChi() {
    const phuongXa = this.ComboboxPhuongXa.find(x => x.ID == this.obj.ID_PhuongXa);
    const quanHuyen = this.ComboboxQuanHuyen.find(x => x.ID == this.obj.ID_QuanHuyen);
    const tinhThanh = this.ComboboxTinhThanh.find(x => x.ID == this.obj.ID_TinhThanh);

    if (this.obj.SoNha && phuongXa && quanHuyen && tinhThanh)
      this.obj.DiaChi = this.obj.SoNha + ', ' + phuongXa.Value + ', ' + quanHuyen.Value + ', ' + tinhThanh.Value;
  }

  onChangeLoadQuanHuyen(event: any) {
    const ID_TinhThanh = event.value || 0;
    this.giohangService.ComboboxQuanHuyen(ID_TinhThanh).pipe(first()).subscribe(data => {
      this.ComboboxQuanHuyen = data;
    });
    this.ComboboxPhuongXa = [];
  }

  onChangeLoadPhuongXa(event: any) {
    const ID_QuanHuyen = event.value || 0;
    this.giohangService.ComboboxPhuongXa(ID_QuanHuyen).pipe(first()).subscribe(data => {
      this.ComboboxPhuongXa = data;
    });
  }

  loadcomboxbox() {
    this.giohangService.ComboboxTinhThanh().pipe(first()).subscribe(data => {
      this.ComboboxTinhThanh = data;

        this.giohangService.ComboboxQuanHuyen(this.obj.ID_TinhThanh || 0).pipe(first()).subscribe(data => {
          this.ComboboxQuanHuyen = data;
        });
      if(this.obj.ID_QuanHuyen){
        this.giohangService.ComboboxPhuongXa(this.obj.ID_QuanHuyen).pipe(first()).subscribe(data => {
          this.ComboboxQuanHuyen = data;
        });
      }
    });
  }
  //#endregion

  hideDialog() {
    this.closeDialogTaiKhoanDetail.emit(true);
  }

}
