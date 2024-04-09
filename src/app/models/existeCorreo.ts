export class ExisteCorreo
{
    constructor
    (
        public mensaje: string,
        public registrado: boolean,
        public registros: any[],
        public status: number
    ) { }

}