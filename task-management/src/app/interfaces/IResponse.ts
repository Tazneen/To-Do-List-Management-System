export interface IResponse<Type>{
    result: Type
    success: boolean;
    message: string;
}