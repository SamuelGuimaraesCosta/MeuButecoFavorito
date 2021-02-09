export interface AuthResponse {
    user: {
        idusuario: number,
        nome: string,
        email: string,
        senha: string,
        access_token: string,
        expires_in: number
    }
}
