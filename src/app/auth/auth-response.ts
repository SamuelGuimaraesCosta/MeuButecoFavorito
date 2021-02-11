export interface AuthResponse {
    user: {
        IDUSUARIO: number,
        NOME: string,
        EMAIL: string,
        SENHA: string,
        DTNASCIMENTO: string
    },
    TOKEN: string,
    EXPIRE: number
}
