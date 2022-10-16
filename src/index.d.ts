type Gender = "Male" | "Female";

declare module "@nottca/popcat-chatbot" {
  export class Chatbot {
    constructor(options: { name: string; gender: Gender; owner: string });

    public setName(name: string): this;
    public setGender(gender: Gender): this;
    public setOwner(owner: string): this;

    public chat(message: string): Promise<string>;
  }
}
