import alt from 'alt-server'

export class Habilitacao {
    static readonly CATEGORIA_A = new Habilitacao(1, 'Categoria A', 'Motos', [])

    static readonly HABILITACAO_POR_ID = {
        [Habilitacao.CATEGORIA_A.id]: Habilitacao.CATEGORIA_A,
    }

    private constructor(
        public id: number,
        public exibicao: string,
        public descricao: string,
        private modelos: Array<number>
    ) {}

    verificarPermissao(veiculo: alt.Vehicle) {
        return this.modelos.includes(veiculo.model)
    }
}
