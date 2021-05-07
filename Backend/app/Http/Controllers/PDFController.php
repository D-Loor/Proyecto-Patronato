<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\Historia_Clinica_MG;
use App\Models\Paciente;

class PDFController extends Controller
{
    public function ReportePacientesAnual(){

        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();

        $data = [
            'titulo' => 'Styde.net'
        ];

        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();

        return \PDF::loadView('ReportePacientesAnual', $datos)->setPaper('a4', 'landscape')->stream('ReportePacientesAnual.pdf');
    }

    public function ReportePacientesMensual(){

        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();

        return \PDF::loadView('ReportePacientesMensual', $datos)->setPaper('a4', 'landscape')->stream('ReportePacientesMensual.pdf');

    }


    public function MorbilidadMedicinaGeneral(){

        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();

        return \PDF::loadView('MorbilidadMedicinaGeneral', $datos)->setPaper('a4', 'landscape')->stream('MorbilidadMedicinaGeneral.pdf');

    }
    public function MorbilidadTerapia(){

        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();

        return \PDF::loadView('MorbilidadTerapia', $datos)->setPaper('a4', 'landscape')->stream('MorbilidadTerapia.pdf');

    }

    public function RegistroDiarioMedicina(){
        //$datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();
        return \PDF::loadView('RegistroDiarioMedicina')->setPaper('a4', 'landscape')->stream('RegistroDiarioMedicina.pdf');
    }
}
