export type IauthPayload={
    id:string;
    email:string;
  }

declare global{
    namespace Express{
        export interface Request{
            user?:IauthPayload
        }
    }
}