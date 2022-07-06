export class Message {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public phoneNumber: string,
    public text: string,
  ) {}
}

export interface MessageData {
  name: string;
  email: string;
  phoneNumber: string;
  text: boolean;
}
