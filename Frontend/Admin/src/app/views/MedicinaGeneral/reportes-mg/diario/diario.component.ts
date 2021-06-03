import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {

  constructor() { }
  pdfSrc = "http://127.0.0.1:8000/api/RegistroDiarioMedicina/2021-05-10";

  ngOnInit(): void {
  }

}
