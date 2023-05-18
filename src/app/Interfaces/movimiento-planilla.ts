export interface MovimientoPlanilla {
    codigoConcepto: number,
    concepto: string,
    prioridad: number,
    tipoOperacion: string,
    cuenta1: string,
    cuenta2: string,
    cuenta3: string,
    cuenta4: string,
    movimientoExcepcion1: string,
    movimientoExcepcion2: string,
    movimientoExcepcion3: string,
    aplica_iess: string,
    aplica_imp_renta: string,
    empresa_Afecta_Iess: string,
    mensaje: string
}
