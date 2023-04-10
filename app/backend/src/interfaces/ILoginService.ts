export default interface ILoginService {
    login(email: string, password: string, roomId: number): Promise<string>;
}
